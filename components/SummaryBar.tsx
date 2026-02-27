import type { Claim } from "@/lib/types";

function Pill({
  dotClass,
  count,
  label,
}: {
  dotClass: string;
  count: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-1.5 text-[13px] font-medium">
      <span className={`w-2 h-2 rounded-full ${dotClass}`} />
      <span className="font-bold text-[15px]">{count}</span>
      <span className="text-[#aaa]">{label}</span>
    </div>
  );
}

export default function SummaryBar({ claims }: { claims: Claim[] }) {
  const wrong = claims.filter((c) => c.verdict === "Wrong").length;
  const uncertain = claims.filter((c) => c.verdict === "Uncertain").length;
  const correct = claims.filter((c) => c.verdict === "Correct").length;

  return (
    <div className="flex flex-wrap gap-2.5">
      <Pill dotClass="bg-[#888]" count={claims.length} label="total" />
      <Pill dotClass="bg-red-400" count={wrong} label="wrong" />
      <Pill dotClass="bg-amber-400" count={uncertain} label="uncertain" />
      <Pill dotClass="bg-green-400" count={correct} label="correct" />
    </div>
  );
}
