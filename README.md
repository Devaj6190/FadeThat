# FadeThat

AI-powered instant fact-checking web app that extracts and evaluates factual claims from any article in under 10 seconds.

## 🚀 Problem

Misinformation spreads online not because people want to believe false information — but because verifying claims is too slow.

Most articles contain dozens of statistics and factual assertions. Cross-checking even one claim can take hours. As a result, readers trust and share information without verification.

FadeThat removes that friction entirely.

---

## ⚡ What It Does

Paste any article into the app and receive:

- A prioritized list of factual claims extracted from the text
- Verdicts for each claim: **Wrong**, **Uncertain**, or **Correct**
- A one-line explanation for every verdict
- A summary bar showing total claim breakdown by credibility

Claims are automatically ranked from most incorrect to most accurate, so dangerous misinformation appears first.

The entire flow completes in under 10 seconds.

---

## 🧠 How It Works

1. User pastes article text into the input screen
2. Text is sent directly to the Claude API
3. A structured prompt instructs the model to:
   - Identify every factual claim (statistics, named assertions, quoted data)
   - Evaluate each claim
   - Return a structured JSON array
4. Frontend sorts results by verdict priority
5. Claims are rendered in grouped sections

Each claim object includes:
- `claim` (exact verbatim quote)
- `verdict` (Wrong / Uncertain / Correct)
- `reason` (one-sentence explanation)

The app is fully stateless.

No backend.  
No database.  
No authentication.  
Just paste → submit → results.

---

## 🛠 Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Claude API**
- **Vercel (deployment)**

---

## 🏗 Architecture

- Stateless frontend-only architecture
- API request made directly from frontend
- Structured prompt engineering for deterministic JSON output
- Client-side sorting logic for verdict prioritization
- Minimal two-screen UX for maximum speed

---

## 🎯 Design Philosophy

- Extreme simplicity
- Zero friction
- No distractions
- Fast MVP execution
- Information prioritized by risk level

---

## ⏱ Built In

From idea to live deployment in **3 hours** through rapid prototyping and focused architectural decisions.

---

## 🔮 Future Improvements

- URL input (no copy-paste required)
- Real-time web scraping for source validation
- Citation links for each verdict
- Confidence scores per claim
- Inline article highlighting
- Side-by-side source viewer
- Political bias detection
- Emotional language analysis
- Browser extension
- Saved history & exportable reports

---

## 👨‍💻 Authors

Built by:
- Devaj Solanki
- Vedant Shirvi
- Varnika Yadav

---

## 📌 Why This Matters

FadeThat demonstrates how structured prompt engineering and thoughtful UX design can dramatically reduce the cost of truth verification.

It transforms fact-checking from a multi-hour task into a 10-second workflow.
