import type { QuestionnaireAnswers } from "@/lib/types";
import { parseFrenchBirthDate } from "@/lib/pokemagique-calculations";

export const requiredAnswerFields: Array<keyof QuestionnaireAnswers> = [
  "prenomOuPseudo",
  "dateNaissance",
  "arriveeGroupe",
  "energiePrincipale",
  "fonctionnement",
  "phraseCorrespondante",
  "qualiteRemarquee",
  "qualiteSouhaitee",
  "reactionStress",
  "piegePersonnel",
  "roleAmitie",
  "groupeIdeal",
  "reactionAmiMal",
  "langageAmour",
  "defautAmoureux",
  "styleTravail",
  "approcheProjet",
  "ambiance",
  "couleurSecondaire",
  "detailVisuel",
  "pouvoirMagique",
  "talentCache",
  "attiranceLegendaire",
  "rareteRessentie",
  "phraseSouvent",
  "styleSurnom"
];

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function arrayHasText(value: unknown) {
  return Array.isArray(value) && value.some((item) => hasText(item));
}

export function validateQuestionnaireAnswers(answers: QuestionnaireAnswers) {
  const errors: Record<string, string> = {};

  for (const field of requiredAnswerFields) {
    const value = answers[field];
    if (Array.isArray(value) ? !arrayHasText(value) : !hasText(value)) {
      errors[field] = "Ce champ est obligatoire.";
    }
  }

  if (!arrayHasText(answers.tons)) {
    errors.tons = "Choisis au moins un ton.";
  }

  if (!arrayHasText(answers.amourRecherche)) {
    errors.amourRecherche = "Choisis au moins une réponse.";
  }

  if (!arrayHasText(answers.environnementIdeal)) {
    errors.environnementIdeal = "Choisis au moins une réponse.";
  }

  if (!arrayHasText(answers.apparence)) {
    errors.apparence = "Choisis au moins une apparence.";
  }

  answers.qualites.forEach((quality, index) => {
    if (!hasText(quality)) errors[`qualites.${index}`] = "Indique une qualité.";
  });

  answers.defauts.forEach((defect, index) => {
    if (!hasText(defect)) errors[`defauts.${index}`] = "Indique un défaut.";
  });

  answers.couleursPrincipales.forEach((color, index) => {
    if (!hasText(color)) errors[`couleursPrincipales.${index}`] = "Indique une couleur.";
  });

  answers.motsRepresentatifs.forEach((word, index) => {
    if (!hasText(word)) errors[`motsRepresentatifs.${index}`] = "Indique un mot.";
  });

  try {
    parseFrenchBirthDate(answers.dateNaissance);
  } catch (error) {
    errors.dateNaissance =
      error instanceof Error ? error.message : "La date de naissance n’est pas valide.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function extractJsonObject(raw: string) {
  const trimmed = raw.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Aucun JSON exploitable n’a été trouvé dans la réponse IA.");
  }

  return trimmed.slice(firstBrace, lastBrace + 1);
}
