import { PageHeader } from "@/components/layout/PageHeader";
import { BottomTabBar, ABOUT_TABS } from "@/components/layout/BottomTabBar";
import { ProfileHero } from "@/components/about/ProfileHero";
import { ProcessSection } from "@/components/about/ProcessSection";
import { EducationCard } from "@/components/about/EducationCard";
import { InterestTags } from "@/components/about/InterestTags";
import { CTAButtons } from "@/components/about/CTAButtons";
import { profile } from "@/lib/data/profile";

export default function AboutPage() {
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

        <div className="mt-6 px-6 text-center">
          <p className="italic text-gray-700 dark:text-white custom-serif text-lg">
            "{profile.closingQuote}"
          </p>
        </div>

        <CTAButtons />
      </main>

      <BottomTabBar tabs={ABOUT_TABS} />
    </div>
  );
}
