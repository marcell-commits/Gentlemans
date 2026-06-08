import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gentleman's Club Barbershop Szombathely",
  description:
    "Precíz hajvágás, szakállformázás és egyszerű online időpontfoglalás a Gentleman's Club Barbershopban, Szombathelyen."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
