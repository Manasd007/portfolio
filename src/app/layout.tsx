import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Grain } from "@/components/Grain";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE = "https://manasdubey.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Manas Dubey · SDE & AI Engineer",
  description:
    "SDE who builds AI systems that ship. Selected work: Conduit (LLM gateway), Legally AI, FinSight, Waypoint.",
  openGraph: {
    title: "Manas Dubey · SDE & AI Engineer",
    description: "SDE who builds AI systems that ship.",
    url: SITE,
    siteName: "Manas Dubey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Dubey · SDE & AI Engineer",
    description: "SDE who builds AI systems that ship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full">
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
        <Grain />
        <Cursor />
      </body>
    </html>
  );
}
