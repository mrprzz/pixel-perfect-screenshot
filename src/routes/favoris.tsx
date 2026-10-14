import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/vaero/Shell";
import { OpportunityCard } from "@/components/vaero/OpportunityCard";
import { useFavorites } from "@/lib/favorites";
import { universes } from "@/lib/universes";

export const Route = createFileRoute("/favoris")({
  head: () => ({
    meta: [
      { title: "Favoris — VÆRO" },
      { name: "description", content: "Vos opportunités enregistrées sur VÆRO." },
      { property: "og:title", content: "Favoris — VÆRO" },
      { property: "og:description", content: "Retrouvez les opportunités que vous suivez." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { ids } = useFavorites();
  const groups = universes
    .map((u) => ({ u, items: u.items.filter((o) => ids.includes(o.id)) }))
    .filter((g) => g.items.length);

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-4xl md:text-5xl">Favoris</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enregistrés sur cet appareil uniquement, en attendant les comptes.</p>
        {groups.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed p-10 text-center">
            <p className="text-muted-foreground">Aucun favori pour l'instant.</p>
            <Link to="/univers" className="mt-4 inline-block text-sm text-primary hover:underline">Explorer les univers</Link>
          </div>
        ) : (
          groups.map(({ u, items }) => (
            <div key={u.slug} data-u={u.slug} className="mt-10">
              <h2 className="mb-4 text-2xl">{u.name}</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {items.map((o) => <OpportunityCard key={o.id} o={o} />)}
              </div>
            </div>
          ))
        )}
      </section>
    </Shell>
  );
}
