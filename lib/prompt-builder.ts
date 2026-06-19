import { fanMadeNotice } from "@/lib/pokemagique-data";
import type { ProfileGenerationInput } from "@/lib/types";

export function buildProfilePrompt(input: ProfileGenerationInput) {
  return {
    system: [
      "Tu es un générateur de profils Pokémagiques en français.",
      "Tu écris dans un style amusant, magique, bienveillant, légèrement astrologique et très personnalisé.",
      "Tu réponds uniquement avec un objet JSON valide, sans markdown et sans texte autour.",
      "Tu n’inventes pas de faux Pokémon pour l’image centrale: le champ pokemonAffiche doit garder le Pokémon réel fourni.",
      fanMadeNotice
    ].join("\n"),
    user: [
      "Génère le profil Pokémagique complet selon ce schéma exact.",
      "Relie les interprétations aux réponses de la personne. Évite les phrases vagues.",
      "Utilise miniResumeAffiche pour produire des textes très courts destinés à une affiche A4.",
      "Objet source:",
      JSON.stringify(input, null, 2),
      "Schéma JSON attendu:",
      JSON.stringify(
        {
          nomPokemagique: "",
          prenomOuPseudo: "",
          generation: "",
          regionOrigine: "",
          starterBase: "",
          pokemonAffiche: "",
          typePrincipal: "",
          typeSecondaire: "",
          ascendantRegional: "",
          dateNaissanceUtilisee: "",
          calculDetaille: {
            annee: "",
            mois: "",
            jour: "",
            generation: "",
            starter: "",
            ascendant: ""
          },
          resumeRapide: "",
          personnaliteProfonde: "",
          formeRegionale: "",
          apparenceUltraPersonnalisee: "",
          qualites: [{ titre: "", description: "" }],
          defauts: [{ titre: "", description: "" }],
          amour: "",
          amitie: "",
          travailEtudes: "",
          talentPrincipal: { nom: "", description: "" },
          talentCache: { nom: "", description: "" },
          attaqueSignature: {
            nom: "",
            type: "",
            effet: "",
            descriptionVisuelle: "",
            symboliquePsychologique: ""
          },
          habitat: "",
          evolutionSymbolique: [
            { stade: "Forme de base", nom: "", description: "" },
            { stade: "Forme affirmée", nom: "", description: "" },
            { stade: "Forme accomplie", nom: "", description: "" }
          ],
          legendaireCompatible: { nom: "", raison: "" },
          noteRarete: { score: 0, justification: "" },
          surnomRigolo: "",
          devise: "",
          miniResumeAffiche: {
            qualites: [],
            defauts: [],
            amourCourt: "",
            amitieCourt: "",
            travailCourt: "",
            deviseCourte: "",
            surnom: "",
            legendaireCompatible: "",
            noteRarete: "",
            habitatCourt: ""
          },
          promptImageDecorative: ""
        },
        null,
        2
      )
    ].join("\n\n")
  };
}
