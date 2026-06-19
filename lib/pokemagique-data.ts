import type {
  GenerationStarterData,
  PokemonStarterType,
  RegionInfluence,
  RegionName
} from "@/lib/types";

export const fanMadeNotice =
  "Projet personnel fan-made, non officiel, sans usage commercial.";

export const pokemonStarterTypes: PokemonStarterType[] = ["Plante", "Feu", "Eau"];

export const regions: RegionName[] = [
  "Kanto",
  "Johto",
  "Hoenn",
  "Sinnoh",
  "Unys",
  "Kalos",
  "Alola",
  "Galar",
  "Paldea",
  "Vents & Vagues"
];

export const regionInfluences: Record<RegionName, RegionInfluence> = {
  Kanto: {
    name: "Kanto",
    traits: ["classique", "courageux", "direct", "fiable"],
    colors: "couleurs franches, apparence simple mais iconique",
    habitat: "plaines, forêts anciennes, routes d’aventure",
    style: "héros de départ, énergie fondatrice"
  },
  Johto: {
    name: "Johto",
    traits: ["sensible", "loyal", "nostalgique", "spirituel"],
    colors: "couleurs douces, détails traditionnels, aura paisible",
    habitat: "temples, forêts calmes, villages anciens",
    style: "sagesse, mémoire, équilibre"
  },
  Hoenn: {
    name: "Hoenn",
    traits: ["énergique", "solaire", "sauvage", "proche des éléments"],
    colors: "couleurs tropicales, motifs naturels, apparence vive",
    habitat: "plages, jungles, volcans, îles",
    style: "aventure, liberté, mouvement"
  },
  Sinnoh: {
    name: "Sinnoh",
    traits: ["profond", "réfléchi", "mystérieux", "lié au destin"],
    colors: "couleurs froides, détails minéraux, aura ancienne",
    habitat: "montagnes, ruines, lacs sacrés",
    style: "mythologie, patience, grandeur intérieure"
  },
  Unys: {
    name: "Unys",
    traits: ["ambitieux", "urbain", "moderne", "stratégique"],
    colors: "couleurs contrastées, détails graphiques, énergie de ville",
    habitat: "parcs urbains, toits-jardins, rues animées",
    style: "adaptation, créativité, progression"
  },
  Kalos: {
    name: "Kalos",
    traits: ["élégant", "artistique", "charismatique", "raffiné"],
    colors: "couleurs harmonieuses, détails dorés, posture gracieuse",
    habitat: "jardins, cafés, places lumineuses, musées",
    style: "beauté, expression, mise en scène"
  },
  Alola: {
    name: "Alola",
    traits: ["chaleureux", "détendu", "protecteur", "solaire"],
    colors: "couleurs tropicales, motifs floraux, apparence lumineuse",
    habitat: "plages, lagons, volcans, forêts côtières",
    style: "joie, lien social, instinct"
  },
  Galar: {
    name: "Galar",
    traits: ["déterminé", "compétitif", "théâtral", "résistant"],
    colors: "couleurs sportives, allure dynamique, contrastes affirmés",
    habitat: "stades, landes, villes industrielles, collines",
    style: "ambition, spectacle, dépassement"
  },
  Paldea: {
    name: "Paldea",
    traits: ["curieux", "indépendant", "spontané", "explorateur"],
    colors: "couleurs vives, formes expressives, détails scolaires ou aventureux",
    habitat: "plateaux, villes étudiantes, falaises, grands chemins",
    style: "découverte, liberté, apprentissage"
  },
  "Vents & Vagues": {
    name: "Vents & Vagues",
    traits: ["imaginaire", "changeant", "poétique", "imprévisible"],
    colors: "couleurs irisées, motifs de vent, d’écume ou de nuages",
    habitat: "falaises marines, archipels, ports oubliés, ciels d’orage",
    style: "rêve, transformation, intuition"
  }
};

export const generationStarters: GenerationStarterData[] = [
  {
    generation: 1,
    region: "Kanto",
    starters: { Plante: "Bulbizarre", Feu: "Salamèche", Eau: "Carapuce" }
  },
  {
    generation: 2,
    region: "Johto",
    starters: { Plante: "Germignon", Feu: "Héricendre", Eau: "Kaiminus" }
  },
  {
    generation: 3,
    region: "Hoenn",
    starters: { Plante: "Arcko", Feu: "Poussifeu", Eau: "Gobou" }
  },
  {
    generation: 4,
    region: "Sinnoh",
    starters: { Plante: "Tortipouss", Feu: "Ouisticram", Eau: "Tiplouf" }
  },
  {
    generation: 5,
    region: "Unys",
    starters: { Plante: "Vipélierre", Feu: "Gruikui", Eau: "Moustillon" }
  },
  {
    generation: 6,
    region: "Kalos",
    starters: { Plante: "Marisson", Feu: "Feunnec", Eau: "Grenousse" }
  },
  {
    generation: 7,
    region: "Alola",
    starters: { Plante: "Brindibou", Feu: "Flamiaou", Eau: "Otaquin" }
  },
  {
    generation: 8,
    region: "Galar",
    starters: { Plante: "Ouistempo", Feu: "Flambino", Eau: "Larméléon" }
  },
  {
    generation: 9,
    region: "Paldea",
    starters: { Plante: "Poussacha", Feu: "Chochodile", Eau: "Coiffeton" }
  },
  {
    generation: 10,
    region: "Vents & Vagues",
    starters: { Plante: "Broussatif", Feu: "Caloulou", Eau: "Ogéko" }
  }
];

export const starterDisplayFallback: Record<string, string> = {
  Broussatif: "Bulbizarre",
  Caloulou: "Salamèche",
  Ogéko: "Carapuce"
};

export const typeAccentClasses: Record<PokemonStarterType, string> = {
  Plante: "from-[#57cc99] via-[#80ed99] to-[#ffd166]",
  Feu: "from-[#f94144] via-[#f3722c] to-[#ffd166]",
  Eau: "from-[#168aad] via-[#4cc9f0] to-[#ffffff]"
};

export const typePalette: Record<PokemonStarterType, { main: string; soft: string; text: string }> = {
  Plante: { main: "#2d9d68", soft: "#dff7df", text: "#123a2a" },
  Feu: { main: "#e84a2a", soft: "#fff1dc", text: "#512012" },
  Eau: { main: "#168aad", soft: "#e4f7ff", text: "#102f45" }
};

export const legendaryByAttraction: Record<string, string[]> = {
  "la mer": ["Kyogre", "Lugia", "Manaphy"],
  "le ciel": ["Rayquaza", "Ho-Oh", "Latios"],
  "les rêves": ["Cresselia", "Mew", "Jirachi"],
  "le temps": ["Dialga", "Celebi"],
  "l’espace": ["Palkia", "Deoxys"],
  "la nature": ["Celebi", "Viridium", "Xerneas"],
  "le feu": ["Ho-Oh", "Entei", "Reshiram"],
  "la lune": ["Lunala", "Cresselia"],
  "le soleil": ["Solgaleo", "Ho-Oh"],
  "les tempêtes": ["Rayquaza", "Zekrom", "Thundurus"],
  "les illusions": ["Mew", "Latias", "Zoroark"],
  "les ruines anciennes": ["Regigigas", "Giratina", "Zygarde"]
};
