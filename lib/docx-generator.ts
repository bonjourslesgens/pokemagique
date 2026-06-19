import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType
} from "docx";
import { fanMadeNotice } from "@/lib/pokemagique-data";
import type { GeneratedProfile } from "@/lib/types";

function title(text: string) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 160 }
  });
}

function subtitle(text: string) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 120 }
  });
}

function paragraph(text: string) {
  return new Paragraph({
    children: [new TextRun(text)],
    spacing: { after: 150 },
    alignment: AlignmentType.LEFT
  });
}

function bullet(text: string) {
  return new Paragraph({
    text,
    bullet: { level: 0 },
    spacing: { after: 90 }
  });
}

function infoTable(profile: GeneratedProfile) {
  const rows = [
    ["Nom", profile.nomPokemagique],
    ["Profil de", profile.prenomOuPseudo],
    ["Génération", profile.generation],
    ["Région d’origine", profile.regionOrigine],
    ["Starter de base", profile.starterBase],
    ["Pokémon affiché", profile.pokemonAffiche],
    ["Type principal", profile.typePrincipal],
    ["Type secondaire", profile.typeSecondaire],
    ["Ascendant régional", profile.ascendantRegional],
    ["Rareté", `${profile.noteRarete.score}/100`]
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map(
      ([label, value]) =>
        new TableRow({
          children: [
            new TableCell({ children: [paragraph(label)] }),
            new TableCell({ children: [paragraph(value)] })
          ]
        })
    )
  });
}

export async function createProfileDocx(profile: GeneratedProfile) {
  const children = [
    new Paragraph({
      text: `Pokémagique ultra personnalisé — ${profile.nomPokemagique}`,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 }
    }),
    paragraph(`Profil de ${profile.prenomOuPseudo}`),
    paragraph(fanMadeNotice),
    infoTable(profile),
    title("Sommaire"),
    bullet("Calcul du Pokémagique"),
    bullet("Calcul de l’Ascendant"),
    bullet("Résumé du profil"),
    bullet("Personnalité profonde"),
    bullet("Influence régionale"),
    bullet("Apparence détaillée"),
    bullet("Qualités et défauts"),
    bullet("Amour, amitié, travail / études"),
    bullet("Talents, attaque signature, habitat"),
    bullet("Évolution symbolique, légendaire, rareté, devise et surnom"),
    title("Calcul du Pokémagique"),
    paragraph(profile.calculDetaille.generation),
    paragraph(profile.calculDetaille.starter),
    title("Calcul de l’Ascendant"),
    paragraph(profile.calculDetaille.ascendant),
    title("Résumé du profil"),
    paragraph(profile.resumeRapide),
    title("Personnalité profonde"),
    paragraph(profile.personnaliteProfonde),
    title("Influence régionale"),
    paragraph(profile.formeRegionale),
    title("Apparence détaillée"),
    paragraph(profile.apparenceUltraPersonnalisee),
    title("Qualités"),
    ...profile.qualites.flatMap((item) => [subtitle(item.titre), paragraph(item.description)]),
    title("Défauts"),
    ...profile.defauts.flatMap((item) => [subtitle(item.titre), paragraph(item.description)]),
    title("Amour"),
    paragraph(profile.amour),
    title("Amitié"),
    paragraph(profile.amitie),
    title("Travail / études"),
    paragraph(profile.travailEtudes),
    title("Talents"),
    subtitle(profile.talentPrincipal.nom),
    paragraph(profile.talentPrincipal.description),
    subtitle(profile.talentCache.nom),
    paragraph(profile.talentCache.description),
    title("Attaque signature"),
    paragraph(`${profile.attaqueSignature.nom} — ${profile.attaqueSignature.type}`),
    paragraph(profile.attaqueSignature.effet),
    paragraph(profile.attaqueSignature.descriptionVisuelle),
    paragraph(profile.attaqueSignature.symboliquePsychologique),
    title("Habitat"),
    paragraph(profile.habitat),
    title("Évolution symbolique"),
    ...profile.evolutionSymbolique.flatMap((item) => [
      subtitle(`${item.stade} — ${item.nom}`),
      paragraph(item.description)
    ]),
    title("Légendaire compatible"),
    paragraph(`${profile.legendaireCompatible.nom}: ${profile.legendaireCompatible.raison}`),
    title("Note de rareté"),
    paragraph(`${profile.noteRarete.score}/100 — ${profile.noteRarete.justification}`),
    title("Devise"),
    paragraph(profile.devise),
    title("Surnom"),
    paragraph(profile.surnomRigolo),
    title("Texte court utilisé pour l’affiche"),
    paragraph(JSON.stringify(profile.miniResumeAffiche, null, 2)),
    title("Prompt image décoratif utilisé ou généré"),
    paragraph(profile.promptImageDecorative),
    title("Mention fan-made non officielle"),
    paragraph(fanMadeNotice)
  ];

  const document = new Document({
    creator: "Pokémagique",
    title: `Pokémagique ultra personnalisé — ${profile.nomPokemagique}`,
    description: fanMadeNotice,
    sections: [
      {
        properties: {},
        children
      }
    ]
  });

  return Packer.toBuffer(document);
}
