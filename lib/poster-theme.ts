import type { CSSProperties } from "react";
import type { GeneratedProfile, PokemonStarterType } from "@/lib/types";

export interface PosterTheme {
  type: PokemonStarterType | string;
  bgStart: string;
  bgMid: string;
  bgEnd: string;
  accent: string;
  accent2: string;
  light: string;
  card: string;
  ink: string;
  border: string;
  shadow: string;
  particleClass: "bubble" | "ember" | "leaf";
  particleLabel: string;
  regionLabel: string;
  regionMotif: string;
  titleGlow: string;
}

const typeThemes: Record<PokemonStarterType, Omit<PosterTheme, "type" | "regionLabel" | "regionMotif">> = {
  Eau: {
    bgStart: "#071a4d",
    bgMid: "#0b72b4",
    bgEnd: "#7de8ff",
    accent: "#62f4ff",
    accent2: "#ffe16f",
    light: "#effcff",
    card: "rgba(240, 252, 255, 0.92)",
    ink: "#092845",
    border: "#b8f7ff",
    shadow: "rgba(4, 28, 68, 0.35)",
    particleClass: "bubble",
    particleLabel: "Bulles, vagues et reflets",
    titleGlow: "rgba(98, 244, 255, 0.45)"
  },
  Feu: {
    bgStart: "#351039",
    bgMid: "#e84824",
    bgEnd: "#ffb133",
    accent: "#ffef7a",
    accent2: "#ff7b54",
    light: "#fff6e8",
    card: "rgba(255, 246, 232, 0.92)",
    ink: "#3d160d",
    border: "#ffd37d",
    shadow: "rgba(81, 22, 13, 0.34)",
    particleClass: "ember",
    particleLabel: "Braises, flammes et éclats",
    titleGlow: "rgba(255, 177, 51, 0.5)"
  },
  Plante: {
    bgStart: "#08351f",
    bgMid: "#1f9b61",
    bgEnd: "#c7ef73",
    accent: "#e8cf62",
    accent2: "#7bdb72",
    light: "#f6ffe9",
    card: "rgba(246, 255, 233, 0.92)",
    ink: "#12351f",
    border: "#dff4a6",
    shadow: "rgba(13, 61, 35, 0.34)",
    particleClass: "leaf",
    particleLabel: "Feuilles, pollen et lianes",
    titleGlow: "rgba(232, 207, 98, 0.48)"
  }
};

const regionStyles: Record<string, Pick<PosterTheme, "regionLabel" | "regionMotif" | "accent2">> = {
  Kanto: {
    regionLabel: "Route d’aventure classique",
    regionMotif: "routes, plaines et forêt iconique",
    accent2: "#ffcf5a"
  },
  Johto: {
    regionLabel: "Temple paisible",
    regionMotif: "motifs anciens et brume douce",
    accent2: "#d8b76a"
  },
  Hoenn: {
    regionLabel: "Îles solaires",
    regionMotif: "océan, jungle et volcan",
    accent2: "#ffbd59"
  },
  Sinnoh: {
    regionLabel: "Lac sacré mystique",
    regionMotif: "montagnes, cristaux et brume froide",
    accent2: "#b8d6ff"
  },
  Unys: {
    regionLabel: "Ville lumineuse",
    regionMotif: "lignes urbaines et énergie moderne",
    accent2: "#93e4ff"
  },
  Kalos: {
    regionLabel: "Jardin doré",
    regionMotif: "dorures, fleurs et élégance",
    accent2: "#f7d37a"
  },
  Alola: {
    regionLabel: "Lagon tropical",
    regionMotif: "fleurs, soleil et reflets de lagon",
    accent2: "#ffb3a7"
  },
  Galar: {
    regionLabel: "Arène collector",
    regionMotif: "stade, rubans et contraste sportif",
    accent2: "#c4d0ff"
  },
  Paldea: {
    regionLabel: "Grand chemin d’école",
    regionMotif: "couleurs vives et aventure libre",
    accent2: "#ffce6b"
  },
  "Vents & Vagues": {
    regionLabel: "Falaises d’écume",
    regionMotif: "vent, nuages et mer poétique",
    accent2: "#e5d68a"
  }
};

export function getPosterTheme(profile: GeneratedProfile): PosterTheme {
  const type = (profile.typePrincipal || "Eau") as PokemonStarterType;
  const base = typeThemes[type] ?? typeThemes.Eau;
  const region = regionStyles[profile.ascendantRegional] ?? regionStyles["Vents & Vagues"];

  return {
    ...base,
    ...region,
    type,
    accent2: region.accent2 || base.accent2
  };
}

export function posterThemeStyle(theme: PosterTheme) {
  return {
    "--poster-bg-start": theme.bgStart,
    "--poster-bg-mid": theme.bgMid,
    "--poster-bg-end": theme.bgEnd,
    "--poster-accent": theme.accent,
    "--poster-accent-2": theme.accent2,
    "--poster-light": theme.light,
    "--poster-card": theme.card,
    "--poster-ink": theme.ink,
    "--poster-border": theme.border,
    "--poster-shadow": theme.shadow,
    "--poster-title-glow": theme.titleGlow
  } as CSSProperties;
}
