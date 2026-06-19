"use client";

import { useState } from "react";
import type { GeneratedProfile } from "@/lib/types";

interface DownloadButtonsProps {
  profile: GeneratedProfile;
}

type ExportKind = "poster" | "docx" | "pdf";

const routes: Record<ExportKind, { label: string; url: string }> = {
  poster: { label: "Télécharger l’affiche PNG", url: "/api/export-poster" },
  docx: { label: "Télécharger le document Word", url: "/api/export-docx" },
  pdf: { label: "Télécharger le PDF", url: "/api/export-pdf" }
};

function filenameFromDisposition(disposition: string | null, fallback: string) {
  if (!disposition) return fallback;
  const match = /filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i.exec(disposition);
  return decodeURIComponent(match?.[1] ?? match?.[2] ?? fallback);
}

export default function DownloadButtons({ profile }: DownloadButtonsProps) {
  const [loading, setLoading] = useState<ExportKind | null>(null);
  const [error, setError] = useState("");

  async function download(kind: ExportKind) {
    setLoading(kind);
    setError("");

    try {
      const response = await fetch(routes[kind].url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Le téléchargement a échoué.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filenameFromDisposition(
        response.headers.get("Content-Disposition"),
        `pokemagique.${kind === "poster" ? "png" : kind}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (downloadError) {
      setError(
        downloadError instanceof Error
          ? downloadError.message
          : "Impossible de préparer le téléchargement."
      );
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.keys(routes) as ExportKind[]).map((kind) => (
          <button
            type="button"
            key={kind}
            onClick={() => download(kind)}
            disabled={loading !== null}
            className="rounded-2xl bg-pokedex-ink px-4 py-3 font-black text-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {loading === kind ? "Préparation..." : routes[kind].label}
          </button>
        ))}
      </div>
      {error ? (
        <div className="rounded-2xl border border-pokedex-red/20 bg-red-50 px-4 py-3 text-sm font-bold text-pokedex-red">
          {error}
        </div>
      ) : null}
    </div>
  );
}
