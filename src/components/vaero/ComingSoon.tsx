import type { ReactNode } from "react";
import { Shell } from "./Shell";

export function ComingSoon({ icon, title, text, children }: { icon: ReactNode; title: string; text: string; children?: ReactNode }) {
  return (
    <Shell>
      <section className="mx-auto max-w-2xl px-5 py-12">
        <div className="animate-rise relative overflow-hidden rounded-3xl border bg-card p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative">
            <div className="mb-6 inline-flex rounded-2xl border bg-accent p-3 text-primary">{icon}</div>
            <span className="ml-3 rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">Bientôt disponible</span>
            <h1 className="mt-4 text-3xl font-bold">{title}</h1>
            <p className="mt-3 text-muted-foreground">{text}</p>
            {children}
          </div>
        </div>
      </section>
    </Shell>
  );
}
