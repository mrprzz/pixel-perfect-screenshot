import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Shell } from "@/components/vaero/Shell";
import { universes } from "@/lib/universes";

export const Route = createFileRoute("/univers/")({
  head: () => ({
    meta: [
      { title: "Choisir un univers — VÆRO" },
      { name: "description", content: "Automobile, moto, immobilier, high-tech, mode et matériel pro : six univers d'opportunités." },
      { property: "og:title", content: "Six univers d'opportunités — VÆRO" },
      { property: "og:description", content: "Choisissez votre univers et explorez des opportunités d'achat-revente." },
    ],
  }),
  component: Universes,
});

function Universes() {
  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-8">
        <p className="animate-rise text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Six univers</p>
        <h1 className="animate-rise mt-3 text-4xl font-bold md:text-6xl" style={{ animationDelay: "100ms" }}>
          Où chercher <span className="text-gold">la prochaine marge</span> ?
        </h1>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {universes.map((u, i) => (
          <Link
            key={u.slug}
            to="/univers/$slug"
            params={{ slug: u.slug }}
            data-u={u.slug}
            className="animate-rise group relative block aspect-[4/5] overflow-hidden rounded-3xl border transition-all duration-700 hover:border-uni/60 hover:glow-uni sm:aspect-[3/4]"
            style={{ animationDelay: `${150 + i * 90}ms` }}
          >
            <img
              src={u.image}
              alt={u.name}
              loading={i < 2 ? "eager" : "lazy"}
              width={1024}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-uni transition-transform duration-700 group-hover:scale-x-100" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm text-uni">{u.index}</span>
                <span className="glass rounded-full p-2 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold leading-tight">{u.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{u.tagline}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </Shell>
  );
}
