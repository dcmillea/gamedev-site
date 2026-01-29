import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NambeshDevlog_0_Thumbnail from "@/public/NambeshDevlog_0_Thumbnail.png"
import NambeshArtDirection from "@/public/Nambesh_ArtDirection.png"
import NambeshCombatLoop from "@/public/NambeshCombatLoop.png"
import NambeshMechanics from "@/public/NambeshCoreMechanics.png"

type Devlog = {
  title: string;
  excerpt: string;
  date: string;
  type: "Update" | "Breakdown" | "Art";
  href: string;
  image: string;
};

const DEVLOGS: Devlog[] = [
  {
    title: "Devlog 0: Building the prototype of Nambesh",
    excerpt:
      "A dive into the process of the building out the bare bones of Nambesh.",
    date: "Feb 8, 2026",
    type: "Update",
    href: "/devlogs/nambesh",
    image: NambeshDevlog_0_Thumbnail.src,
  },
  {
    title: "Art direction behind Nambesh",
    excerpt: "Showing the creative process behind Nambesh's world.",
    date: "Feb 15, 2026",
    type: "Art",
    href: "/devlogs/nambesh",
    image: NambeshArtDirection.src,
    },
  {
    title: "Devlog 1: Basic Combat Loop",
    excerpt: "The core combat loop of Nambesh comes to life.",
    date: "Feb 22, 2026",
    type: "Update",
    href: "/devlogs/nambesh",
    image: NambeshCombatLoop.src,
  },
  {
    title: "A Breakdown of mechanics within Nambesh",
    excerpt: "How does the core combat loop function? Find out!",
    date: "Mar 1, 2026",
    type: "Breakdown",
    href: "/devlogs/nambesh",
    image: NambeshMechanics.src,
  },
];

export function LatestDevlogs() {
  const [featured, ...rest] = DEVLOGS;

  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              In Progress
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Latest Devlogs
            </h2>
          </div>

          <Button asChild variant={"outline"}>
            <Link href={"/devlogs"}>View all</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="relative aspect-video">
              <Image src={featured.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 66vw, 100vw" />
            </div>

            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant={"secondary"}>{featured.type}</Badge>
                <span>{featured.date}</span>
              </div>

              <CardTitle className="text-xl">
                <Link href={featured.href} className="hover:underline">
                  {featured.title}
                </Link>
              </CardTitle>

              <p className="text-muted-foreground">
                {featured.excerpt}
              </p>

            </CardHeader>
          </Card>

          <div className="flex flex-col gap-4">
            {rest.map((post) => (
              <Link key={post.title} href={post.href} className="group rounded-lg border border-border p-4 transition hover:bg-muted/40">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant={"secondary"}>{post.type}</Badge>
                  <span>{post.date}</span>
                </div>

                <h3 className="mt-2 font-medium text-foreground group-hover:underline">
                  {post.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}