export type GuideCategory = "Unreal" | "Blender" | "Game Design";

export type Guide = {
  title: string;
  excerpt: string;
  category: GuideCategory;
  level: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  href: string;
  cover?: string;
};

export const GUIDES: Guide[] = [
  {
    title: "UE5 FPS Arms Rig: Blender → Unreal Pipeline",
    excerpt:
      "A clean workflow for first-person arms that won’t fight the camera, IK, or retargeting.",
    category: "Unreal",
    level: "Intermediate",
    minutes: 18,
    href: "/guides/ue5-fps-arms-rig",
    cover: "/media/guides/ue5-arms.jpg",
  },
  {
    title: "Combat Feel: Hit Stop, Camera Shake, Timing",
    excerpt:
      "A practical checklist for punchy combat that stays readable and controllable.",
    category: "Game Design",
    level: "Intermediate",
    minutes: 12,
    href: "/guides/combat-feel",
    cover: "/media/guides/combat-feel.jpg",
  },
  {
    title: "Blender Symmetry That Doesn’t Break",
    excerpt:
      "How symmetry breaks, how to restore it, and what to avoid mid-sculpt.",
    category: "Blender",
    level: "Beginner",
    minutes: 10,
    href: "/guides/blender-symmetry",
    cover: "/media/guides/blender-symmetry.jpg",
  },
  {
    title: "Next.js Content Structure for Games / Devlogs / Guides",
    excerpt:
      "A scalable folder model that prevents rewrites as your site grows.",
    category: "Blender",
    level: "Beginner",
    minutes: 9,
    href: "/guides/nextjs-content-structure",
    cover: "/media/guides/next-structure.jpg",
  },
  {
    title: "Portfolio That Lands Interviews Without Fancy Design",
    excerpt:
      "What recruiters scan for and how to present projects with measurable impact.",
    category: "Unreal",
    level: "Beginner",
    minutes: 8,
    href: "/guides/portfolio-that-lands",
    cover: "/media/guides/portfolio.jpg",
  },
];
