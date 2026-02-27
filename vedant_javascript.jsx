import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@1&family=Poppins:wght@700;800;900&family=Space+Mono:wght@400;700&family=Epilogue:wght@300;400;500;600;700;800&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg1: #06050f;
  --bg2: #0d0b20;
  --bg3: #120f2a;
  --accent: #6c47ff;
  --accent2: #9b6dff;
  --red: #ff4444;
  --red-glow: rgba(255,68,68,0.35);
  --amber: #ffaa00;
  --amber-glow: rgba(255,170,0,0.3);
  --green: #00d68f;
  --green-glow: rgba(0,214,143,0.3);
  --glass: rgba(255,255,255,0.06);
  --glass-hover: rgba(255,255,255,0.09);
  --glass-border: rgba(255,255,255,0.12);
  --glass-border-strong: rgba(255,255,255,0.2);
  --text: #f0eeff;
  --text-soft: rgba(240,238,255,0.55);
  --text-muted: rgba(240,238,255,0.3);
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg1);
  color: var(--text);
  font-family: 'Epilogue', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── ANIMATED MESH BACKGROUND ── */
body::before {
  content: '';
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 80% 50% at 20% 20%, rgba(108,71,255,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 60% at 80% 80%, rgba(155,109,255,0.12) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 60% 10%, rgba(0,214,143,0.06) 0%, transparent 50%),
    radial-gradient(ellipse 70% 70% at 10% 80%, rgba(255,68,68,0.06) 0%, transparent 55%);
}

/* subtle grid lines */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 56px 56px;
}

/* ═══════════════════════════════
   GLASS UTILITY
═══════════════════════════════ */
.glass {
  background: var(--glass);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
}

/* ═══════════════════════════════
   NAV
═══════════════════════════════ */
.nav {
  position: sticky; top: 0; z-index: 500;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
  height: 64px;
  background: rgba(6,5,15,0.7);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border-bottom: 1px solid var(--glass-border);
}

.logo {
  display: flex; align-items: center; gap: 0;
  cursor: pointer; user-select: none;
}

.logo-fade {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px; letter-spacing: 4px;
  color: var(--text);
}

.logo-that {
  font-family: 'Instrument Serif', serif;
  font-style: italic; font-size: 24px;
  color: var(--accent2);
  margin-left: 1px; position: relative; top: 1px;
}

.logo-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent);
  margin-left: 5px; margin-bottom: 12px; flex-shrink: 0;
  box-shadow: 0 0 8px var(--accent);
  animation: dotpulse 2.5s ease-in-out infinite;
}
@keyframes dotpulse { 0%,100%{opacity:1;box-shadow:0 0 8px var(--accent)} 50%{opacity:0.4;box-shadow:0 0 3px var(--accent)} }

.nav-links {
  display: flex; align-items: center; gap: 4px;
}

.nav-link {
  padding: 7px 16px;
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-muted); cursor: pointer;
  border-radius: 6px; transition: all 0.2s;
  background: transparent; border: none;
}
.nav-link:hover { color: var(--text); background: var(--glass); }
.nav-link.active { color: var(--text); }

.nav-cta {
  padding: 9px 22px;
  background: var(--accent); color: white; border: none;
  border-radius: 8px; cursor: pointer;
  font-family: 'Epilogue', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.06em;
  box-shadow: 0 0 20px rgba(108,71,255,0.4), 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.2s;
  margin-left: 8px;
}
.nav-cta:hover {
  background: var(--accent2);
  box-shadow: 0 0 28px rgba(108,71,255,0.6), 0 4px 16px rgba(0,0,0,0.3);
  transform: translateY(-1px);
}

/* ═══════════════════════════════
   MISSION STRIP
═══════════════════════════════ */
.mission-strip {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: stretch;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  overflow: hidden;
}

/* Left block — bold claim */
.ms-left {
  padding: 18px 36px;
  display: flex; align-items: center; gap: 16px;
  background: linear-gradient(90deg, rgba(108,71,255,0.22) 0%, rgba(108,71,255,0.06) 100%);
  border-right: 1px solid rgba(255,255,255,0.07);
  position: relative; overflow: hidden;
}
.ms-left::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
  box-shadow: 0 0 12px var(--accent);
}

.ms-left-icon {
  font-size: 20px; flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(108,71,255,0.8));
}

