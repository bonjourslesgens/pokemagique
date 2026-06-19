import {
  bufferToArrayBuffer,
  contentDisposition,
  profileBaseFilename
} from "@/lib/export-utils";
import { exportProfilePdf } from "@/lib/pdf-generator";
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

    const buffer = await exportProfilePdf(profile);
    const filename = `${profileBaseFilename(profile)}.pdf`;

    return new Response(bufferToArrayBuffer(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDisposition(filename)
      }
    });
  } catch (error) {
    return new Response(
      error instanceof Error
        ? `Erreur pendant l’export PDF: ${error.message}`
        : "Erreur pendant l’export PDF.",
      { status: 500 }
    );
  }
}
