"use client";

import { useState, useRef, useEffect } from "react";
import Nav from "@/components/Nav";
import MissionStrip from "@/components/MissionStrip";
import InputSection from "@/components/InputSection";
import ResultsSection from "@/components/ResultsSection";
import LoadingScreen from "@/components/LoadingScreen";
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

  const showError = appState === "error" ? error : null;

  return (
    <>
      <Nav onReset={handleReset} />
      <MissionStrip />

      {appState === "loading" ? (
        <LoadingScreen />
      ) : appState === "results" ? (
        <ResultsSection
          claims={claims}
          onReset={handleReset}
          resultsRef={resultsRef}
        />
      ) : (
        <InputSection
          onSubmit={handleSubmit}
          isLoading={false}
          error={showError}
        />
      )}
    </>
  );
}
