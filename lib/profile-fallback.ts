import { describeCalculation } from "@/lib/pokemagique-calculations";
import { legendaryByAttraction } from "@/lib/pokemagique-data";
import type { GeneratedProfile, ProfileGenerationInput, ProfileTextItem } from "@/lib/types";

const secondaryTypeByRegion: Record<string, string> = {
  Kanto: "Normal",
  Johto: "Spectre",
  Hoenn: "Sol",
  Sinnoh: "Psy",
  Unys: "Électrik",
  Kalos: "Fée",
  Alola: "Soleil",
  Galar: "Acier",
  Paldea: "Aventure",
  "Vents & Vagues": "Vol"
};

function compact(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean);
}

function sentenceList(values: string[]) {
  const clean = compact(values);
  if (clean.length <= 1) return clean[0] ?? "";
  return `${clean.slice(0, -1).join(", ")} et ${clean[clean.length - 1]}`;
}

function qualityItems(values: string[], focus: string): ProfileTextItem[] {
  return compact(values).map((value) => ({
    titre: value.charAt(0).toUpperCase() + value.slice(1),
    description: `Cette qualité ressort dans ta manière d’avancer: ${focus}, mais sans perdre ton côté personnel.`
  }));
}

function chooseLegendary(input: ProfileGenerationInput) {
  const options = legendaryByAttraction[input.answers.attiranceLegendaire] ?? ["Mew"];
  const index = Math.abs(
    input.calculation.day + input.calculation.month + input.answers.prenomOuPseudo.length
  ) % options.length;
  return options[index];
}

function rarityScore(input: ProfileGenerationInput) {
  const baseByFeeling: Record<string, number> = {
    "commun mais fiable": 54,
    "rare sans le vouloir": 78,
    "très atypique": 88,
    "difficile à comprendre": 84,
    "simple en apparence, complexe au fond": 82,
    spectaculaire: 91,
    "discret mais unique": 80
  };
  const base = baseByFeeling[input.answers.rareteRessentie] ?? 73;
  return Math.min(100, Math.max(1, base + (input.calculation.generation % 4) - 1));
}

