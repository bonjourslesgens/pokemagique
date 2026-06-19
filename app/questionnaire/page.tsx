import Link from "next/link";
import QuestionnaireWizard from "@/components/QuestionnaireWizard";
import { fanMadeNotice } from "@/lib/pokemagique-data";

export default function QuestionnairePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-white/70 bg-white/72 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-xl font-black text-pokedex-ink">
            Pokémagique
          </Link>
          <span className="text-sm font-semibold text-pokedex-ink/66">{fanMadeNotice}</span>
        </div>
      </header>
      <QuestionnaireWizard />
    </main>
  );
}
