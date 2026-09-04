import type { Metadata } from "next";
import "../index.css";
import Providers from "./providers";
import SiteShell from "./site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://nytsoul.vercel.app"),
  title: "Neshun R — Creative Developer Portfolio",
  description:
    "Neshun R — Creative developer and product builder. Full-stack development, AI, and digital experiences. 3rd-year CS student at SSN College of Engineering.",
  keywords: [
    "Neshun R",
    "portfolio",
    "developer",
    "full-stack",
    "AI",
    "cybersecurity",
    "web development",
    "React",
    "TypeScript",
    "creative developer",
  ],
  authors: [{ name: "Neshun R" }],
  openGraph: {
    title: "Neshun R — Creative Developer Portfolio",
    description:
      "Building digital products that matter. Full-stack developer, product builder, AI enthusiast.",
    type: "website",
    url: "https://nytsoul.vercel.app",
    images: ["/logo_bg.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neshun R — Creative Developer Portfolio",
    description: "Building digital products that matter.",
  },
  icons: { icon: "/logo.png" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
