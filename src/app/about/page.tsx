"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BottomTabBar, ABOUT_TABS } from "@/components/layout/BottomTabBar";
import { ProfileHero } from "@/components/about/ProfileHero";
import { ProcessSection } from "@/components/about/ProcessSection";
import { EducationCard } from "@/components/about/EducationCard";
import { InterestTags } from "@/components/about/InterestTags";
import { CTAButtons } from "@/components/about/CTAButtons";
import { profile as baseProfile } from "@/lib/data/profile";

export default function AboutPage() {
  const [profile, setProfile] = useState(baseProfile);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const settings = await response.json();

          // Parse JSON arrays
          const parseJsonArray = (value: unknown): string[] => {
            if (Array.isArray(value)) return value;
            if (typeof value === "string" && value) {
              try {
                return JSON.parse(value);
              } catch {
                return [];
              }
            }
            return [];
          };

          const profileImages = parseJsonArray(settings.profileImages);
          const interests = parseJsonArray(settings.interests);
          const processText = parseJsonArray(settings.processText);

          // Update profile with all settings
          setProfile((prev) => ({
            ...prev,
            // Profile info
            ...(settings.name && { name: settings.name }),
            ...(settings.title && { title: settings.title }),
            ...(settings.classYear && { classYear: settings.classYear }),
            // Education
            ...(settings.school && { school: settings.school }),
            ...(settings.graduationDate && { graduationDate: settings.graduationDate }),
            // Process
            ...(settings.processTitle && { processTitle: settings.processTitle }),
            ...(processText.length > 0 && { processText }),
            // Interests
            ...(interests.length > 0 && { interests }),
            // Closing quote
            ...(settings.closingQuote && { closingQuote: settings.closingQuote }),
            // Images
            ...(profileImages.length > 0 && {
              profileImage: profileImages[0],
              profileImages,
            }),
          }));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }

    loadSettings();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <PageHeader variant={{ type: "back-title", title: "THE ARTIST'S JOURNEY" }} />

      <main className="flex-1 pb-20">
        <ProfileHero profile={profile} />

        <ProcessSection
          title={profile.processTitle}
          paragraphs={profile.processText}
        />

        <div className="mt-6">
          <EducationCard
            school={profile.school}
            graduationDate={profile.graduationDate}
          />
        </div>

        <div className="mt-6">
          <InterestTags interests={profile.interests} />
        </div>

        <div className="mt-6 px-6 text-center lg:px-12 max-w-4xl mx-auto">
          <p className="italic text-gray-700 dark:text-white custom-serif text-lg lg:text-2xl xl:text-3xl leading-relaxed">
            "{profile.closingQuote}"
          </p>
        </div>

        <CTAButtons />
      </main>

      <BottomTabBar tabs={ABOUT_TABS} />
    </div>
  );
}
