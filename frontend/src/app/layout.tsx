
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Newsreader, Manrope, DM_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SantaClaw — Your AI Coding Companion",
    template: "%s | SantaClaw",
  },
  description:
    "An AI coding companion that works alongside you, understands your codebase, and keeps you in control.",
  applicationName: "SantaClaw",
  keywords: [
    "SantaClaw",
    "AI coding assistant",
    "AI agent",
    "developer tools",
    "terminal",
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(newsreader.variable, manrope.variable, dmMono.variable, "font-sans", geist.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
