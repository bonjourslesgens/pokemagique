import type { QuestionnaireAnswers } from "@/lib/types";

export type QuestionFieldKind =
  | "text"
  | "textarea"
  | "radio"
  | "checkbox"
  | "tripleText"
  | "doubleText";

export interface QuestionField {
  name: keyof QuestionnaireAnswers;
  label: string;
  kind: QuestionFieldKind;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface QuestionStepConfig {
  title: string;
  description: string;
  fields: QuestionField[];
}

export const emptyAnswers: QuestionnaireAnswers = {
  prenomOuPseudo: "",
  afficherDateNaissance: "Oui",
  tons: [],
  dateNaissance: "",
  arriveeGroupe: "",
  energiePrincipale: "",
  fonctionnement: "",
  phraseCorrespondante: "",
  qualites: ["", "", ""],
  qualiteRemarquee: "",
  qualiteSouhaitee: "",
  defauts: ["", "", ""],
  reactionStress: "",
  piegePersonnel: "",
  roleAmitie: "",
  groupeIdeal: "",
  reactionAmiMal: "",
  amourRecherche: [],
  langageAmour: "",
  defautAmoureux: "",
  styleTravail: "",
  environnementIdeal: [],
  approcheProjet: "",
  ambiance: "",
  couleursPrincipales: ["", ""],
  couleurSecondaire: "",
  apparence: [],
  detailVisuel: "",
  pouvoirMagique: "",
  talentCache: "",
  attaqueSignature: "",
  attiranceLegendaire: "",
  rareteRessentie: "",
  motsRepresentatifs: ["", "", ""],
  phraseSouvent: "",
  styleSurnom: ""
};

export const exampleAnswers: QuestionnaireAnswers = {
  prenomOuPseudo: "Benoît",
  afficherDateNaissance: "Oui",
  tons: ["mélange de tout"],
  dateNaissance: "07/12/2004",
  arriveeGroupe: "observateur",
  energiePrincipale: "calme",
  fonctionnement: "la logique",
  phraseCorrespondante: "J’observe avant d’agir.",
  qualites: ["calme", "logique", "patient"],
  qualiteRemarquee: "fiabilité",
  qualiteSouhaitee: "créativité discrète",
  defauts: ["parle trop", "égocentrique", "procrastinateur"],
  reactionStress: "procrastiner",
  piegePersonnel: "trop réfléchir",
  roleAmitie: "celui qui écoute sans juger",
  groupeIdeal:
    "Petit groupe soudé, drôle, actif, qui aime les jeux vidéos, l’entrepreneuriat et les idées un peu folles.",
  reactionAmiMal: "Je fais ce dont il a besoin et je lui change les idées.",
  amourRecherche: ["la confiance", "l’humour", "la douceur"],
  langageAmour: "l’aide concrète",
  defautAmoureux: "besoin d’être rassuré",
  styleTravail: "discret mais fiable",
  environnementIdeal: ["calme", "en autonomie", "avec un objectif clair"],
  approcheProjet: "faire un plan",
  ambiance: "port sous la pluie",
  couleursPrincipales: ["bleu nuit", "doré"],
  couleurSecondaire: "blanc lunaire",
  apparence: ["mystérieuse", "lumineuse"],
  detailVisuel: "écume dorée",
  pouvoirMagique: "calmer les conflits",
  talentCache: "l’observation",
  attaqueSignature: "",
  attiranceLegendaire: "la mer",
  rareteRessentie: "simple en apparence, complexe au fond",
  motsRepresentatifs: ["calme", "logique", "patient"],
  phraseSouvent: "laisse-moi deux minutes",
  styleSurnom: "ridicule mais attachant"
};

export const questionnaireSteps: QuestionStepConfig[] = [
  {
    title: "Identité",
    description: "Les informations visibles sur ta fiche Pokémagique.",
    fields: [
      {
        name: "prenomOuPseudo",
        label: "Quel prénom ou pseudo veux-tu voir apparaître sur la fiche ?",
        kind: "text",
        placeholder: "Ex. Benoît",
        required: true
      },
      {
        name: "afficherDateNaissance",
        label: "Veux-tu que l’affiche indique ta date de naissance ?",
        kind: "radio",
        options: ["Oui", "Non"],
        required: true
      },
      {
        name: "tons",
        label: "Préfères-tu un ton de résultat ?",
        kind: "checkbox",
        options: ["drôle", "mystique", "sérieux", "très astrologique", "très Pokémon", "mélange de tout"],
        required: true
      }
    ]
  },
  {
    title: "Date de naissance",
    description: "La date déclenche le calcul de génération, starter et ascendant.",
    fields: [
      {
        name: "dateNaissance",
        label: "Date de naissance au format JJ/MM/AAAA.",
        kind: "text",
        placeholder: "07/12/2004",
        required: true
      }
    ]
  },
  {
    title: "Personnalité générale",
    description: "Le socle de ton interprétation magique.",
    fields: [
      {
        name: "arriveeGroupe",
        label: "Quand tu arrives dans un groupe, tu es plutôt :",
        kind: "radio",
        options: ["discret au début", "directement à l’aise", "observateur", "blagueur", "leader naturel", "imprévisible"],
        required: true
      },
      {
        name: "energiePrincipale",
        label: "Ton énergie principale est plutôt :",
        kind: "radio",
        options: ["calme", "intense", "solaire", "mystérieuse", "créative", "nerveuse", "protectrice", "ambitieuse"],
        required: true
      },
      {
        name: "fonctionnement",
        label: "Dans la vie, tu fonctionnes surtout avec :",
        kind: "radio",
        options: ["la logique", "l’instinct", "les émotions", "l’imagination", "l’ambition", "la loyauté", "la curiosité"],
        required: true
      },
      {
        name: "phraseCorrespondante",
        label: "Quelle phrase te correspond le mieux ?",
        kind: "radio",
        options: [
          "J’observe avant d’agir.",
          "Je fonce et j’improvise.",
          "Je protège les autres.",
          "Je veux comprendre le monde.",
          "Je veux réussir ce que je commence.",
          "Je transforme tout en idée créative.",
          "Je cache beaucoup de choses derrière une apparence calme."
        ],
        required: true
      }
    ]
  },
  {
    title: "Qualités",
    description: "Ce qui brille naturellement chez toi.",
    fields: [
      { name: "qualites", label: "Donne trois qualités qui te correspondent.", kind: "tripleText", required: true },
      { name: "qualiteRemarquee", label: "Quelle qualité les autres remarquent souvent chez toi ?", kind: "text", required: true },
      { name: "qualiteSouhaitee", label: "Quelle qualité aimerais-tu qu’on remarque davantage ?", kind: "text", required: true }
    ]
  },
  {
    title: "Défauts",
    description: "Les petites zones de turbulence qui rendent le profil plus vrai.",
    fields: [
      { name: "defauts", label: "Donne trois défauts qui te correspondent.", kind: "tripleText", required: true },
      {
        name: "reactionStress",
        label: "Quand tu es stressé, tu as tendance à :",
        kind: "radio",
        options: [
          "t’isoler",
          "parler trop vite",
          "procrastiner",
          "tout contrôler",
          "t’énerver",
          "faire semblant que tout va bien",
          "dramatiser",
          "te mettre trop de pression"
        ],
        required: true
      },
      {
        name: "piegePersonnel",
        label: "Ton plus grand piège personnel est plutôt :",
        kind: "radio",
        options: [
          "douter de toi",
          "être trop gentil",
          "vouloir avoir raison",
          "trop réfléchir",
          "agir trop vite",
          "éviter les conflits",
          "vouloir tout réussir parfaitement"
        ],
        required: true
      }
    ]
  },
  {
    title: "Amitié",
    description: "Ta façon d’être dans ton équipe de cœur.",
    fields: [
      {
        name: "roleAmitie",
        label: "En amitié, tu es plutôt :",
        kind: "radio",
        options: [
          "le confident",
          "le clown du groupe",
          "le protecteur",
          "le stratège",
          "celui qui motive tout le monde",
          "celui qui disparaît puis revient comme si de rien n’était",
          "celui qui écoute sans juger"
        ],
        required: true
      },
      { name: "groupeIdeal", label: "Ton groupe idéal d’amis ressemble à quoi ?", kind: "textarea", required: true },
      { name: "reactionAmiMal", label: "Que fais-tu quand un ami va mal ?", kind: "textarea", required: true }
    ]
  },
  {
    title: "Amour",
    description: "La météo émotionnelle de ton Pokémagique.",
    fields: [
      {
        name: "amourRecherche",
        label: "En amour, tu recherches surtout :",
        kind: "checkbox",
        options: ["la stabilité", "la passion", "la complicité", "la liberté", "la confiance", "l’humour", "l’intensité", "la douceur"],
        required: true
      },
      {
        name: "langageAmour",
        label: "Ton langage d’amour principal est plutôt :",
        kind: "radio",
        options: ["les mots", "les gestes", "le temps passé ensemble", "les cadeaux symboliques", "l’aide concrète", "l’humour", "la présence silencieuse"],
        required: true
      },
      {
        name: "defautAmoureux",
        label: "Ton défaut amoureux possible :",
        kind: "radio",
        options: ["jalousie", "peur de déranger", "difficulté à parler", "besoin d’être rassuré", "tendance à fuir", "intensité émotionnelle", "exigence élevée"],
        required: true
      }
    ]
  },
  {
    title: "Travail / études",
    description: "Ta manière d’avancer dans les projets.",
    fields: [
      {
        name: "styleTravail",
        label: "Au travail ou dans les études, tu es plutôt :",
        kind: "radio",
        options: [
          "organisé",
          "créatif",
          "efficace sous pression",
          "perfectionniste",
          "improvisateur",
          "leader",
          "discret mais fiable",
          "motivé seulement si le sujet t’intéresse"
        ],
        required: true
      },
      {
        name: "environnementIdeal",
        label: "Ton environnement idéal pour réussir :",
        kind: "checkbox",
        options: ["calme", "stimulant", "compétitif", "créatif", "en équipe", "en autonomie", "avec un objectif clair", "avec beaucoup de liberté"],
        required: true
      },
      {
        name: "approcheProjet",
        label: "Face à un gros projet, tu commences par :",
        kind: "radio",
        options: [
          "faire un plan",
          "chercher l’inspiration",
          "tester directement",
          "demander des avis",
          "repousser puis tout faire d’un coup",
          "diviser en petites étapes",
          "imaginer le résultat final"
        ],
        required: true
      }
    ]
  },
  {
    title: "Univers esthétique",
    description: "L’ambiance qui habillera l’affiche autour du Pokémon.",
    fields: [
      {
        name: "ambiance",
        label: "Choisis une ambiance :",
        kind: "radio",
        options: [
          "forêt ancienne",
          "ville futuriste",
          "plage tropicale",
          "montagne mystique",
          "bibliothèque secrète",
          "volcan",
          "ciel étoilé",
          "jardin abandonné",
          "port sous la pluie",
          "fête nocturne"
        ],
        required: true
      },
      { name: "couleursPrincipales", label: "Choisis deux couleurs principales.", kind: "doubleText", required: true },
      { name: "couleurSecondaire", label: "Choisis une couleur secondaire.", kind: "text", required: true },
      {
        name: "apparence",
        label: "Préfères-tu une apparence :",
        kind: "checkbox",
        options: ["mignonne", "élégante", "mystérieuse", "puissante", "drôle", "sauvage", "royale", "futuriste", "sombre", "lumineuse"],
        required: true
      },
      {
        name: "detailVisuel",
        label: "Quel détail visuel aimerais-tu autour de ton Pokémagique ?",
        kind: "text",
        placeholder: "Ex. écume dorée, cristaux, feuilles dorées...",
        required: true
      }
    ]
  },
  {
    title: "Pouvoirs et talents",
    description: "Ce qui donne sa magie personnelle au résultat.",
    fields: [
      {
        name: "pouvoirMagique",
        label: "Si tu avais un pouvoir magique, ce serait :",
        kind: "radio",
        options: [
          "soigner",
          "protéger",
          "inspirer",
          "contrôler l’eau",
          "contrôler le feu",
          "faire pousser la nature",
          "manipuler les ombres",
          "lire les émotions",
          "créer des illusions",
          "accélérer ta vitesse",
          "calmer les conflits",
          "transformer les idées en réalité"
        ],
        required: true
      },
      {
        name: "talentCache",
        label: "Ton talent caché serait lié à :",
        kind: "radio",
        options: ["la stratégie", "l’intuition", "la créativité", "la résistance", "la chance", "la communication", "la discrétion", "l’observation", "l’humour", "la persévérance"],
        required: true
      },
      {
        name: "attaqueSignature",
        label: "Quelle serait ton attaque signature ?",
        kind: "text",
        placeholder: "Facultatif, l’IA peut l’inventer"
      }
    ]
  },
  {
    title: "Légendaire compatible",
    description: "Un symbole fort qui répond à ta personnalité.",
    fields: [
      {
        name: "attiranceLegendaire",
        label: "Choisis ce qui t’attire le plus :",
        kind: "radio",
        options: [
          "la mer",
          "le ciel",
          "les rêves",
          "le temps",
          "l’espace",
          "la nature",
          "le feu",
          "la lune",
          "le soleil",
          "les tempêtes",
          "les illusions",
          "les ruines anciennes"
        ],
        required: true
      }
    ]
  },
  {
    title: "Rareté",
    description: "Une note symbolique sur 100 sera calculée et racontée.",
    fields: [
      {
        name: "rareteRessentie",
        label: "Tu te sens plutôt :",
        kind: "radio",
        options: [
          "commun mais fiable",
          "rare sans le vouloir",
          "très atypique",
          "difficile à comprendre",
          "simple en apparence, complexe au fond",
          "spectaculaire",
          "discret mais unique"
        ],
        required: true
      }
    ]
  },
  {
    title: "Devise et surnom",
    description: "La touche finale de la fiche.",
    fields: [
      { name: "motsRepresentatifs", label: "Donne trois mots qui te représentent.", kind: "tripleText", required: true },
      { name: "phraseSouvent", label: "Donne une phrase que tu pourrais dire souvent.", kind: "text", required: true },
      {
        name: "styleSurnom",
        label: "Préfères-tu un surnom rigolo :",
        kind: "radio",
        options: ["mignon", "drôle", "stylé", "mystérieux", "ridicule mais attachant", "épique", "sarcastique"],
        required: true
      }
    ]
  }
];
