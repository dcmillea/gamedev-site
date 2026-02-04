"use client";

import * as React from "react";
import Image from "next/image";
import { CANON_ORDER, GLYPH_STATUS, type GlyphStatus } from "@/lib/nambesh-puzzle";

type Entry = {
  id: string;
  src: string;
  kind: "canon" | "decoy";
  label: string;
  snippet: string;
  tag?: string;
  status?: GlyphStatus;
};

/** Normalize ids like:
 *  "g_proxywar" -> "proxy war"
 *  "Proxy War"  -> "proxy war"
 *  "proxy_war"  -> "proxy war"
 */
function normalizeEventKey(id: string) {
  return id
    .trim()
    .replace(/^g[_-]/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function getCanonMeta(id: string): { label: string; snippet: string; tag?: string } {
  const k = normalizeEventKey(id);

  // Keep labels non-explicit. No event names.
  // Snippets are lore-consistent and allow deduction without ordering language.
  const table: Record<string, { label: string; snippet: string; tag?: string }> = {
    "forge": {
      label: "FRAGMENT",
      snippet: "Since the begginning, they learned early that survival was not given. It had to be shaped.",
      tag: "SOURCE: VIREX PRIME History",
    },
    "dominion": {
      label: "FRAGMENT",
      snippet: "They soon grew powerful, and fear traveled farther than their ships ever could.",
      tag: "SOURCE: GALACTIC CONCORD BRIEF",
    },
    "exhaustion": {
      label: "FRAGMENT",
      snippet: "Victory stopped feeling like winning. And she spoke up.",
      tag: "SOURCE: CIVIL TRANSCRIPT",
    },
    "decree": {
      label: "FRAGMENT",
      snippet: "Her official signature and the support of the people.",
      tag: "SOURCE: PUBLIC ARCHIVE",
    },
    "disarmament": {
      label: "FRAGMENT",
      snippet: "The fleets were dismantled before the memory of them faded.",
      tag: "SOURCE: COMMISSION ORDER",
    },
    "exile": {
      label: "FRAGMENT",
      snippet: "Those who would not obey, were forced to leave.",
      tag: "SOURCE: TRANSIT LEDGER",
    },
    "karthage": {
      label: "FRAGMENT",
      snippet: "Leaving Virex Prime, they regrouped on a lonely planet.",
      tag: "SOURCE: SURVIVAL NOTE",
    },
    "adaptation": {
      label: "FRAGMENT",
      snippet: "Needing a new way of life, they were forced to adapt.",
      tag: "SOURCE: TRAINING RECORD",
    },
    "underworld": {
      label: "FRAGMENT",
      snippet: "Power and influence paid most with those who needed it.",
      tag: "SOURCE: BLACK MARKET TALLY",
    },
    "discovery": {
      label: "FRAGMENT",
      snippet: "A new found resource made this quiet planet a big name.",
      tag: "SOURCE: MINER REPORT",
    },
    "proxy war": {
      label: "FRAGMENT",
      snippet: "The weapons arrived before the flags.",
      tag: "SOURCE: INTERCEPT",
    },
    "convergence": {
      label: "FRAGMENT",
      snippet: "Sent to investigate the tremors over nambesh.",
      tag: "SOURCE: WARP TRACE",
    },
    "catastrophe": {
      label: "FRAGMENT",
      snippet: "It was real, and there was no hiding it.",
      tag: "SOURCE: LAST PING",
    },
  };

  return (
    table[k] ?? {
      label: "FRAGMENT",
      snippet: "…signal degraded… extract incomplete…",
      tag: "SOURCE: UNKNOWN",
    }
  );
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
  const rand = mulberry32(seed >>> 0);
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function cryptoSeed() {
  // Client-only. Safe because we render skeleton until mounted.
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] >>> 0;
}

function GrimeThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-16 overflow-hidden rounded-xl border border-border bg-background">
      <Image
        src={src}
        alt={alt}
        fill
        draggable={false}
        className="object-cover saturate-0 contrast-125"
      />

      {/* Dirt/grit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(circle at 18% 22%, rgba(0,0,0,0.58), transparent 56%)," +
            "radial-gradient(circle at 74% 70%, rgba(0,0,0,0.46), transparent 60%)," +
            "radial-gradient(circle at 30% 84%, rgba(0,0,0,0.34), transparent 58%)",
        }}
      />

      {/* Blood-like stains (subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 66% 28%, rgba(140,12,20,0.46), transparent 48%)," +
            "radial-gradient(circle at 26% 72%, rgba(120,8,16,0.40), transparent 52%)," +
            "radial-gradient(circle at 42% 48%, rgba(110,6,14,0.22), transparent 62%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Scratches */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "repeating-linear-gradient(125deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 2px, transparent 9px)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 55%, color-mix(in oklab, var(--background) 70%, black) 100%)",
          opacity: 0.65,
        }}
      />
    </div>
  );
}

