"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  discordHref?: string;
  youtubeHref?: string;
};

export function FollowTheBuild({
  discordHref = "/discord",
  youtubeHref = "/youtube",
}: Props) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full blur-[180px] opacity-70"
          style={{
            background:
              "radial-gradient(circle, var(--color-red), transparent 70%)",
          }}
        />
        <div
          className="absolute -left-30 top-24 h-96 w-96 rounded-full blur-[180px] opacity-60"
          style={{
            background:
              "radial-gradient(circle, var(--color-blue), transparent 70%)",
          }}
        />
        <div
          className="absolute -right-30 top-32 h-96 w-96 rounded-full blur-[180px] opacity-60"
          style={{
            background:
              "radial-gradient(circle, var(--color-green), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border border-border bg-background">
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
            {/* Left Copy */}
            <div>
              <p className="text-sm text-muted-foreground">Stay in the loop</p>
              <h2 className="mt-2 text-balance text-3xl font-semibold text-foreground sm:text-4xl">
                Follow the build
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Devlogs, guides, breakdowns, and livestreams
              </p>

              {/* What you get section */}

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary">Devlogs</Badge>
                <Badge variant="secondary">Guides</Badge>
                <Badge variant="secondary">Releases</Badge>
                <Badge variant="secondary">Livestreams</Badge>
              </div>

              {/* Secondary actions */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={discordHref}>Join Our Discord</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={discordHref}>Watch on Youtube</Link>
                </Button>
              </div>
            </div>

            {/* Right form */}
            {/* Right form */}
            <div className="lg:pl-6">
              <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
                <div className="rgb-cta__inner">
                  <p className="text-sm font-medium text-foreground">
                    Email updates
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Devlogs, guides, and major milestones. No spam.
                  </p>

                  <form
                    onSubmit={onSubmit}
                    className="mt-4 flex flex-col gap-3 sm:flex-row"
                  >
                    <Input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      className="flex-1"
                      aria-label="Email address"
                    />
                    <Button type="submit">Subscribe</Button>
                  </form>

                  <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                    <div className="rounded-lg border border-border px-3 py-2">
                      <span className="text-foreground">Frequency:</span>{" "}
                      occasional
                    </div>
                    <div className="rounded-lg border border-border px-3 py-2">
                      <span className="text-foreground">Content:</span> devlogs
                      + guides
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Unsubscribe anytime. Updates only when there’s real progress.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
