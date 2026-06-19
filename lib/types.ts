export type PokemonStarterType = "Plante" | "Feu" | "Eau";

export type RegionName =
  | "Kanto"
  | "Johto"
  | "Hoenn"
  | "Sinnoh"
  | "Unys"
  | "Kalos"
  | "Alola"
  | "Galar"
  | "Paldea"
  | "Vents & Vagues";

export interface RegionInfluence {
  name: RegionName;
  traits: string[];
  colors: string;
  habitat: string;
  style: string;
}

export interface GenerationStarterData {
  generation: number;
  region: RegionName;
  starters: Record<PokemonStarterType, string>;
}

export interface QuestionnaireAnswers {
  prenomOuPseudo: string;
  afficherDateNaissance: "Oui" | "Non";
  tons: string[];
  dateNaissance: string;
  arriveeGroupe: string;
  energiePrincipale: string;
  fonctionnement: string;
  phraseCorrespondante: string;
  qualites: [string, string, string];
  qualiteRemarquee: string;
  qualiteSouhaitee: string;
  defauts: [string, string, string];
  reactionStress: string;
  piegePersonnel: string;
  roleAmitie: string;
  groupeIdeal: string;
  reactionAmiMal: string;
  amourRecherche: string[];
  langageAmour: string;
  defautAmoureux: string;
  styleTravail: string;
  environnementIdeal: string[];
  approcheProjet: string;
  ambiance: string;
  couleursPrincipales: [string, string];
  couleurSecondaire: string;
  apparence: string[];
  detailVisuel: string;
  pouvoirMagique: string;
  talentCache: string;
  attaqueSignature: string;
  attiranceLegendaire: string;
  rareteRessentie: string;
  motsRepresentatifs: [string, string, string];
  phraseSouvent: string;
  styleSurnom: string;
}

export interface BirthDateCalculation {
  year: number;
  month: number;
  day: number;
  generation: number;
  regionOrigine: RegionName;
  starterType: PokemonStarterType;
  starterBase: string;
  pokemonAffiche: string;
  typePrincipal: PokemonStarterType;
  ascendantRegional: RegionName;
  regionInfluence: RegionInfluence;
}

export interface PokemonArtwork {
  pokemonNameFr: string;
  slug: string;
  artworkUrl: string | null;
  spriteUrl: string | null;
  imageUrl: string | null;
  source: "pokeapi" | "fallback";
  error?: string;
}

export interface ProfileGenerationInput {
  answers: QuestionnaireAnswers;
  calculation: BirthDateCalculation;
  pokemonArtwork: PokemonArtwork;
}

export interface ProfileTextItem {
  titre: string;
  description: string;
}

export interface GeneratedProfile {
  nomPokemagique: string;
  prenomOuPseudo: string;
  generation: string;
  regionOrigine: string;
  starterBase: string;
  pokemonAffiche: string;
  typePrincipal: string;
  typeSecondaire: string;
  ascendantRegional: string;
  dateNaissanceUtilisee: string;
  calculDetaille: {
    annee: string;
    mois: string;
    jour: string;
    generation: string;
    starter: string;
    ascendant: string;
  };
  resumeRapide: string;
  personnaliteProfonde: string;
  formeRegionale: string;
  apparenceUltraPersonnalisee: string;
  qualites: ProfileTextItem[];
  defauts: ProfileTextItem[];
  amour: string;
  amitie: string;
  travailEtudes: string;
  talentPrincipal: {
    nom: string;
    description: string;
  };
  talentCache: {
    nom: string;
    description: string;
  };
  attaqueSignature: {
    nom: string;
    type: string;
    effet: string;
    descriptionVisuelle: string;
    symboliquePsychologique: string;
  };
  habitat: string;
  evolutionSymbolique: Array<{
    stade: "Forme de base" | "Forme affirmée" | "Forme accomplie";
    nom: string;
    description: string;
  }>;
  legendaireCompatible: {
    nom: string;
    raison: string;
  };
  noteRarete: {
    score: number;
    justification: string;
  };
  surnomRigolo: string;
  devise: string;
  miniResumeAffiche: {
    qualites: string[];
    defauts: string[];
    amourCourt: string;
    amitieCourt: string;
    travailCourt: string;
    deviseCourte: string;
    surnom: string;
    legendaireCompatible: string;
    noteRarete: string;
    habitatCourt: string;
  };
  promptImageDecorative: string;
  pokemonArtwork?: PokemonArtwork;
  source?: "openai" | "fallback";
  warnings?: string[];
}

export interface ExportResult {
  filename: string;
  contentType: string;
}
