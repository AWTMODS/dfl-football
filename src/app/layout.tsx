import type { Metadata, Viewport } from "next";
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
  title: "DFL FOOTBALL — Defenders Football League 2026 | Vengara, Malappuram",
  description:
    "Official ticketing and match platform for DFL Football 2026. 7-a-side floodlight football championship in Vengara, Malappuram, Kerala featuring 20 teams across 15 thrilling days starting October 20, 2026. Book digital passes, track bookings, and scan QR entry.",
  keywords: [
    "DFL Football",
    "Defenders Football League",
    "Vengara Football",
    "Malappuram 7s",
    "Kerala Football Tickets",
    "7-A-Side Tournament",
    "DFL Stadium Vengara",
  ],
  authors: [{ name: "Defenders Football League Committee" }],
  openGraph: {
    title: "DFL FOOTBALL — Defenders Football League 2026",
    description:
      "7-A-Side Football Tournament in Vengara, Malappuram. Starting October 20, 2026. Reserve your digital match passes now!",
    url: "https://dflfootball.com",
    siteName: "DFL FOOTBALL",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#00E676",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060B11] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
