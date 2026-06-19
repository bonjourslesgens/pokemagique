import { createProfileDocx } from "@/lib/docx-generator";
import {
  bufferToArrayBuffer,
  contentDisposition,
  profileBaseFilename
} from "@/lib/export-utils";
import type { GeneratedProfile } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { profile } = (await request.json()) as { profile?: GeneratedProfile };
    if (!profile) {
      return new Response("Profil manquant.", { status: 400 });
    }

    const buffer = await createProfileDocx(profile);
    const filename = `${profileBaseFilename(profile)}.docx`;

    return new Response(bufferToArrayBuffer(buffer), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": contentDisposition(filename)
      }
    });
  } catch (error) {
    return new Response(
      error instanceof Error
        ? `Erreur pendant l’export Word: ${error.message}`
        : "Erreur pendant l’export Word.",
      { status: 500 }
    );
  }
}
