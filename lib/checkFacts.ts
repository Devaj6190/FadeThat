import Anthropic from "@anthropic-ai/sdk";
import type { Claim, Verdict } from "./types";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const FACT_CHECK_PROMPT = `You are a fact-checking assistant. Given the article below, do the following:
1. Extract every factual claim — statistics, named assertions, quoted data, specific numbers, dates, and verifiable statements.
2. Evaluate each claim based on your knowledge.
3. Return ONLY a JSON array. No explanation, no preamble, no markdown code blocks — just the raw JSON array.
Each object in the array must have exactly these three fields:
- "claim": the exact verbatim quote from the article (not paraphrased)
- "verdict": exactly one of "Wrong", "Uncertain", or "Correct"
- "reason": one sentence explaining the verdict
Verdict definitions:
- "Wrong" — the claim is factually incorrect
- "Uncertain" — cannot be verified, is ambiguous, or lacks context
- "Correct" — checks out against reliable knowledge
When in doubt between Wrong and Uncertain, prefer Uncertain. Only mark a claim as Wrong if you are highly confident it is factually incorrect.
If no factual claims are found, return an empty array: []
If the article is very long, prioritize the most significant factual claims.
Do not include opinions, predictions, or subjective statements as claims.
ARTICLE:`;

export async function checkFacts(articleText: string): Promise<Claim[]> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `${FACT_CHECK_PROMPT}\n${articleText}`,
      },
    ],
  });

  const block = message.content[0];
  if (!block || block.type !== "text") {
    throw new Error("Unexpected response format from Claude");
  }

  let raw = block.text.trim();
  // Strip markdown code fences if Claude wraps the response
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
  }

  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("Claude returned unexpected format (expected array)");
  }

  return parsed as Claim[];
}

export function sortClaims(claims: Claim[]): Claim[] {
  const order: Record<Verdict, number> = { Wrong: 0, Uncertain: 1, Correct: 2 };
  return [...claims].sort((a, b) => order[a.verdict] - order[b.verdict]);
}
