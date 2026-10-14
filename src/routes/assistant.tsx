import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Send } from "lucide-react";
import { ComingSoon } from "@/components/vaero/ComingSoon";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Assistant IA — VÆRO" },
      { name: "description", content: "Bientôt : un assistant IA pour analyser une annonce et estimer sa marge." },
      { property: "og:title", content: "Assistant IA — VÆRO" },
      { property: "og:description", content: "L'assistant d'analyse VÆRO arrive bientôt." },
    ],
  }),
  component: () => (
    <ComingSoon
      icon={<Sparkles className="h-6 w-6" />}
      title="Assistant IA"
      text="Collez une annonce, l'assistant estimera sa valeur et la marge possible. L'assistant n'est pas encore connecté : aucune réponse ne sera générée."
    >
      <div className="mt-6 flex items-center gap-2 rounded-full border bg-input/40 p-1.5 pl-4 opacity-60">
        <input disabled placeholder="Ex. : Golf 7 GTI 2016, 90 000 km, 15 500 €" className="flex-1 bg-transparent text-sm outline-none" />
        <button disabled aria-label="Envoyer" className="rounded-full bg-primary p-2.5 text-primary-foreground">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </ComingSoon>
  ),
});
