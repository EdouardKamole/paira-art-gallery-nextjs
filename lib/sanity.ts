// lib/sanity.ts
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url'; // ✅ Fixed: Using named export instead of default

// Initialize Sanity client
export const client = createClient({
  projectId: 'yvk99lag',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Image URL builder - ✅ Fixed: Using createImageUrlBuilder
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// General fetch function
export async function sanityFetch<T = any>(query: string, params = {}): Promise<T> {
  return client.fetch(query, params);
}

// Types
export interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  image: any;
  order: number;
}

export interface PageBanner {
  _id: string;
  page: string;
  title: string;
  description: string;
  backgroundImage: any;
  isActive: boolean;
}

// Fetch page banner
export async function getPageBanner(pageName: string): Promise<PageBanner | null> {
  const query = `*[_type == "pageBanner" && page == $pageName && isActive == true][0]{
    _id,
    page,
    title,
    description,
    backgroundImage,
    isActive
  }`;
  
  try {
    const banner = await client.fetch(query, { pageName });
    return banner;
  } catch (error) {
    console.error('Error fetching page banner:', error);
    return null;
  }
}

// Fetch gallery images for a specific category
export async function getGalleryImages(category: string): Promise<GalleryImage[]> {
  const query = `*[_type == $category] | order(order asc){
    _id,
    title,
    description,
    image,
    order
  }`;
  
  try {
    const images = await client.fetch(query, { category });
    return images;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}