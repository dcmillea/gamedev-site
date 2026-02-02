import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, verifyUnlockCookie } from "@/lib/unlock";

export const config = {
  matcher: ["/youfigureditout/:path*"], // adjust if needed
};

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;

  const ok = await verifyUnlockCookie(cookie);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/codenameSecretPage6552471";
  url.searchParams.set("locked", "1");
  return NextResponse.redirect(url);
}
