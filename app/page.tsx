import Link from "next/link";

const fanMadeNotice = "Projet personnel fan-made, non officiel, sans usage commercial.";

export default function HomePage() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-center">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.86fr]">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-pokedex-blue/25 bg-white/75 px-4 py-2 text-sm font-semibold text-pokedex-ink shadow-sm backdrop-blur">
              {fanMadeNotice}
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-pokedex-ink sm:text-7xl">
                Pokémagique
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-pokedex-ink/78">
                Crée ton Pokémagique personnalisé à partir de ta date de naissance
                et de ta personnalité.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/questionnaire"
                className="rounded-full bg-pokedex-red px-7 py-4 text-base font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-red-600"
              >
                Commencer le questionnaire
              </Link>
              <a
                href="#details"
                className="rounded-full border border-pokedex-ink/15 bg-white/80 px-7 py-4 text-base font-bold text-pokedex-ink transition hover:-translate-y-0.5 hover:bg-white"
              >
                Voir le principe
              </a>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/80 bg-white/82 p-5 shadow-card backdrop-blur">
            <div className="rounded-[1.5rem] border-4 border-pokedex-ink bg-gradient-to-br from-pokedex-red via-[#ff7b54] to-pokedex-yellow p-4">
              <div className="rounded-[1.1rem] bg-pokedex-cream p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full bg-pokedex-ink px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white">
                    Fiche Pokédex
                  </span>
                  <span className="h-5 w-5 rounded-full border-4 border-pokedex-ink bg-pokedex-green" />
                </div>
                <div className="grid gap-4">
                  {[
                    "Calcul par date de naissance",
                    "Profil personnalisé",
                    "Affiche A4 en PNG",
                    "Document Word et PDF"
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border-2 border-pokedex-ink/12 bg-white px-4 py-4 font-bold text-pokedex-ink"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="details" className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Questionnaire clair",
              body: "Treize étapes avec progression, validation et récapitulatif."
            },
            {
              title: "Vrai Pokémon affiché",
              body: "L’image centrale vient dynamiquement de PokéAPI."
            },
            {
              title: "Exports prêts",
              body: "Téléchargements PNG, DOCX et PDF depuis la page résultat."
            }
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-white/80 bg-white/78 p-5 shadow-sm backdrop-blur"
            >
              <h2 className="text-lg font-black text-pokedex-ink">{card.title}</h2>
              <p className="mt-2 leading-7 text-pokedex-ink/72">{card.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
