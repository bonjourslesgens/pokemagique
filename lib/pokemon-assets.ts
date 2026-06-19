import type { PokemonArtwork } from "@/lib/types";

export const pokemonNameToPokeApiSlug: Record<string, string> = {
  Bulbizarre: "bulbasaur",
  Salamèche: "charmander",
  Carapuce: "squirtle",
  Germignon: "chikorita",
  Héricendre: "cyndaquil",
  Kaiminus: "totodile",
  Arcko: "treecko",
  Poussifeu: "torchic",
  Gobou: "mudkip",
  Tortipouss: "turtwig",
  Ouisticram: "chimchar",
  Tiplouf: "piplup",
  Vipélierre: "snivy",
  Gruikui: "tepig",
  Moustillon: "oshawott",
  Marisson: "chespin",
  Feunnec: "fennekin",
  Grenousse: "froakie",
  Brindibou: "rowlet",
  Flamiaou: "litten",
  Otaquin: "popplio",
  Ouistempo: "grookey",
  Flambino: "scorbunny",
  Larméléon: "sobble",
  Poussacha: "sprigatito",
  Chochodile: "fuecoco",
  Coiffeton: "quaxly",
  Broussatif: "bulbasaur",
  Caloulou: "charmander",
  Ogéko: "squirtle"
};

interface PokeApiPokemonResponse {
  sprites?: {
    front_default?: string | null;
    other?: {
      ["official-artwork"]?: {
        front_default?: string | null;
      };
    };
  };
}

async function fetchPokemonAsset(pokemonNameFr: string): Promise<PokemonArtwork> {
  const slug = pokemonNameToPokeApiSlug[pokemonNameFr] ?? pokemonNameFr.toLowerCase();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`, {
      next: { revalidate: 60 * 60 * 24 }
    });

    if (!response.ok) {
      throw new Error(`PokéAPI a répondu avec le statut ${response.status}.`);
    }

    const data = (await response.json()) as PokeApiPokemonResponse;
    const artworkUrl = data.sprites?.other?.["official-artwork"]?.front_default ?? null;
    const spriteUrl = data.sprites?.front_default ?? null;

    return {
      pokemonNameFr,
      slug,
      artworkUrl,
      spriteUrl,
      imageUrl: artworkUrl ?? spriteUrl,
      source: "pokeapi"
    };
  } catch (error) {
    return {
      pokemonNameFr,
      slug,
      artworkUrl: null,
      spriteUrl: null,
      imageUrl: null,
      source: "fallback",
      error: error instanceof Error ? error.message : "Erreur inconnue PokéAPI."
    };
  }
}

export async function getPokemonArtwork(pokemonNameFr: string) {
  return fetchPokemonAsset(pokemonNameFr);
}

export async function getPokemonSprite(pokemonNameFr: string) {
  const asset = await fetchPokemonAsset(pokemonNameFr);
  return {
    ...asset,
    imageUrl: asset.spriteUrl ?? asset.artworkUrl
  };
}
