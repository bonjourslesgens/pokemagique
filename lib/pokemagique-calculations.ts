import {
  generationStarters,
  regionInfluences,
  regions,
  starterDisplayFallback
} from "@/lib/pokemagique-data";
import type { BirthDateCalculation, PokemonStarterType } from "@/lib/types";

export function positiveModulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

export function parseFrenchBirthDate(value: string) {
  const normalized = value.trim();
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(normalized);

  if (!match) {
    throw new Error("La date doit être au format JJ/MM/AAAA.");
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("La date de naissance n’est pas valide.");
  }

  return { day, month, year };
}

export function getGenerationFromYear(year: number) {
  return positiveModulo(year - 1996, 10) + 1;
}

export function getStarterTypeFromMonth(month: number): PokemonStarterType {
  if (month >= 1 && month <= 4) return "Plante";
  if (month >= 5 && month <= 8) return "Feu";
  return "Eau";
}

export function getAscendantFromDay(day: number) {
  return regions[positiveModulo(day - 1, regions.length)];
}

export function calculateBirthDate(dateNaissance: string): BirthDateCalculation {
  const { day, month, year } = parseFrenchBirthDate(dateNaissance);
  const generation = getGenerationFromYear(year);
  const generationData = generationStarters.find((item) => item.generation === generation);

  if (!generationData) {
    throw new Error("Impossible de trouver la génération calculée.");
  }

  const starterType = getStarterTypeFromMonth(month);
  const starterBase = generationData.starters[starterType];
  const pokemonAffiche = starterDisplayFallback[starterBase] ?? starterBase;
  const ascendantRegional = getAscendantFromDay(day);

  return {
    year,
    month,
    day,
    generation,
    regionOrigine: generationData.region,
    starterType,
    starterBase,
    pokemonAffiche,
    typePrincipal: starterType,
    ascendantRegional,
    regionInfluence: regionInfluences[ascendantRegional]
  };
}

export function describeCalculation(calculation: BirthDateCalculation) {
  return `Année ${calculation.year} → Génération ${calculation.generation}; mois ${String(
    calculation.month
  ).padStart(2, "0")} → starter ${calculation.typePrincipal}; jour ${String(
    calculation.day
  ).padStart(2, "0")} → ascendant ${calculation.ascendantRegional}.`;
}