.ms-left-text {
  font-family: 'Epilogue', sans-serif;
  font-size: 13px; font-weight: 700;
  color: var(--text); line-height: 1.35;
  letter-spacing: 0.01em;
}
.ms-left-text em {
  font-style: normal;
  background: linear-gradient(90deg, var(--accent2), var(--accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Center — verdict key pills */
.ms-center {
  padding: 14px 32px;
  display: flex; align-items: center; gap: 10px;
  border-right: 1px solid rgba(255,255,255,0.07);
  background: rgba(0,0,0,0.2);
}

.ms-pill {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: 20px;
  border: 1px solid;
  font-family: 'Space Mono', monospace; font-size: 9px;
  letter-spacing: 0.1em; text-transform: uppercase;
  white-space: nowrap;
  transition: transform 0.2s;
}
.ms-pill:hover { transform: translateY(-1px); }

.ms-pill-wrong    { color: var(--red);   border-color: rgba(255,68,68,0.4);   background: rgba(255,68,68,0.1);   box-shadow: 0 0 10px rgba(255,68,68,0.15); }
.ms-pill-uncertain{ color: var(--amber); border-color: rgba(255,170,0,0.4);   background: rgba(255,170,0,0.1);   box-shadow: 0 0 10px rgba(255,170,0,0.1); }
.ms-pill-correct  { color: var(--green); border-color: rgba(0,214,143,0.4);   background: rgba(0,214,143,0.08);  box-shadow: 0 0 10px rgba(0,214,143,0.1); }

.ms-pill-dot { width: 5px; height: 5px; border-radius: 50%; }
.ms-pill-wrong    .ms-pill-dot { background: var(--red);   box-shadow: 0 0 5px var(--red); }
.ms-pill-uncertain .ms-pill-dot{ background: var(--amber); box-shadow: 0 0 5px var(--amber); }
.ms-pill-correct  .ms-pill-dot { background: var(--green); box-shadow: 0 0 5px var(--green); }

.ms-pill-arrow { opacity: 0.4; font-size: 8px; }

/* Right block — stat counters */
.ms-right {
  padding: 14px 36px;
  display: flex; align-items: center; justify-content: flex-end; gap: 28px;
  background: linear-gradient(270deg, rgba(0,214,143,0.06) 0%, transparent 70%);
  position: relative; overflow: hidden;
}
.ms-right::after {
  content: '';
  position: absolute; right: 0; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(180deg, var(--green), transparent);
  box-shadow: -4px 0 12px rgba(0,214,143,0.2);
}

.ms-stat {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
}
.ms-stat-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 22px; line-height: 1;
  color: var(--text);
}
.ms-stat-lbl {
  font-family: 'Space Mono', monospace; font-size: 8px;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-muted);
}
.ms-stat-sep { width: 1px; height: 28px; background: rgba(255,255,255,0.07); }

@media(max-width:900px) {
  .mission-strip { grid-template-columns: 1fr; }
  .ms-center, .ms-right { display: none; }
}

/* ═══════════════════════════════
   MAIN LAYOUT
═══════════════════════════════ */
.page { position: relative; z-index: 1; }

/* ═══════════════════════════════
   INPUT SCREEN
═══════════════════════════════ */
.input-screen {
  min-height: calc(100vh - 97px);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 60px 40px 80px;
  gap: 48px;
}

.input-headline {
  text-align: center;
}

.input-eyebrow {
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.25em; text-transform: uppercase;
  color: var(--accent2); margin-bottom: 16px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
}
.input-eyebrow::before, .input-eyebrow::after {
  content: ''; width: 32px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent2));
}
.input-eyebrow::after { transform: scaleX(-1); }

.input-h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  font-size: clamp(72px, 10vw, 130px);
  line-height: 0.95; letter-spacing: -2px;
  margin-bottom: 0;
  color: #ffffff;
}

.input-h1 .word-fade,
.input-h1 .word-the,
.input-h1 .word-lies {
  color: inherit;
  background: none;
  -webkit-text-fill-color: unset;
  -webkit-text-stroke: unset;
  filter: none;
  animation: none;
  display: inline;
}

.input-headline { text-align: center; }

/* ── GLASS INPUT CARD ── */
.input-card {
  width: 100%; max-width: 720px;
  border-radius: 20px;
  background: rgba(255,255,255,0.055);
  backdrop-filter: blur(32px) saturate(160%);
  -webkit-backdrop-filter: blur(32px) saturate(160%);
  border: 1px solid var(--glass-border);
  box-shadow:
    0 0 0 1px rgba(108,71,255,0.1),
    0 24px 64px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.1);
  overflow: hidden;
}

/* Tabs */
.card-tabs {
  display: flex; border-bottom: 1px solid var(--glass-border);
  background: rgba(0,0,0,0.2);
}

