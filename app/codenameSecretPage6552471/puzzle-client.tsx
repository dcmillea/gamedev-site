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
  {
    id: "d_annihilation",
    src: "/media/glyphs/d_annihilation.png",
    kind: "decoy",
  },
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

function statusStyle(status?: GlyphStatus): React.CSSProperties | undefined {
  if (!status) return undefined;
  if (status === "acknowledged") {
    return {
      boxShadow:
        "0 0 0 2px color-mix(in oklab, var(--color-green) 20%, transparent)",
    };
  }
  if (status === "sanitized") {
    return {
      boxShadow:
        "0 0 0 2px color-mix(in oklab, var(--color-blue) 18%, transparent)",
    };
  }
  return {
    boxShadow:
      "0 0 0 2px color-mix(in oklab, var(--color-red) 20%, transparent)",
  };
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

export function PuzzleClient() {
  const [grid, setGrid] = React.useState<Record<number, string>>({});
  const [activeTile, setActiveTile] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "bad" | "ok">(
    "idle",
  );
  const [correctCount, setCorrectCount] = React.useState<number | null>(null);
  const [msg, setMsg] = React.useState("");
  const [password, setPassword] = React.useState("");

  const usedIds = React.useMemo(() => new Set(Object.values(grid)), [grid]);

  const seedRef = React.useRef<number>(
    Math.floor(Math.random() * 1_000_000_000),
  );
  const tray = React.useMemo(
    () => seededShuffle(FRAGMENTS, seedRef.current),
    [],
  );

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
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground mt-20">
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

        <div
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]"
          style={{ maxHeight: "calc(100dvh - 240px)" }}
        >
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
                const frag = imageId
                  ? FRAGMENTS.find((f) => f.id === imageId)
                  : null;
                const isActive = activeTile === i;
                const isN = tileIsInN(i);

                return (
                  <div
                    key={i}
                    className="group relative aspect-square rounded-xl border border-border bg-background"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setActiveTile(i);
                      e.dataTransfer.dropEffect = "move";
                    }}
                    onDragLeave={() =>
                      setActiveTile((t) => (t === i ? null : t))
                    }
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
                      <button
                        className="relative h-full w-full"
                        draggable
                        onDragStart={(e) =>
                          setDragData(e, {
                            type: "from-grid",
                            imageId: frag.id,
                            fromTile: i,
                          })
                        }
                        onClick={() => removeFromTile(i)}
                        title="Click to remove"
                        style={
                          frag.kind === "real"
                            ? statusStyle(frag.status)
                            : undefined
                        }
                      >
                        <Image
                          src={frag.src}
                          alt=""
                          aria-hidden
                          fill
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
                      </button>
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
                <p className="text-xs text-muted-foreground">
                  PASSCODE UNLOCKED
                </p>
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

            <div
              className="mt-4 overflow-auto pr-1"
              style={{ maxHeight: "calc(100dvh - 300px)" }}
            >
              <div className="grid grid-cols-3 gap-2">
                {tray.map((f) => {
                  const isUsed = usedIds.has(f.id);
                  const isReal = f.kind === "real";

                  return (
                    <div
                      key={f.id}
                      className="relative overflow-hidden rounded-xl border border-border bg-background"
                      style={
                        isUsed
                          ? { opacity: 0.35, filter: "grayscale(1)" }
                          : undefined
                      }
                    >
                      <button
                        draggable={!isUsed}
                        onDragStart={(e) => {
                          if (isUsed) return;
                          setDragData(e, { type: "from-tray", imageId: f.id });
                        }}
                        className="relative block w-full"
                        title={isUsed ? "Already placed" : "Drag"}
                        style={isReal ? statusStyle(f.status) : undefined}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={f.src}
                            alt=""
                            aria-hidden
                            fill
                            className="object-cover"
                          />
                        </div>

                        <span className="sr-only">
                          {isReal ? "Glyph fragment" : "Decoy fragment"}
                        </span>

                        <div className="h-2" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground">
              Placed:{" "}
              <span className="text-foreground">
                {Object.keys(grid).length}
              </span>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              <span className="opacity-70">Note:</span> not every fragment
              belongs to the canon.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
