import GuideCard from "./GuideCard";
import type { Guide, GuideCategory } from "./GuideTypes";

export function GuidesGridSection({
  title = "Guides",
  subtitle = "Short, practical breakdowns of everything game dev.",
  guides,
  categories,
}: {
  title?: string;
  subtitle?: string;
  guides: Guide[];
  categories: GuideCategory[];
}) {
  return (
    <section aria-labelledby="guides-title" className="relative w-full">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Evergreen knowledge</p>
          <h1
            id="guides-title"
            className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl"
          >
            {title}
          </h1>
          <p className="mt-4 text-muted-foreground">{subtitle}</p>
        </div>

        {categories?.length ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <GuideCard key={g.href} guide={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
