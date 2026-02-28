"use client";

export default function Nav({ onReset }: { onReset: () => void }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 h-16 bg-[rgba(6,5,15,0.7)] backdrop-blur-2xl border-b border-white/[0.12]">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer select-none"
        onClick={onReset}
      >
        <span className="font-bebas text-[26px] tracking-[4px] text-[#f0eeff]">
          Fade
        </span>
        <span className="font-instrument italic text-[24px] text-[#9b6dff] relative top-[1px] ml-[1px]">
          That
        </span>
        <div className="w-[5px] h-[5px] rounded-full bg-[#6c47ff] ml-[5px] mb-3 flex-shrink-0 animate-dotpulse shadow-[0_0_8px_#6c47ff]" />
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1">
        {["Analyzer", "Research DB", "Evidence Map"].map((label) => (
          <button
            key={label}
            className={`px-4 py-[7px] font-space text-[10px] uppercase tracking-[0.1em] rounded-md transition-all bg-transparent border-none ${
              label === "Analyzer"
                ? "text-[#f0eeff]"
                : "text-[rgba(240,238,255,0.3)] hover:text-[#f0eeff] hover:bg-white/[0.06]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
