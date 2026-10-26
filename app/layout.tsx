import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://millionroutines.com"),
  alternates: { canonical: "/" },
  title: "Million Routines — A little more like yourself",
  description: "Thoughtfully designed routine kits for softer mornings, closer connections, and quieter evenings.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
