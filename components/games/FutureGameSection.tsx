import {
  FutureGameCard,
  type FutureGame,
} from "@/components/games/FutureGameCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import codename_sw_image from "@/public/codename_sw.png";
import codename_c3_f2_image from "@/public/codename_c3_f2.png";

const FUTURE_GAMES: FutureGame[] = [
  {
    title: "Codename: SW",
    tagline: "Don't be late...",
    mystery:
      "4D 49 4C 4C 45 41 53 54 55 44 49 4F 53 2E 43 4F 4D 2F 43 4F 44 45",
    imageSrc: codename_sw_image.src,
    stage: "Concept",
    accent: "blue",
    // href: "/games/retro-tv-apocalypse",
  },
  {
    title: "CodeName: C3_F2",
    tagline: "Then it is an even fight...",
    mystery: "4E 41 4D 45 53 45 43 52 45 54 50 41 47 45 36 35 35 32 34 37 31",
    imageSrc: codename_c3_f2_image.src,
    stage: "Concept",
    accent: "red",
    // href: "/games/retro-tv-apocalypse",
  },
];

export function FutureGameSection() {
  return (
    <section className="relative w-full" aria-labelledby="future-games">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm text-muted-foreground">On the horizon</p>
            <h2
              id="future-games"
              className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl"
            >
              Future Projects
            </h2>
            <p className="mt-3 text-muted-foreground">
              Early concepts and prototypes. Less noise, more mystery-kept here
              as a living archive of ideas.
            </p>
          </div>

          <Button asChild variant={"outline"} className="shrink-0">
            <Link href={"/devlogs"}>See progress</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {FUTURE_GAMES.map((g) => (
            <FutureGameCard key={g.title} game={g} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-background p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">
            These projects are intentionally less defined. When one returns to
            production, it will move up into the featured lineup.
          </p>
        </div>
      </div>
    </section>
  );
}
