import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://millionroutines.com"),
  alternates: { canonical: "/" },
  title: "Million Routines — A little more like yourself",
  description: "Thoughtfully designed routine kits for softer mornings, closer connections, and quieter evenings.",
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
