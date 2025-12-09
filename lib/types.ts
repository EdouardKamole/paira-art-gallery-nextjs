// FILE: lib/types.ts (create this at ROOT level)

// Image type from Sanity
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

// Slug type
export interface Slug {
  _type: 'slug';
  current: string;
}

// Category type matching your Sanity project
export type Category =
  | 'portraits'
  | 'commercial'
  | 'stillLife'
  | 'editorial'
  | 'runway'
  | 'film'
  | 'about'
  | 'contact'
  | 'blog';

// Project type
export interface Project {
  _id: string;
  title: string;
  slug: Slug;
  category: Category; // Updated
  mainImage: SanityImage;
  images?: SanityImage[];
  description?: string;
  client?: string;
  location?: string;
  date?: string;
  order?: number;
}

// Author type
export interface Author {
  name: string;
  image?: SanityImage;
  bio?: string;
}

// Blog post type
export interface BlogPost {
  _id: string;
  title: string;
  slug: Slug;
  mainImage: SanityImage;
  publishedAt: string;
  excerpt?: string;
  body?: any; // Portable Text
  author?: Author;
}

// About page type
export interface AboutPage {
  title: string;
  bio: any; // Portable Text
  image: SanityImage;
  awards?: string[];
  clients?: string[];
}

// Contact information type
export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}
