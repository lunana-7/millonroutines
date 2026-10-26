import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://millionroutines.com"),
  alternates: { canonical: "/" },
  title: "Million Routines — The Korean Tea Ritual",
  description: "Our first bundle: Korean tea, considered teaware and a modern ritual inspired by darye. Korean roots. Everyday rituals.",
  icons: {
    icon: [
      { url: "/brand/million-routines-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/million-routines-icon-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/brand/million-routines-icon-32.png",
    apple: "/brand/million-routines-icon-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
