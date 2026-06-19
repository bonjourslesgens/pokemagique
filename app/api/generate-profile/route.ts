import { NextResponse } from "next/server";
import { calculateBirthDate } from "@/lib/pokemagique-calculations";
import { emptyAnswers } from "@/lib/questionnaire";
import { getPokemonArtwork } from "@/lib/pokemon-assets";
import { generateProfile } from "@/lib/openai";
import { validateQuestionnaireAnswers } from "@/lib/validation";
import type { QuestionnaireAnswers } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answers?: Partial<QuestionnaireAnswers> };
    const answers = { ...emptyAnswers, ...(body.answers ?? {}) } as QuestionnaireAnswers;
    const validation = validateQuestionnaireAnswers(answers);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "Certaines réponses sont manquantes ou invalides.",
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    const calculation = calculateBirthDate(answers.dateNaissance);
    const pokemonArtwork = await getPokemonArtwork(calculation.pokemonAffiche);
    const profile = await generateProfile({ answers, calculation, pokemonArtwork });

    return NextResponse.json({ profile, calculation, pokemonArtwork });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Une erreur inconnue est survenue pendant la génération."
      },
      { status: 500 }
    );
  }
}
