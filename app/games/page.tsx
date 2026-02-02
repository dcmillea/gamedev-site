import { FutureGameSection } from "@/components/games/FutureGameSection";
import { GamesHero } from "@/components/games/GamesHero";

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <GamesHero />
      <FutureGameSection />
    </main>
  );
}
