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
    <div className="flex p-6 flex-col items-center max-w-6xl mx-auto">
      {/* Main Image - only show if we have images */}
      {images.length > 0 && (
        <>
          <div className="relative mb-4">
            <div className="w-56 lg:w-72 aspect-[4/5] relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={images[activeIndex]}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-background-light dark:border-background-dark">
              <span className="material-symbols-outlined text-white text-xl">palette</span>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex gap-2 mb-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    index === activeIndex
                      ? "border-primary scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${profile.name} ${index + 1}`}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Name and Title */}
      <div className="text-center space-y-1">
        <p className="text-3xl font-bold tracking-tight custom-serif italic dark:text-white">
          Hi, I'm {profile.name}
        </p>
        <p className="text-primary dark:text-primary font-medium text-sm tracking-widest uppercase">
          {profile.title} | {profile.classYear}
        </p>
      </div>
    </div>
  );
}
