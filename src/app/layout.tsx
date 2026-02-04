import type { Metadata } from "next";
import { Work_Sans, Lora } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://joovin.vercel.app"),
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
    url: "https://joovin.vercel.app",
    siteName: "Joovin NAM Portfolio",
    title: "Joovin NAM | Art Portfolio",
    description: "High school art student portfolio showcasing paintings, drawings, and mixed media works.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Joovin NAM Art Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joovin NAM | Art Portfolio",
    description: "High school art student portfolio showcasing paintings, drawings, and mixed media works.",
    images: ["/og-image.jpg"],
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
    <html lang="en" className={`${workSans.variable} ${lora.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-muted-gray dark:text-gray-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