.card-tab {
  flex: 1; padding: 14px 16px;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-muted); cursor: pointer;
  background: none; border: none;
  border-right: 1px solid var(--glass-border);
  transition: all 0.2s; position: relative;
}
.card-tab:last-of-type { border-right: none; }
.card-tab:hover:not(.active) { color: var(--text-soft); background: rgba(255,255,255,0.03); }
.card-tab.active {
  color: var(--text);
  background: rgba(108,71,255,0.15);
}
.card-tab.active::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
}
.tab-icon { font-size: 13px; }

/* Textarea */
.card-body { position: relative; }

.card-textarea {
  width: 100%; min-height: 220px;
  padding: 28px 28px 20px;
  font-family: 'Epilogue', sans-serif; font-size: 15px; line-height: 1.8;
  color: var(--text); background: transparent;
  border: none; outline: none; resize: none;
  caret-color: var(--accent2);
}
.card-textarea::placeholder { color: var(--text-muted); font-style: italic; }
.card-textarea::selection { background: rgba(108,71,255,0.25); }

/* Verdict preview chips — inside empty textarea */
.verdict-chips {
  position: absolute; top: 20px; right: 20px;
  display: flex; flex-direction: column; gap: 6px; pointer-events: none;
}
.verdict-chip {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 10px;
  border-radius: 20px;
  font-family: 'Space Mono', monospace; font-size: 9px;
  letter-spacing: 0.1em; text-transform: uppercase;
  background: rgba(255,255,255,0.05);
  border: 1px solid; white-space: nowrap;
  backdrop-filter: blur(8px);
}
.vc-dot { width: 6px; height: 6px; border-radius: 50%; }

/* URL / DOI pane */
.card-url-pane {
  padding: 40px 28px;
  display: flex; flex-direction: column; gap: 16px;
  min-height: 220px; justify-content: center;
}
.url-label {
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted);
}
.url-row {
  display: flex; gap: 0;
  border: 1px solid var(--glass-border);
  border-radius: 10px; overflow: hidden;
  background: rgba(0,0,0,0.25);
  transition: border-color 0.2s;
}
.url-row:focus-within { border-color: rgba(108,71,255,0.5); box-shadow: 0 0 0 3px rgba(108,71,255,0.1); }
.url-input {
  flex: 1; padding: 14px 18px;
  font-family: 'Space Mono', monospace; font-size: 12px;
  color: var(--text); background: transparent; border: none; outline: none;
}
.url-input::placeholder { color: var(--text-muted); font-style: italic; }
.url-go {
  padding: 0 20px;
  background: rgba(108,71,255,0.2); border: none;
  border-left: 1px solid var(--glass-border);
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--accent2); cursor: pointer; transition: all 0.2s;
}
.url-go:hover { background: var(--accent); color: white; }

.url-hint {
  font-family: 'Space Mono', monospace; font-size: 10px;
  color: var(--text-muted); line-height: 1.75; letter-spacing: 0.04em;
}

/* Card footer */
.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px 18px;
  border-top: 1px solid var(--glass-border);
}

.card-meta {
  display: flex; align-items: center; gap: 16px;
  font-family: 'Space Mono', monospace; font-size: 9px;
  letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase;
}
.meta-sep { width: 3px; height: 3px; background: var(--glass-border-strong); border-radius: 50%; }

/* ── TACTILE VERIFY BTN ── */
.btn-verify {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 28px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
  color: white; border: none; border-radius: 10px;
  font-family: 'Epilogue', sans-serif; font-size: 13px; font-weight: 700;
  letter-spacing: 0.06em; cursor: pointer;
  box-shadow:
    0 0 24px rgba(108,71,255,0.45),
    0 4px 0 rgba(60,20,160,0.6),
    0 8px 20px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.2);
  transition: all 0.12s; position: relative; top: 0;
}
.btn-verify:hover {
  transform: translateY(-2px);
  box-shadow:
    0 0 36px rgba(108,71,255,0.6),
    0 6px 0 rgba(60,20,160,0.6),
    0 12px 28px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.25);
}
.btn-verify:active {
  transform: translateY(4px);
  box-shadow:
    0 0 12px rgba(108,71,255,0.3),
    0 0px 0 rgba(60,20,160,0.6),
    0 2px 8px rgba(0,0,0,0.3);
}
.btn-verify:disabled {
  background: rgba(255,255,255,0.07); color: var(--text-muted);
  box-shadow: none; cursor: not-allowed; transform: none;
}

.btn-verify-arrow {
  width: 20px; height: 20px; border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
}

