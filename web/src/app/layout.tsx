import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "2D Champion - Open Source Gaming Platform",
  description: "Play, compete, and create 2D games. Join our open-source gaming community with global leaderboards and collaborative game development.",
  keywords: ["2D games", "open source games", "gaming platform", "leaderboard", "game development"],
  authors: [{ name: "2D Champion Community" }],
  openGraph: {
    title: "2D Champion - Open Source Gaming Platform",
    description: "Play, compete, and create 2D games together",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
