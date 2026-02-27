import { type RefObject } from "react";
import type { Claim } from "@/lib/types";
import SummaryBar from "./SummaryBar";
import ClaimCard from "./ClaimCard";

interface Props {
  claims: Claim[];
  onReset: () => void;
  resultsRef: RefObject<HTMLDivElement>;
}

export default function ResultsSection({ claims, onReset, resultsRef }: Props) {
  return (
    <div ref={resultsRef} className="mt-12 animate-fade-in">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
        <SummaryBar claims={claims} />
        <button
          onClick={onReset}
          className="border border-[#2a2a2a] rounded-lg text-[#aaa] text-[13px] px-3.5 py-1.5 hover:border-[#555] hover:text-[#e8e8e8] transition-colors"
        >
          ← Check another
        </button>
      </div>

      {claims.length === 0 ? (
        <p className="text-center text-[#555] py-16 text-[15px]">
          No factual claims found in this article.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {claims.map((c, i) => (
            <ClaimCard key={i} claim={c} />
          ))}
        </div>
      )}
    </div>
  );
}
