export type Verdict = "Wrong" | "Uncertain" | "Correct";

export interface Claim {
  claim: string;
  verdict: Verdict;
  reason: string;
}
