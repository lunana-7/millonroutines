import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://millionroutines.com"),
  alternates: { canonical: "/" },
  title: "차림 · Charim | Million Routines",
  description: "Meet Charim, our first bundle: Korean tea, considered teaware and a modern ritual inspired by darye. Korean roots. Everyday rituals.",
  icons: {
    icon: [
      { url: "/brand/flower-icon-v2-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/flower-icon-v2-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/brand/flower-icon-v2-32.png",
    apple: "/brand/flower-icon-v2-180.png",
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
