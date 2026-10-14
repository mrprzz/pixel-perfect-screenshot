import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X, ArrowLeft } from "lucide-react";
import { Shell } from "@/components/vaero/Shell";
import { OpportunityCard } from "@/components/vaero/OpportunityCard";
import { applyFilters, getUniverse, margin, universes, type FilterState } from "@/lib/universes";

export const Route = createFileRoute("/univers/$slug")({
  loader: ({ params }) => {
    const u = getUniverse(params.slug);
    if (!u) throw notFound();
    return { slug: u.slug, name: u.name, tagline: u.tagline };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — VÆRO` },
          { name: "description", content: `Opportunités ${loaderData.name.toLowerCase()} : ${loaderData.tagline} Données de démonstration.` },
          { property: "og:title", content: `${loaderData.name} — VÆRO` },
          { property: "og:description", content: `Explorez l'univers ${loaderData.name} sur VÆRO.` },
        ]
      : [{ title: "Univers introuvable — VÆRO" }, { name: "robots", content: "noindex" }],
  }),
  component: UniversePage,
});

type Sort = "margin" | "confidence" | "price";

function UniversePage() {
  const { slug } = Route.useParams();
  const u = getUniverse(slug)!;
  const [state, setState] = useState<FilterState>({});
  const [sort, setSort] = useState<Sort>("margin");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const r = applyFilters(u, state);
    return [...r].sort((a, b) =>
      sort === "margin" ? margin(b) - margin(a) : sort === "confidence" ? b.confidence - a.confidence : a.price - b.price,
    );
  }, [u, state, sort]);

  const active = Object.values(state).filter(Boolean).length;
  const field = "w-full rounded-xl border bg-input/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-uni";

  const filters = (
    <div className="grid gap-4">
      {u.filters.map((f) => (
        <label key={f.key} className="grid gap-1.5">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {f.label} {f.type !== "select" && f.unit ? `(${f.unit})` : ""}
          </span>
          {f.type === "select" ? (
            <select
              className={field}
              value={state[f.key] ?? ""}
              onChange={(e) => setState((s) => ({ ...s, [f.key]: e.target.value }))}
            >
              <option value="">Tous</option>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              inputMode="numeric"
              step={f.step}
              placeholder={f.type === "max" ? "Sans limite" : "Aucun minimum"}
              className={field}
              value={state[f.key] ?? ""}
              onChange={(e) => setState((s) => ({ ...s, [f.key]: e.target.value }))}
            />
          )}
        </label>
      ))}
      {active > 0 && (
        <button onClick={() => setState({})} className="text-left text-sm text-uni underline-offset-4 hover:underline">
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );

  return (
    <Shell universe={u.slug}>
      <section className="relative overflow-hidden">
        <img src={u.image} alt="" width={1024} height={1280} className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background" />
        <div className="relative mx-auto max-w-6xl px-5 pt-8 pb-10 md:pt-16">
          <Link to="/univers" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Univers
          </Link>
          <p className="animate-rise mt-6 font-display text-sm text-uni">{u.index} / 06</p>
          <h1 className="animate-rise mt-2 text-4xl font-bold md:text-6xl" style={{ animationDelay: "80ms" }}>{u.name}</h1>
          <p className="animate-rise mt-3 max-w-md text-muted-foreground" style={{ animationDelay: "160ms" }}>{u.tagline}</p>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {universes.map((x) => (
              <Link
                key={x.slug}
                to="/univers/$slug"
                params={{ slug: x.slug }}
                className="glass shrink-0 rounded-full px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "border-uni text-uni" }}
              >
                {x.short}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 md:grid-cols-[260px_1fr]">
        <aside className="hidden md:block">
          <div className="sticky top-20 rounded-2xl border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">Filtres</h2>
            {filters}
          </div>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span> exemple{results.length > 1 ? "s" : ""} fictif{results.length > 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <select
                aria-label="Trier"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border bg-card px-3 py-2 text-xs outline-none focus:border-uni"
              >
                <option value="margin">Marge</option>
                <option value="confidence">Confiance</option>
                <option value="price">Prix croissant</option>
              </select>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs md:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filtres{active ? ` · ${active}` : ""}
              </button>
            </div>
          </div>

          <p className="mb-5 rounded-xl border border-warning/30 bg-warning/5 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            Annonces, prix et scores sont des <strong className="text-warning">exemples fictifs</strong> à but de démonstration. Aucune analyse IA n'est encore connectée.
          </p>

          {results.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {results.map((o, i) => (
                <OpportunityCard key={o.id} o={o} delay={i * 70} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
              Aucun exemple ne correspond à ces filtres.
            </div>
          )}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Filtres">
          <button aria-label="Fermer" onClick={() => setOpen(false)} className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          <div className="animate-rise absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto rounded-t-3xl border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtres</h2>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="rounded-full border p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            {filters}
            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-full bg-uni py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Voir {results.length} résultat{results.length > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
}
