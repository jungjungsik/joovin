"use client";

import { useState } from "react";
import Image from "next/image";
import { Profile } from "@/types";

interface ProfileHeroProps {
  profile: Profile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  // Filter out empty strings from images array
  const images = (profile.profileImages || []).filter((img) => img && img.length > 0);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex p-6 flex-col items-center max-w-6xl mx-auto lg:flex-row lg:items-start lg:gap-12 xl:gap-16 lg:p-12">
      {/* Main Image - only show if we have images */}
      {images.length > 0 && (
        <div className="flex flex-col items-center lg:items-start lg:sticky lg:top-8">
          <div className="relative mb-4">
            <div className="w-56 lg:w-96 xl:w-[28rem] 2xl:w-[32rem] aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <Image
                src={images[activeIndex]}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 lg:w-16 lg:h-16 lg:-bottom-4 lg:-right-4 bg-primary rounded-full flex items-center justify-center border-4 border-background-light dark:border-background-dark shadow-lg">
              <span className="material-symbols-outlined text-white text-xl lg:text-3xl">palette</span>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex gap-2 mb-4 lg:gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-14 h-14 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === activeIndex
                      ? "border-primary scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${profile.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Name and Title */}
      <div className="text-center space-y-2 lg:text-left lg:flex-1 lg:pt-4 lg:space-y-4">
        <p className="text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight custom-serif italic dark:text-white leading-tight">
          Hi, I'm {profile.name}
        </p>
        <p className="text-primary dark:text-primary font-medium text-sm lg:text-base xl:text-lg tracking-widest uppercase">
          {profile.title} | {profile.classYear}
        </p>
      </div>
    </div>
  );
}
