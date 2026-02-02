import { NextResponse } from "next/server";
import { COOKIE_NAME, mintUnlockCookiePayload, signUnlockPayload, makeUnlockValue } from "@/lib/unlock";

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string };
  if (!password || password !== process.env.MS_PUZZLE_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  const payload = await mintUnlockCookiePayload();
  const sig = await signUnlockPayload(payload);
  const value = makeUnlockValue(payload, sig);

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
