import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokémagique",
  description: "Crée ton Pokémagique personnalisé à partir de ta date de naissance et de ta personnalité."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
