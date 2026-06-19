import { fanMadeNotice, typePalette } from "@/lib/pokemagique-data";
import { escapeHtml, listItems } from "@/lib/export-utils";
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

export function renderPosterHtml(profile: GeneratedProfile) {
  const palette = paletteFor(profile);
  const imageUrl = profile.pokemonArtwork?.imageUrl;

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      width: 2480px;
      height: 3508px;
      font-family: Arial, Helvetica, sans-serif;
      color: #12213a;
      background: #ffffff;
    }
    .poster {
      width: 2480px;
      height: 3508px;
      padding: 86px;
      background:
        radial-gradient(circle at 12% 16%, rgba(255, 209, 102, 0.66), transparent 620px),
        radial-gradient(circle at 82% 12%, ${palette.soft}, transparent 680px),
        linear-gradient(135deg, ${palette.main}, #ffd166 54%, #fff8e8);
      border: 48px solid #12213a;
    }
    .inner {
      width: 100%;
      height: 100%;
      padding: 64px;
      border: 18px solid rgba(255,255,255,0.86);
      border-radius: 72px;
      background: rgba(255, 248, 232, 0.96);
      display: flex;
      flex-direction: column;
    }
    header {
      display: flex;
      justify-content: space-between;
      gap: 80px;
      align-items: flex-start;
    }
    .eyebrow {
      color: #e53935;
      font-size: 46px;
      font-weight: 900;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    h1 {
      margin: 18px 0 0;
      font-size: 142px;
      line-height: 0.93;
      letter-spacing: 0;
    }
    .subtitle {
      margin-top: 26px;
      font-size: 58px;
      font-weight: 800;
      color: rgba(18,33,58,0.72);
    }
    .rarity {
      min-width: 420px;
      border-radius: 48px;
      padding: 36px;
      text-align: right;
      background: #fff;
      box-shadow: 0 24px 70px rgba(18,33,58,0.16);
    }
    .rarity-label {
      font-size: 32px;
      font-weight: 900;
      color: rgba(18,33,58,0.55);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .rarity-score {
      margin-top: 8px;
      color: #e53935;
      font-size: 104px;
      font-weight: 900;
    }
    .stats {
      margin-top: 54px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }
    .box {
      border: 5px solid rgba(18,33,58,0.11);
      border-radius: 34px;
      background: rgba(255,255,255,0.9);
      padding: 28px;
      min-height: 150px;
    }
    .box-title {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(18,33,58,0.55);
    }
    .box-body {
      margin-top: 12px;
      font-size: 42px;
      line-height: 1.08;
      font-weight: 900;
    }
    .stage {
      position: relative;
      flex: 1;
      margin: 54px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 18px solid #fff;
      border-radius: 64px;
      background:
        radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95), transparent 560px),
        radial-gradient(circle at 72% 70%, ${palette.soft}, transparent 520px),
        linear-gradient(135deg, #ffffff, rgba(255,255,255,0.42));
    }
    .aura {
      position: absolute;
      inset: 210px;
      border-radius: 999px;
      background: ${palette.main};
      opacity: 0.16;
      filter: blur(42px);
    }
    .orbit {
      position: absolute;
      width: 74%;
      height: 50%;
      border: 13px dashed rgba(18,33,58,0.13);
      border-radius: 50%;
      transform: rotate(-8deg);
    }
    .pokemon {
      position: relative;
      z-index: 2;
      max-width: 66%;
      max-height: 78%;
      object-fit: contain;
      filter: drop-shadow(0 76px 54px rgba(18,33,58,0.24));
    }
    .placeholder {
      position: relative;
      z-index: 2;
      max-width: 980px;
      padding: 82px;
      border-radius: 54px;
      border: 16px dashed rgba(18,33,58,0.2);
      background: rgba(255,255,255,0.88);
      text-align: center;
      font-size: 70px;
      font-weight: 900;
    }
    .details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 26px;
    }
    .footer {
      margin-top: 36px;
      text-align: center;
      font-size: 29px;
      font-weight: 800;
      color: rgba(18,33,58,0.58);
    }
  </style>
</head>
<body>
  <main class="poster">
    <section class="inner">
      <header>
        <div>
          <div class="eyebrow">Ton Pokémagique</div>
          <h1>${escapeHtml(profile.nomPokemagique)}</h1>
          <div class="subtitle">Fiche de ${escapeHtml(profile.prenomOuPseudo)}</div>
        </div>
        <div class="rarity">
          <div class="rarity-label">Note de rareté</div>
          <div class="rarity-score">${escapeHtml(profile.miniResumeAffiche.noteRarete)}</div>
        </div>
      </header>

      <section class="stats">
        <div class="box"><div class="box-title">Génération</div><div class="box-body">${escapeHtml(profile.generation)}</div></div>
        <div class="box"><div class="box-title">Type</div><div class="box-body">${escapeHtml(profile.typePrincipal)}${profile.typeSecondaire ? ` / ${escapeHtml(profile.typeSecondaire)}` : ""}</div></div>
        <div class="box"><div class="box-title">Ascendant</div><div class="box-body">${escapeHtml(profile.ascendantRegional)}</div></div>
      </section>

      <section class="stage">
        <div class="aura"></div>
        <div class="orbit"></div>
        ${
          imageUrl
            ? `<img class="pokemon" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(profile.pokemonAffiche)}" />`
            : `<div class="placeholder">${escapeHtml(profile.pokemonAffiche)}<br /><span style="font-size:42px;color:rgba(18,33,58,.58)">Image PokéAPI indisponible</span></div>`
        }
      </section>

      <section class="details">
        <div class="box"><div class="box-title">Comment j’ai calculé ?</div><div class="box-body">${escapeHtml(profile.calculDetaille.annee)} / ${escapeHtml(profile.calculDetaille.mois)} / ${escapeHtml(profile.calculDetaille.jour)}</div></div>
        <div class="box"><div class="box-title">Qualités</div><div class="box-body">${listItems(profile.miniResumeAffiche.qualites)}</div></div>
        <div class="box"><div class="box-title">Défauts</div><div class="box-body">${listItems(profile.miniResumeAffiche.defauts)}</div></div>
        <div class="box"><div class="box-title">En amour</div><div class="box-body">${escapeHtml(profile.miniResumeAffiche.amourCourt)}</div></div>
        <div class="box"><div class="box-title">En amitié</div><div class="box-body">${escapeHtml(profile.miniResumeAffiche.amitieCourt)}</div></div>
        <div class="box"><div class="box-title">Au travail</div><div class="box-body">${escapeHtml(profile.miniResumeAffiche.travailCourt)}</div></div>
        <div class="box"><div class="box-title">Ta devise</div><div class="box-body">${escapeHtml(profile.miniResumeAffiche.deviseCourte)}</div></div>
        <div class="box"><div class="box-title">Légendaire compatible</div><div class="box-body">${escapeHtml(profile.miniResumeAffiche.legendaireCompatible)}</div></div>
        <div class="box"><div class="box-title">Surnom rigolo</div><div class="box-body">${escapeHtml(profile.miniResumeAffiche.surnom)}</div></div>
        <div class="box"><div class="box-title">Habitat</div><div class="box-body">${escapeHtml(profile.miniResumeAffiche.habitatCourt)}</div></div>
      </section>
      <div class="footer">${escapeHtml(fanMadeNotice)}</div>
    </section>
  </main>
</body>
</html>`;
}

export async function exportPosterPng(profile: GeneratedProfile) {
  const browser = await launchExportBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 2480, height: 3508, deviceScaleFactor: 1 });
    await page.setContent(renderPosterHtml(profile), { waitUntil: "domcontentloaded" });
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 }).catch(() => undefined);
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    const screenshot = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: 2480, height: 3508 }
    });
    return Buffer.from(screenshot);
  } finally {
    await browser.close();
  }
}
