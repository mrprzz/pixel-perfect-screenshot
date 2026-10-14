import { Heart } from "lucide-react";
import { eur, margin, type Opportunity } from "@/lib/universes";
import { useFavorites } from "@/lib/favorites";

export function OpportunityCard({ o, delay = 0 }: { o: Opportunity; delay?: number }) {
  const { has, toggle } = useFavorites();
  const fav = has(o.id);
  const m = margin(o);
  const pct = Math.round((m / o.price) * 100);
  const tone = o.confidence >= 75 ? "text-foreground" : o.confidence >= 65 ? "text-foreground" : "text-muted-foreground";

  return (
    <article
      className="animate-rise relative rounded-xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-md"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl leading-tight">{o.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{o.subtitle}</p>
        </div>
        <button
          onClick={() => toggle(o.id)}
          aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={fav}
          className="rounded-full border p-2 transition-colors hover:bg-muted"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-uni text-uni" : "text-muted-foreground"}`} />
        </button>
      </div>

      <dl className="relative mt-5 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Prix annoncé</dt>
          <dd className="mt-1 font-semibold">{eur(o.price)}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Valeur estimée</dt>
          <dd className="mt-1 font-semibold">{eur(o.market)}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Frais estimés</dt>
          <dd className="mt-1 font-semibold">{eur(o.fees)}</dd>
        </div>
      </dl>

      <div className="relative mt-5 flex items-end justify-between border-t pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Marge potentielle</p>
          <p className="mt-0.5 text-2xl font-semibold tracking-tight text-success">
            {m > 0 ? "+" : ""}
            {eur(m)} <span className="text-sm font-medium text-muted-foreground">({pct}%)</span>
          </p>
        </div>
        <div className="w-24 text-right">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Confiance</p>
          <p className={`text-sm font-semibold ${tone}`}>{o.confidence}/100</p>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-foreground/70" style={{ width: `${o.confidence}%` }} />
          </div>
        </div>
      </div>
    </article>
  );
}
