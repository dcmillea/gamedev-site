"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroVideo() {
  const ref = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    // Helps to avoid autoplay not starting on some browsers
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-28">
      <div className="relative h-[78vh] min-h-135 w-full overflow-hidden rounded-3xl border border-border">
        <video ref={ref} className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata">
          <source src={"/hero.webm"} type="video/webm" />
        </video>

        {/* Overlay content */}
        <div className="absolute inset-0 bg-linear-to-t from-background/60 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />


        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full">
            <div className="mx-auto max-w-7xl px-4 pb-10">
              <div className="max-w-2xl space-y-5">
                <p className="inline-flex w-fit items-center rounded-full border border-border bg-background/55 px-3 py-1 text-xs font-medium text-foreground dark:text-muted-foreground backdrop-blur">
                  Indie Game Dev • Devlogs • Guides • Community
                </p>

                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                  Watch the build.
                  <br />
                  Join the Squad.
                </h1>

                <p className="text-base text-foreground dark:text-muted-foreground md:text-lg">
                  New devlogs, playable builds, and breakdowns from prototype to release.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant={"link"} className="h-11">
                    <Link href={"/games"}>Explore Games</Link>
                  </Button>

                  <Button asChild variant={"outline"} className="h-11 bg-background/50 backdrop-blur">
                    <Link href={"/devlogs"}>Latest Devlogs</Link>
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-black dark:text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green" />
                      Bi-Weekly Updates
                  </span>
                  <span className="h-3 w-px bg-border" />
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue" />
                    Tutorials + Breakdowns
                  </span>
                  <span className="h-3 w-px bg-border" />
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red" />
                    Community
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

        { /* Bottom fade */ }
        <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-linear-to-t from-background/50 to-transparent" />

      </div>
    </section>
  )
}