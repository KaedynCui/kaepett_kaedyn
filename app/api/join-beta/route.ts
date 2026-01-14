import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const scriptUrl = process.env.GS_JOIN_BETA_URL;
    if (!scriptUrl) {
      return NextResponse.json(
        { success: false, error: "Missing GS_JOIN_BETA_URL" },
        { status: 500 }
      );
    }

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Apps Script did not return JSON",
          raw: text.slice(0, 300),
        },
        { status: 502 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
