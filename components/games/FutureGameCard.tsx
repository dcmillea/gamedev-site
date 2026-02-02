import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type FutureGame = {
  title: string;
  tagline: string;
  mystery: string;
  imageSrc: string;
  href?: string;
  stage?: "Concept" | "Prototype" | "Paused";
  accent?: "red" | "blue" | "green";
};

function accentColor(accent: FutureGame["accent"]) {
  if (accent === "red") return "var(--color-red)";
  if (accent === "blue") return "var(--color-blue)";
  if (accent === "green") return "var(--color-green)";
  return "color mix(in oklab, var(--foreground) 18%, transparent)";
}

export function FutureGameCard({ game }: { game: FutureGame }) {
  const accent = accentColor(game.accent);

  return (
    <Card className="group relative overflow-hidden border border-border bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity-o duration-200 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 0 1px color-mix(in oklab, ${accent} 35%, transparent)`,
        }}
      />

      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant={"secondary"}>{game.stage ?? "Concept"}</Badge>
          <span
            aria-hidden
            className="h-2 w-2 rounded-full"
            style={{
              background: `color-mix(in oklab, ${accent} 75%, transparent)`,
            }}
          />
          <span className="truncate">{game.tagline}</span>
        </div>
        <CardTitle className="text-lg text-foreground">{game.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative overflow-hidden rounded-xl border border-border bg-background aspect-2/3">
          <Image
            src={game.imageSrc}
            alt={`${game.title} cover`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklab, var(--background) 92%, transparent), transparent)",
            }}
          />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {game.mystery}
        </p>

        {game.href ? (
          <Button asChild variant={"outline"} className="w-full">
            <Link href={game.href}>View Project</Link>
          </Button>
        ) : (
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground">
            <span>Details are intentionally quiet.</span>
            <span
              className="h-1.5 w-10 rounded-full"
              aria-hidden
              style={{
                background: `linear-gradient(to right,
                  color-mix(in oklab, ${accent} 60%, transparent),
                  transparent)`,
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