/** Decoys: lore-valid, but not part of the canon timeline chain. */
const DECOY_ENTRIES: Entry[] = [
  {
    id: "d_decay",
    src: "/media/glyphs/d_decay.png",
    kind: "decoy",
    label: "ADDENDUM",
    snippet: "Order was restored through silence.",
    tag: "PROPAGANDA: GALACTIC CONCORD",
  },
  {
    id: "d_wraith",
    src: "/media/glyphs/d_wraith.png",
    kind: "decoy",
    label: "RUMOR",
    snippet: "Something much greater was made, much darker.",
    tag: "HEARSAY: DOCKTOWN",
  },
  {
    id: "d_husk",
    src: "/media/glyphs/d_husk.png",
    kind: "decoy",
    label: "WITNESS",
    snippet: "Everyone agreed. That was the problem.",
    tag: "SOURCE: REDACTED",
  },
  {
    id: "d_witness",
    src: "/media/glyphs/d_witness.png",
    kind: "decoy",
    label: "EXTRACT",
    snippet: "Steel remembers what voices forget.",
    tag: "ARCHIVE: WAR HYMN",
  },
  {
    id: "d_ruin",
    src: "/media/glyphs/d_ruin.png",
    kind: "decoy",
    label: "MEMO",
    snippet: "They were after the key, and soon there was nothing left.",
    tag: "OSC DOCTRINE NOTE",
  },
  {
    id: "d_veil",
    src: "/media/glyphs/d_veil.png",
    kind: "decoy",
    label: "LEDGER",
    snippet: "There is no surrender, you will fight, and perish.",
    tag: "HELOIX TALLY",
  },
  {
    id: "d_static",
    src: "/media/glyphs/d_static.png",
    kind: "decoy",
    label: "SIGNAL",
    snippet: "…burst transmission… origin unclear…",
    tag: "NOISE: UNVERIFIED",
  },
  {
    id: "d_echo",
    src: "/media/glyphs/d_echo.png",
    kind: "decoy",
    label: "SCRAP",
    snippet: "It was him, I know it was him. But he was gone.",
    tag: "SMUGGLER FOLKLORE",
  },
  {
    id: "d_rebellion",
    src: "/media/glyphs/d_rebellion.png",
    kind: "decoy",
    label: "BROADCAST",
    snippet: "The people cheered. The generals vanished.",
    tag: "VIREX CONCORD PSA",
  },
  {
    id: "d_schism",
    src: "/media/glyphs/d_schism.png",
    kind: "decoy",
    label: "MINUTES",
    snippet: "A council split without raising a weapon.",
    tag: "HOUSE OF DANO RECORD",
  },
  {
    id: "d_annihilation",
    src: "/media/glyphs/d_annihilation.png",
    kind: "decoy",
    label: "OBITUARY",
    snippet: "No one claimed the strike. Everyone benefited.",
    tag: "OUTER SYSTEMS CLIPPING",
  },
  {
    id: "d_eclipse",
    src: "/media/glyphs/d_eclipse.png",
    kind: "decoy",
    label: "CENSOR",
    snippet: "The report ends where the funding begins.",
    tag: "CLASSIFIED: CONCORD",
  },
];

