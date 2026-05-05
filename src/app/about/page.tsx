import { PageHeader } from "@/components/layout/PageHeader";
import { BottomTabBar, ABOUT_TABS } from "@/components/layout/BottomTabBar";
import { ProfileHero } from "@/components/about/ProfileHero";
import { ProcessSection } from "@/components/about/ProcessSection";
import { EducationCard } from "@/components/about/EducationCard";
import { InterestTags } from "@/components/about/InterestTags";
import { CTAButtons } from "@/components/about/CTAButtons";
import { getSettingsServer } from "@/lib/data/settings.server";
import type { Profile } from "@/types";

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await getSettingsServer();

  const profile: Profile = {
    name: settings.name,
    title: settings.title,
    classYear: settings.classYear,
    profileImage: settings.profileImages[0] || "",
    profileImages: settings.profileImages,
    processTitle: settings.processTitle,
    processText: settings.processText,
    school: settings.school,
    graduationDate: settings.graduationDate,
    interests: settings.interests,
    closingQuote: settings.closingQuote,
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <PageHeader variant={{ type: "back-title", title: "THE ARTIST’S JOURNEY" }} />

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

        {profile.closingQuote && (
          <div className="mt-6 px-6 text-center lg:px-12 max-w-4xl mx-auto">
            <p className="italic text-gray-700 dark:text-white custom-serif text-lg lg:text-2xl xl:text-3xl leading-relaxed">
              &ldquo;{profile.closingQuote}&rdquo;
            </p>
          </div>
        )}

        <CTAButtons />
      </main>

      <BottomTabBar tabs={ABOUT_TABS} />
    </div>
  );
}
