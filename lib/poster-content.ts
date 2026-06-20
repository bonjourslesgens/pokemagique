import type { GeneratedProfile } from "@/lib/types";

export interface PosterContent {
  qualities: string[];
  defects: string[];
  loveLines: string[];
  calculationLines: string[];
  starterLine: string;
  rarityScore: string;
  raritySuffix: string;
  bottomCards: Array<{
    title: string;
    icon: string;
    value: string;
    detail?: string;
    variant: "friend" | "work" | "quote" | "legend" | "rarity" | "nickname";
  }>;
}

function cleanText(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export function shortText(value: unknown, maxLength = 74) {
  const text = cleanText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function list(values: unknown[], maxItems: number, fallback: string) {
  const items = values.map((value) => shortText(value, 28)).filter(Boolean);
  return (items.length ? items : [fallback]).slice(0, maxItems);
}

function splitShortLines(value: string, maxLines: number) {
  const raw = cleanText(value)
    .split(/[.;]/)
    .map((line) => shortText(line, 58))
    .filter(Boolean);

  if (raw.length) return raw.slice(0, maxLines);
  return [shortText(value, 58)].filter(Boolean);
}

export function getRarityParts(profile: GeneratedProfile) {
  const score = Number.isFinite(profile.noteRarete?.score)
    ? String(Math.round(profile.noteRarete.score))
    : cleanText(profile.miniResumeAffiche.noteRarete).replace(/\/100/g, "") || "87";

  return {
    score: score.replace(/[^0-9]/g, "") || "87",
    suffix: "/100"
  };
}

export function getPosterContent(profile: GeneratedProfile): PosterContent {
  const rarity = getRarityParts(profile);
  const qualities = list(profile.miniResumeAffiche.qualites, 5, "Unique");
  const defects = list(profile.miniResumeAffiche.defauts, 4, "Attachant");
  const loveLines = splitShortLines(profile.miniResumeAffiche.amourCourt, 4);
  const generationNumber = profile.generation.replace(/^Génération\s*/i, "") || profile.generation;

  return {
    qualities,
    defects,
    loveLines,
    calculationLines: [
      `Année : ${profile.calculDetaille.annee} → ${profile.generation}`,
      `Mois : ${profile.calculDetaille.mois} → Starter ${profile.typePrincipal}`,
      `Jour : ${profile.calculDetaille.jour} → Ascendant ${profile.ascendantRegional}`
    ],
    starterLine: `Le starter ${profile.typePrincipal} de la génération ${generationNumber} est… ${profile.starterBase} !`,
    rarityScore: rarity.score,
    raritySuffix: rarity.suffix,
    bottomCards: [
      {
        title: "En amitié",
        icon: "AM",
        value: shortText(profile.miniResumeAffiche.amitieCourt, 62),
        variant: "friend"
      },
      {
        title: "Au travail",
        icon: "ID",
        value: shortText(profile.miniResumeAffiche.travailCourt, 62),
        variant: "work"
      },
      {
        title: "Ta devise",
        icon: "''",
        value: shortText(profile.miniResumeAffiche.deviseCourte, 64),
        variant: "quote"
      },
      {
        title: "Légendaire compatible",
        icon: "LG",
        value: shortText(profile.miniResumeAffiche.legendaireCompatible, 38),
        detail: shortText(profile.legendaireCompatible.raison, 78),
        variant: "legend"
      },
      {
        title: "Note de rareté",
        icon: "OR",
        value: `${rarity.score} ${rarity.suffix}`,
        detail: shortText(profile.noteRarete.justification, 80),
        variant: "rarity"
      },
      {
        title: "Surnom rigolo",
        icon: "SN",
        value: shortText(profile.miniResumeAffiche.surnom, 45),
        variant: "nickname"
      }
    ]
  };
}
