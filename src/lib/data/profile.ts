import { Profile, ContactInfo } from "@/types";

export const profile: Profile = {
  name: "Joovin NAM",
  title: "High School Student",
  classYear: "Class of 2026",
  profileImage: "/images/profile/joovin-1.jpg",
  profileImages: [
    "/images/profile/joovin-1.jpg",
    "/images/profile/joovin-2.jpg",
    "/images/profile/joovin-3.jpg",
  ],
  processTitle: "My Process",
  processText: [
    "Art is my way of making sense of the world. I focus on raw textures and the 'happy accidents' that happen when I stop trying to be perfect. My work is a journey of finding authenticity in every brushstroke.",
    "Currently, I'm exploring the intersection of traditional charcoal drawing and digital layered textures. I believe that digital tools shouldn't lose the soul of the hand.",
  ],
  school: "The Courtyard International School of Tervuren",
  graduationDate: "June 2026",
  interests: [
    "Mixed Media",
    "Charcoal Portraits",
    "Digital Collage",
    "Textural Studies",
    "Abstract Ink",
  ],
  closingQuote: "I'm looking for where the messy meets the meaningful.",
};

export const contactInfo: ContactInfo = {
  email: "joovin@example.com",
  socialHandle: "@joovin_art",
  socialUrl: "https://instagram.com/joovin_art",
};
