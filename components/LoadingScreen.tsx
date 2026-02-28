"use client";

import { useState, useEffect } from "react";

const STEPS = [
  "Parsing article structure",
  "Extracting factual claims",
  "Cross-referencing knowledge base",
  "Evaluating claim accuracy",
  "Ranking results by severity",
];

export default function LoadingScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setStep(i + 1), 800 + i * 850)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center gap-8 p-10 relative z-[1]">
      <div className="w-full max-w-[440px] rounded-3xl bg-white/[0.055] backdrop-blur-[40px] border border-white/[0.12] shadow-[0_32px_80px_rgba(0,0,0,0.5)] flex flex-col gap-7 items-center text-center p-12">
        {/* Logo */}
        <div className="font-bebas text-[40px] tracking-[3px] text-[#f0eeff]">
          Fade
          <span className="font-instrument italic text-[#9b6dff]">That</span>
        </div>

        {/* Title */}
        <div>
          <div className="font-bebas text-[28px] tracking-[2px] mb-2 text-[#f0eeff]">
            Analyzing Article
          </div>
          <p className="text-[13px] text-[rgba(240,238,255,0.55)] leading-relaxed">
            Extracting and verifying every factual claim…
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] bg-white/[0.08] rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#6c47ff] to-[#9b6dff] shadow-[0_0_8px_#6c47ff] animate-progress-bar" />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-1.5 w-full">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 font-space text-[10px] uppercase tracking-[0.08em] py-1 transition-colors ${
                i < step
                  ? "text-[#00d68f]"
                  : i === step
                  ? "text-[#9b6dff]"
                  : "text-[rgba(240,238,255,0.3)]"
              }`}
            >
              <span className="w-3.5 text-center text-[11px]">
                {i < step ? "✓" : i === step ? "→" : "·"}
              </span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
