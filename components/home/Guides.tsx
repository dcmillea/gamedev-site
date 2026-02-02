import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type GuideCategory = "UE5" | "Blender" | "Game Design";

type Guide = {
  title: string;
  excerpt: string;
  category: GuideCategory;
  level: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  href: string;
  featured?: boolean;
};

const CATEGORIES: GuideCategory[] = ["UE5", "Blender", "Game Design"];

const GUIDES: Guide[] = [
  {
    title: "UE5 FPS Arms Rig: From Blender to In-Game",
    excerpt: "A clean pipeline for first-person arms that won’t fight your camera, IK, or retargeting.",
    category: "UE5",
    level: "Intermediate",
    minutes: 18,
    href: "/guides/ue5-fps-arms-rig",
    featured: true,
  },
  {
    title: "Blender Symmetry + Remesh: Fixing the ‘One Side Only’ Problem",
    excerpt: "Why symmetry breaks, how to restore it, and what to avoid when remeshing mid-sculpt.",
    category: "Blender",
    level: "Beginner",
    minutes: 10,
    href: "/guides/blender-symmetry-remesh",
  },
  {
    title: "Combat Feel: Hit Stop, Camera Shake, and Timing",
    excerpt: "A practical checklist for punchy combat without making players nauseous.",
    category: "Game Design",
    level: "Intermediate",
    minutes: 12,
    href: "/guides/combat-feel-checklist",
  },
  {
    title: "C++ Programming for Unreal Engine 5",
    excerpt: "How to code inside the engine using C++.",
    category: "UE5",
    level: "Beginner",
    minutes: 9,
    href: "/guides/nextjs-content-structure",
  },
  {
    title: "How to Sculpt so that your models look like AAA models",
    excerpt: "Here's my workflow for the fast development process inside of Blender.",
    category: "Blender",
    level: "Beginner",
    minutes: 8,
    href: "/guides/portfolio-that-lands",
  },
];

function metaLabel(g: Guide) {
  return `${g.level} • ${g.minutes} min`
}

export function Guides() {
  const featured = GUIDES.find((g) => g.featured) ?? GUIDES[0];
  const rest = GUIDES.filter((g) => g !== featured);

  return (
    <section aria-labelledby="guides" className="relative w-full">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm text-muted-foreground">Evergreen knowledge</p>
            <h2 id="guides" className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Guides
            </h2>
            <p className="mt-3 text-muted-foreground">
              Short, practical writeups on our pipeline—Unreal, Blender, design, and shipping workflows.
            </p>
          </div>

          <Button asChild variant="outline" className="shrink-0">
            <Link href="/guides">Browse all</Link>
          </Button>
        </div>

        {/* Category chips (pure UI / optional) */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Featured */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{featured.category}</Badge>
                <span>{metaLabel(featured)}</span>
              </div>

              <CardTitle className="text-xl sm:text-2xl">
                <Link href={featured.href} className="hover:underline">
                  {featured.title}
                </Link>
              </CardTitle>

              <p className="text-muted-foreground">{featured.excerpt}</p>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button asChild>
                <Link href={featured.href}>Read guide</Link>
              </Button>

              <Link href="/guides" className="text-sm text-muted-foreground hover:underline">
                View more guides →
              </Link>
            </CardContent>
          </Card>

          {/* Grid list */}
          <div className="grid gap-4">
            {rest.slice(0, 3).map((g) => (
              <Card key={g.title} className="transition hover:bg-muted/40">
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{g.category}</Badge>
                    <span>{metaLabel(g)}</span>
                  </div>

                  <CardTitle className="text-base">
                    <Link href={g.href} className="hover:underline">
                      {g.title}
                    </Link>
                  </CardTitle>

                  <p className="text-sm text-muted-foreground">{g.excerpt}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}