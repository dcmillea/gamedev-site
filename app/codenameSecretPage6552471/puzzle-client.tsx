"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  GRID_SIZE,
  TILE_COUNT,
  N_PATH,
  CANON_ORDER,
  GLYPH_STATUS,
  type GlyphStatus,
} from "@/lib/nambesh-puzzle";

type Frag = {
  id: string;
  src: string;
  kind: "real" | "decoy";
  status?: GlyphStatus;
};

const REAL_GLYPHS: Frag[] = CANON_ORDER.map((id) => ({
  id,
  src: `/media/glyphs/${id}.png`,
  kind: "real",
  status: GLYPH_STATUS[id],
}));

const DECOYS: Frag[] = [
  { id: "d_decay", src: "/media/glyphs/d_decay.png", kind: "decoy" },
  { id: "d_wraith", src: "/media/glyphs/d_wraith.png", kind: "decoy" },
  { id: "d_husk", src: "/media/glyphs/d_husk.png", kind: "decoy" },
  { id: "d_witness", src: "/media/glyphs/d_witness.png", kind: "decoy" },
  { id: "d_ruin", src: "/media/glyphs/d_ruin.png", kind: "decoy" },
  { id: "d_veil", src: "/media/glyphs/d_veil.png", kind: "decoy" },
  { id: "d_static", src: "/media/glyphs/d_static.png", kind: "decoy" },
  { id: "d_echo", src: "/media/glyphs/d_echo.png", kind: "decoy" },
  { id: "d_rebellion", src: "/media/glyphs/d_rebellion.png", kind: "decoy" },
  { id: "d_schism", src: "/media/glyphs/d_schism.png", kind: "decoy" },
  { id: "d_annihilation", src: "/media/glyphs/d_annihilation.png", kind: "decoy" },
  { id: "d_eclipse", src: "/media/glyphs/d_eclipse.png", kind: "decoy" },
];

const FRAGMENTS: Frag[] = [...REAL_GLYPHS, ...DECOYS];

type DragPayload =
  | { type: "from-tray"; imageId: string }
  | { type: "from-grid"; imageId: string; fromTile: number };

function setDragData(e: React.DragEvent, payload: DragPayload) {
  e.dataTransfer.setData("application/ms-puzzle", JSON.stringify(payload));
  e.dataTransfer.effectAllowed = "move";
}

function getDragData(e: React.DragEvent): DragPayload | null {
  const raw = e.dataTransfer.getData("application/ms-puzzle");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DragPayload;
  } catch {
    return null;
  }
}

function tileIsInN(tile: number) {
  return (N_PATH as readonly number[]).includes(tile);
}

