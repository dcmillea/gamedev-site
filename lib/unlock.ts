// lib/unlock.ts
const COOKIE_NAME = "ms_unlock";

// Simple helpers
function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSHA256Hex(secret: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(sig);
}

export function makeUnlockValue(payload: string, sigHex: string) {
  // cookie format: payload.sig
  return `${payload}.${sigHex}`;
}

export function parseUnlockValue(value: string | undefined | null) {
  if (!value) return null;
  const idx = value.lastIndexOf(".");
  if (idx <= 0) return null;
  const payload = value.slice(0, idx);
  const sig = value.slice(idx + 1);
  if (!payload || !sig) return null;
  return { payload, sig };
}

export async function verifyUnlockCookie(value: string | undefined | null) {
  const parsed = parseUnlockValue(value);
  if (!parsed) return false;

  const secret = process.env.MS_COOKIE_SECRET || "";
  if (!secret) return false;

  const expected = await hmacSHA256Hex(secret, parsed.payload);

  // constant-time compare
  if (expected.length !== parsed.sig.length) return false;
  let ok = 0;
  for (let i = 0; i < expected.length; i++) {
    ok |= expected.charCodeAt(i) ^ parsed.sig.charCodeAt(i);
  }
  return ok === 0;
}

export async function mintUnlockCookiePayload() {
  // Keep it simple: timestamp + random
  const ts = Date.now().toString();
  const rand = crypto.getRandomValues(new Uint8Array(16));
  const nonce = Array.from(rand).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${ts}:${nonce}`;
}

export async function signUnlockPayload(payload: string) {
  const secret = process.env.MS_COOKIE_SECRET || "";
  if (!secret) throw new Error("MS_COOKIE_SECRET missing");
  return hmacSHA256Hex(secret, payload);
}

export { COOKIE_NAME };
