export const GRID_SIZE = 5
export const TILE_COUNT = GRID_SIZE * GRID_SIZE

// N-shape traversal order (13 tiles)
export const N_PATH = [
  0, 4,        // row 0 (left + right)
  5, 6, 9,     // row 1 (left + diagonal + right)
  10, 12, 14,  // row 2 (left + diagonal + right)
  15, 18, 19,  // row 3 (left + diagonal + right)
  20, 24       // row 4 (left + right)
] as const

// Canonical story order (13 glyphs)
export const CANON_ORDER = [
  "g_forge",
  "g_dominion",
  "g_exhaustion",
  "g_decree",
  "g_disarmament",
  "g_exile",
  "g_karthage",
  "g_adaptation",
  "g_underworld",
  "g_discovery",
  "g_proxywar",
  "g_convergence",
  "g_catastrophe",
] as const

export type GlyphId = (typeof CANON_ORDER)[number]

export type GlyphStatus = "acknowledged" | "sanitized" | "suppressed"

export const GLYPH_STATUS: Record<GlyphId, GlyphStatus> = {
  g_forge: "acknowledged",
  g_dominion: "sanitized",
  g_exhaustion: "acknowledged",
  g_decree: "acknowledged",
  g_disarmament: "sanitized",
  g_exile: "suppressed",
  g_karthage: "suppressed",
  g_adaptation: "suppressed",
  g_underworld: "suppressed",
  g_discovery: "sanitized",
  g_proxywar: "suppressed",
  g_convergence: "suppressed",
  g_catastrophe: "suppressed",
}

// Exact required placement: tileIndex -> glyphId
export const REQUIRED_PLACEMENTS: Record<number, GlyphId> = Object.fromEntries(
  N_PATH.map((tile, i) => [tile, CANON_ORDER[i]])
) as Record<number, GlyphId>
