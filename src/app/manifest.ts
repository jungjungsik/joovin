import type { MetadataRoute } from "next";

// PWA manifest. Lets visitors "Add to Home Screen" on iOS/Android and gives
// the installed icon a proper colour theme. Single icon entry — the SVG at
// /icon.svg covers all common DPI buckets via the `any maskable` purpose.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Joovin NAM Portfolio",
    short_name: "Joovin NAM",
    description:
      "Joovin NAM's art portfolio — paintings, drawings, and mixed media works.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f8f7f6",
    theme_color: "#211d11",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
