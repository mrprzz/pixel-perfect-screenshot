import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import intro from "@/assets/intro.jpg";

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
  return (
    <div className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-background">
      <img
        src={intro}
        alt=""
        width={1088}
        height={1920}
        className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <div className="relative z-10 flex justify-end p-5">
        <Link
          to="/univers"
          className="animate-rise rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
          style={{ animationDelay: "600ms" }}
        >
          Passer l'intro
        </Link>
      </div>

      <div className="relative z-10 mt-auto flex flex-col items-center px-6 pb-16 text-center md:pb-24">
        <p
          className="animate-rise mb-6 text-[11px] uppercase tracking-[0.5em] text-muted-foreground"
          style={{ animationDelay: "300ms" }}
        >
          Intelligence d'opportunités
        </p>
        <h1 className="flex text-6xl font-bold md:text-8xl" aria-label="VÆRO">
          {"VÆRO".split("").map((l, i) => (
            <span
              key={i}
              className="animate-letter text-gold tracking-[0.15em]"
              style={{ animationDelay: `${500 + i * 180}ms` }}
            >
              {l}
            </span>
          ))}
        </h1>
        <p
          className="animate-rise mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground"
          style={{ animationDelay: "1500ms" }}
        >
          Repérer les biens sous-évalués. Estimer leur juste valeur. Anticiper la marge.
        </p>
        <Link
          to="/univers"
          className="animate-rise group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-primary/40 bg-primary/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground"
          style={{ animationDelay: "1900ms" }}
        >
          <span className="animate-sweep pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          Entrer dans l'univers
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
