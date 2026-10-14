import { Link } from "@tanstack/react-router";
import { Heart, Bell, Sparkles, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";

export function Logo({ className = "" }: { className?: string }) {
  return <span className={`font-display font-bold tracking-[0.3em] text-gold ${className}`}>VÆRO</span>;
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-warning">
      <span className="h-1.5 w-1.5 rounded-full bg-warning" />
      Données de démonstration
    </span>
  );
}

const nav = [
  { to: "/univers", label: "Univers", icon: LayoutGrid },
  { to: "/favoris", label: "Favoris", icon: Heart },
  { to: "/alertes", label: "Alertes", icon: Bell },
  { to: "/assistant", label: "Assistant", icon: Sparkles },
] as const;

export function Shell({ children, universe }: { children: ReactNode; universe?: string }) {
  return (
    <div data-u={universe} className="relative min-h-screen pb-24 md:pb-0">
      <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link to="/univers" aria-label="Accueil VÆRO">
            <Logo className="text-lg" />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "bg-accent text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <DemoBadge />
        </div>
      </header>
      <main>{children}</main>
      <nav className="glass fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-2xl py-2 md:hidden">
        {nav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] text-muted-foreground"
            activeProps={{ className: "text-primary" }}
          >
            <n.icon className="h-5 w-5" />
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
