import { PageHeader } from "@/components/layout/PageHeader";
import { GrainBackground } from "@/components/layout/GrainBackground";
import { ContactHeadline } from "@/components/contact/ContactHeadline";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { MadeWithHeart } from "@/components/contact/MadeWithHeart";
import { GoldUnderline } from "@/components/ui/GoldUnderline";
import { contactInfo } from "@/lib/data/profile";

export default function ContactPage() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden">
      <GrainBackground />

      <PageHeader variant={{ type: "back-only" }} />

      <main className="flex flex-1 flex-col items-center justify-center px-8 pb-24">
        <ContactHeadline />

        <GoldUnderline className="mb-12 opacity-80" />

        <ContactLinks contact={contactInfo} />
      </main>

      <footer className="pb-10">
        <MadeWithHeart />
      </footer>
    </div>
  );
}
