// Filter categories for portfolio page
export type FilterCategory = 'all' | 'selected-works' | 'drawings' | 'paintings' | 'digital' | 'wip' | 'sketchbook';

// Item tags (stored in database for each artwork)
export type ItemTag = 'selected-works' | 'drawings' | 'paintings' | 'digital' | 'wip' | 'sketchbook';

// Artwork information
export interface Artwork {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  tag: ItemTag;
  medium: string;
  dimensions: string;
  season?: string;
  description: string;
  thumbnail: string;
  heroImage: string;
  processImages?: string[];
  technicalInsight?: string;
  technicalInsightImage?: string;
  studioImage?: string;
  studioText?: string;
  reflection?: string;
  featured?: boolean;
  published?: boolean;
  order?: number;
}

// Profile information (About page)
export interface Profile {
  name: string;
  title: string;
  classYear: string;
  profileImage: string;
  profileImages?: string[];
  processTitle: string;
  processText: string[];
  school: string;
  graduationDate: string;
  interests: string[];
  closingQuote: string;
}

// Social media URLs for multiple platforms
export interface SocialLinks {
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  behanceUrl?: string;
  pinterestUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
}

// Contact information
export interface ContactInfo {
  email: string;
  socialLinks: SocialLinks;
}

// Page header configuration
export type HeaderVariant =
  | { type: 'home'; title: string; aboutLink: boolean }
  | { type: 'back-title'; title: string }
  | { type: 'back-search'; title: string }
  | { type: 'back-actions'; showShare: boolean; showFavorite: boolean }
  | { type: 'back-only' };

// Bottom tab configuration
export interface TabItem {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}
