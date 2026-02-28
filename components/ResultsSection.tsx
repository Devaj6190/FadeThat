import { type RefObject } from "react";
import type { Claim, Verdict } from "@/lib/types";
import ClaimCard from "./ClaimCard";

interface Props {
  claims: Claim[];
  onReset: () => void;
  resultsRef: RefObject<HTMLDivElement>;
}

const tiers: {
  verdict: Verdict;
  icon: string;
  label: string;
  sub: string;
  headCls: string;
  titleColor: string;
}[] = [
  {
    verdict: "Wrong",
    icon: "✕",
    label: "WRONG",
    sub: "factually incorrect",
    headCls: "bg-[rgba(255,68,68,0.12)]",
    titleColor: "text-[#ff4444]",
  },
  {
    verdict: "Uncertain",
    icon: "◉",
    label: "UNCERTAIN",
    sub: "potentially misleading",
    headCls: "bg-[rgba(255,170,0,0.1)]",
    titleColor: "text-[#ffaa00]",
  },
  {
    verdict: "Correct",
    icon: "✓",
    label: "CORRECT",
    sub: "verified accurate",
    headCls: "bg-[rgba(0,214,143,0.08)]",
    titleColor: "text-[#00d68f]",
  },
];

export default function ResultsSection({ claims, onReset, resultsRef }: Props) {
  const wrong = claims.filter((c) => c.verdict === "Wrong");
  const uncertain = claims.filter((c) => c.verdict === "Uncertain");
  const correct = claims.filter((c) => c.verdict === "Correct");
  const total = claims.length;

  const tierItems: Record<Verdict, Claim[]> = {
    Wrong: wrong,
    Uncertain: uncertain,
    Correct: correct,
  };

  const summaryItems = [
    {
      label: "Total Claims",
      count: total,
      color: "#f0eeff",
      barColor: "rgba(255,255,255,0.15)",
      pct: "100%",
    },
    {
      label: "Wrong",
      count: wrong.length,
      color: "#ff4444",
      barColor: "rgba(255,68,68,0.5)",
      pct: total ? `${((wrong.length / total) * 100).toFixed(0)}%` : "0%",
    },
    {
      label: "Uncertain",
      count: uncertain.length,
      color: "#ffaa00",
      barColor: "rgba(255,170,0,0.5)",
      pct: total
        ? `${((uncertain.length / total) * 100).toFixed(0)}%`
        : "0%",
    },
    {
      label: "Correct",
      count: correct.length,
      color: "#00d68f",
      barColor: "rgba(0,214,143,0.5)",
      pct: total ? `${((correct.length / total) * 100).toFixed(0)}%` : "0%",
    },
  ];

  return (
    <div
      ref={resultsRef}
      className="relative z-[1] max-w-[1100px] mx-auto px-10 py-10 pb-20 flex flex-col gap-8"
    >
      {/* Top action row */}
      <div className="flex items-center animate-fade-in">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-white/[0.06] border border-white/[0.12] font-space text-[10px] uppercase tracking-[0.1em] text-[rgba(240,238,255,0.55)] hover:text-[#f0eeff] hover:bg-white/[0.09] hover:border-white/20 transition-all"
        >
          ← New Article
        </button>
      </div>

      {/* Summary grid */}
      <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-2 animate-fade-in">
        {summaryItems.map(({ label, count, color, barColor, pct }) => (
          <div
            key={label}
            className="rounded-2xl px-[22px] py-5 bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] hover:border-white/20 transition-colors"
          >
            <div className="font-space text-[9px] uppercase tracking-[0.15em] text-[rgba(240,238,255,0.3)] mb-2">
              {label}
            </div>
            <div
              className="font-bebas text-[44px] leading-none"
              style={{ color }}
            >
              {count}
            </div>
            <div className="h-[2px] bg-white/[0.08] rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: pct, background: barColor }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tier blocks */}
      {total === 0 ? (
        <p className="text-center text-[rgba(240,238,255,0.3)] py-16 font-space text-[13px]">
          No factual claims found in this article.
        </p>
      ) : (
        <div className="flex flex-col gap-5 animate-fade-in">
          {tiers.map(({ verdict, icon, label, sub, headCls, titleColor }) => {
            const items = tierItems[verdict];
            return (
              <div
                key={verdict}
                className="rounded-[20px] overflow-hidden bg-white/[0.06] backdrop-blur-xl border border-white/[0.12]"
              >
                <div
                  className={`flex items-center gap-3.5 px-6 py-4 border-b border-white/[0.12] ${headCls}`}
                >
                  <span className="text-base">{icon}</span>
                  <span
                    className={`font-bebas text-[20px] tracking-[2px] ${titleColor}`}
                  >
                    {label}
                  </span>
                  <span className="ml-auto font-space text-[10px] text-[rgba(240,238,255,0.3)] tracking-[0.1em]">
                    {items.length} claim{items.length !== 1 ? "s" : ""} · {sub}
                  </span>
                </div>
                <div className="flex flex-col">
                  {items.length === 0 ? (
                    <div className="px-6 py-7 font-space text-[11px] text-[rgba(240,238,255,0.3)] italic">
                      No {verdict.toLowerCase()} claims detected.
                    </div>
                  ) : (
                    items.map((c, i) => (
                      <ClaimCard key={i} claim={c} index={i} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
