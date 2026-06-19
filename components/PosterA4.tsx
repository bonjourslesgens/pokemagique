import Image from "next/image";
import PokemonTypeBadge from "@/components/PokemonTypeBadge";
import { fanMadeNotice, typeAccentClasses } from "@/lib/pokemagique-data";
import type { GeneratedProfile, PokemonStarterType } from "@/lib/types";

interface PosterA4Props {
  profile: GeneratedProfile;
}

function MiniBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-pokedex-ink/10 bg-white/88 p-3">
      <div className="text-[10px] font-black uppercase tracking-[0.14em] text-pokedex-ink/55">
        {title}
      </div>
      <div className="mt-1 text-sm font-black leading-snug text-pokedex-ink">{children}</div>
    </div>
  );
}

export default function PosterA4({ profile }: PosterA4Props) {
  const gradient =
    typeAccentClasses[profile.typePrincipal as PokemonStarterType] ??
    "from-pokedex-blue via-pokedex-green to-pokedex-yellow";
  const artworkUrl = profile.pokemonArtwork?.imageUrl;

  return (
    <article
      className={`poster-shadow mx-auto aspect-[210/297] w-full max-w-[620px] overflow-hidden rounded-[1.75rem] border-[10px] border-pokedex-ink bg-gradient-to-br ${gradient} p-4 text-pokedex-ink`}
    >
      <div className="flex h-full flex-col rounded-[1.25rem] border-4 border-white/75 bg-pokedex-cream/92 p-4">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-pokedex-red">
              Ton Pokémagique
            </p>
            <h2 className="mt-1 text-4xl font-black leading-none">{profile.nomPokemagique}</h2>
            <p className="mt-2 text-lg font-bold text-pokedex-ink/72">
              Fiche de {profile.prenomOuPseudo}
            </p>
          </div>
          <div className="rounded-2xl bg-white/86 p-3 text-right shadow-sm">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-pokedex-ink/55">
              Rareté
            </div>
            <div className="text-3xl font-black text-pokedex-red">
              {profile.miniResumeAffiche.noteRarete}
            </div>
          </div>
        </header>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <MiniBox title="Génération">{profile.generation}</MiniBox>
          <MiniBox title="Origine">{profile.regionOrigine}</MiniBox>
          <MiniBox title="Ascendant">{profile.ascendantRegional}</MiniBox>
        </div>

        <section className="relative my-4 flex flex-1 items-center justify-center overflow-hidden rounded-[1.25rem] border-4 border-white bg-gradient-to-br from-white via-white/70 to-white/35">
          <div className="absolute inset-0 opacity-55">
            <div className="absolute left-8 top-7 h-24 w-24 rounded-full bg-pokedex-yellow/60 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-pokedex-blue/35 blur-2xl" />
            <div className="absolute inset-x-8 bottom-8 h-2 rounded-full bg-white/80" />
          </div>

          {artworkUrl ? (
            <Image
              src={artworkUrl}
              alt={profile.pokemonAffiche}
              width={720}
              height={720}
              unoptimized
              className="relative z-10 max-h-[78%] max-w-[78%] object-contain drop-shadow-[0_22px_26px_rgba(18,33,58,0.24)]"
            />
          ) : (
            <div className="relative z-10 rounded-3xl border-4 border-dashed border-pokedex-ink/20 bg-white/80 px-8 py-10 text-center">
              <div className="text-2xl font-black">{profile.pokemonAffiche}</div>
              <p className="mt-2 max-w-[16rem] text-sm font-semibold text-pokedex-ink/60">
                Image PokéAPI indisponible pour le moment.
              </p>
            </div>
          )}
        </section>

        <div className="mb-3 flex flex-wrap gap-2">
          <PokemonTypeBadge type={profile.typePrincipal} />
          {profile.typeSecondaire ? <PokemonTypeBadge type={profile.typeSecondaire} /> : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MiniBox title="Comment j’ai calculé ?">
            {profile.calculDetaille.annee} / {profile.calculDetaille.mois} /{" "}
            {profile.calculDetaille.jour}
          </MiniBox>
          <MiniBox title="Qualités">{profile.miniResumeAffiche.qualites.join(", ")}</MiniBox>
          <MiniBox title="Défauts">{profile.miniResumeAffiche.defauts.join(", ")}</MiniBox>
          <MiniBox title="En amour">{profile.miniResumeAffiche.amourCourt}</MiniBox>
          <MiniBox title="En amitié">{profile.miniResumeAffiche.amitieCourt}</MiniBox>
          <MiniBox title="Au travail">{profile.miniResumeAffiche.travailCourt}</MiniBox>
          <MiniBox title="Ta devise">{profile.miniResumeAffiche.deviseCourte}</MiniBox>
          <MiniBox title="Légendaire compatible">
            {profile.miniResumeAffiche.legendaireCompatible}
          </MiniBox>
          <MiniBox title="Surnom rigolo">{profile.miniResumeAffiche.surnom}</MiniBox>
          <MiniBox title="Habitat">{profile.miniResumeAffiche.habitatCourt}</MiniBox>
        </div>

        <footer className="mt-3 text-center text-[10px] font-bold text-pokedex-ink/58">
          {fanMadeNotice}
        </footer>
      </div>
    </article>
  );
}