/* ghost secondary button */
.btn-ghost {
  padding: 10px 20px;
  background: var(--glass); color: var(--text-soft);
  border: 1px solid var(--glass-border); border-radius: 8px;
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 3px 0 rgba(0,0,0,0.3);
  display: inline-flex; align-items: center; gap: 6px;
}
.btn-ghost:hover {
  background: var(--glass-hover); color: var(--text);
  border-color: var(--glass-border-strong);
  transform: translateY(-1px);
  box-shadow: 0 4px 0 rgba(0,0,0,0.3);
}
.btn-ghost:active { transform: translateY(3px); box-shadow: none; }

/* ── STATS ROW ── */
.stats-row {
  display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;
}

.stat-chip {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 18px;
  border-radius: 100px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(20px);
}
.stat-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 22px;
  line-height: 1; color: var(--text);
}
.stat-lbl {
  font-family: 'Space Mono', monospace; font-size: 9px;
  color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;
}
.stat-divider { width: 1px; height: 20px; background: var(--glass-border); }

/* ── ERROR ── */
.error-msg {
  background: rgba(255,68,68,0.1); border: 1px solid rgba(255,68,68,0.25);
  border-radius: 10px; padding: 14px 20px;
  font-family: 'Space Mono', monospace; font-size: 11px;
  color: var(--red); line-height: 1.6;
  max-width: 720px; width: 100%;
}

/* ═══════════════════════════════
   LOADING SCREEN
═══════════════════════════════ */
.loading-screen {
  min-height: calc(100vh - 97px);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 32px; padding: 40px;
  position: relative; z-index: 1;
}

.loading-card {
  width: 100%; max-width: 440px;
  padding: 48px 40px;
  border-radius: 24px;
  background: rgba(255,255,255,0.055);
  backdrop-filter: blur(40px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 32px 80px rgba(0,0,0,0.5);
  display: flex; flex-direction: column; gap: 28px; align-items: center;
  text-align: center;
}

.loading-logo { font-family: 'Bebas Neue', sans-serif; font-size: 40px; letter-spacing: 3px; }
.loading-logo em { font-family: 'Instrument Serif', serif; font-style: italic; color: var(--accent2); }

.loading-sub { font-size: 13px; color: var(--text-soft); font-weight: 400; line-height: 1.6; }

.progress-track {
  width: 100%; height: 3px;
  background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden;
}
.progress-fill {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  animation: progress 5s ease forwards;
  box-shadow: 0 0 8px var(--accent);
}
@keyframes progress { 0%{width:0%} 60%{width:70%} 80%{width:84%} 100%{width:94%} }

.loading-steps { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.loading-step {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-muted); transition: color 0.3s; padding: 4px 0;
}
.loading-step.active { color: var(--accent2); }
.loading-step.done   { color: var(--green); }
.step-icon { width: 14px; text-align: center; font-size: 11px; }

/* ═══════════════════════════════
   RESULTS SCREEN
═══════════════════════════════ */
.results-screen {
  position: relative; z-index: 1;
  min-height: calc(100vh - 97px);
  padding: 40px 40px 80px;
  display: flex; flex-direction: column; gap: 32px; max-width: 1100px; margin: 0 auto;
}

/* Summary bar */
.results-summary {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
}

.summary-glass {
  border-radius: 16px; padding: 20px 22px;
  background: var(--glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  transition: border-color 0.2s;
}
.summary-glass:hover { border-color: var(--glass-border-strong); }

.sum-label {
  font-family: 'Space Mono', monospace; font-size: 9px;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted);
  margin-bottom: 8px;
}
.sum-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 44px; line-height: 1;
}
.sum-bar { height: 2px; background: rgba(255,255,255,0.08); border-radius: 1px; margin-top: 10px; overflow: hidden; }
.sum-bar-fill { height: 100%; border-radius: 1px; transition: width 1.2s ease; }

/* New Article button */
.btn-new-article {
  align-self: flex-start;
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: 10px;
  background: var(--glass); color: var(--text-soft);
  border: 1px solid var(--glass-border);
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s;
}
.btn-new-article:hover { color: var(--text); background: var(--glass-hover); border-color: var(--glass-border-strong); }

/* Tier sections */
.tier-sections { display: flex; flex-direction: column; gap: 20px; }

.tier-block {
  border-radius: 20px; overflow: hidden;
  background: var(--glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

.tier-head {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--glass-border);
}
.tier-head-wrong     { background: rgba(255,68,68,0.12); }
.tier-head-uncertain { background: rgba(255,170,0,0.1); }
.tier-head-correct   { background: rgba(0,214,143,0.08); }

.tier-head-icon { font-size: 16px; }

.tier-head-title {
  font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px;
}
.tier-head-wrong     .tier-head-title { color: var(--red); }
.tier-head-uncertain .tier-head-title { color: var(--amber); }
.tier-head-correct   .tier-head-title { color: var(--green); }

.tier-head-count {
  margin-left: auto;
  font-family: 'Space Mono', monospace; font-size: 10px;
  color: var(--text-muted); letter-spacing: 0.1em;
}

/* Claim cards */
.claim-list { display: flex; flex-direction: column; }

.claim-card {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.2s; cursor: pointer;
}
.claim-card:last-child { border-bottom: none; }
.claim-card:hover { background: rgba(255,255,255,0.03); }

.claim-num {
  font-family: 'Space Mono', monospace; font-size: 9px;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted);
  margin-bottom: 8px;
}

