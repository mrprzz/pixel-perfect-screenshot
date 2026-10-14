import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { ComingSoon } from "@/components/vaero/ComingSoon";
import { universes } from "@/lib/universes";

export const Route = createFileRoute("/alertes")({
  head: () => ({
    meta: [
      { title: "Alertes — VÆRO" },
      { name: "description", content: "Bientôt : soyez prévenu quand une opportunité correspond à vos critères." },
      { property: "og:title", content: "Alertes — VÆRO" },
      { property: "og:description", content: "Les alertes d'opportunités arrivent bientôt sur VÆRO." },
    ],
  }),
  component: () => (
    <ComingSoon
      icon={<Bell className="h-6 w-6" />}
      title="Alertes"
      text="Vous pourrez définir des critères par univers et être prévenu dès qu'une opportunité apparaît. Cette fonction n'est pas encore connectée."
    >
      <div className="mt-6 flex flex-wrap gap-2 opacity-60">
        {universes.map((u) => (
          <span key={u.slug} data-u={u.slug} className="rounded-full border border-uni/40 px-3 py-1 text-xs text-uni">{u.short}</span>
        ))}
      </div>
    </ComingSoon>
  ),
});
