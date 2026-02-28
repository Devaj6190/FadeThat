"use client";

import { useState, type FormEvent } from "react";

type InputValue =
  | { type: "url"; url: string }
  | { type: "text"; text: string };

interface Props {
  onSubmit: (input: InputValue) => void;
  isLoading: boolean;
  error: string | null;
}

function isUrl(s: string) {
  return /^https?:\/\//i.test(s.trim());
}

export default function InputSection({ onSubmit, isLoading, error }: Props) {
  const [value, setValue] = useState("");

  const canSubmit = value.trim().length > 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || isLoading) return;
    const trimmed = value.trim();
    if (isUrl(trimmed)) {
      onSubmit({ type: "url", url: trimmed });
    } else {
      onSubmit({ type: "text", text: trimmed });
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-10 py-16 gap-12 relative z-[1]">
      {/* Headline */}
      <div className="text-center animate-fade-up">
        <div className="flex items-center justify-center gap-2.5 font-space text-[10px] uppercase tracking-[0.25em] text-[#9b6dff] mb-4">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#9b6dff]" />
          FadeThat · Misinformation Detection
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#9b6dff]" />
        </div>
        <h1 className="font-poppins font-black text-[clamp(56px,10vw,110px)] leading-[0.95] tracking-[-2px] text-white">
          Fade the Lies
        </h1>
      </div>

      {/* Glass input card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[720px] rounded-[20px] bg-white/[0.055] backdrop-blur-[32px] border border-white/[0.12] shadow-[0_0_0_1px_rgba(108,71,255,0.1),0_24px_64px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
      >
        {/* Textarea */}
        <textarea
          placeholder="Paste an article or drop a URL…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
          rows={8}
          className="w-full px-7 pt-7 pb-5 font-epilogue text-[15px] leading-[1.8] text-[#f0eeff] bg-transparent border-none outline-none resize-none caret-[#9b6dff] placeholder:text-[rgba(240,238,255,0.3)] placeholder:italic disabled:opacity-50"
        />
        {value && (
          <div className="px-7 pb-3 font-space text-[9px] text-[rgba(240,238,255,0.3)] tracking-[0.08em]">
            {isUrl(value)
              ? "URL detected — will fetch article"
              : `${value.length.toLocaleString()} characters`}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mx-7 mb-4 bg-[rgba(255,68,68,0.1)] border border-[rgba(255,68,68,0.25)] rounded-[10px] px-5 py-[14px] font-space text-[11px] text-[#ff4444] leading-[1.6]">
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pt-[14px] pb-[18px] border-t border-white/[0.12]">
          <div className="flex items-center gap-4 font-space text-[9px] uppercase tracking-[0.1em] text-[rgba(240,238,255,0.3)]">
            <span>No signup needed</span>
            <div className="w-[3px] h-[3px] bg-white/20 rounded-full" />
            <span>~15 sec</span>
          </div>
          <button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="flex items-center gap-2.5 px-7 py-3 bg-gradient-to-br from-[#6c47ff] to-[#9b6dff] text-white border-none rounded-[10px] font-epilogue text-[13px] font-bold tracking-[0.06em] shadow-[0_0_24px_rgba(108,71,255,0.45),0_4px_0_rgba(60,20,160,0.6),0_8px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(108,71,255,0.6),0_6px_0_rgba(60,20,160,0.6),0_12px_28px_rgba(0,0,0,0.4)] active:translate-y-1 active:shadow-[0_0_12px_rgba(108,71,255,0.3)] disabled:bg-none disabled:bg-white/[0.07] disabled:text-[rgba(240,238,255,0.3)] disabled:shadow-none disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying…
              </>
            ) : (
              <>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">
                  →
                </span>
                Verify Article
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
