import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { claimText, sourceName, sourceUrl } = body as {
      claimText: string;
      sourceName: string;
      sourceUrl: string | null;
    };

    if (!claimText || !sourceName) {
      return NextResponse.json(
        { error: "claimText and sourceName are required" },
        { status: 400 }
      );
    }

    // Path A: source has a URL — fetch and extract relevant passage
    if (sourceUrl) {
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(sourceUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid source URL.", errorType: "dead_link" },
          { status: 200 }
        );
      }

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return NextResponse.json(
          { error: "Source URL uses an unsupported protocol.", errorType: "dead_link" },
          { status: 200 }
        );
      }

      let response: Response;
      try {
        response = await fetch(sourceUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; FadeThat/1.0)" },
        });
      } catch {
        return NextResponse.json(
          { error: "Could not reach the source — it may be offline or the link is broken.", errorType: "dead_link" },
          { status: 200 }
        );
      }

      if (response.status === 402 || response.status === 403) {
        return NextResponse.json(
          { error: "This source appears to be behind a paywall or access restriction.", errorType: "paywall" },
          { status: 200 }
        );
      }

      if (!response.ok) {
        return NextResponse.json(
          { error: `Source returned an error (${response.status}).`, errorType: "fetch_error" },
          { status: 200 }
        );
      }

      const html = await response.text();
      const dom = new JSDOM(html, { url: sourceUrl });
      const reader = new Readability(dom.window.document as unknown as Document);
      const article = reader.parse();

      if (!article?.textContent?.trim()) {
        return NextResponse.json(
          { error: "Could not extract readable content — the source may be paywalled or require a subscription.", errorType: "extraction_failed" },
          { status: 200 }
        );
      }

      // Trim to stay within token limits
      const sourceText = article.textContent.trim().slice(0, 8000);

      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 512,
        messages: [
          {
            role: "user",
            content: `Given the following source text and a claim, extract the 1–3 sentence passage from the source text that is most directly relevant to the claim. Return only the passage itself, no explanation or preamble.

CLAIM: ${claimText}

SOURCE TEXT:
${sourceText}`,
          },
        ],
      });

      const block = message.content[0];
      const passage = block?.type === "text" ? block.text.trim() : "";

      return NextResponse.json({
        passage,
        fullText: article.textContent.trim(),
        title: article.title ?? null,
        fetchedFrom: "url",
      });
    }

    // Path B: named source only, no URL — ask Claude what it knows
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `What does "${sourceName}" say about the following claim? Summarise in 2–4 sentences based on your knowledge. If you are not certain, say so clearly.

CLAIM: ${claimText}`,
        },
      ],
    });

    const block = message.content[0];
    const passage = block?.type === "text" ? block.text.trim() : "";

    return NextResponse.json({ passage, fetchedFrom: "claude_knowledge" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message, errorType: "fetch_error" },
      { status: 500 }
    );
  }
}
