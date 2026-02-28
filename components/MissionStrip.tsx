export default function MissionStrip() {
  const pills = [
    {
      cls: "text-[#ff4444] border-[rgba(255,68,68,0.4)] bg-[rgba(255,68,68,0.1)]",
      dot: "bg-[#ff4444]",
      label: "False",
      sub: "→ debunked",
    },
    {
      cls: "text-[#ffaa00] border-[rgba(255,170,0,0.4)] bg-[rgba(255,170,0,0.1)]",
      dot: "bg-[#ffaa00]",
      label: "Uncertain",
      sub: "→ flagged",
    },
    {
      cls: "text-[#00d68f] border-[rgba(0,214,143,0.4)] bg-[rgba(0,214,143,0.08)]",
      dot: "bg-[#00d68f]",
      label: "Correct",
      sub: "→ verified",
    },
  ];

  return (
    <div className="relative z-[1] grid grid-cols-[1fr_auto] border-b border-white/[0.07] overflow-hidden max-md:grid-cols-1">
      {/* Left — value prop */}
      <div className="relative flex items-center gap-4 px-9 py-[18px] bg-gradient-to-r from-[rgba(108,71,255,0.22)] to-[rgba(108,71,255,0.06)] border-r border-white/[0.07] overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#6c47ff] to-[#9b6dff] shadow-[0_0_12px_#6c47ff]" />
        <span
          className="text-xl flex-shrink-0"
          style={{ filter: "drop-shadow(0 0 8px rgba(108,71,255,0.8))" }}
        >
          🔬
        </span>
        <p className="font-epilogue text-[13px] font-bold text-[#f0eeff] leading-[1.35] tracking-[0.01em]">
          Paste any article. Every claim gets verified.{" "}
          <span className="bg-gradient-to-r from-[#9b6dff] to-[#6c47ff] bg-clip-text text-transparent">
            Misinformation exposed in seconds.
          </span>
        </p>
      </div>

      {/* Right — verdict key */}
      <div className="flex items-center gap-[10px] px-8 py-[14px] bg-black/20 max-md:hidden">
        {pills.map((p) => (
          <div
            key={p.label}
            className={`flex items-center gap-[6px] px-3 py-[5px] rounded-[20px] border font-space text-[9px] uppercase tracking-[0.1em] whitespace-nowrap ${p.cls}`}
          >
            <div className={`w-[5px] h-[5px] rounded-full ${p.dot}`} />
            {p.label}
            <span className="opacity-40 text-[8px]">{p.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
