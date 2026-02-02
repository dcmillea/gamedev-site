import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Guide } from "./GuideTypes";

function metaLabel(g: Guide) {
  return `${g.level} • ${g.minutes} min`;
}

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Card className="group overflow-hidden border border-border bg-background transition hover:bg-muted/40">
      {guide.cover ? (
        <div className="relative aspect-video w-full border-b border-border bg-background ">
          <Image
            src={guide.cover}
            alt="guide cover"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : null}

      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant={"secondary"}>{guide.category}</Badge>
          <span>{metaLabel(guide)}</span>
        </div>

        <CardTitle className="text-base sm:text-lg">
          <Link href={guide.href} className="hover:underline">
            {guide.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{guide.excerpt}</p>
      </CardContent>
    </Card>
  );
}
