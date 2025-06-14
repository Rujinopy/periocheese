import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import CookieBanner from "@/components/CookieBanner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Periocheese :D",
  description: "Dental student love cheese bruh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased text-black`}
      >
        {children}
        <CookieBanner />
        <GoogleAnalytics gaId="G-DPK1EWV214" />
      </body>
    </html>
  );
}