export function createFallbackProfile(
  input: ProfileGenerationInput,
  warning?: string
): GeneratedProfile {
  const { answers, calculation } = input;
  const qualities = compact(answers.qualites);
  const defects = compact(answers.defauts);
  const legendary = chooseLegendary(input);
  const rarity = rarityScore(input);
  const tone = answers.tons.includes("mélange de tout") ? "un mélange bien dosé" : sentenceList(answers.tons);
  const attackName =
    answers.attaqueSignature.trim() ||
    `${answers.motsRepresentatifs[0] || "Aura"} ${calculation.typePrincipal === "Eau" ? "d’Écume" : calculation.typePrincipal === "Feu" ? "Solaire" : "Florale"}`;

  const nomPokemagique = `${calculation.starterBase} ${calculation.ascendantRegional}`;
  const typeSecondaire = secondaryTypeByRegion[calculation.ascendantRegional] ?? "Mystère";

  return {
    nomPokemagique,
    prenomOuPseudo: answers.prenomOuPseudo,
    generation: `Génération ${calculation.generation}`,
    regionOrigine: calculation.regionOrigine,
    starterBase: calculation.starterBase,
    pokemonAffiche: calculation.pokemonAffiche,
    typePrincipal: calculation.typePrincipal,
    typeSecondaire,
    ascendantRegional: calculation.ascendantRegional,
    dateNaissanceUtilisee: answers.afficherDateNaissance === "Oui" ? answers.dateNaissance : "Masquée",
    calculDetaille: {
      annee: String(calculation.year),
      mois: String(calculation.month).padStart(2, "0"),
      jour: String(calculation.day).padStart(2, "0"),
      generation: `(( ${calculation.year} - 1996 ) mod 10) + 1 = ${calculation.generation}`,
      starter: `Mois ${calculation.month}: ${calculation.typePrincipal}, donc ${calculation.starterBase}`,
      ascendant: `Jour ${calculation.day}: ${calculation.ascendantRegional}`
    },
    resumeRapide: `${answers.prenomOuPseudo} est un ${nomPokemagique} au style ${tone}: ${answers.energiePrincipale}, ${answers.fonctionnement}, avec une aura ${answers.apparence.join(" et ")}.`,
    personnaliteProfonde: `Tu avances avec ${answers.fonctionnement}, une énergie ${answers.energiePrincipale}, et ce réflexe très marqué: “${answers.phraseCorrespondante}”. Ton profil donne l’impression de quelqu’un qui observe finement avant de choisir son moment, puis agit avec une précision tranquille.`,
    formeRegionale: `Ton ascendant ${calculation.ascendantRegional} ajoute une influence ${calculation.regionInfluence.traits.join(", ")}. Cela transforme ton ${calculation.starterBase} en version plus personnelle: ${answers.ambiance}, ${answers.detailVisuel} autour de lui, et une présence ${answers.apparence.join(" / ")}.`,
    apparenceUltraPersonnalisee: `L’affiche doit entourer ${calculation.pokemonAffiche} d’un décor ${answers.ambiance}, avec ${answers.couleursPrincipales[0]} et ${answers.couleursPrincipales[1]} en couleurs principales, ${answers.couleurSecondaire} en accent, et ${answers.detailVisuel} dans le cadre plutôt que sur l’image du Pokémon.`,
    qualites: qualityItems(qualities, answers.qualiteRemarquee),
    defauts: qualityItems(defects, answers.reactionStress).map((item) => ({
      titre: item.titre,
      description: `Ce défaut devient visible quand tu stresses: tu peux ${answers.reactionStress}, surtout si ton piège personnel reprend le dessus (${answers.piegePersonnel}).`
    })),
    amour: `En amour, tu cherches ${sentenceList(answers.amourRecherche)}. Ton langage passe surtout par ${answers.langageAmour}, mais ton point sensible peut être ${answers.defautAmoureux}; ton Pokémagique gagne donc à être rassuré sans être enfermé.`,
    amitie: `En amitié, tu es ${answers.roleAmitie}. Ton groupe idéal ressemble à ceci: ${answers.groupeIdeal}. Quand quelqu’un va mal, ton réflexe est concret et loyal: ${answers.reactionAmiMal}`,
    travailEtudes: `Dans les projets, tu es ${answers.styleTravail}. Tu réussis mieux dans un environnement ${sentenceList(answers.environnementIdeal)}, surtout quand tu peux commencer par ${answers.approcheProjet}.`,
    talentPrincipal: {
      nom: answers.pouvoirMagique,
      description: `Ton pouvoir principal consiste à ${answers.pouvoirMagique}: il traduit ta manière de protéger l’équilibre autour de toi sans forcément chercher la lumière.`
    },
    talentCache: {
      nom: answers.talentCache,
      description: `Ton talent caché lié à ${answers.talentCache} explique pourquoi les autres peuvent sous-estimer ta précision au premier regard.`
    },
    attaqueSignature: {
      nom: attackName,
      type: calculation.typePrincipal,
      effet: `Apaise la situation, révèle les détails invisibles et donne un bonus de clarté à l’équipe.`,
      descriptionVisuelle: `Une vague de ${answers.detailVisuel} traverse le décor ${answers.ambiance} sans modifier directement l’image du Pokémon.`,
      symboliquePsychologique: `Cette attaque représente ton besoin de comprendre avant d’agir et ta capacité à rendre les tensions plus lisibles.`
    },
    habitat: `Habitat idéal: ${calculation.regionInfluence.habitat}, revisité en version ${answers.ambiance} avec une ambiance ${calculation.regionInfluence.style}.`,
    evolutionSymbolique: [
      {
        stade: "Forme de base",
        nom: `${calculation.starterBase} attentif`,
        description: `Tu observes, tu prends la température du groupe, puis tu poses des bases stables.`
      },
      {
        stade: "Forme affirmée",
        nom: `${calculation.starterBase} lucide`,
        description: `Tu assumes davantage tes qualités: ${sentenceList(qualities)}.`
      },
      {
        stade: "Forme accomplie",
        nom: `${calculation.starterBase} des marées intérieures`,
        description: `Tu transformes tes défauts en signaux utiles et tu avances avec une patience plus confiante.`
      }
    ],
    legendaireCompatible: {
      nom: legendary,
      raison: `${legendary} correspond à ton attirance pour ${answers.attiranceLegendaire}, mais aussi à ta manière ${answers.energiePrincipale} de garder le cap.`
    },
    noteRarete: {
      score: rarity,
      justification: `Ta rareté vient de ce mélange: ${answers.rareteRessentie}, ${answers.arriveeGroupe}, et une énergie ${answers.energiePrincipale} qui ne se révèle pas d’un coup.`
    },
    surnomRigolo: `${answers.styleSurnom === "ridicule mais attachant" ? "Capitaine Deux Minutes" : `Mini ${calculation.pokemonAffiche} ${answers.styleSurnom}`}`,
    devise: `${answers.phraseSouvent} — mais avec ${answers.motsRepresentatifs.join(", ")} en réserve.`,
    miniResumeAffiche: {
      qualites: qualities.slice(0, 3),
      defauts: defects.slice(0, 3),
      amourCourt: `${sentenceList(answers.amourRecherche.slice(0, 3))}.`,
      amitieCourt: answers.roleAmitie,
      travailCourt: `${answers.styleTravail}, ${answers.approcheProjet}.`,
      deviseCourte: answers.phraseSouvent,
      surnom: `${answers.styleSurnom === "ridicule mais attachant" ? "Capitaine Deux Minutes" : `Mini ${calculation.pokemonAffiche}`}`,
      legendaireCompatible: legendary,
      noteRarete: `${rarity}/100`,
      habitatCourt: `${answers.ambiance}, ${calculation.ascendantRegional}`
    },
    promptImageDecorative: `Décor fan-made non officiel autour de ${calculation.pokemonAffiche}: ${answers.ambiance}, couleurs ${answers.couleursPrincipales.join(" et ")}, accent ${answers.couleurSecondaire}, ${answers.detailVisuel}, influence ${calculation.ascendantRegional}. Ne pas modifier le Pokémon.`,
    pokemonArtwork: input.pokemonArtwork,
    source: "fallback",
    warnings: warning ? [warning] : []
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeGeneratedProfile(
  candidate: unknown,
  input: ProfileGenerationInput,
  source: "openai" | "fallback" = "openai"
): GeneratedProfile {
  const fallback = createFallbackProfile(input);

  if (!isObject(candidate)) {
    return {
      ...fallback,
      source: "fallback",
      warnings: ["La réponse IA n’était pas un objet JSON exploitable."]
    };
  }

  const merged = {
    ...fallback,
    ...candidate,
    calculDetaille: {
      ...fallback.calculDetaille,
      ...(isObject(candidate.calculDetaille) ? candidate.calculDetaille : {})
    },
    talentPrincipal: {
      ...fallback.talentPrincipal,
      ...(isObject(candidate.talentPrincipal) ? candidate.talentPrincipal : {})
    },
    talentCache: {
      ...fallback.talentCache,
      ...(isObject(candidate.talentCache) ? candidate.talentCache : {})
    },
    attaqueSignature: {
      ...fallback.attaqueSignature,
      ...(isObject(candidate.attaqueSignature) ? candidate.attaqueSignature : {})
    },
    legendaireCompatible: {
      ...fallback.legendaireCompatible,
      ...(isObject(candidate.legendaireCompatible) ? candidate.legendaireCompatible : {})
    },
    noteRarete: {
      ...fallback.noteRarete,
      ...(isObject(candidate.noteRarete) ? candidate.noteRarete : {})
    },
    miniResumeAffiche: {
      ...fallback.miniResumeAffiche,
      ...(isObject(candidate.miniResumeAffiche) ? candidate.miniResumeAffiche : {})
    },
    pokemonArtwork: input.pokemonArtwork,
    source,
    warnings: source === "openai" ? fallback.warnings : ["Profil généré avec le moteur local de secours."]
  } as GeneratedProfile;

  merged.pokemonAffiche = input.calculation.pokemonAffiche;
  merged.starterBase = input.calculation.starterBase;
  merged.prenomOuPseudo = input.answers.prenomOuPseudo;
  merged.generation = `Génération ${input.calculation.generation}`;
  merged.regionOrigine = input.calculation.regionOrigine;
  merged.typePrincipal = input.calculation.typePrincipal;
  merged.ascendantRegional = input.calculation.ascendantRegional;

  if (!Number.isFinite(merged.noteRarete.score)) {
    merged.noteRarete.score = fallback.noteRarete.score;
  }

  merged.noteRarete.score = Math.max(1, Math.min(100, Math.round(Number(merged.noteRarete.score))));
  merged.miniResumeAffiche.noteRarete = `${merged.noteRarete.score}/100`;

  if (!merged.calculDetaille.generation) {
    merged.calculDetaille.generation = describeCalculation(input.calculation);
  }

  return merged;
}
