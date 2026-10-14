import auto from "@/assets/auto.jpg";
import moto from "@/assets/moto.jpg";
import immo from "@/assets/immo.jpg";
import tech from "@/assets/tech.jpg";
import mode from "@/assets/mode.jpg";
import pro from "@/assets/pro.jpg";

export type Filter =
  | { key: string; label: string; type: "select"; options: string[] }
  | { key: string; label: string; type: "max" | "min"; step: number; unit?: string; field: string };

export type Opportunity = {
  id: string;
  title: string;
  subtitle: string;
  attrs: Record<string, string | number>;
  price: number;
  market: number;
  fees: number;
  confidence: number;
};

export type Universe = {
  slug: string;
  index: string;
  name: string;
  short: string;
  tagline: string;
  image: string;
  filters: Filter[];
  items: Opportunity[];
};

export const margin = (o: Opportunity) => o.market - o.price - o.fees;
export const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const priceFilters = (budgetStep: number, resaleStep: number): Filter[] => [
  { key: "budget", label: "Budget max", type: "max", step: budgetStep, unit: "€", field: "price" },
  { key: "resale", label: "Revente estimée min", type: "min", step: resaleStep, unit: "€", field: "market" },
];

export const universes: Universe[] = [
  {
    slug: "automobile",
    index: "01",
    name: "Automobile",
    short: "Auto",
    tagline: "Berlines, sportives, youngtimers.",
    image: auto,
    filters: [
      { key: "brand", label: "Marque", type: "select", options: ["Porsche", "BMW", "Audi", "Mercedes", "Peugeot", "Toyota"] },
      { key: "model", label: "Modèle", type: "select", options: ["911", "Cayman", "M3", "RS3", "Classe C", "308", "Yaris GR"] },
      { key: "year", label: "Année min", type: "min", step: 1, field: "year" },
      { key: "km", label: "Kilométrage max", type: "max", step: 10000, unit: "km", field: "km" },
      ...priceFilters(5000, 5000),
    ],
    items: [
      { id: "a1", title: "Porsche Cayman S", subtitle: "Exemple · 2014 · 98 000 km", attrs: { brand: "Porsche", model: "Cayman", year: 2014, km: 98000 }, price: 36900, market: 42500, fees: 1800, confidence: 78 },
      { id: "a2", title: "BMW M3 Competition", subtitle: "Exemple · 2018 · 61 000 km", attrs: { brand: "BMW", model: "M3", year: 2018, km: 61000 }, price: 52000, market: 57900, fees: 2200, confidence: 71 },
      { id: "a3", title: "Audi RS3 Sportback", subtitle: "Exemple · 2019 · 44 000 km", attrs: { brand: "Audi", model: "RS3", year: 2019, km: 44000 }, price: 41500, market: 45800, fees: 1500, confidence: 84 },
      { id: "a4", title: "Toyota Yaris GR", subtitle: "Exemple · 2021 · 22 000 km", attrs: { brand: "Toyota", model: "Yaris GR", year: 2021, km: 22000 }, price: 31900, market: 35400, fees: 900, confidence: 88 },
      { id: "a5", title: "Mercedes Classe C 300e", subtitle: "Exemple · 2020 · 79 000 km", attrs: { brand: "Mercedes", model: "Classe C", year: 2020, km: 79000 }, price: 27400, market: 29900, fees: 1300, confidence: 62 },
      { id: "a6", title: "Peugeot 308 GTi", subtitle: "Exemple · 2017 · 112 000 km", attrs: { brand: "Peugeot", model: "308", year: 2017, km: 112000 }, price: 14900, market: 17600, fees: 1100, confidence: 69 },
      { id: "a7", title: "Porsche 911 Carrera (997)", subtitle: "Exemple · 2008 · 135 000 km", attrs: { brand: "Porsche", model: "911", year: 2008, km: 135000 }, price: 44000, market: 51000, fees: 3200, confidence: 58 },
    ],
  },
  {
    slug: "moto",
    index: "02",
    name: "Moto",
    short: "Moto",
    tagline: "Roadsters, sportives, trails.",
    image: moto,
    filters: [
      { key: "type", label: "Type", type: "select", options: ["Roadster", "Sportive", "Trail", "Néo-rétro"] },
      { key: "cc", label: "Cylindrée min", type: "min", step: 100, unit: "cc", field: "cc" },
      { key: "km", label: "Kilométrage max", type: "max", step: 5000, unit: "km", field: "km" },
      ...priceFilters(1000, 1000),
    ],
    items: [
      { id: "m1", title: "Yamaha MT-09", subtitle: "Exemple · 2020 · 18 000 km", attrs: { type: "Roadster", cc: 890, km: 18000 }, price: 6900, market: 8100, fees: 350, confidence: 82 },
      { id: "m2", title: "Ducati Panigale V2", subtitle: "Exemple · 2021 · 9 000 km", attrs: { type: "Sportive", cc: 955, km: 9000 }, price: 13500, market: 15200, fees: 600, confidence: 70 },
      { id: "m3", title: "BMW R 1250 GS", subtitle: "Exemple · 2019 · 41 000 km", attrs: { type: "Trail", cc: 1254, km: 41000 }, price: 12900, market: 14600, fees: 700, confidence: 76 },
      { id: "m4", title: "Triumph Speed Twin", subtitle: "Exemple · 2022 · 6 000 km", attrs: { type: "Néo-rétro", cc: 1200, km: 6000 }, price: 9800, market: 10900, fees: 400, confidence: 65 },
    ],
  },
  {
    slug: "immobilier",
    index: "03",
    name: "Immobilier, garages & parkings",
    short: "Immobilier",
    tagline: "Box, parkings, petites surfaces.",
    image: immo,
    filters: [
      { key: "kind", label: "Type de bien", type: "select", options: ["Parking", "Garage / box", "Studio"] },
      { key: "city", label: "Ville", type: "select", options: ["Paris", "Lyon", "Bordeaux", "Marseille"] },
      { key: "surface", label: "Surface min", type: "min", step: 5, unit: "m²", field: "surface" },
      ...priceFilters(10000, 10000),
    ],
    items: [
      { id: "i1", title: "Box fermé sous-sol", subtitle: "Exemple · Lyon 7e · 14 m²", attrs: { kind: "Garage / box", city: "Lyon", surface: 14 }, price: 21000, market: 26500, fees: 2400, confidence: 74 },
      { id: "i2", title: "Place de parking", subtitle: "Exemple · Paris 11e · 12 m²", attrs: { kind: "Parking", city: "Paris", surface: 12 }, price: 28000, market: 33000, fees: 2900, confidence: 80 },
      { id: "i3", title: "Studio à rénover", subtitle: "Exemple · Bordeaux · 22 m²", attrs: { kind: "Studio", city: "Bordeaux", surface: 22 }, price: 89000, market: 112000, fees: 14500, confidence: 61 },
      { id: "i4", title: "Lot de 3 parkings", subtitle: "Exemple · Marseille 8e · 36 m²", attrs: { kind: "Parking", city: "Marseille", surface: 36 }, price: 42000, market: 51000, fees: 3800, confidence: 67 },
    ],
  },
  {
    slug: "high-tech",
    index: "04",
    name: "High-tech & gaming",
    short: "High-tech",
    tagline: "Consoles, GPU, smartphones.",
    image: tech,
    filters: [
      { key: "cat", label: "Catégorie", type: "select", options: ["Console", "Carte graphique", "Smartphone", "Ordinateur"] },
      { key: "state", label: "État", type: "select", options: ["Neuf", "Très bon", "Bon"] },
      ...priceFilters(100, 100),
    ],
    items: [
      { id: "t1", title: "RTX 4080 Super", subtitle: "Exemple · Très bon état", attrs: { cat: "Carte graphique", state: "Très bon" }, price: 780, market: 940, fees: 35, confidence: 81 },
      { id: "t2", title: "PS5 Slim + 2 manettes", subtitle: "Exemple · Bon état", attrs: { cat: "Console", state: "Bon" }, price: 330, market: 410, fees: 20, confidence: 86 },
      { id: "t3", title: "iPhone 15 Pro 256 Go", subtitle: "Exemple · Très bon état", attrs: { cat: "Smartphone", state: "Très bon" }, price: 720, market: 830, fees: 25, confidence: 77 },
      { id: "t4", title: "MacBook Pro M2 14\"", subtitle: "Exemple · Neuf", attrs: { cat: "Ordinateur", state: "Neuf" }, price: 1490, market: 1720, fees: 40, confidence: 72 },
    ],
  },
  {
    slug: "mode",
    index: "05",
    name: "Mode, sneakers & luxe",
    short: "Mode",
    tagline: "Sneakers, maroquinerie, montres.",
    image: mode,
    filters: [
      { key: "cat", label: "Catégorie", type: "select", options: ["Sneakers", "Sac", "Montre", "Vêtement"] },
      { key: "size", label: "Taille", type: "select", options: ["38", "40", "42", "44", "Unique"] },
      { key: "state", label: "État", type: "select", options: ["Neuf", "Très bon", "Bon"] },
      ...priceFilters(100, 100),
    ],
    items: [
      { id: "f1", title: "Sneakers édition limitée", subtitle: "Exemple · Taille 42 · Neuf", attrs: { cat: "Sneakers", size: "42", state: "Neuf" }, price: 240, market: 360, fees: 30, confidence: 79 },
      { id: "f2", title: "Sac cuir grainé vintage", subtitle: "Exemple · Très bon état", attrs: { cat: "Sac", size: "Unique", state: "Très bon" }, price: 1250, market: 1680, fees: 90, confidence: 66 },
      { id: "f3", title: "Montre automatique 40 mm", subtitle: "Exemple · Bon état", attrs: { cat: "Montre", size: "Unique", state: "Bon" }, price: 3900, market: 4600, fees: 180, confidence: 63 },
      { id: "f4", title: "Veste technique", subtitle: "Exemple · Taille 40 · Neuf", attrs: { cat: "Vêtement", size: "40", state: "Neuf" }, price: 180, market: 260, fees: 20, confidence: 74 },
    ],
  },
  {
    slug: "pro",
    index: "06",
    name: "Matériel professionnel",
    short: "Pro",
    tagline: "Outillage, machines, équipements.",
    image: pro,
    filters: [
      { key: "cat", label: "Catégorie", type: "select", options: ["Outillage", "Machine", "Restauration", "BTP"] },
      { key: "hours", label: "Heures d'usage max", type: "max", step: 500, unit: "h", field: "hours" },
      ...priceFilters(1000, 1000),
    ],
    items: [
      { id: "p1", title: "Lot outillage sans fil", subtitle: "Exemple · 12 pièces", attrs: { cat: "Outillage", hours: 200 }, price: 690, market: 980, fees: 60, confidence: 83 },
      { id: "p2", title: "Perceuse à colonne", subtitle: "Exemple · Atelier", attrs: { cat: "Machine", hours: 1500 }, price: 1200, market: 1650, fees: 150, confidence: 68 },
      { id: "p3", title: "Four mixte 10 niveaux", subtitle: "Exemple · Restauration", attrs: { cat: "Restauration", hours: 3200 }, price: 4200, market: 5600, fees: 450, confidence: 60 },
      { id: "p4", title: "Mini-pelle 1,8 t", subtitle: "Exemple · BTP", attrs: { cat: "BTP", hours: 2100 }, price: 14500, market: 17900, fees: 1200, confidence: 71 },
    ],
  },
];

export const getUniverse = (slug: string) => universes.find((u) => u.slug === slug);

export type FilterState = Record<string, string>;

export function applyFilters(u: Universe, state: FilterState): Opportunity[] {
  return u.items.filter((o) =>
    u.filters.every((f) => {
      const v = state[f.key];
      if (!v) return true;
      if (f.type === "select") return String(o.attrs[f.key]) === v;
      const n = Number(v);
      if (Number.isNaN(n)) return true;
      const actual = f.field === "price" ? o.price : f.field === "market" ? o.market : Number(o.attrs[f.field]);
      return f.type === "max" ? actual <= n : actual >= n;
    }),
  );
}
