import { fanMadeNotice, typePalette } from "@/lib/pokemagique-data";
import { escapeHtml } from "@/lib/export-utils";
import { launchExportBrowser } from "@/lib/browser-launcher";
import type { GeneratedProfile, PokemonStarterType } from "@/lib/types";

function paletteFor(profile: GeneratedProfile) {
  return (
    typePalette[profile.typePrincipal as PokemonStarterType] ?? {
      main: "#168aad",
      soft: "#e4f7ff",
      text: "#12213a"
    }
  );
}

function section(title: string, body: string) {
  return `<section><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></section>`;
}

export function renderDocumentHtml(profile: GeneratedProfile) {
  const palette = paletteFor(profile);
  const qualities = profile.qualites
    .map((item) => `<li><strong>${escapeHtml(item.titre)}.</strong> ${escapeHtml(item.description)}</li>`)
    .join("");
  const defects = profile.defauts
    .map((item) => `<li><strong>${escapeHtml(item.titre)}.</strong> ${escapeHtml(item.description)}</li>`)
    .join("");
  const evolutions = profile.evolutionSymbolique
    .map((item) => `<li><strong>${escapeHtml(item.stade)} - ${escapeHtml(item.nom)}.</strong> ${escapeHtml(item.description)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <style>
    @page { size: A4; margin: 18mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #12213a;
      background: #ffffff;
      font-size: 12px;
      line-height: 1.55;
    }
    .cover {
      min-height: 250mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 20px;
      padding: 36px;
      background: linear-gradient(135deg, ${palette.soft}, #fff8e8);
      border: 4px solid ${palette.main};
      page-break-after: always;
    }
    h1 {
      margin: 0;
      font-size: 42px;
      line-height: 1;
    }
    h2 {
      margin: 24px 0 8px;
      font-size: 18px;
      color: ${palette.main};
      page-break-after: avoid;
    }
    h3 {
      margin: 18px 0 8px;
      font-size: 14px;
    }
    p { margin: 0 0 10px; }
    ul { margin: 8px 0 0 18px; padding: 0; }
    li { margin-bottom: 7px; }
    .tag {
      display: inline-block;
      margin: 14px 8px 0 0;
      padding: 7px 10px;
      border-radius: 999px;
      background: ${palette.soft};
      color: ${palette.text};
      font-weight: 700;
    }
    .notice {
      margin-top: 24px;
      padding: 12px;
      border-radius: 10px;
      background: #fff8e8;
      font-weight: 700;
    }
    .toc {
      page-break-after: always;
    }
    .small {
      color: rgba(18,33,58,0.65);
      font-size: 11px;
    }
  </style>
</head>
<body>
  <section class="cover">
    <p class="small">Document explicatif fan-made</p>
    <h1>Pokémagique ultra personnalisé<br />${escapeHtml(profile.nomPokemagique)}</h1>
    <p style="font-size:18px;margin-top:18px">Profil de ${escapeHtml(profile.prenomOuPseudo)}</p>
    <div>
      <span class="tag">${escapeHtml(profile.generation)}</span>
      <span class="tag">${escapeHtml(profile.typePrincipal)}</span>
      <span class="tag">${escapeHtml(profile.ascendantRegional)}</span>
      <span class="tag">Rareté ${escapeHtml(profile.miniResumeAffiche.noteRarete)}</span>
    </div>
    <p class="notice">${escapeHtml(fanMadeNotice)}</p>
  </section>

  <section class="toc">
    <h2>Sommaire</h2>
    <ol>
      <li>Calcul du Pokémagique</li>
      <li>Calcul de l’Ascendant</li>
      <li>Résumé du profil</li>
      <li>Personnalité profonde</li>
      <li>Influence régionale</li>
      <li>Apparence détaillée</li>
      <li>Qualités et défauts</li>
      <li>Amour, amitié, travail</li>
      <li>Talents, attaque signature et habitat</li>
      <li>Évolution symbolique, légendaire, rareté, devise et surnom</li>
    </ol>
  </section>

  ${section("Calcul du Pokémagique", `${profile.calculDetaille.generation} ${profile.calculDetaille.starter}`)}
  ${section("Calcul de l’Ascendant", profile.calculDetaille.ascendant)}
  ${section("Résumé du profil", profile.resumeRapide)}
  ${section("Personnalité profonde", profile.personnaliteProfonde)}
  ${section("Influence régionale", profile.formeRegionale)}
  ${section("Apparence détaillée", profile.apparenceUltraPersonnalisee)}
  <section><h2>Qualités</h2><ul>${qualities}</ul></section>
  <section><h2>Défauts</h2><ul>${defects}</ul></section>
  ${section("Amour", profile.amour)}
  ${section("Amitié", profile.amitie)}
  ${section("Travail / études", profile.travailEtudes)}
  ${section("Talents", `${profile.talentPrincipal.nom}: ${profile.talentPrincipal.description}\n${profile.talentCache.nom}: ${profile.talentCache.description}`)}
  ${section("Attaque signature", `${profile.attaqueSignature.nom} (${profile.attaqueSignature.type}) - ${profile.attaqueSignature.effet}. ${profile.attaqueSignature.descriptionVisuelle} ${profile.attaqueSignature.symboliquePsychologique}`)}
  ${section("Habitat", profile.habitat)}
  <section><h2>Évolution symbolique</h2><ul>${evolutions}</ul></section>
  ${section("Légendaire compatible", `${profile.legendaireCompatible.nom}: ${profile.legendaireCompatible.raison}`)}
  ${section("Note de rareté", `${profile.noteRarete.score}/100 - ${profile.noteRarete.justification}`)}
  ${section("Devise", profile.devise)}
  ${section("Surnom", profile.surnomRigolo)}
  ${section("Texte court utilisé pour l’affiche", JSON.stringify(profile.miniResumeAffiche, null, 2))}
  ${section("Prompt image décoratif", profile.promptImageDecorative)}
  <section><h2>Mention fan-made non officielle</h2><p>${escapeHtml(fanMadeNotice)}</p></section>
</body>
</html>`;
}

export async function exportProfilePdf(profile: GeneratedProfile) {
  const browser = await launchExportBrowser();

  try {
    const page = await browser.newPage();
    await page.setContent(renderDocumentHtml(profile), { waitUntil: "domcontentloaded" });
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 }).catch(() => undefined);
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "18mm", right: "16mm", bottom: "18mm", left: "16mm" }
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