export default function ArchiveFragments() {
  const [mounted, setMounted] = React.useState(false);
  const [shuffled, setShuffled] = React.useState<Entry[]>([]);

  React.useEffect(() => {
    setMounted(true);

    const canon: Entry[] = CANON_ORDER.map((id) => {
      const meta = getCanonMeta(id);
      return {
        id,
        src: `/media/glyphs/${id}.png`,
        kind: "canon",
        label: meta.label,
        snippet: meta.snippet,
        tag: meta.tag,
        status: GLYPH_STATUS[id] as GlyphStatus | undefined,
      };
    });

    const all = [...canon, ...DECOY_ENTRIES];

    // Mixed every load, but only after mount so we never mismatch SSR/CSR.
    const seed = cryptoSeed();
    setShuffled(seededShuffle(all, seed));
  }, []);

  // Skeleton while mounting (prevents "ordered then shuffled" flash)
  if (!mounted || shuffled.length === 0) {
    return (
      <section className="mt-10 mb-10 rounded-3xl border border-border bg-background p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">ARCHIVAL FRAGMENTS</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">
              Partial extracts recovered
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Not every fragment belongs to the canon. Some are propaganda. Some are unrelated events.
            </p>
          </div>
          <div className="hidden sm:block rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground">
            Sync status: <span className="text-foreground">locking…</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-[92px] rounded-2xl border border-border bg-background/60"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in oklab, var(--foreground) 8%, transparent), transparent)",
                opacity: 0.55,
              }}
            />
          ))}
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          <span className="opacity-70">Operator note:</span> fragments reorder after each sync.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 mb-10 rounded-3xl border border-border bg-background p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">ARCHIVAL FRAGMENTS</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">
            Partial extracts recovered
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Not every fragment belongs to the canon. Some are propaganda. Some are unrelated events.
          </p>
        </div>

        <div className="hidden sm:block rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground">
          Signal integrity: <span className="text-red">unstable</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {shuffled.map((e) => (
          <div
            key={e.id}
            className="group relative flex items-start gap-4 rounded-2xl border border-border bg-background px-4 py-3"
          >
            <GrimeThumb src={e.src} alt="" />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-xs font-medium text-foreground">{e.label}</span>
                <span className="text-[11px] text-muted-foreground opacity-80">
                  {e.tag ?? "SOURCE: ???"}
                </span>

                {/* Keep this *non-revealing*. If you prefer, remove entirely. */}
                <span
                  className="ml-auto hidden sm:inline-block text-[10px] uppercase tracking-widest"
                  style={{
                    color:
                      e.kind === "canon"
                        ? "color-mix(in oklab, var(--color-green) 55%, var(--foreground))"
                        : "color-mix(in oklab, var(--color-red) 45%, var(--foreground))",
                    opacity: 0.7,
                  }}
                >
                  {e.kind === "canon" ? "LIKELY CANON" : "NON-CANON"}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.snippet}</p>

              {/* Light mode hover */}
              <div
                aria-hidden
                className="
                  pointer-events-none absolute inset-0 rounded-2xl
                  opacity-0 transition-opacity duration-300
                  group-hover:opacity-100
                  dark:opacity-0
                "
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in oklab, var(--color-blue) 18%, transparent), 0 18px 60px rgba(0,0,0,0.35)",
                }}
              />

              {/* Dark mode hover */}
              <div
                aria-hidden
                className="
                  pointer-events-none absolute inset-0 rounded-2xl
                  opacity-0 transition-opacity duration-300
                  dark:group-hover:opacity-100
                "
                style={{
                  boxShadow: `
                    0 0 0 1px color-mix(in oklab, var(--color-blue) 40%, transparent),
                    0 0 24px color-mix(in oklab, var(--color-blue) 30%, transparent),
                    0 0 64px color-mix(in oklab, var(--color-blue) 18%, transparent)
                  `,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xs text-muted-foreground">
        <span className="opacity-70 text-green">Operator note:</span> fragments reorder after each sync.
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        <span className="opacity-70 text-blue">Operator note:</span> fragments should be placed to make the letter {`'N'`}, starting in the bottom left corner.
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        <span className="opacity-70 text-red">Operator note:</span> the codename in the terminal, is the name of the planet.
      </div>
    </section>
  );
}
