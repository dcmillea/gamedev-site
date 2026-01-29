import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import nambeshGameCover from "@/public/nambesh.png";
import codename_sw from "@/public/codename_sw.png";
import codename_c3_f2 from "@/public/codename_c3_f2.png";
import Image from "next/image";

type Game = {
  title: string;
  blurb: string;
  status: "Released" | "In Development" | "Early Access" | "Loading...";
  tags: string[];
  href: string;
  image: string;
  accent: "red" | "blue" | "green";
};

const GAMES: Game[] = [
  {
    title: "Nambesh",
    blurb: "Story-driven FPS where you play as a space soldier, fighting over the alien planet of Nambesh.",
    status: "In Development",
    tags: ["UE5", "Single Player", "Sci-Fi"],
    href: "/games/nambesh",
    image: nambeshGameCover.src,
    accent: "blue"
  },
  {
    title: "CodeName: SW",
    blurb: "details are tricky... I once thought that the details were tricky, and I still do!",
    status: "Loading...",
    tags: ["UE5", "Multiplayer", "Modern"],
    href: "/games/codename_sw",
    image: codename_sw.src,
    accent: "green"
  },
  {
    title: "CodeName: C3_F2",
    blurb: "details are tricky... I once thought that the details were tricky, and I still do!",
    status: "Loading...",
    tags: ["UE5", "FPS", "Big"],
    href: "/games/codename_c3_f2",
    image: codename_c3_f2.src,
    accent: "red"
  },
];

function accentVars(accent: Game["accent"]) {
  const map: Record<Game["accent"], string> = {
    red: "var(--color-red)",
    blue: "var(--color-blue)",
    green: "var(--color-green)",
  };
  return {
    // eslint-disable-next-line
    ["--accent" as any]: map[accent],
  } as React.CSSProperties;
}

export function FeaturedGames() {
  return (
    <section aria-labelledby="featured-games" className="relative w-full">
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-background" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border"/>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">  
          <div className="max-w-2xl">
            <p className="text-sm tracking-wide text-muted-foreground">
              Just some, well, games.
            </p>
            <h2 id="featured-games" className="mt-2 text-balance text-2xl font-semibold text-foreground sm:text-3xl">
              Featured Games
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              A snapshot of what&apos;s to come, check out the <Link className="text-blue hover:text-green" href={"/devlogs"}>devlogs</Link> for more updates! 
            </p>
          </div>

          <Button asChild variant={"outline"} className="shrink-0">
            <Link href={"/games"}>View all</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g) => (
            <Card key={g.title} style={accentVars(g.accent)}
            className={["group relative overflow-hidden", "border border-border bg-background", "transition-transform duration-200 will-change-transform", "hover:-translate-y-0.5", ].join(" ")}>
              <div aria-hidden className={[
                  "pointer-events-none absolute inset-0",
                  "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                ].join(" ")}
                style={{
                  boxShadow: "0 0 0 1px color-mix(in oklab, var(--accent) 38%, transparent)",
                }}
              />

              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3"> 
                  <Badge variant="secondary" className="border border-border bg-background text-foreground">
                    {g.status}
                  </Badge>

                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 80%, transparent)" }} />
                </div>

                <CardTitle className="text-lg text-foreground">{g.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{g.blurb}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="relative overflow-hidden rounded-xl border border-border bg-background aspect-4/6">
                  <Image
                    src={g.image}
                    alt="game cover"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {g.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 text-sm text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex items-center justify-between gap-3">
                <Button asChild className="w-full">
                  <Link href={g.href}>View game</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}