import { NextRequest, NextResponse } from "next/server";
import { checkFacts, sortClaims } from "@/lib/checkFacts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body?.text;
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const claims = await checkFacts(text);
    const sorted = sortClaims(claims);
    return NextResponse.json({ claims: sorted });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
