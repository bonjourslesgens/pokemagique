interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-bold text-pokedex-ink/70">
        <span>
          Étape {current} sur {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-pokedex-ink/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pokedex-red via-pokedex-yellow to-pokedex-green transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
