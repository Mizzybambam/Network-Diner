import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Network Diner | Hire Top Talent",
  description: "Where top-tier talent and ambitious founders share a table.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} dark`}>
      <body className="antialiased min-h-screen selection:bg-amber-600 selection:text-white">
        <div className="bg-grain"></div>
        {children}
      </body>
    </html>
  );
}