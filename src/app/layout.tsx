import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Llama Inc.",
  description:
    "A travel concierge that finds a trip worth taking every month and books it for you.",
};

// Fonts load from Google Fonts in the browser. next/font/google would self-host
// them at build time, but the build sandbox has no route to fonts.googleapis.com.
const fontsHref =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Instrument+Sans:wght@400;600&display=swap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontsHref} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
