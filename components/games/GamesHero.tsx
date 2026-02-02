import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NambeshGameCover from "@/public/nambesh.png";

type Props = {
  coverSrc?: string;
};

export function GamesHero({ coverSrc = NambeshGameCover.src }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 md:pt-32">
      <div className="">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary">Games</Badge>
          <span>•</span>
          <Badge variant="secondary">In Development</Badge>
          <span>•</span>
          <span>Primary focus</span>
        </div>

        {/* Main content */}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12">
          {/* left copy */}
          <div className="lg:col-span-5">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Nambesh
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
              A Sci-Fi FPS campaign shooter built around immersive environments,
              alien wildlife, and a thrilling story.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                {
                  title: "Core combat loop",
                  desc: "Readable pacing, punchy feedback, tight iteration.",
                },
                {
                  title: "Distinct art direction",
                  desc: "Stylized world rules + cohesive visual language.",
                },
                {
                  title: "Performance-first",
                  desc: "Effects and lighting tuned for smooth gameplay.",
                },
                {
                  title: "Built in public",
                  desc: "Devlogs + guides documenting the pipeline.",
                },
              ].map((f) => (
                <li key={f.title} className="flex gap-3">
                  <span className="h-2 w-2 mt-3 rounded-full bg-green" />
                  <div>
                    <p className="font-medium text-foreground">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA's */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="sm:w-auto">
                <Link href={"/games/nambesh"}>View Nambesh</Link>
              </Button>
              <Button asChild className="sm:w-auto">
                <Link href={"/devlogs"}>Watch Devlogs</Link>
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border px-2.5 py-1">
                Engine: Unreal Engine 5
              </span>
              <span className="rounded-full border border-border px-2.5 py-1">
                Genre: FPS
              </span>
              <span className="rounded-full border border-border px-2.5 py-1">
                Status: Active development
              </span>
            </div>
          </div>

          {/* Center: cover art */}
          <div className="lg:col-span-4 lg:col-start-6">
            <div className="mx-auto w-full max-w-sm">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                <div className="relative aspect-2/3 w-full">
                  <Image
                    src={coverSrc}
                    alt="Nambesh game cover"
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 360px, 70vw"
                  />
                </div>

                <div
                  aria-hidden
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(to right, color-mix(in oklab, var(--color-red) 65%, transparent), color-mix(in oklab, var(--color-blue) 65%, transparent), color-mix(in oklab, var(--color-green) 65%, transparent))",
                  }}
                />
              </div>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Key art / cover • Updated alongside major milestones
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid gap-4">
              <HighlightCard
                label="Current milestone"
                value="Basic combat loop"
                hint="Input -> aim -> fire -> feedback -> reset"
              />
              <HighlightCard
                label="Next milestone"
                value="Enemies + encounters"
                hint="Readable patterns, strong tells, satisfying hints"
              />
              <HighlightCard
                label="Public updates"
                value="Devlogs + guides"
                hint="Process, breakdowns, pipeline workflow"
              />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="h-px w-full bg-border" />
          <p className="my-4 text-sm text-muted-foreground">
            Other projects are listed below—prototypes and concepts that may
            return to production later.
          </p>
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-semi-bold text-foreground">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}
