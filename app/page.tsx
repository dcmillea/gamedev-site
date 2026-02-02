import { FollowTheBuild } from "@/components/home/FollowTheBuild";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { Guides } from "@/components/home/Guides";
import HeroVideo from "@/components/home/HeroVideo";
import { LatestDevlogs } from "@/components/home/LatestDevlogs";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroVideo />
      <FeaturedGames />
      <LatestDevlogs />
      <Guides />
      <FollowTheBuild />
    </main>
  );
}
