import { fanMadeNotice } from "@/lib/pokemagique-data";
import { escapeHtml } from "@/lib/export-utils";
import { launchExportBrowser } from "@/lib/browser-launcher";
import { getPosterContent } from "@/lib/poster-content";
import { getPosterTheme } from "@/lib/poster-theme";
import type { GeneratedProfile } from "@/lib/types";

function renderList(items: string[], className: string) {
  return `<ul class="${className}">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

function renderBottomCards(content: ReturnType<typeof getPosterContent>) {
  return content.bottomCards
    .map(
      (card) => `<article class="bottom-card bottom-card-${escapeHtml(card.variant)}">
        <div class="bottom-icon">${escapeHtml(card.icon)}</div>
        <div>
          <h3>${escapeHtml(card.title)}</h3>
          <p class="bottom-value">${escapeHtml(card.value)}</p>
          ${card.detail ? `<p class="bottom-detail">${escapeHtml(card.detail)}</p>` : ""}
        </div>
      </article>`
    )
    .join("");
}

export function renderPosterHtml(profile: GeneratedProfile) {
  const theme = getPosterTheme(profile);
  const content = getPosterContent(profile);
  const imageUrl = profile.pokemonArtwork?.imageUrl;
  const particles = Array.from(
    { length: 22 },
    () => `<span class="particle particle-${theme.particleClass}"></span>`
  ).join("");

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
      color: ${theme.ink};
      background: #ffffff;
      font-family: "Trebuchet MS", "Arial Rounded MT Bold", Arial, sans-serif;
    }
    .poster {
      position: relative;
      width: 2480px;
      height: 3508px;
      overflow: hidden;
      padding: 82px;
      border: 46px solid ${theme.ink};
      background:
        radial-gradient(circle at 18% 15%, ${theme.accent}cc, transparent 26%),
        radial-gradient(circle at 86% 10%, ${theme.accent2}d8, transparent 28%),
        radial-gradient(circle at 50% 58%, ${theme.light}d8, transparent 36%),
        linear-gradient(145deg, ${theme.bgStart}, ${theme.bgMid} 48%, ${theme.bgEnd});
    }
    .poster::before {
      content: "";
      position: absolute;
      inset: 170px;
      border: 7px solid rgba(255,255,255,0.22);
      border-radius: 88px;
    }
    .poster::after {
      content: "";
      position: absolute;
      inset: -22% -12%;
      background:
        linear-gradient(115deg, transparent 0 36%, rgba(255,255,255,.16) 37% 39%, transparent 40% 100%),
        repeating-linear-gradient(165deg, transparent 0 150px, rgba(255,255,255,.08) 154px 164px);
      opacity: .76;
    }
    .frame {
      position: relative;
      z-index: 2;
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      gap: 44px;
      padding: 70px;
      border: 16px solid rgba(255,255,255,.72);
      border-radius: 78px;
      background:
        linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.04)),
        radial-gradient(circle at 50% 40%, rgba(255,255,255,.2), transparent 42%);
    }
    .header {
      display: grid;
      flex: 0 0 600px;
      grid-template-columns: 1fr 330px;
      gap: 64px;
      align-items: start;
    }
    .eyebrow {
      color: ${theme.light};
      font-size: 44px;
      font-weight: 900;
      letter-spacing: .22em;
      text-shadow: 0 10px 28px ${theme.shadow};
      text-transform: uppercase;
    }
    h1 {
      display: inline-block;
      max-width: 1540px;
      margin: 24px 0 0;
      padding: 8px 36px 20px;
      border-radius: 70px;
      color: ${theme.accent};
      background: rgba(255,255,255,.17);
      font-size: 168px;
      font-weight: 900;
      line-height: .9;
      text-wrap: balance;
      text-shadow:
        7px 7px 0 #ffffff,
        -7px 7px 0 #ffffff,
        7px -7px 0 #ffffff,
        -7px -7px 0 #ffffff,
        0 42px 70px ${theme.shadow},
        0 0 90px ${theme.titleGlow};
    }
    .ribbon, .ascendant {
      display: inline-flex;
      width: fit-content;
      max-width: 100%;
      margin-top: 34px;
      border-radius: 999px;
      font-size: 42px;
      font-weight: 900;
      line-height: 1.1;
    }
    .ribbon {
      padding: 22px 42px;
      color: ${theme.ink};
      background: linear-gradient(90deg, #ffffff, ${theme.light});
      box-shadow: 0 32px 64px ${theme.shadow};
    }
    .ascendant {
      margin-left: 22px;
      padding: 20px 36px;
      color: #ffffff;
      background: ${theme.bgStart};
      box-shadow: inset 0 0 0 8px rgba(255,255,255,.26);
    }
    .rarity {
      position: relative;
      display: grid;
      width: 330px;
      height: 380px;
      place-items: center;
      padding: 26px;
      border: 16px solid #ffffff;
      border-radius: 86px 86px 106px 106px;
      color: ${theme.ink};
      background:
        radial-gradient(circle at 36% 20%, #ffffff 0 16%, transparent 17%),
        linear-gradient(145deg, ${theme.accent2}, #ffffff 48%, ${theme.accent});
      box-shadow: 0 54px 100px ${theme.shadow}, inset 0 0 0 10px rgba(255,255,255,.5);
      transform: rotate(2deg);
    }
    .rarity::before, .rarity::after {
      content: "";
      position: absolute;
      bottom: -55px;
      width: 110px;
      height: 120px;
      background: ${theme.bgMid};
      clip-path: polygon(0 0,100% 0,82% 100%,50% 70%,18% 100%);
    }
    .rarity::before { left: 52px; transform: rotate(8deg); }
    .rarity::after { right: 52px; transform: rotate(-8deg); }
    .rarity-stars {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: .12em;
    }
    .rarity-score {
      margin-top: -10px;
      font-size: 164px;
      font-weight: 900;
      line-height: .8;
    }
    .rarity-suffix {
      font-size: 42px;
      font-weight: 900;
    }
    .rarity-ribbon {
      border-radius: 999px;
      padding: 10px 26px;
      color: #ffffff;
      background: ${theme.ink};
      font-size: 25px;
      font-weight: 900;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .main {
      display: grid;
      flex: 1 1 auto;
      grid-template-columns: 0.78fr 1.48fr 0.88fr;
      gap: 44px;
      min-height: 0;
    }
    .left, .right {
      display: flex;
      min-height: 0;
      flex-direction: column;
      gap: 34px;
    }
    .note, .card, .bottom-card, .mini-label, .nameplate {
      border: 10px solid rgba(255,255,255,.82);
      box-shadow: 0 42px 78px ${theme.shadow}, inset 0 0 0 4px rgba(255,255,255,.58);
    }
    .note {
      position: relative;
      flex: 1;
      padding: 108px 38px 42px;
      border-color: ${theme.border};
      border-radius: 54px;
      background:
        linear-gradient(90deg, rgba(255,255,255,.34) 0 7%, transparent 7%),
        linear-gradient(180deg, #fff9df, #fff2c7);
      transform: rotate(-1.4deg);
    }
    .holes {
      position: absolute;
      inset: 36px 0 auto;
      display: flex;
      justify-content: center;
      gap: 44px;
    }
    .holes span {
      width: 30px;
      height: 30px;
      border-radius: 999px;
      background: ${theme.bgMid};
      box-shadow: inset 0 8px 12px rgba(0,0,0,.18);
    }
    .note-title, .card-title {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 36px;
      font-weight: 900;
      line-height: 1.08;
      text-transform: uppercase;
    }
    .note ul {
      display: grid;
      gap: 20px;
      margin: 34px 0 0;
      padding: 0;
      list-style: none;
    }
    .note li, .note p {
      margin: 0;
      border-radius: 28px;
      font-size: 31px;
      font-weight: 850;
      line-height: 1.18;
    }
    .note li {
      padding: 18px 20px;
      background: rgba(255,255,255,.66);
    }
    .note p {
      margin-top: 32px;
      padding: 24px;
      color: #ffffff;
      background: ${theme.bgMid};
    }
    .mini-label {
      padding: 32px;
      border-radius: 42px;
      background: rgba(255,255,255,.72);
      font-size: 29px;
      line-height: 1.18;
    }
    .mini-label span {
      display: block;
      margin-top: 10px;
      opacity: .75;
    }
    .hero {
      position: relative;
      display: flex;
      min-width: 0;
      min-height: 0;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 18px solid rgba(255,255,255,.78);
      border-radius: 92px;
      background:
        radial-gradient(circle at 50% 48%, rgba(255,255,255,.95) 0 18%, rgba(255,255,255,.34) 19% 40%, transparent 41%),
        linear-gradient(160deg, rgba(255,255,255,.55), rgba(255,255,255,.08));
      box-shadow: 0 58px 118px ${theme.shadow}, inset 0 0 0 8px rgba(255,255,255,.36);
    }
    .hero::before {
      content: "";
      position: absolute;
      inset: 8% 6%;
      border-radius: 50%;
      background: radial-gradient(circle, ${theme.accent} 0 8%, transparent 9% 100%);
      opacity: .24;
      filter: blur(60px);
    }
    .ring {
      position: absolute;
      width: 76%;
      aspect-ratio: 1;
      border: 34px solid rgba(255,255,255,.48);
      border-radius: 999px;
      background:
        radial-gradient(circle, transparent 0 55%, rgba(255,255,255,.5) 56% 62%, transparent 63%),
        radial-gradient(circle, ${theme.accent} 0 34%, transparent 35%);
      opacity: .86;
      filter: drop-shadow(0 60px 90px ${theme.shadow});
    }
    .orbit {
      position: absolute;
      width: 84%;
      height: 48%;
      border: 14px dashed rgba(255,255,255,.56);
      border-radius: 50%;
    }
    .orbit-one { transform: rotate(-13deg); }
    .orbit-two { transform: rotate(17deg); opacity: .48; }
    .splash {
      position: absolute;
      width: 28%;
      aspect-ratio: 1;
      border-radius: 42% 58% 56% 44%;
      background: ${theme.accent}aa;
      opacity: .7;
      filter: blur(6px);
    }
    .splash-left { left: 3%; bottom: 13%; transform: rotate(-18deg); }
    .splash-right { right: 1%; top: 17%; transform: rotate(21deg); }
    .pokemon {
      position: relative;
      z-index: 4;
      width: 92%;
      max-height: 86%;
      object-fit: contain;
      filter: drop-shadow(0 8px 0 rgba(255,255,255,.95)) drop-shadow(0 90px 70px ${theme.shadow});
      transform: translateY(2%);
    }
    .placeholder {
      position: relative;
      z-index: 4;
      display: grid;
      max-width: 82%;
      gap: 20px;
      padding: 64px;
      border: 14px dashed rgba(255,255,255,.72);
      border-radius: 68px;
      background: rgba(255,255,255,.78);
      text-align: center;
      font-size: 54px;
    }
    .nameplate {
      position: absolute;
      right: 7%;
      bottom: 6%;
      z-index: 5;
      max-width: 72%;
      padding: 20px 30px;
      border-radius: 999px;
      background: rgba(255,255,255,.82);
      font-size: 29px;
      font-weight: 850;
    }
    .card {
      flex: 1;
      min-height: 0;
      padding: 32px;
      border-radius: 54px;
      background: ${theme.card};
    }
    .card-gold { background: linear-gradient(145deg, rgba(255,255,255,.94), ${theme.accent2}55); }
    .card-peach { background: linear-gradient(145deg, #fff8ef, #ffdccc); }
    .card-pink { background: linear-gradient(145deg, #fff5fb, #ffd7ec); }
    .icon, .bottom-icon {
      display: inline-grid;
      place-items: center;
      border-radius: 999px;
      color: #ffffff;
      background: ${theme.bgMid};
      font-weight: 900;
      box-shadow: inset 0 0 0 7px rgba(255,255,255,.24);
    }
    .icon {
      width: 68px;
      height: 68px;
      flex: 0 0 auto;
      font-size: 25px;
    }
    .chip-list, .love-list {
      display: grid;
      gap: 15px;
      margin: 24px 0 0;
      padding: 0;
      list-style: none;
    }
    .chip-list li, .love-list li {
      border-radius: 999px;
      padding: 15px 20px;
      background: rgba(255,255,255,.66);
      font-size: 31px;
      font-weight: 850;
      line-height: 1.08;
    }
    .love-list li { border-radius: 34px; }
    .bottom-grid {
      display: grid;
      flex: 0 0 820px;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      min-height: 0;
    }
    .bottom-card {
      position: relative;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 24px;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      padding: 34px;
      border-radius: 54px;
      background:
        radial-gradient(circle at 92% 15%, rgba(255,255,255,.72), transparent 32%),
        rgba(255,255,255,.84);
    }
    .bottom-card::after {
      content: "";
      position: absolute;
      right: -10%;
      bottom: -22%;
      width: 42%;
      aspect-ratio: 1;
      border-radius: 999px;
      background: ${theme.accent}61;
    }
    .bottom-card h3 {
      position: relative;
      z-index: 1;
      margin: 0;
      font-size: 31px;
      font-weight: 900;
      line-height: 1.02;
      text-transform: uppercase;
    }
    .bottom-value, .bottom-detail {
      position: relative;
      z-index: 1;
      margin: 16px 0 0;
      font-weight: 850;
      line-height: 1.12;
    }
    .bottom-value { font-size: 38px; }
    .bottom-detail {
      display: -webkit-box;
      overflow: hidden;
      color: rgba(9,40,69,.74);
      font-size: 27px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .bottom-icon {
      position: relative;
      z-index: 1;
      width: 92px;
      height: 92px;
      font-size: 27px;
    }
    .bottom-card-rarity {
      background: radial-gradient(circle at 74% 22%, rgba(255,255,255,.78), transparent 34%), linear-gradient(145deg, ${theme.accent2}, #ffffff);
    }
    .bottom-card-rarity .bottom-value {
      font-size: 58px;
      font-weight: 900;
    }
    .footer {
      color: rgba(255,255,255,.76);
      font-size: 24px;
      font-weight: 800;
      text-align: center;
      text-shadow: 0 7px 22px ${theme.shadow};
    }
    .particle {
      position: absolute;
      z-index: 1;
      opacity: .72;
      filter: drop-shadow(0 12px 18px rgba(255,255,255,.15));
    }
    .particle-bubble {
      width: 52px;
      height: 52px;
      border: 7px solid rgba(255,255,255,.75);
      border-radius: 999px;
      background: rgba(255,255,255,.15);
    }
    .particle-ember {
      width: 42px;
      height: 60px;
      border-radius: 60% 40% 60% 40%;
      background: linear-gradient(#fff5a8, ${theme.accent2});
      transform: rotate(25deg);
    }
    .particle-leaf {
      width: 62px;
      height: 35px;
      border-radius: 100% 0 100% 0;
      background: linear-gradient(135deg, ${theme.accent}, ${theme.accent2});
      transform: rotate(-28deg);
    }
    .particle:nth-child(1) { left: 7%; top: 9%; }
    .particle:nth-child(2) { left: 19%; top: 24%; transform: scale(.7); }
    .particle:nth-child(3) { left: 37%; top: 7%; transform: scale(1.2); }
    .particle:nth-child(4) { left: 78%; top: 18%; transform: scale(.82); }
    .particle:nth-child(5) { left: 90%; top: 38%; transform: scale(1.25); }
    .particle:nth-child(6) { left: 12%; top: 47%; transform: scale(1.1); }
    .particle:nth-child(7) { left: 30%; top: 61%; transform: scale(.62); }
    .particle:nth-child(8) { left: 55%; top: 20%; transform: scale(.75); }
    .particle:nth-child(9) { left: 70%; top: 54%; transform: scale(1.1); }
    .particle:nth-child(10) { left: 85%; top: 70%; transform: scale(.68); }
    .particle:nth-child(11) { left: 8%; top: 78%; transform: scale(.92); }
    .particle:nth-child(12) { left: 48%; top: 82%; transform: scale(1.22); }
    .particle:nth-child(13) { left: 62%; top: 9%; transform: scale(.54); }
    .particle:nth-child(14) { left: 24%; top: 90%; transform: scale(.82); }
    .particle:nth-child(15) { left: 94%; top: 10%; transform: scale(.6); }
    .particle:nth-child(16) { left: 3%; top: 32%; transform: scale(.68); }
    .particle:nth-child(17) { left: 42%; top: 44%; transform: scale(.5); }
    .particle:nth-child(18) { left: 58%; top: 66%; transform: scale(.74); }
    .particle:nth-child(19) { left: 76%; top: 89%; transform: scale(1.05); }
    .particle:nth-child(20) { left: 33%; top: 33%; transform: scale(.52); }
    .particle:nth-child(21) { left: 16%; top: 66%; transform: scale(.58); }
    .particle:nth-child(22) { left: 66%; top: 37%; transform: scale(.64); }
    .wave {
      position: absolute;
      z-index: 1;
      left: -8%;
      width: 116%;
      height: 14%;
      border-radius: 50%;
      background: rgba(255,255,255,.13);
    }
    .wave-one { bottom: 27%; transform: rotate(-4deg); }
    .wave-two { bottom: 20%; opacity: .62; transform: rotate(5deg); }
    .stamp {
      position: absolute;
      z-index: 1;
      right: 5%;
      top: 24%;
      padding: 18px 30px;
      border: 7px solid rgba(255,255,255,.24);
      border-radius: 999px;
      color: rgba(255,255,255,.7);
      font-size: 31px;
      font-weight: 900;
      letter-spacing: .12em;
      text-transform: uppercase;
      transform: rotate(7deg);
    }
  </style>
</head>
<body>
  <main class="poster">
    ${particles}
    <span class="wave wave-one"></span>
    <span class="wave wave-two"></span>
    <span class="stamp">${escapeHtml(theme.regionLabel)}</span>
    <section class="frame">
      <header class="header">
        <div>
          <div class="eyebrow">Ton Pokémagique</div>
          <h1>${escapeHtml(profile.nomPokemagique)}</h1>
          <div class="ribbon">${escapeHtml(profile.generation)} • Type ${escapeHtml(profile.typePrincipal)}</div>
          <div class="ascendant">Ascendant ${escapeHtml(profile.ascendantRegional)}</div>
        </div>
        <div class="rarity">
          <div class="rarity-stars">★ ★ ★</div>
          <div class="rarity-score">${escapeHtml(content.rarityScore)}</div>
          <div class="rarity-suffix">${escapeHtml(content.raritySuffix)}</div>
          <div class="rarity-ribbon">Collector</div>
        </div>
      </header>

      <section class="main">
        <aside class="left">
          <section class="note">
            <div class="holes"><span></span><span></span><span></span></div>
            <div class="note-title"><span class="icon">DX</span>Comment j’ai calculé ?</div>
            <ul>${content.calculationLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
            <p>${escapeHtml(content.starterLine)}</p>
          </section>
          <div class="mini-label"><strong>${escapeHtml(theme.particleLabel)}</strong><span>${escapeHtml(theme.regionMotif)}</span></div>
        </aside>

        <section class="hero">
          <div class="ring"></div>
          <div class="orbit orbit-one"></div>
          <div class="orbit orbit-two"></div>
          <div class="splash splash-left"></div>
          <div class="splash splash-right"></div>
          ${
            imageUrl
              ? `<img class="pokemon" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(profile.pokemonAffiche)}" />`
              : `<div class="placeholder"><strong>${escapeHtml(profile.pokemonAffiche)}</strong><span>Image PokéAPI indisponible</span></div>`
          }
          <div class="nameplate">Pokémon affiché : <strong>${escapeHtml(profile.pokemonAffiche)}</strong></div>
        </section>

        <aside class="right">
          <section class="card card-gold"><div class="card-title"><span class="icon">QL</span>Qualités</div>${renderList(content.qualities, "chip-list")}</section>
          <section class="card card-peach"><div class="card-title"><span class="icon">DF</span>Défauts</div>${renderList(content.defects, "chip-list")}</section>
          <section class="card card-pink"><div class="card-title"><span class="icon">CO</span>En amour</div>${renderList(content.loveLines, "love-list")}</section>
        </aside>
      </section>

      <section class="bottom-grid">${renderBottomCards(content)}</section>
      <footer class="footer">${escapeHtml(fanMadeNotice)}</footer>
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
