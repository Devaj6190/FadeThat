import type { Claim, Verdict } from "@/lib/types";

const styles: Record<Verdict, { border: string; badge: string }> = {
  Wrong: {
    border: "border-l-red-400",
    badge: "bg-red-950 text-red-400",
  },
  Uncertain: {
    border: "border-l-amber-400",
    badge: "bg-amber-950 text-amber-400",
  },
  Correct: {
    border: "border-l-green-400",
    badge: "bg-green-950 text-green-400",
  },
};

export default function ClaimCard({ claim }: { claim: Claim }) {
  const { border, badge } = styles[claim.verdict];
  return (
    <div
      className={`bg-[#1a1a1a] border border-[#2a2a2a] border-l-[3px] ${border} rounded-xl p-5`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <p className="text-sm text-[#d4d4d4] italic leading-relaxed flex-1">
          &ldquo;{claim.claim}&rdquo;
        </p>
        <span
          className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${badge}`}
        >
          {claim.verdict}
        </span>
      </div>
      <p className="text-sm text-[#888] leading-relaxed">{claim.reason}</p>
    </div>
  );
}
