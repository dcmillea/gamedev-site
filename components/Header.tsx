"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

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
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <header className="w-full">
      
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed left-1/2 top-8 z-50 w-[min(52rem,calc(100%-2rem))] -translate-x-1/2">
        <div
          className="relative isolate h-16 rounded-2xl border border-border overflow-hidden bg-background-inverse backdrop-blur"
        >
          <div className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-center px-6">
            <NavLinks links={leftLinks} className="justify-end gap-8 pr-16" />
            <div />
            <NavLinks links={rightLinks} className="justify-start gap-8 pl-16" />
          </div>
        </div>

        {/* Logo overlay */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div className="relative h-52 w-52 -translate-y-16 drop-shadow-[0_0_14px_rgba(0,0,0,0.25)]">
            <Image src={Logo} alt="Logo" fill className="object-contain" priority />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden relative h-20 flex items-center justify-between bg-background border-b border-border">
        <div>
          {/* Mobile menu button goes here */}
            <Button variant="outline" size="icon-lg" className="ml-6 mr-4 rounded-md" 
          onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <ModeToggle />
        </div>
        <div className="pointer-events-none">
          <div className="relative h-24 w-28 drop-shadow-[0_0_14px_rgba(0,0,0,0.25)]">
            <Image src={Logo} alt="Logo" fill className="object-contain" priority />
          </div>
        </div>

        {/* Mobile menu overlay */}
        {showMenu && (
        <div className="absolute left-0 top-full z-50 w-full border-b border-border bg-background shadow-lg">
          <nav className="flex flex-col gap-2 px-6 py-4">
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                onClick={() => setShowMenu(false)}>
                  {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
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
          className="text-sm font-medium text-foreground-inverse transition-colors hover:text-muted-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
