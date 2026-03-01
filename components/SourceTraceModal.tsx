"use client";

import { useEffect, useState } from "react";
import type { Claim } from "@/lib/types";

interface Props {
  claims: Claim[];
  isOpen: boolean;
  onClose: () => void;
}

type SourceResult = {
  status: "idle" | "loading" | "success" | "error";
  passage?: string;
  error?: string;
  errorType?: "paywall" | "dead_link" | "extraction_failed" | "fetch_error";
};

const ERROR_ICONS: Record<string, string> = {
  paywall: "🔒",
  dead_link: "🔗",
  extraction_failed: "📄",
  fetch_error: "⚠",
};

function Skeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse p-8">
      <div className="h-3.5 bg-white/[0.07] rounded w-full" />
      <div className="h-3.5 bg-white/[0.07] rounded w-[88%]" />
      <div className="h-3.5 bg-white/[0.07] rounded w-[72%]" />
      <div className="h-3.5 bg-white/[0.07] rounded w-[80%] mt-2" />
      <div className="h-3.5 bg-white/[0.07] rounded w-[65%]" />
    </div>
  );
}

export default function SourceTraceModal({ claims, isOpen, onClose }: Props) {
  const sourcedClaims = claims.filter((c) => c.source !== null);
  const [selected, setSelected] = useState(0);
  const [results, setResults] = useState<Record<number, SourceResult>>({});
  const [iframeLoading, setIframeLoading] = useState(true);

  // Reset selected index and iframe state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelected(0);
      setIframeLoading(true);
    }
  }, [isOpen]);

  // Reset iframe loading indicator on selection change
  useEffect(() => {
    setIframeLoading(true);
  }, [selected]);

  // Fetch Claude knowledge for named-only sources (no URL), lazily on selection
  useEffect(() => {
    if (!isOpen) return;
    const claim = sourcedClaims[selected];
    if (!claim?.source || claim.source.url) return; // URL sources use iframe — no fetch needed
    if (results[selected]) return; // already fetched or in progress

    setResults((prev) => ({ ...prev, [selected]: { status: "loading" } }));

    fetch("/api/fetch-source", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        claimText: claim.claim,
        sourceName: claim.source.name,
        sourceUrl: null,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setResults((prev) => ({
            ...prev,
            [selected]: { status: "error", error: data.error, errorType: data.errorType },
          }));
        } else {
          setResults((prev) => ({
            ...prev,
            [selected]: { status: "success", passage: data.passage },
          }));
        }
      })
      .catch(() => {
        setResults((prev) => ({
          ...prev,
          [selected]: { status: "error", error: "Network error", errorType: "fetch_error" },
        }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeClaim = sourcedClaims[selected];
  const activeResult = results[selected] ?? { status: "idle" };
  const hasUrl = !!activeClaim?.source?.url;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[1200px] h-[88vh] rounded-2xl bg-[#06050f] border border-white/[0.12] overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-b border-white/[0.10] bg-white/[0.03]">
          <div className="flex items-center gap-4">
            <span className="font-bebas text-[22px] tracking-[3px] text-[#f0eeff]">
              SOURCE TRACE
            </span>
            <span className="font-space text-[10px] uppercase tracking-[0.1em] text-[rgba(240,238,255,0.3)]">
              {sourcedClaims.length} source{sourcedClaims.length !== 1 ? "s" : ""} found
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[rgba(240,238,255,0.4)] hover:text-[#f0eeff] hover:bg-white/[0.06] transition-all font-space text-[13px]"
          >
            ✕
          </button>
        </div>

        {sourcedClaims.length === 0 ? (
          <div className="flex-1 flex items-center justify-center font-space text-[12px] text-[rgba(240,238,255,0.3)]">
            No sourced claims to display.
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">

            {/* ── Left panel: scrollable claim list ── */}
            <div className="w-[340px] flex-shrink-0 overflow-y-auto border-r border-white/[0.08] divide-y divide-white/[0.05]">
              {sourcedClaims.map((claim, i) => {
                const isActive = i === selected;
                return (
                  <div
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`relative px-6 py-5 cursor-pointer transition-all ${
                      isActive
                        ? "bg-[rgba(108,71,255,0.1)]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#6c47ff] to-[#9b6dff]" />
                    )}

                    <div className="font-space text-[9px] uppercase tracking-[0.15em] text-[rgba(240,238,255,0.3)] mb-2">
                      Claim {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-[13px] leading-[1.55] text-[rgba(240,238,255,0.8)] mb-3 line-clamp-3">
                      {claim.source!.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full bg-white/[0.05] border border-white/[0.09] font-space text-[9px] text-[rgba(240,238,255,0.4)]">
                      {claim.source!.url ? "🔗" : "○"} {claim.source!.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right panel: source view ── */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* Panel header */}
              <div className="flex-shrink-0 flex items-center justify-between px-7 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <span className="font-space text-[9px] uppercase tracking-[0.15em] text-[rgba(240,238,255,0.3)]">
                    {hasUrl ? "Source Article" : "Source Says"}
                  </span>
                  {hasUrl && (
                    <span className="font-space text-[9px] text-[rgba(240,238,255,0.2)]">
                      · {activeClaim.source!.name}
                    </span>
                  )}
                </div>
                {hasUrl && activeClaim.source!.url && (
                  <a
                    href={activeClaim.source!.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-space text-[9px] uppercase tracking-[0.1em] text-[rgba(108,71,255,0.7)] hover:text-[#9b6dff] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open ↗
                  </a>
                )}
              </div>

              {/* Panel body */}
              <div className="flex-1 overflow-hidden relative">

                {/* URL source — iframe */}
                {hasUrl && activeClaim.source!.url && (
                  <>
                    {iframeLoading && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#06050f]">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white/20 border-t-[#9b6dff] rounded-full animate-spin" />
                          <span className="font-space text-[10px] uppercase tracking-[0.1em] text-[rgba(240,238,255,0.3)]">
                            Loading source…
                          </span>
                        </div>
                      </div>
                    )}
                    <iframe
                      key={activeClaim.source!.url}
                      src={activeClaim.source!.url}
                      className="w-full h-full border-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      onLoad={() => setIframeLoading(false)}
                    />
                  </>
                )}

                {/* Named-only source — Claude knowledge */}
                {!hasUrl && (
                  <div className="h-full overflow-y-auto">
                    {(activeResult.status === "idle" || activeResult.status === "loading") && (
                      <Skeleton />
                    )}
                    {activeResult.status === "success" && (
                      <div className="px-8 py-7">
                        <p className="text-[15px] leading-[1.8] text-[rgba(240,238,255,0.8)]">
                          {activeResult.passage}
                        </p>
                        <div className="mt-5 font-space text-[9px] uppercase tracking-[0.1em] text-[rgba(240,238,255,0.25)]">
                          From Claude&apos;s knowledge · no URL available for this source
                        </div>
                      </div>
                    )}
                    {activeResult.status === "error" && (
                      <div className="px-8 py-7 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-[rgba(240,238,255,0.4)]">
                          <span className="text-[18px]">
                            {ERROR_ICONS[activeResult.errorType ?? "fetch_error"]}
                          </span>
                          <span className="font-space text-[10px] uppercase tracking-[0.1em]">
                            {activeResult.errorType === "paywall"
                              ? "Behind a paywall"
                              : activeResult.errorType === "dead_link"
                              ? "Link is broken or unreachable"
                              : "Could not load source"}
                          </span>
                        </div>
                        <p className="font-space text-[11px] text-[rgba(240,238,255,0.3)] leading-[1.6]">
                          {activeResult.error}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* iframe note */}
              {hasUrl && (
                <div className="flex-shrink-0 px-7 py-2 border-t border-white/[0.06] bg-white/[0.01]">
                  <span className="font-space text-[9px] text-[rgba(240,238,255,0.2)] tracking-[0.04em]">
                    Some sites block embedding — use Open ↗ if the page doesn&apos;t load
                  </span>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
