import { NextResponse } from "next/server";
import { getPokemonArtwork } from "@/lib/pokemon-assets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Paramètre name manquant." }, { status: 400 });
  }

  const artwork = await getPokemonArtwork(name);
  return NextResponse.json({ artwork });
}
