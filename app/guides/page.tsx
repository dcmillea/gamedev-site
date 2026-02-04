import { GuidesGridSection } from "@/components/guides/GuidesGridSection";
import { GUIDES } from "@/components/guides/GuideTypes";

export default function GuidesPage() {
  const categories = Array.from(new Set(GUIDES.map((g) => g.category)));

  return (
    <main>
      <GuidesGridSection
        title="Guides"
        subtitle="Practical writeups on Unreal, Blender, and Game Design."
        guides={GUIDES}
        // eslint-disable-next-line
        categories={categories as any}
      ></GuidesGridSection>
    </main>
  );
}
