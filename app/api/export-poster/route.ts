import {
  bufferToArrayBuffer,
  contentDisposition,
  profileBaseFilename
} from "@/lib/export-utils";
import { exportPosterPng } from "@/lib/poster-export";
import type { GeneratedProfile } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { profile } = (await request.json()) as { profile?: GeneratedProfile };
    if (!profile) {
      return new Response("Profil manquant.", { status: 400 });
    }

    const buffer = await exportPosterPng(profile);
    const filename = `${profileBaseFilename(profile)}.png`;

    return new Response(bufferToArrayBuffer(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": contentDisposition(filename)
      }
    });
  } catch (error) {
    return new Response(
      error instanceof Error
        ? `Erreur pendant l’export PNG: ${error.message}`
        : "Erreur pendant l’export PNG.",
      { status: 500 }
    );
  }
}
