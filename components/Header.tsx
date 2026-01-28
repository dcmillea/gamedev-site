"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";

const leftLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/guides", label: "Guides" },
  { href: "/devlogs", label: "Devlogs" },
];

const rightLinks = [
  { href: "/media", label: "Media" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="w-full">
      <div className="fixed left-1/2 top-8 z-50 w-[min(52rem,calc(100%-2rem))] -translate-x-1/2">
        <div
          className="relative isolate h-16 rounded-2xl border border-border overflow-hidden bg-background/80 backdrop-blur"
        >
          <div className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-center px-6">
            <NavLinks links={leftLinks} className="justify-end gap-8 pr-16" />
            <div />
            <NavLinks links={rightLinks} className="justify-start gap-8 pl-16" />
          </div>
        </div>

        {/* Logo overlay */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div className="relative h-28 w-28 -translate-y-6 drop-shadow-[0_0_14px_rgba(0,0,0,0.25)]">
            <Image src={Logo} alt="Logo" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLinks({
  links,
  className = "",
}: {
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <nav className={`flex items-center ${className}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
