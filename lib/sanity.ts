// FILE: lib/sanity.ts


import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'yvk99lag',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function sanityFetch<T = any>(query: string, params = {}): Promise<T> {
  return client.fetch(query, params);
}