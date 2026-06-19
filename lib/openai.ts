import OpenAI from "openai";
import { buildProfilePrompt } from "@/lib/prompt-builder";
import { createFallbackProfile, normalizeGeneratedProfile } from "@/lib/profile-fallback";
import { extractJsonObject } from "@/lib/validation";
import type { GeneratedProfile, ProfileGenerationInput } from "@/lib/types";

export async function generateProfile(input: ProfileGenerationInput): Promise<GeneratedProfile> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return createFallbackProfile(
      input,
      "OPENAI_API_KEY est absente: profil généré avec le moteur local de secours."
    );
  }

  const model = process.env.OPENAI_TEXT_MODEL || "gpt-4o-mini";
  const openai = new OpenAI({ apiKey });
  const prompt = buildProfilePrompt(input);

  try {
    const response = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user }
      ],
      temperature: 0.85
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) throw new Error("La réponse IA est vide.");

    const json = extractJsonObject(raw);
    return normalizeGeneratedProfile(JSON.parse(json), input, "openai");
  } catch (error) {
    return createFallbackProfile(
      input,
      error instanceof Error
        ? `La génération IA a échoué: ${error.message}`
        : "La génération IA a échoué."
    );
  }
}
