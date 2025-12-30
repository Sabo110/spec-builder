import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpecBuilder - Générateur de Cahier des Charges",
  description: "Créez, gérez et exportez vos cahiers des charges techniques en PDF facilement. L'outil idéal pour structurer vos projets logiciels.",
  icons: {
    icon: "/icon.svg",
  },
};

import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextTopLoader
            color="#2563eb"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2563eb,0 0 5px #2563eb"
          />
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
