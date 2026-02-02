import { NextResponse } from "next/server"

type Placement = { tile: number; imageId: string }

function parseSolution(s: string) {
  // "0=a3,6=k2,12=m7" -> Map(tile -> imageId)
  const map = new Map<number, string>()
  for (const part of s.split(",")) {
    const [tileStr, imageId] = part.split("=")
    const tile = Number(tileStr)
    if (!Number.isFinite(tile) || tile < 0) continue
    if (!imageId) continue
    map.set(tile, imageId.trim())
  }
  return map
}

export async function POST(req: Request) {
  const body = (await req.json()) as { placements?: Placement[] }

  if (!Array.isArray(body.placements)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }

  const solutionRaw = process.env.MS_GRID_SOLUTION || ""
  const solution = parseSolution(solutionRaw)

  if (solution.size === 0) {
    return NextResponse.json({ ok: false, error: "Grid puzzle not configured" }, { status: 500 })
  }

  // Normalize user's placements into Map(tile -> imageId)
  const user = new Map<number, string>()
  for (const p of body.placements) {
    const tile = Number(p.tile)
    const imageId = String(p.imageId || "").trim()
    if (!Number.isFinite(tile) || tile < 0 || tile > 24) continue
    if (!imageId) continue
    user.set(tile, imageId)
  }

  // Must match exactly: same tiles, same IDs
  if (user.size !== solution.size) {
    return NextResponse.json({ ok: false }, { status: 200 })
  }

  for (const [tile, id] of solution.entries()) {
    if (user.get(tile) !== id) {
      return NextResponse.json({ ok: false }, { status: 200 })
    }
  }

  const password = process.env.MS_PUZZLE_PASSWORD || ""
  if (!password) {
    return NextResponse.json({ ok: false, error: "Password not configured" }, { status: 500 })
  }

  return NextResponse.json({ ok: true, password }, { status: 200 })
}
