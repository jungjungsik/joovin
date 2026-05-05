import { PageHeader } from "@/components/layout/PageHeader";
import { GrainBackground } from "@/components/layout/GrainBackground";
import { ContactHeadline } from "@/components/contact/ContactHeadline";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { MadeWithHeart } from "@/components/contact/MadeWithHeart";
import { GoldUnderline } from "@/components/ui/GoldUnderline";
import { getSettingsServer } from "@/lib/data/settings.server";
import type { ContactInfo, SocialLinks } from "@/types";

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSettingsServer();

  const socialLinks: SocialLinks = {
    instagramUrl: settings.instagramUrl,
    tiktokUrl: settings.tiktokUrl,
    youtubeUrl: settings.youtubeUrl,
    twitterUrl: settings.twitterUrl,
    behanceUrl: settings.behanceUrl,
    pinterestUrl: settings.pinterestUrl,
    linkedinUrl: settings.linkedinUrl,
    facebookUrl: settings.facebookUrl,
  };

  const contactInfo: ContactInfo = {
    email: settings.email,
    socialLinks,
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <GrainBackground />

      <PageHeader variant={{ type: "back-only" }} />

      <main className="flex flex-1 flex-col items-center justify-center px-8 pb-24">
        <ContactHeadline headline={settings.contactHeadline} />

        <GoldUnderline className="mb-12" />

        <ContactLinks contact={contactInfo} />
      </main>

      <footer className="pb-10">
        <MadeWithHeart />
      </footer>
    </div>
  );
}
