import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VÆRO — Intelligence des opportunités d'achat-revente" },
      { name: "description", content: "VÆRO repère les biens potentiellement sous-évalués et estime leur marge de revente, dans six univers." },
      { property: "og:title", content: "VÆRO — Intelligence des opportunités" },
      { property: "og:description", content: "Repérez, analysez, estimez. Six univers d'opportunités d'achat-revente." },
    ],
  }),
  component: Intro,
});

function Intro() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/univers" }), 4500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex min-h-[100svh] flex-col bg-background px-6">
      <div className="flex justify-end pt-5">
        <Link to="/univers" className="eyebrow transition-colors hover:text-foreground">
          Passer
        </Link>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="animate-fade font-display text-6xl tracking-[0.28em] md:text-8xl" style={{ animationDelay: "150ms" }}>
          VÆRO
        </h1>
        <span className="animate-line mt-6 block h-px w-24 bg-foreground/30" style={{ animationDelay: "700ms" }} />
        <p className="animate-rise mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground" style={{ animationDelay: "1100ms" }}>
          L'analyse des opportunités d'achat et de revente.
        </p>
        <Link
          to="/univers"
          className="animate-rise mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
          style={{ animationDelay: "1500ms" }}
        >
          Accéder au site <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <p className="eyebrow pb-6 text-center">Version de démonstration</p>
    </div>
  );
}
