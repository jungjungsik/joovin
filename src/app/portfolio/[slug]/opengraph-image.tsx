import { ImageResponse } from "next/og";
import { getArtworkBySlug } from "@/lib/data/artworks";
import { getSettingsServer } from "@/lib/data/settings.server";

// Per-artwork OG card: shows the hero image with a gold-on-dark overlay
// holding the title and medium · year line. SNS-friendly 1200x630.
export const alt = "Artwork preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

const PRIMARY = "#e8ba30";
const BG = "#1a170e";

export default async function ArtworkOpengraphImage({ params }: Props) {
  const { slug } = await params;
  const [artwork, settings] = await Promise.all([
    getArtworkBySlug(slug),
    getSettingsServer(),
  ]);

  const siteName = settings.siteName || "Portfolio";
  const heroUrl = artwork?.heroImage || artwork?.thumbnail;

  if (!artwork) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: BG,
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            letterSpacing: "-0.02em",
          }}
        >
          {siteName}
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          background: BG,
        }}
      >
        {heroUrl ? (
          <img
            src={heroUrl}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.55,
            }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.92) 95%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 50,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: PRIMARY,
            fontSize: 24,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          {siteName}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            right: 60,
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              maxWidth: 1080,
            }}
          >
            {artwork.title}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 30,
              color: PRIMARY,
              letterSpacing: "0.02em",
            }}
          >
            {[artwork.medium, artwork.year].filter(Boolean).join(" · ")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
