import type { Metadata, Viewport } from "next";
import { Montserrat, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import { Inicializacao } from "@/components/ui/Inicializacao";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["700", "800", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neuroequilibrioemocional.vercel.app"),
  title: "Neurociências & Equilíbrio Emocional · EDC Group",
  description:
    "Palestra e trilha de conteúdo sobre neurociência do trabalho — SIPAT EDC Group 2026, com Priscila Ramos.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#1E1F21",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-tema="leitura"
      className={`${montserrat.variable} ${sourceSans.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
        <Inicializacao />
      </body>
    </html>
  );
}
