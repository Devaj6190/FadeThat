export type Verdict = "Wrong" | "Uncertain" | "Correct";

export interface ClaimSource {
  name: string;       // e.g. "CDC", "Harvard study"
  url: string | null; // literal URL from article text, or null
  excerpt: string;    // verbatim 1–2 sentence span from article that makes the claim + cites the source
}

export interface Claim {
  claim: string;
  verdict: Verdict;
  reason: string;
  source: ClaimSource | null; // null = no explicit source cited
}
