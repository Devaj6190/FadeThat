"use client";

import { useState, useRef, useEffect } from "react";
import InputSection from "@/components/InputSection";
import ResultsSection from "@/components/ResultsSection";
import type { Claim } from "@/lib/types";

type AppState = "idle" | "loading" | "results" | "error";

type InputValue =
  | { type: "url"; url: string }
  | { type: "text"; text: string };

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (appState === "results") {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [appState]);

  async function handleSubmit(input: InputValue) {
    setError(null);
    setAppState("loading");

    try {
      let articleText: string;

      if (input.type === "url") {
        const res = await fetch("/api/fetch-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: input.url }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to fetch URL");
        if (!data.text) throw new Error("No text extracted from URL");
        articleText = data.text;
      } else {
        articleText = input.text;
      }

      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: articleText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to check facts");
      if (!data.claims) throw new Error("No claims returned");

      setClaims(data.claims);
      setAppState("results");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
      setAppState("error");
    }
  }

  function handleReset() {
    setAppState("idle");
    setClaims([]);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isLoading = appState === "loading";
  const showError = appState === "error" ? error : null;

  return (
    <main className="max-w-[760px] mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-[28px] font-bold tracking-[-0.5px]">
          Fade<span className="text-[#6b7aff]">That</span>
        </h1>
        <p className="mt-1.5 text-[#888] text-[14px]">
          Paste an article or URL and we&apos;ll rank every claim by how wrong it is.
        </p>
      </header>

      <InputSection
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={showError}
      />

      {appState === "results" && (
        <ResultsSection
          claims={claims}
          onReset={handleReset}
          resultsRef={resultsRef}
        />
      )}
    </main>
  );
}
