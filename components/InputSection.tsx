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

export default function InputSection({ onSubmit, isLoading, error }: Props) {
  const [mode, setMode] = useState<"url" | "text">("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const canSubmit =
    mode === "url" ? url.trim().length > 0 : text.trim().length > 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || isLoading) return;
    if (mode === "url") {
      onSubmit({ type: "url", url: url.trim() });
    } else {
      onSubmit({ type: "text", text: text.trim() });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Mode toggle */}
      <div className="flex gap-1 p-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg self-start">
        {(["url", "text"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === m
                ? "bg-[#6b7aff] text-white"
                : "text-[#aaa] hover:text-white"
            }`}
          >
            {m === "url" ? "URL" : "Paste text"}
          </button>
        ))}
      </div>

      {mode === "url" ? (
        <input
          type="url"
          placeholder="https://example.com/article"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[15px] text-[#e8e8e8] px-4 py-3 outline-none focus:border-[#6b7aff] transition-colors placeholder:text-[#555] disabled:opacity-50"
        />
      ) : (
        <textarea
          placeholder="Paste your article here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          className="w-full min-h-[280px] bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[15px] text-[#e8e8e8] px-4 py-4 outline-none focus:border-[#6b7aff] transition-colors placeholder:text-[#555] resize-y leading-relaxed disabled:opacity-50"
        />
      )}

      {error && (
        <div className="bg-[#1e0e0e] border border-[#4a1a1a] rounded-xl px-5 py-4 text-[#f87171] text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit || isLoading}
        className="mt-1 w-full py-3.5 bg-[#6b7aff] hover:bg-[#5a68ff] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[15px] rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Verifying claims…
          </>
        ) : (
          "Check Facts"
        )}
      </button>
    </form>
  );
}
