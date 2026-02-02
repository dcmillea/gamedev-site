import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { order } = (await req.json()) as { order?: string[] };

    if(!Array.isArray(order)) {
        return NextResponse.json({ ok: false, error: "Invalid payload, I said so."}, { status: 400 })
    }

    const expected = (process.env.MS_PUZZLE_ORDER || "").split(",").map((s) => s.trim()).filter(Boolean);

    if(!expected.length) {
        return NextResponse.json({ ok: false, error: "Puzzle not configured, I said so." }, { status: 500 });
    }

    const normalized = order.map((s) => String(s).trim());
    const ok = normalized.length === expected.length && normalized.every((v, i) => v === expected[i]);

    if(!ok) return NextResponse.json({ ok: false }, { status: 200 });

    const password = process.env.MS_PUZZLE_PASSWORD;

    if(!password) {
        return NextResponse.json({ ok: false, error: "Password not configured, I said so." }, { status: 500 });
    }
    
    return NextResponse.json({ ok: true, password }, { status: 200 });
}