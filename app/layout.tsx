import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FadeThat",
  description: "Verify every factual claim in any article.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#0f0f0f] text-[#e8e8e8] min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