.claim-quote {
  font-family: 'Instrument Serif', serif; font-style: italic;
  font-size: 15px; line-height: 1.55; margin-bottom: 10px;
  color: var(--text); padding-left: 14px;
  border-left: 2px solid;
}
.claim-card.wrong     .claim-quote { border-color: var(--red); }
.claim-card.uncertain .claim-quote { border-color: var(--amber); }
.claim-card.correct   .claim-quote { border-color: var(--green); }

.claim-verdict-pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 20px; border: 1px solid;
  font-family: 'Space Mono', monospace; font-size: 9px;
  letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 8px;
}
.vp-wrong     { color: var(--red);   border-color: rgba(255,68,68,0.35);   background: rgba(255,68,68,0.08);   }
.vp-uncertain { color: var(--amber); border-color: rgba(255,170,0,0.35);   background: rgba(255,170,0,0.08);   }
.vp-correct   { color: var(--green); border-color: rgba(0,214,143,0.35);   background: rgba(0,214,143,0.08);   }

.claim-reason {
  font-size: 13px; line-height: 1.7; color: var(--text-soft);
}
.claim-reason strong { color: var(--text); font-weight: 600; }

.empty-tier {
  padding: 28px 24px;
  font-family: 'Space Mono', monospace; font-size: 11px;
  color: var(--text-muted); font-style: italic;
}

/* ── RESULTS BOTTOM ROW ── */
.results-bottom {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
}

.bottom-glass {
  border-radius: 20px; padding: 28px;
  background: var(--glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

.bg-label {
  font-family: 'Space Mono', monospace; font-size: 9px;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted);
  margin-bottom: 18px;
}

/* Donut */
.donut-wrap { display: flex; align-items: center; gap: 24px; }
.donut-legend { display: flex; flex-direction: column; gap: 10px; }
.legend-row {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--text-soft);
}
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.legend-count { margin-left: auto; font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--text); }

/* Credibility score */
.cred-score-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 72px; line-height: 1; margin-bottom: 4px;
}
.cred-score-label { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; }

.export-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 10px;
  background: rgba(108,71,255,0.2); color: var(--accent2);
  border: 1px solid rgba(108,71,255,0.3);
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 0 16px rgba(108,71,255,0.15);
}
.export-btn:hover { background: rgba(108,71,255,0.35); color: white; box-shadow: 0 0 24px rgba(108,71,255,0.3); }

/* animations */
@keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
.fade-up { animation: fadeUp 0.5s ease forwards; }
.d0{animation-delay:0s;opacity:0} .d1{animation-delay:0.08s;opacity:0} .d2{animation-delay:0.16s;opacity:0} .d3{animation-delay:0.24s;opacity:0} .d4{animation-delay:0.32s;opacity:0}

@media(max-width:800px){
  .nav-links { display:none; }
  .input-h1 { font-size: 52px; }
  .results-summary { grid-template-columns: repeat(2,1fr); }
  .results-bottom { grid-template-columns: 1fr; }
  .stats-row { display: none; }
  .verdict-chips { display: none; }
}
`;

// ─── DATA ───────────────────────────────────────────────

const LOADING_STEPS = [
  "Parsing article structure",
  "Extracting factual claims",
  "Cross-referencing knowledge base",
  "Evaluating claim accuracy",
  "Ranking results by severity",
];

const SAMPLE = `A recent study published in the Journal of Nutritional Science claims that drinking 8 glasses of water a day is the scientifically proven minimum for human health, as established by WHO guidelines since 1945. The study also found that the Great Wall of China is visible from space with the naked eye, which researchers say demonstrates the importance of large-scale infrastructure on human perception.

The research team reports that humans only use 10% of their brains at any given time, leaving 90% dormant and potentially untapped. Their paper suggests this finding could revolutionize cognitive enhancement therapies.

The study cites that Mount Everest is the tallest mountain on Earth when measured from sea level, standing at 8,848 meters. The team also noted that lightning never strikes the same place twice.

