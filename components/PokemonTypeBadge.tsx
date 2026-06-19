import type { PokemonStarterType } from "@/lib/types";

const badgeClasses: Record<string, string> = {
  Plante: "border-green-700/20 bg-green-100 text-green-900",
  Feu: "border-red-700/20 bg-orange-100 text-orange-950",
  Eau: "border-cyan-700/20 bg-cyan-100 text-cyan-950",
  Normal: "border-stone-600/20 bg-stone-100 text-stone-900",
  Spectre: "border-violet-700/20 bg-violet-100 text-violet-950",
  Sol: "border-amber-700/20 bg-amber-100 text-amber-950",
  Psy: "border-pink-700/20 bg-pink-100 text-pink-950",
  Électrik: "border-yellow-700/20 bg-yellow-100 text-yellow-950",
  Fée: "border-rose-700/20 bg-rose-100 text-rose-950",
  Soleil: "border-orange-700/20 bg-orange-100 text-orange-950",
  Acier: "border-zinc-700/20 bg-zinc-100 text-zinc-950",
  Aventure: "border-lime-700/20 bg-lime-100 text-lime-950",
  Vol: "border-sky-700/20 bg-sky-100 text-sky-950",
  Mystère: "border-indigo-700/20 bg-indigo-100 text-indigo-950"
};

export default function PokemonTypeBadge({ type }: { type: PokemonStarterType | string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${
        badgeClasses[type] ?? badgeClasses.Mystère
      }`}
    >
      {type}
    </span>
  );
}
