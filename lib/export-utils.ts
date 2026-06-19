import type { GeneratedProfile } from "@/lib/types";

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function safeFilename(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export function contentDisposition(filename: string) {
  const ascii = safeFilename(filename) || "pokemagique";
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

export function profileBaseFilename(profile: GeneratedProfile) {
  return `Pokémagique ultra personnalisé - ${profile.nomPokemagique}`;
}

export function listItems(values: string[]) {
  return values.filter(Boolean).map(escapeHtml).join(", ");
}

export function bufferToArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}
