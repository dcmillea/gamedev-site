import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/public/logo.png";

type Props = {
  discordHref?: string;
  youtubeHref?: string;
};

export function Footer({
  discordHref = "/discord",
  youtubeHref = "/youtube",
}: Props) {
  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-24 bottom-0 h-72 w-72 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-blue) 28%, transparent), transparent)",
          }}
        />
        <div
          className="absolute left-1/2 -bottom-30 h-80 w-80 -translate-x-1/2 rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-red) 28%, transparent), transparent)",
          }}
        />
        <div
          className="absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-green) 28%, transparent), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:col-span-4">
          <Link href={"/"} className="inline-flex items-center gap-3">
            <Image src={Logo} width={100} height={100} alt="logo" />
            <div className="leading-tight">
              <div className="text-base font-semibold text-foreground">
                Millea Studios
              </div>
              <div className="text-sm text-muted-foreground">
                Games • Devlogs • Guides
              </div>
            </div>
          </Link>

          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Building games, making devlogs, and sharing practical guides on game
            development.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant={"outline"}
              className="justify-start sm:justify-center"
            >
              <Link href={discordHref}>Discord</Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              className="justify-start sm:justify-center"
            >
              <Link href={youtubeHref}>Youtube</Link>
            </Button>
          </div>

          <div
            aria-hidden
            className="mt-7 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, color-mix(in oklab, var(--color-red) 55%, transparent), color-mix(in oklab, var(--color-blue) 55%, transparent), color-mix(in oklab, var(--color-green) 55%, transparent))",
            }}
          />
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-span-8 lg:grid-cols-4">
          <FooterCol
            title="Games"
            links={[
              { label: "Featured", href: "/#featured-games" },
              { label: "All Games", href: "/games" },
              { label: "Playtests", href: "/playtests" },
            ]}
          />
          <FooterCol
            title="Devlogs"
            links={[
              { label: "Latest", href: "/#devlogs" },
              { label: "All devlogs", href: "/devlogs" },
              { label: "Changelog", href: "/changelog" },
            ]}
          />
          <FooterCol
            title="Guides"
            links={[
              { label: "Browse", href: "/guides" },
              { label: "UE5", href: "/guides?tag=unreal" },
              { label: "Blender", href: "/guides?tag=blender" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Press kit", href: "/press" },
            ]}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 border-t border-border py-6 px-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © 2026 Millea Studios. All right reserved.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={"/privacy"}
          >
            Privacy
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={"/terms"}
          >
            Terms of Service
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground"
            href={"/brand"}
          >
            Brand
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
