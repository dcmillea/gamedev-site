// app/api/solve-n/route.ts
import { NextResponse } from "next/server"
import { N_PATH, REQUIRED_PLACEMENTS, type GlyphId } from "@/lib/nambesh-puzzle"

type Placement = { tile: number; imageId: string }

export async function POST(req: Request) {
  const body = (await req.json()) as { placements?: Placement[] }

  if (!Array.isArray(body.placements)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }

  // Build tile -> imageId map (last write wins)
  const userMap = new Map<number, string>()
  for (const p of body.placements) {
    const tile = Number(p.tile)
    const id = String(p.imageId || "").trim()
    if (!Number.isFinite(tile) || tile < 0 || tile > 24) continue
    if (!id) continue
    userMap.set(tile, id)
  }

  // Count how many of the 13 canonical N tiles are correct (exact match)
  let correctCount = 0
  for (const tile of N_PATH) {
    const expected = REQUIRED_PLACEMENTS[tile] as GlyphId
    const actual = userMap.get(tile)
    if (actual === expected) correctCount++
  }

  // Require all 13 N tiles to be filled (prevents "partial submit" gaming)
  for (const tile of N_PATH) {
    if (!userMap.has(tile)) {
      return NextResponse.json({ ok: false, correctCount }, { status: 200 })
    }
  }

  // Must match exact placements to pass
  if (correctCount !== N_PATH.length) {
    return NextResponse.json({ ok: false, correctCount }, { status: 200 })
  }

  const password = process.env.MS_PUZZLE_PASSWORD || ""
  if (!password) {
    return NextResponse.json({ ok: false, error: "Password not configured" }, { status: 500 })
  }

  return NextResponse.json({ ok: true, password, correctCount }, { status: 200 })
}
