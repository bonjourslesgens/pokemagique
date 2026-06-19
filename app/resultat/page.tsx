"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ResultView from "@/components/ResultView";
import type { GeneratedProfile } from "@/lib/types";

export default function ResultatPage() {
  const [profile, setProfile] = useState<GeneratedProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const saved = window.sessionStorage.getItem("pokemagique-profile");
      if (saved) {
        try {
          setProfile(JSON.parse(saved) as GeneratedProfile);
        } catch {
          window.sessionStorage.removeItem("pokemagique-profile");
        }
      }
      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="rounded-3xl bg-white/86 p-7 text-center shadow-card">Chargement...</div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <section className="max-w-xl rounded-3xl border border-white/80 bg-white/86 p-7 text-center shadow-card">
          <h1 className="text-3xl font-black text-pokedex-ink">Aucun résultat pour le moment</h1>
          <p className="mt-3 leading-7 text-pokedex-ink/72">
            Remplis le questionnaire pour générer ton profil Pokémagique et accéder aux
            téléchargements.
          </p>
          <Link
            href="/questionnaire"
            className="mt-5 inline-flex rounded-full bg-pokedex-red px-6 py-3 font-black text-white"
          >
            Commencer le questionnaire
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <ResultView profile={profile} />
    </main>
  );
}
