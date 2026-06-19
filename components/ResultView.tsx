"use client";

import Link from "next/link";
import DownloadButtons from "@/components/DownloadButtons";
import PokemonTypeBadge from "@/components/PokemonTypeBadge";
import PosterA4 from "@/components/PosterA4";
import ProfileDocumentPreview from "@/components/ProfileDocumentPreview";
import StatCard from "@/components/StatCard";
import { fanMadeNotice } from "@/lib/pokemagique-data";
import type { GeneratedProfile } from "@/lib/types";

interface ResultViewProps {
  profile: GeneratedProfile;
}

export default function ResultView({ profile }: ResultViewProps) {
  function restart() {
    window.sessionStorage.removeItem("pokemagique-profile");
    window.localStorage.removeItem("pokemagique-answers");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-pokedex-red">
            Résultat généré
          </p>
          <h1 className="mt-2 text-4xl font-black text-pokedex-ink">
            {profile.nomPokemagique}
          </h1>
        </div>
        <Link
          href="/questionnaire"
          onClick={restart}
          className="rounded-full border border-pokedex-ink/15 bg-white px-5 py-3 font-black text-pokedex-ink shadow-sm transition hover:-translate-y-0.5"
        >
          Recommencer le questionnaire
        </Link>
      </div>

      {profile.warnings?.length ? (
        <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 font-semibold text-amber-900">
          {profile.warnings.join(" ")}
        </div>
      ) : null}

      <div className="grid gap-7 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-white/80 bg-white/86 p-5 shadow-card backdrop-blur sm:p-7">
            <div className="flex flex-wrap gap-2">
              <PokemonTypeBadge type={profile.typePrincipal} />
              {profile.typeSecondaire ? <PokemonTypeBadge type={profile.typeSecondaire} /> : null}
            </div>
            <p className="mt-5 text-xl font-bold leading-8 text-pokedex-ink/78">
              {profile.resumeRapide}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <StatCard title="Dresseur" value={profile.prenomOuPseudo} />
              <StatCard title="Pokémon affiché" value={profile.pokemonAffiche} />
              <StatCard title="Génération" value={profile.generation} />
              <StatCard title="Ascendant" value={profile.ascendantRegional} />
              <StatCard title="Légendaire" value={profile.legendaireCompatible.nom} />
              <StatCard title="Rareté" value={`${profile.noteRarete.score}/100`} tone="strong" />
            </div>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/86 p-5 shadow-card backdrop-blur sm:p-7">
            <h2 className="text-2xl font-black text-pokedex-ink">Téléchargements</h2>
            <p className="mt-2 mb-5 leading-7 text-pokedex-ink/70">
              L’affiche utilise un rendu HTML/CSS pour garder le texte net. Le document Word et
              le PDF reprennent le descriptif complet.
            </p>
            <DownloadButtons profile={profile} />
          </section>
        </div>

        <div>
          <PosterA4 profile={profile} />
        </div>
      </div>

      <div className="mt-7">
        <ProfileDocumentPreview profile={profile} />
      </div>

      <p className="mt-6 text-center text-sm font-semibold text-pokedex-ink/60">
        {fanMadeNotice}
      </p>
    </div>
  );
}
