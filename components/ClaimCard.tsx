import type { Claim, Verdict } from "@/lib/types";

const verdictMap: Record<
  Verdict,
  { quoteBorder: string; pillCls: string; label: string; prefix: string }
> = {
  Wrong: {
    quoteBorder: "border-[#ff4444]",
    pillCls:
      "text-[#ff4444] border-[rgba(255,68,68,0.35)] bg-[rgba(255,68,68,0.08)]",
    label: "⬤ False",
    prefix: "Why it's wrong: ",
  },
  Uncertain: {
    quoteBorder: "border-[#ffaa00]",
    pillCls:
      "text-[#ffaa00] border-[rgba(255,170,0,0.35)] bg-[rgba(255,170,0,0.08)]",
    label: "◉ Uncertain",
    prefix: "Why it's uncertain: ",
  },
  Correct: {
    quoteBorder: "border-[#00d68f]",
    pillCls:
      "text-[#00d68f] border-[rgba(0,214,143,0.35)] bg-[rgba(0,214,143,0.08)]",
    label: "✓ Verified",
    prefix: "Why it checks out: ",
  },
};

export default function ClaimCard({
  claim,
  index,
}: {
  claim: Claim;
  index: number;
}) {
  const { quoteBorder, pillCls, label, prefix } = verdictMap[claim.verdict];
  const src = claim.source;

  return (
    <div className="px-6 py-5 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors">
      <div className="font-space text-[9px] uppercase tracking-[0.15em] text-[rgba(240,238,255,0.3)] mb-2">
        Claim {String(index + 1).padStart(2, "0")}
      </div>
      <p
        className={`text-[15px] leading-[1.65] mb-2.5 text-[#f0eeff] pl-3.5 border-l-2 ${quoteBorder}`}
      >
        &ldquo;{claim.claim}&rdquo;
      </p>
      <div
        className={`inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-[20px] border font-space text-[9px] uppercase tracking-[0.1em] mb-2 ${pillCls}`}
      >
        {label}
      </div>
      <p className="text-[13px] leading-[1.7] text-[rgba(240,238,255,0.55)]">
        <strong className="text-[#f0eeff] font-semibold">{prefix}</strong>
        {claim.reason}
      </p>

      {/* Source link */}
      {src && (
        <div className="mt-3 flex items-center gap-2">
          {src.url ? (
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full bg-white/[0.05] border border-white/[0.10] font-space text-[9px] text-[rgba(240,238,255,0.45)] hover:text-[#9b6dff] hover:border-[rgba(108,71,255,0.4)] hover:bg-[rgba(108,71,255,0.08)] transition-all"
            >
              🔗 {src.name} ↗
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full bg-white/[0.04] border border-white/[0.08] font-space text-[9px] text-[rgba(240,238,255,0.3)]">
              ○ {src.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
