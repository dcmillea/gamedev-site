import { FeaturedGames } from "@/components/FeaturedGames";
import HeroVideo from "@/components/HeroVideo";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroVideo />
      <FeaturedGames />
    </main>
  );
}
