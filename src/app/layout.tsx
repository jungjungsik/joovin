import type { Metadata, Viewport } from "next";
import { Work_Sans, Lora } from "next/font/google";
import { getSiteUrl } from "@/lib/siteUrl";
import "./globals.css";

const siteUrl = getSiteUrl();

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f6" },
    { media: "(prefers-color-scheme: dark)", color: "#211d11" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Joovin NAM | Art Portfolio",
    template: "%s | Joovin NAM Portfolio",
  },
  description: "High school art student portfolio showcasing paintings, drawings, and mixed media works. Explore my creative journey and artistic vision.",
  keywords: ["art portfolio", "high school artist", "paintings", "drawings", "mixed media", "college art application"],
  authors: [{ name: "Joovin NAM" }],
  creator: "Joovin NAM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Joovin NAM Portfolio",
    title: "Joovin NAM | Art Portfolio",
    description: "High school art student portfolio showcasing paintings, drawings, and mixed media works.",
    // Per-page OG images (e.g. artwork hero) are set in route-level
    // generateMetadata; the root layout intentionally omits a static
    // image so we don't ship a 404 OG when an asset is missing.
  },
  twitter: {
    card: "summary_large_image",
    title: "Joovin NAM | Art Portfolio",
    description: "High school art student portfolio showcasing paintings, drawings, and mixed media works.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const activeTheme = theme || systemTheme;
                  if (activeTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-muted-gray dark:text-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
