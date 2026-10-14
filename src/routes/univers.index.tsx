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
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-10 md:pt-20 md:pb-14">
        <p className="eyebrow animate-rise">Six univers</p>
        <h1 className="animate-rise mt-4 max-w-2xl text-4xl leading-[1.05] md:text-6xl" style={{ animationDelay: "80ms" }}>
          Identifier les biens sous-évalués, avec méthode.
        </h1>
        <p className="animate-rise mt-5 max-w-lg text-muted-foreground" style={{ animationDelay: "160ms" }}>
          Prix annoncé, valeur estimée, frais et marge potentielle — réunis en un coup d'œil.
        </p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-x-6 gap-y-10 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {universes.map((u, i) => (
          <Link
            key={u.slug}
            to="/univers/$slug"
            params={{ slug: u.slug }}
            data-u={u.slug}
            className="animate-rise group block"
            style={{ animationDelay: `${150 + i * 60}ms` }}
          >
            <div className="overflow-hidden rounded-xl bg-muted">
              <img
                src={u.image}
                alt={u.name}
                loading={i < 2 ? "eager" : "lazy"}
                width={1280}
                height={960}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 border-t pt-4">
              <div>
                <p className="text-xs font-medium text-uni">{u.index}</p>
                <h2 className="mt-1 text-2xl leading-tight">{u.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{u.tagline}</p>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </div>
          </Link>
        ))}
      </section>
    </Shell>
  );
}
