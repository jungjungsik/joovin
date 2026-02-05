"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { GrainBackground } from "@/components/layout/GrainBackground";
import { ContactHeadline } from "@/components/contact/ContactHeadline";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { MadeWithHeart } from "@/components/contact/MadeWithHeart";
import { GoldUnderline } from "@/components/ui/GoldUnderline";
import { ContactInfo, SocialLinks } from "@/types";

interface ContactSettings {
  contactHeadline: string;
  email: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  behanceUrl: string;
  pinterestUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
}

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactSettings>({
    contactHeadline: "Let's talk art.",
    email: "",
    instagramUrl: "",
    tiktokUrl: "",
    youtubeUrl: "",
    twitterUrl: "",
    behanceUrl: "",
    pinterestUrl: "",
    linkedinUrl: "",
    facebookUrl: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setContactData({
          contactHeadline: data.contactHeadline || "Let's talk art.",
          email: data.email || "",
          instagramUrl: data.instagramUrl || "",
          tiktokUrl: data.tiktokUrl || "",
          youtubeUrl: data.youtubeUrl || "",
          twitterUrl: data.twitterUrl || "",
          behanceUrl: data.behanceUrl || "",
          pinterestUrl: data.pinterestUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          facebookUrl: data.facebookUrl || "",
        });
      })
      .catch(() => {
        // Keep default values on error
      });
  }, []);

  const socialLinks: SocialLinks = {
    instagramUrl: contactData.instagramUrl,
    tiktokUrl: contactData.tiktokUrl,
    youtubeUrl: contactData.youtubeUrl,
    twitterUrl: contactData.twitterUrl,
    behanceUrl: contactData.behanceUrl,
    pinterestUrl: contactData.pinterestUrl,
    linkedinUrl: contactData.linkedinUrl,
    facebookUrl: contactData.facebookUrl,
  };

  const contactInfo: ContactInfo = {
    email: contactData.email,
    socialLinks,
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <GrainBackground />

      <PageHeader variant={{ type: "back-only" }} />

      <main className="flex flex-1 flex-col items-center justify-center px-8 pb-24">
        <ContactHeadline headline={contactData.contactHeadline} />

        <GoldUnderline className="mb-12" />

        <ContactLinks contact={contactInfo} />
      </main>

      <footer className="pb-10">
        <MadeWithHeart />
      </footer>
    </div>
  );
}
