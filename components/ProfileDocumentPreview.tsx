import type { GeneratedProfile } from "@/lib/types";

interface ProfileDocumentPreviewProps {
  profile: GeneratedProfile;
}

export default function ProfileDocumentPreview({ profile }: ProfileDocumentPreviewProps) {
  const sections = [
    ["Résumé du profil", profile.resumeRapide],
    ["Personnalité profonde", profile.personnaliteProfonde],
    ["Influence régionale", profile.formeRegionale],
    ["Apparence", profile.apparenceUltraPersonnalisee],
    ["Amour", profile.amour],
    ["Amitié", profile.amitie],
    ["Travail / études", profile.travailEtudes],
    ["Habitat", profile.habitat],
    ["Devise", profile.devise]
  ];

  return (
    <section className="rounded-3xl border border-white/80 bg-white/86 p-5 shadow-card backdrop-blur sm:p-7">
      <h2 className="text-2xl font-black text-pokedex-ink">Descriptif complet</h2>
      <div className="mt-5 grid gap-4">
        {sections.map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-pokedex-ink/10 bg-white p-4">
            <h3 className="font-black text-pokedex-ink">{title}</h3>
            <p className="mt-2 leading-7 text-pokedex-ink/72">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