function seededShuffle<T>(items: T[], seed: number) {
  function mulberry32(a: number) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry32(seed);
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Create a rounded drag image that is visibly smaller inside (padding).
 * IMPORTANT: We keep the ghost in the DOM until dragend (Chrome snapshots reliably).
 */
function buildDragGhost(src: string, opts: { size: number; radius: number; pad: number }) {
  const { size, radius, pad } = opts;

  const ghost = document.createElement("div");
  ghost.style.width = `${size}px`;
  ghost.style.height = `${size}px`;
  ghost.style.borderRadius = `${radius}px`;
  ghost.style.overflow = "hidden";
  ghost.style.background = "rgba(10,10,12,0.55)";
  ghost.style.border = "2px solid rgba(255,255,255,0.10)";
  ghost.style.boxShadow = "0 18px 44px rgba(0,0,0,0.55)";
  ghost.style.position = "fixed";
  ghost.style.left = "-9999px";
  ghost.style.top = "-9999px";
  ghost.style.pointerEvents = "none";
  ghost.style.zIndex = "2147483647";

  const inner = document.createElement("div");
  inner.style.position = "absolute";
  inner.style.left = `${pad}px`;
  inner.style.top = `${pad}px`;
  inner.style.width = `${size - pad * 2}px`;
  inner.style.height = `${size - pad * 2}px`;
  inner.style.borderRadius = `${Math.max(10, radius - 4)}px`;
  inner.style.overflow = "hidden";
  inner.style.background = "rgba(255,255,255,0.04)";

  const img = document.createElement("img");
  img.src = src;
  img.draggable = false;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.display = "block";

  inner.appendChild(img);
  ghost.appendChild(inner);
  document.body.appendChild(ghost);

  return ghost;
}

export function PuzzleClient() {
  const [grid, setGrid] = React.useState<Record<number, string>>({});
  const [activeTile, setActiveTile] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "bad" | "ok">("idle");
  const [correctCount, setCorrectCount] = React.useState<number | null>(null);
  const [msg, setMsg] = React.useState("");
  const [password, setPassword] = React.useState("");

  const usedIds = React.useMemo(() => new Set(Object.values(grid)), [grid]);

  // ✅ stable seed without impure render
  const [seed] = React.useState(() => Math.floor(Math.random() * 1_000_000_000));
  const tray = React.useMemo(() => seededShuffle(FRAGMENTS, seed), [seed]);

  // Keep the current drag ghost alive until dragend
  const dragGhostRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const cleanup = () => {
      if (dragGhostRef.current) {
        dragGhostRef.current.remove();
        dragGhostRef.current = null;
      }
    };
    window.addEventListener("dragend", cleanup);
    window.addEventListener("drop", cleanup);
    return () => {
      window.removeEventListener("dragend", cleanup);
      window.removeEventListener("drop", cleanup);
      cleanup();
    };
  }, []);

  function resetFeedback() {
    setStatus("idle");
    setMsg("");
    setPassword("");
    setCorrectCount(null);
  }

  function clearAll() {
    setGrid({});
    setActiveTile(null);
    resetFeedback();
  }

  function removeFromTile(tile: number) {
    setGrid((prev) => {
      const next = { ...prev };
      delete next[tile];
      return next;
    });
    resetFeedback();
  }

  function handleDropOnTile(tile: number, payload: DragPayload) {
    resetFeedback();
    setGrid((prev) => {
      const next = { ...prev };
      if (payload.type === "from-grid") delete next[payload.fromTile];
      next[tile] = payload.imageId;
      return next;
    });
  }

  function onStartDrag(e: React.DragEvent, payload: DragPayload, src: string) {
    // remove any previous ghost
    if (dragGhostRef.current) {
      dragGhostRef.current.remove();
      dragGhostRef.current = null;
    }

    setDragData(e, payload);

    // Tune these 3 values — they WILL change the ghost now.
    const size = 96;
    const radius = 18;
    const pad = 14;

    const ghost = buildDragGhost(src, { size, radius, pad });
    dragGhostRef.current = ghost;

    // Must happen during dragstart
    e.dataTransfer.setDragImage(ghost, size / 2, size / 2);
  }

  async function submit() {
    setStatus("loading");
    setMsg("");
    setPassword("");
    setCorrectCount(null);

    const placements = Object.entries(grid).map(([tileStr, imageId]) => ({
      tile: Number(tileStr),
      imageId,
    }));

    const res = await fetch("/api/solve-n", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placements }),
    });

    const data = await res.json().catch(() => ({}));
    const cc = typeof data.correctCount === "number" ? data.correctCount : null;

    if (!data?.ok) {
      setStatus("bad");
      setCorrectCount(cc);
      setMsg(
        cc === null
          ? "SYNC FAILED — RECORD DOES NOT MATCH CANON"
          : `${cc}/13 canonical events placed correctly`,
      );
      return;
    }

    setStatus("ok");
    setCorrectCount(cc ?? 13);
    setMsg(`${cc ?? 13}/13 canonical events placed correctly`);
    setPassword(String(data.password));
  }

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-background text-foreground mt-20 pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-140px] h-[540px] w-[540px] -translate-x-1/2 rounded-full blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-blue) 26%, transparent), transparent)",
          }}
        />
        <div
          className="absolute -left-28 top-20 h-[460px] w-[460px] rounded-full blur-[170px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-red) 22%, transparent), transparent)",
          }}
        />
        <div
          className="absolute -right-28 top-44 h-[460px] w-[460px] rounded-full blur-[170px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-green) 22%, transparent), transparent)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "repeating-linear-gradient(to bottom, var(--foreground) 0px, transparent 2px, transparent 6px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs text-muted-foreground">ARCHIVE NODE</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
            RECONSTRUCT THE RECORD
          </h1>
          <p className="mt-3 text-muted-foreground">
            Not every fragment belongs to the canon.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]">
          <section>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Grid:{" "}
                <span className="text-foreground">
                  {GRID_SIZE}×{GRID_SIZE}
                </span>
              </p>

              <div className="flex gap-2">
                <Button variant="outline" onClick={clearAll}>
                  Reset
                </Button>
                <Button onClick={submit} disabled={status === "loading"}>
                  {status === "loading" ? "Verifying…" : "Submit"}
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {Array.from({ length: TILE_COUNT }).map((_, i) => {
                const imageId = grid[i];
                const frag = imageId ? FRAGMENTS.find((f) => f.id === imageId) : null;
                const isActive = activeTile === i;
                const isN = tileIsInN(i);

                return (
                  <div
                    key={i}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-background"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setActiveTile(i);
                      e.dataTransfer.dropEffect = "move";
                    }}
                    onDragLeave={() => setActiveTile((t) => (t === i ? null : t))}
                    onDrop={(e) => {
                      e.preventDefault();
                      const payload = getDragData(e);
                      setActiveTile(null);
                      if (!payload) return;
                      handleDropOnTile(i, payload);
                    }}
                    style={
                      isActive
                        ? {
                            boxShadow:
                              "0 0 0 2px color-mix(in oklab, var(--color-blue) 25%, transparent)",
                          }
                        : undefined
                    }
                  >
                    {isN ? (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.06]"
                        style={{
                          background:
                            "repeating-linear-gradient(135deg, var(--foreground) 0px, transparent 2px, transparent 8px)",
                        }}
                      />
                    ) : null}

                    {frag ? (
                      // ✅ Drag source is a DIV (not a button) so Chrome respects setDragImage more reliably
                      <div
                        role="button"
                        tabIndex={0}
                        title="Click to remove"
                        className="relative h-full w-full cursor-pointer"
                        draggable
                        onDragStart={(e) =>
                          onStartDrag(
                            e,
                            { type: "from-grid", imageId: frag.id, fromTile: i },
                            frag.src,
                          )
                        }
                        onClick={() => removeFromTile(i)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") removeFromTile(i);
                        }}
                      >
                        <Image
                          src={frag.src}
                          alt=""
                          aria-hidden
                          fill
                          draggable={false}
                          className="object-cover"
                        />
                        <span className="sr-only">
                          Placed glyph fragment. Click to remove.
                        </span>
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
                          style={{
                            background:
                              "linear-gradient(to top, color-mix(in oklab, var(--background) 92%, transparent), transparent)",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="grid h-full w-full place-items-center">
                        <span className="text-[10px] text-muted-foreground opacity-70">
                          drop
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {msg && (
              <div className="mt-6 rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
                {msg}
              </div>
            )}

            {password && (
              <div className="mt-6 rounded-2xl border border-border bg-background p-5">
                <p className="text-xs text-muted-foreground">PASSCODE UNLOCKED</p>
                <p className="mt-2 font-mono text-lg tracking-widest text-foreground">
                  {password}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Enter this in the Terminal from the sidebar.
                </p>
              </div>
            )}
          </section>

          <aside className="sticky top-0 self-start rounded-2xl border border-border bg-background p-4">
            <p className="text-sm font-medium text-foreground">Fragments</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Drag into the grid. Click a placed tile to remove it.
            </p>

            <div className="mt-4 overflow-auto pr-1" style={{ maxHeight: "calc(100dvh - 300px)" }}>
              <div className="grid grid-cols-3 gap-2">
                {tray.map((f) => {
                  const isUsed = usedIds.has(f.id);

                  return (
                    <div
                      key={f.id}
                      className="relative overflow-hidden rounded-xl border border-border bg-background"
                      style={isUsed ? { opacity: 0.35, filter: "grayscale(1)" } : undefined}
                    >
                      <div
                        className="relative block w-full"
                        title={isUsed ? "Already placed" : "Drag"}
                        draggable={!isUsed}
                        onDragStart={(e) => {
                          if (isUsed) return;
                          onStartDrag(e, { type: "from-tray", imageId: f.id }, f.src);
                        }}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={f.src}
                            alt=""
                            aria-hidden
                            fill
                            draggable={false}
                            className="object-cover"
                          />
                        </div>

                        <span className="sr-only">
                          {f.kind === "real" ? "Glyph fragment" : "Decoy fragment"}
                        </span>

                        <div className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground">
              Placed: <span className="text-foreground">{Object.keys(grid).length}</span>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              <span className="opacity-70">Note:</span> not every fragment belongs to the canon.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
