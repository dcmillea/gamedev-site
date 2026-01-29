import { FeaturedGames } from "@/components/FeaturedGames";
import { Guides } from "@/components/Guides";
import HeroVideo from "@/components/HeroVideo";
import { LatestDevlogs } from "@/components/LatestDevlogs";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroVideo />
      <FeaturedGames />
      <LatestDevlogs />
      <Guides />
    </main>
  );
}
