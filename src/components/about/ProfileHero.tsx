import Image from "next/image";
import { Profile } from "@/types";

interface ProfileHeroProps {
  profile: Profile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <div className="flex p-6 flex-col items-center">
      <div className="relative mb-6">
        <div className="w-48 aspect-[4/5] relative rounded-2xl overflow-hidden shadow-sm">
          <Image
            src={profile.profileImage}
            alt={profile.name}
            fill
            className="object-cover grayscale-[20%]"
          />
        </div>
        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-background-light dark:border-background-dark">
          <span className="material-symbols-outlined text-white text-xl">palette</span>
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-3xl font-bold tracking-tight custom-serif italic">
          Hi, I'm {profile.name}
        </p>
        <p className="text-primary font-medium text-sm tracking-widest uppercase">
          {profile.title} | {profile.classYear}
        </p>
      </div>
    </div>
  );
}
