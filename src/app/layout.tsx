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
  metadataBase: new URL("https://asterling.art"),
  title: {
    default: "A. Sterling | Art Portfolio",
    template: "%s | A. Sterling Portfolio",
  },
  description: "High school art student portfolio showcasing paintings, drawings, and mixed media works. Explore my creative journey and artistic vision.",
  keywords: ["art portfolio", "high school artist", "paintings", "drawings", "mixed media", "college art application"],
  authors: [{ name: "A. Sterling" }],
  creator: "A. Sterling",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asterling.art",
    siteName: "A. Sterling Portfolio",
    title: "A. Sterling | Art Portfolio",
    description: "High school art student portfolio showcasing paintings, drawings, and mixed media works.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A. Sterling Art Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A. Sterling | Art Portfolio",
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
