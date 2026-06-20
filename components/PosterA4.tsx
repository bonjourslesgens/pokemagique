import Image from "next/image";
import { fanMadeNotice } from "@/lib/pokemagique-data";
import { getPosterContent } from "@/lib/poster-content";
import { getPosterTheme, posterThemeStyle } from "@/lib/poster-theme";
import type { GeneratedProfile } from "@/lib/types";

interface PosterA4Props {
  profile: GeneratedProfile;
}

function PosterCard({
  title,
  icon,
  children,
  tone = "light"
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  tone?: "light" | "peach" | "pink" | "gold";
}) {
  return (
    <section className={`poster-card poster-card-${tone}`}>
      <div className="poster-card-title">
        <span className="poster-card-icon">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="poster-card-content">{children}</div>
    </section>
  );
}

function RarityBadge({ score, suffix }: { score: string; suffix: string }) {
  return (
    <div className="rarity-badge" aria-label={`Note de rareté ${score} ${suffix}`}>
      <div className="rarity-stars">★ ★ ★</div>
      <div className="rarity-score">{score}</div>
      <div className="rarity-suffix">{suffix}</div>
      <div className="rarity-ribbon">Collector</div>
    </div>
  );
}

function PokemonHero({ profile }: { profile: GeneratedProfile }) {
  const artworkUrl = profile.pokemonArtwork?.imageUrl;

  return (
    <section className="poster-center-pokemon">
      <div className="poster-hero-ring" />
      <div className="poster-hero-orbit poster-hero-orbit-one" />
      <div className="poster-hero-orbit poster-hero-orbit-two" />
      <div className="poster-splash poster-splash-left" />
      <div className="poster-splash poster-splash-right" />

      {artworkUrl ? (
        <Image
          src={artworkUrl}
          alt={profile.pokemonAffiche}
          width={980}
          height={980}
          unoptimized
          priority
          className="poster-pokemon-image"
        />
      ) : (
        <div className="poster-pokemon-placeholder">
          <strong>{profile.pokemonAffiche}</strong>
          <span>Image PokéAPI indisponible</span>
        </div>
      )}

      <div className="poster-pokemon-nameplate">
        Pokémon affiché : <strong>{profile.pokemonAffiche}</strong>
      </div>
    </section>
  );
}

export default function PosterA4({ profile }: PosterA4Props) {
  const theme = getPosterTheme(profile);
  const content = getPosterContent(profile);

  return (
    <article className="poster-shell poster-shadow" style={posterThemeStyle(theme)}>
      <div className="poster-background" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, index) => (
          <span
            key={index}
            className={`poster-particle poster-particle-${theme.particleClass}`}
          />
        ))}
        <span className="poster-wave poster-wave-one" />
        <span className="poster-wave poster-wave-two" />
        <span className="poster-region-stamp">{theme.regionLabel}</span>
      </div>

      <div className="poster-frame">
        <header className="poster-header">
          <div className="poster-title-block">
            <p className="poster-eyebrow">Ton Pokémagique</p>
            <h2 className="poster-title">{profile.nomPokemagique}</h2>
            <div className="poster-ribbon">
              {profile.generation} • Type {profile.typePrincipal}
            </div>
            <div className="poster-ascendant-pill">Ascendant {profile.ascendantRegional}</div>
          </div>
          <RarityBadge score={content.rarityScore} suffix={content.raritySuffix} />
        </header>

        <main className="poster-main">
          <aside className="poster-left-panel">
            <section className="poster-calculation-note">
              <div className="poster-paper-holes" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="poster-note-title">
                <span className="poster-card-icon">DX</span>
                Comment j’ai calculé ?
              </div>
              <ul>
                {content.calculationLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p>{content.starterLine}</p>
            </section>

            <div className="poster-mini-label">
              <strong>{theme.particleLabel}</strong>
              <span>{theme.regionMotif}</span>
            </div>
          </aside>

          <PokemonHero profile={profile} />

          <aside className="poster-right-panels">
            <PosterCard title="Qualités" icon="QL" tone="gold">
              <ul className="poster-chip-list">
                {content.qualities.map((quality) => (
                  <li key={quality}>{quality}</li>
                ))}
              </ul>
            </PosterCard>

            <PosterCard title="Défauts" icon="DF" tone="peach">
              <ul className="poster-chip-list">
                {content.defects.map((defect) => (
                  <li key={defect}>{defect}</li>
                ))}
              </ul>
            </PosterCard>

            <PosterCard title="En amour" icon="CO" tone="pink">
              <ul className="poster-love-list">
                {content.loveLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </PosterCard>
          </aside>
        </main>

        <section className="poster-bottom-grid">
          {content.bottomCards.map((card) => (
            <article
              key={card.title}
              className={`poster-bottom-card poster-bottom-card-${card.variant}`}
            >
              <div className="poster-bottom-icon">{card.icon}</div>
              <div>
                <h3>{card.title}</h3>
                <p className="poster-bottom-value">{card.value}</p>
                {card.detail ? <p className="poster-bottom-detail">{card.detail}</p> : null}
              </div>
            </article>
          ))}
        </section>

        <footer className="poster-footer">{fanMadeNotice}</footer>
      </div>
    </article>
  );
}