The paper concludes that eating carrots significantly improves night vision beyond normal human capacity — a claim the authors attribute to World War II British Royal Air Force data.`;

// ─── COMPONENTS ──────────────────────────────────────────
function Logo({ onClick, size = 26 }) {
  return (
    <div className="logo" onClick={onClick}>
      <span className="logo-fade" style={{ fontSize: size }}>Fade</span>
      <span className="logo-that" style={{ fontSize: size - 2 }}>That</span>
      <div className="logo-dot" />
    </div>
  );
}

function MissionStrip() {
  return (
    <div className="mission-strip">
      {/* Left — bold value proposition */}
      <div className="ms-left">
        <div className="ms-left-icon">🔬</div>
        <div className="ms-left-text">
          Paste any article. Every claim gets verified.<br />
          <em>Misinformation exposed in seconds.</em>
        </div>
      </div>

      {/* Center — verdict key */}
      <div className="ms-center">
        <div className="ms-pill ms-pill-wrong">
          <div className="ms-pill-dot" />
          False
          <span className="ms-pill-arrow">→ debunked</span>
        </div>
        <div className="ms-pill ms-pill-uncertain">
          <div className="ms-pill-dot" />
          Uncertain
          <span className="ms-pill-arrow">→ flagged</span>
        </div>
        <div className="ms-pill ms-pill-correct">
          <div className="ms-pill-dot" />
          Correct
          <span className="ms-pill-arrow">→ verified</span>
        </div>
      </div>

      {/* Right — stats */}
      <div className="ms-right">
        <div className="ms-stat">
          <div className="ms-stat-num">2.4M</div>
          <div className="ms-stat-lbl">Scanned</div>
        </div>
        <div className="ms-stat-sep" />
        <div className="ms-stat">
          <div className="ms-stat-num">94%</div>
          <div className="ms-stat-lbl">Accuracy</div>
        </div>
        <div className="ms-stat-sep" />
        <div className="ms-stat">
          <div className="ms-stat-num">387K</div>
          <div className="ms-stat-lbl">Lies caught</div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const ts = LOADING_STEPS.map((_, i) => setTimeout(() => setStep(i + 1), 800 + i * 850));
    return () => ts.forEach(clearTimeout);
  }, []);
  return (
    <div className="loading-screen">
      <div className="loading-card">
        <div className="loading-logo">Fade<em>That</em></div>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:2, marginBottom:8 }}>Analyzing Article</div>
          <div className="loading-sub">Extracting and verifying every factual claim…</div>
        </div>
        <div className="progress-track"><div className="progress-fill" /></div>
        <div className="loading-steps">
          {LOADING_STEPS.map((s, i) => (
            <div key={i} className={`loading-step ${i < step ? "done" : i === step ? "active" : ""}`}>
              <span className="step-icon">{i < step ? "✓" : i === step ? "→" : "·"}</span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClaimCard({ claim, index, tier }) {
  const map = {
    wrong:     { cls:"vp-wrong",     label:"⬤ False",     prefix:"Why it's wrong: " },
    uncertain: { cls:"vp-uncertain", label:"◉ Uncertain",  prefix:"Why it's uncertain: " },
    correct:   { cls:"vp-correct",   label:"✓ Verified",  prefix:"Why it checks out: " },
  };
  const { cls, label, prefix } = map[tier];
  return (
    <div className={`claim-card ${tier} fade-up`} style={{ animationDelay:`${index*0.06}s`, opacity:0 }}>
      <div className="claim-num">Claim {String(index+1).padStart(2,"0")}</div>
      <div className="claim-quote">"{claim.claim}"</div>
      <div className={`claim-verdict-pill ${cls}`}>{label}</div>
      <div className="claim-reason"><strong>{prefix}</strong>{claim.reason}</div>
    </div>
  );
}

function DonutChart({ wrong, uncertain, correct }) {
  const total = wrong + uncertain + correct;
  if (!total) return null;
  const r = 42, cx = 52, cy = 52, circ = 2 * Math.PI * r;
  const wd = circ * (wrong / total);
  const ud = circ * (uncertain / total);
  const cd = circ * (correct / total);
  return (
    <div className="donut-wrap">
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
        {wrong > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--red)" strokeWidth="10" strokeDasharray={`${wd} ${circ}`} strokeDashoffset={0} transform={`rotate(-90 ${cx} ${cy})`} style={{filter:"drop-shadow(0 0 4px rgba(255,68,68,0.6))"}} />}
        {uncertain > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--amber)" strokeWidth="10" strokeDasharray={`${ud} ${circ}`} strokeDashoffset={-wd} transform={`rotate(-90 ${cx} ${cy})`} style={{filter:"drop-shadow(0 0 4px rgba(255,170,0,0.5))"}} />}
        {correct > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--green)" strokeWidth="10" strokeDasharray={`${cd} ${circ}`} strokeDashoffset={-(wd+ud)} transform={`rotate(-90 ${cx} ${cy})`} style={{filter:"drop-shadow(0 0 4px rgba(0,214,143,0.5))"}} />}
        <text x={cx} y={cy-5} textAnchor="middle" fontSize="18" fontFamily="'Bebas Neue',sans-serif" fill="white">{total}</text>
        <text x={cx} y={cy+10} textAnchor="middle" fontSize="7" fontFamily="'Space Mono',monospace" fill="rgba(255,255,255,0.35)" letterSpacing="1">CLAIMS</text>
      </svg>
      <div className="donut-legend">
        {[["var(--red)","Wrong",wrong],["var(--amber)","Uncertain",uncertain],["var(--green)","Correct",correct]].map(([c,l,n])=>(
          <div key={l} className="legend-row">
            <div className="legend-dot" style={{background:c, boxShadow:`0 0 6px ${c}`}} />
            {l}
            <span className="legend-count">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]   = useState("input");
  const [tab, setTab]         = useState("paste");
  const [article, setArticle] = useState("");
  const [url, setUrl]         = useState("");
  const [doi, setDoi]         = useState("");
  const [results, setResults] = useState(null);
  const [error, setError]     = useState(null);

  const wrong     = results?.filter(c => c.verdict === "wrong")     || [];
  const uncertain = results?.filter(c => c.verdict === "uncertain") || [];
  const correct   = results?.filter(c => c.verdict === "correct")   || [];

  const canSubmit = article.trim().length > 0;

  const analyze = async () => {
    const text = tab === "paste" ? article : tab === "url" ? `[Article from URL: ${url}]\n\n${SAMPLE}` : `[Research paper DOI: ${doi}]\n\n${SAMPLE}`;
    setScreen("loading"); setError(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a precise fact-checking engine. Extract every distinct factual claim from the article. For each, decide: "wrong" (factually incorrect), "uncertain" (can't verify, ambiguous, or outside reliable knowledge), or "correct" (verifiably accurate). Return ONLY a valid JSON array with no markdown, no preamble. Schema: [{"claim":"exact quote or close paraphrase","verdict":"wrong"|"uncertain"|"correct","reason":"1-2 sentence explanation"}]. Order: wrong first (most clearly false at top), then uncertain, then correct.`,
          messages: [{ role: "user", content: `Fact-check this article:\n\n${text}` }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResults(parsed); setScreen("results");
    } catch (e) {
      setError("Analysis failed: " + e.message); setScreen("input");
    }
  };

  const reset = () => { setScreen("input"); setResults(null); setError(null); };

  const credScore = results ? Math.round(((correct.length + uncertain.length * 0.5) / results.length) * 100) : 0;
  const credColor = credScore < 35 ? "var(--red)" : credScore < 65 ? "var(--amber)" : "var(--green)";

  return (
    <>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <Logo onClick={reset} />
        <div className="nav-links">
          {["Analyzer","Research DB","Evidence Map","API Docs"].map(l => (
            <button key={l} className={`nav-link ${l==="Analyzer"?"active":""}`}>{l}</button>
          ))}
        </div>
      </nav>

      <MissionStrip />

      <div className="page">

        {/* ════════════ INPUT SCREEN ════════════ */}
        {screen === "input" && (
          <div className="input-screen">

            {/* Headline */}
            <div className="input-headline fade-up d0">
              <div className="input-eyebrow">FactLayer · Misinformation Detection</div>
              <h1 className="input-h1">
                <span className="word-fade">Fade </span>
                <span className="word-the">the </span>
                <span className="word-lies">Lies</span>
              </h1>
            </div>

            {/* Glass input card */}
            <div className="input-card fade-up d1">

              {/* Paste body — no tabs */}
              <div className="card-body">
                {!article && (
                  <div className="verdict-chips">
                    {[
                      ["var(--red)","var(--red-glow)","FALSE","Factually wrong"],
                      ["var(--amber)","var(--amber-glow)","UNCERTAIN","Can't verify"],
                      ["var(--green)","var(--green-glow)","CORRECT","Checks out"],
                    ].map(([c, glow, l, d]) => (
                      <div key={l} className="verdict-chip" style={{ borderColor: c, boxShadow:`0 0 10px ${glow}` }}>
                        <div className="vc-dot" style={{ background:c, boxShadow:`0 0 6px ${c}` }} />
                        <span style={{ color:c, fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.1em", fontWeight:700 }}>{l}</span>
                        <span style={{ color:"var(--text-muted)", fontFamily:"'Space Mono',monospace", fontSize:9 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                )}
                <textarea
                  className="card-textarea"
                  placeholder={"Paste your article, news story, or research paper here…"}
                  value={article}
                  onChange={e => setArticle(e.target.value)}
                  rows={8}
                />
                {article && (
                  <div style={{ padding:"0 28px 12px", fontFamily:"'Space Mono',monospace", fontSize:9, color:"var(--text-muted)", letterSpacing:"0.08em" }}>
                    {article.length.toLocaleString()} characters
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="card-footer">
                <div className="card-meta">
                  <span>Powered by Claude</span>
                  <div className="meta-sep" />
                  <span>No signup needed</span>
                  <div className="meta-sep" />
                  <span>~15 sec</span>
                </div>
                <button className="btn-verify" onClick={analyze} disabled={!canSubmit}>
                  <div className="btn-verify-arrow">→</div>
                  Verify Article
                </button>
              </div>
            </div>

            {error && <div className="error-msg fade-up d2">{error}</div>}

            {/* Stats row */}
            <div className="stats-row fade-up d2">
              {[["2.4M","Articles Scanned"],["94%","Detection Rate"],["387K","Lies Caught"],["12s","Avg Analysis"]].map(([n,l],i) => (
                <div key={i} className="stat-chip">
                  <div>
                    <div className="stat-num">{n}</div>
                    <div className="stat-lbl">{l}</div>
                  </div>
                  {i < 3 && <div className="stat-divider" />}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ════════════ LOADING ════════════ */}
        {screen === "loading" && <LoadingScreen />}

        {/* ════════════ RESULTS ════════════ */}
        {screen === "results" && results && (
          <div className="results-screen">

            {/* Back button */}
            <button className="btn-new-article fade-up d0" onClick={reset}>
              ← New Article
            </button>

            {/* Summary cards */}
            <div className="results-summary fade-up d1">
              {[
                ["Total Claims", results.length, "var(--text)", "rgba(255,255,255,0.15)", "100%"],
                ["Wrong",        wrong.length,    "var(--red)",   "rgba(255,68,68,0.5)",    `${(wrong.length/results.length*100).toFixed(0)}%`],
                ["Uncertain",    uncertain.length,"var(--amber)", "rgba(255,170,0,0.5)",    `${(uncertain.length/results.length*100).toFixed(0)}%`],
                ["Correct",      correct.length,  "var(--green)", "rgba(0,214,143,0.5)",    `${(correct.length/results.length*100).toFixed(0)}%`],
              ].map(([label, num, color, barColor, pct]) => (
                <div key={label} className="summary-glass">
                  <div className="sum-label">{label}</div>
                  <div className="sum-num" style={{ color }}>{num}</div>
                  <div className="sum-bar">
                    <div className="sum-bar-fill" style={{ width: pct, background: barColor }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Tiers */}
            <div className="tier-sections fade-up d2">
              {[
                { tier:"wrong",     items:wrong,     icon:"✕", label:"WRONG",     sub:"factually incorrect" },
                { tier:"uncertain", items:uncertain, icon:"◉", label:"UNCERTAIN", sub:"potentially misleading" },
                { tier:"correct",   items:correct,   icon:"✓", label:"CORRECT",   sub:"verified accurate" },
              ].map(({ tier, items, icon, label, sub }) => (
                <div key={tier} className="tier-block">
                  <div className={`tier-head tier-head-${tier}`}>
                    <span className="tier-head-icon">{icon}</span>
                    <span className="tier-head-title">{label}</span>
                    <span className="tier-head-count">{items.length} claim{items.length !== 1 ? "s" : ""} · {sub}</span>
                  </div>
                  <div className="claim-list">
                    {items.length === 0
                      ? <div className="empty-tier">No {tier} claims detected.</div>
                      : items.map((c, i) => <ClaimCard key={i} claim={c} index={i} tier={tier} />)
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div className="results-bottom fade-up d3">
              <div className="bottom-glass">
                <div className="bg-label">Credibility Breakdown</div>
                <DonutChart wrong={wrong.length} uncertain={uncertain.length} correct={correct.length} />
              </div>
              <div className="bottom-glass">
                <div className="bg-label">Verdict Score</div>
                <div className="cred-score-num" style={{ color: credColor }}>{credScore}%</div>
                <div className="cred-score-label">Article Credibility</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"var(--text-soft)", lineHeight:1.7, marginBottom:20 }}>
                  "Misinformation spreads because verifying facts is too slow — we made it instant."
                </div>
                <button className="export-btn">↗ Export Report</button>
              </div>
            </div>

          </div>
        )}

      </div>
    </>
  );
}
