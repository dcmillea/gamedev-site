import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Accent = "red" | "blue" | "green"

type Devlog = {
  slug: string
  title: string
  date: string
  excerpt: string
  accent: Accent
  cover?: string
  tags: string[]
}

const DEVLOGS: Devlog[] = [
  {
    slug: "devlog-0-introduction",
    title: "Devlog 0: Introduction",
    date: "2026-02-01",
    excerpt: "Bootstrapping the vision, scope, and foundation for Nambesh.",
    accent: "blue",
    cover: "/media/devlogs/devlog0.png",
    tags: ["vision", "scope", "pipeline"],
  },
  {
    slug: "devlog-1-basic-combat-loop",
    title: "Devlog 1: Basic Combat Loop",
    date: "2026-02-08",
    excerpt: "Input → fire → hit feedback → reload → repeat. The loop starts feeling real.",
    accent: "red",
    cover: "/media/devlogs/devlog1.png",
    tags: ["combat", "fps", "iteration"],
  },
  {
    slug: "devlog-2-world-and-factions",
    title: "Devlog 2: World & Factions",
    date: "2026-02-15",
    excerpt: "Virex Prime, Virex Concord, and the chain reaction that leads to Nambesh.",
    accent: "green",
    cover: "/media/devlogs/devlog2.png",
    tags: ["lore", "factions", "worldbuilding"],
  },
  {
    slug: "devlog-3-ui-and-feel",
    title: "Devlog 3: UI & Feel Pass",
    date: "2026-02-22",
    excerpt: "Making the experience readable, responsive, and satisfying under pressure.",
    accent: "blue",
    cover: "/media/devlogs/devlog3.png",
    tags: ["ui", "ux", "polish"],
  },
  {
    slug: "devlog-4-weapons-prototyping",
    title: "Devlog 4: Weapons Prototyping",
    date: "2026-03-01",
    excerpt: "Tuning recoil, cadence, audio feedback, and that ‘one more run’ feel.",
    accent: "red",
    cover: "/media/devlogs/devlog4.png",
    tags: ["weapons", "feel", "tuning"],
  },
  {
    slug: "devlog-5-progression-and-economy",
    title: "Devlog 5: Progression & Economy",
    date: "2026-03-08",
    excerpt: "Unlocks, milestones, and a system that rewards mastery without grind fatigue.",
    accent: "green",
    cover: "/media/devlogs/devlog5.png",
    tags: ["progression", "systems", "balance"],
  },
]

function accentVars(accent: Accent): React.CSSProperties {
  const v =
    accent === "red"
      ? "var(--color-red)"
      : accent === "green"
        ? "var(--color-green)"
        : "var(--color-blue)"

  return {
    // eslint-disable-next-line
    ["--accent" as any]: v,
  }
}

function AccentPill({ accent }: { accent: Accent }) {
  return (
    <span
      className="inline-flex h-2.5 w-2.5 rounded-full"
      style={{
        background: "color-mix(in oklab, var(--accent) 70%, transparent)",
        boxShadow:
          "0 0 0 2px color-mix(in oklab, var(--accent) 25%, transparent), 0 0 30px color-mix(in oklab, var(--accent) 35%, transparent)",
      }}
    />
  )
}

export default function DevlogsPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground pt-6 md:pt-24">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-[-160px] h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[170px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-blue) 18%, transparent), transparent)",
          }}
        />
        <div
          className="absolute -left-32 top-20 h-[520px] w-[520px] rounded-full blur-[170px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-red) 16%, transparent), transparent)",
          }}
        />
        <div
          className="absolute -right-32 top-56 h-[520px] w-[520px] rounded-full blur-[170px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-green) 16%, transparent), transparent)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background:
              "repeating-linear-gradient(to bottom, var(--foreground) 0px, transparent 2px, transparent 7px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-xs text-muted-foreground">DEVELOPMENT LOGS</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Devlogs</h1>
          <p className="mt-3 text-muted-foreground">
            Short, frequent updates with real progress—systems, visuals, design decisions, and the messy middle.
          </p>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEVLOGS.map((d) => (
            <Card
              key={d.slug}
              className="group relative overflow-hidden rounded-2xl border-border bg-background"
              style={accentVars(d.accent)}
            >
              {/* Premium border glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in oklab, var(--accent) 26%, transparent), 0 18px 70px color-mix(in oklab, var(--accent) 18%, transparent)",
                }}
              />

              {/* Accent corner wash */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full blur-[90px]"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--accent) 24%, transparent), transparent)",
                }}
              />

              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AccentPill accent={d.accent} />
                    <span className="text-xs text-muted-foreground">{d.date}</span>
                  </div>
                </div>

                <h2 className="text-lg font-semibold leading-snug">{d.title}</h2>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Cover */}
                <div className="relative overflow-hidden rounded-xl border border-border bg-background">
                  <div className="relative aspect-[16/10]">
                    <Image
                      fill
                      src={d.cover ?? "/media/devlogs/placeholder.png"}
                      alt=""
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={false}
                    />
                  </div>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                    style={{
                      background:
                        "linear-gradient(to top, color-mix(in oklab, var(--background) 92%, transparent), transparent)",
                    }}
                  />
                </div>

                <p className="text-sm text-muted-foreground">{d.excerpt}</p>

                <div className="flex flex-wrap gap-2">
                  {d.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      style={{
                        background:
                          "color-mix(in oklab, var(--accent) 8%, var(--background))",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Button asChild variant="outline" className={"rounded-xl " + `text-${d.accent}`}>
                    <Link href={`/youtube`}>Watch now</Link>
                  </Button>

                  <span className="text-xs text-muted-foreground">
                    {/* subtle hint of “newness” */}
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full align-middle"
                      style={{
                        background:
                          "color-mix(in oklab, var(--accent) 70%, transparent)",
                        marginRight: 8,
                      }}
                    />
                    Update
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <footer className="mt-14 rounded-2xl border border-border bg-background p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Want the devlogs as they drop?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Subscribe on YouTube / Discord, or check back here weekly.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl">
                YouTube
              </Button>
              <Button variant="outline" className="rounded-xl">
                Discord
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
