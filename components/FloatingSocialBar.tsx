"use client";

import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube, Music2, Facebook } from "lucide-react";

type Social = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const socials: Social[] = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
  { label: "TikTok", href: "https://tiktok.com", Icon: Music2 },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
];

export default function FloatingSocialBar() {
  return (
    <aside className="fixed right-8 bottom-6 z-50 hidden md:block">
      <div
        className="
          flex w-14 flex-col items-center
          gap-2
          rounded-md border border-border
          bg-background/80 backdrop-blur
          px-2 py-3
        "
      >
        {/* Theme toggle — same box as icons */}
        <div className="flex h-10 w-10 items-center justify-center rounded-sm">
          <ModeToggle />
        </div>

        {/* Divider (tight) */}
        <div className="my-0.5 h-px w-6 bg-black" />

        {/* Social icons */}
        {socials.map(({ label, href, Icon }) => (
          <Button
            key={label}
            asChild
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-sm border"
          >
            <Link
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}