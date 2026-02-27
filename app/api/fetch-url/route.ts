import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body?.url;
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "url is required" }, { status: 400 });
    }

    // Basic URL validation to prevent non-HTTP schemes
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "Only HTTP/HTTPS URLs are supported" },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; FadeThat/1.0)",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch URL (${response.status} ${response.statusText})`,
        },
        { status: 400 }
      );
    }

    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document as unknown as Document);
    const article = reader.parse();

    if (!article?.textContent?.trim()) {
      return NextResponse.json(
        { error: "Could not extract readable text from this URL" },
        { status: 400 }
      );
    }

    return NextResponse.json({ text: article.textContent.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
