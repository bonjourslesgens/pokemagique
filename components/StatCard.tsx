interface StatCardProps {
  title: string;
  value: string;
  tone?: "light" | "strong";
}

export default function StatCard({ title, value, tone = "light" }: StatCardProps) {
  return (
    <div
      className={
        tone === "strong"
          ? "rounded-2xl border border-pokedex-ink/10 bg-pokedex-ink px-4 py-3 text-white"
          : "rounded-2xl border border-pokedex-ink/10 bg-white/82 px-4 py-3 text-pokedex-ink"
      }
    >
      <div className="text-xs font-black uppercase tracking-[0.18em] opacity-65">{title}</div>
      <div className="mt-1 text-lg font-black">{value}</div>
    </div>
  );
}
