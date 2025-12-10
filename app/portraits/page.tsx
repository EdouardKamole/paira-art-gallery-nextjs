// FILE: app/portraits/page.tsx
// Create folder: app/portraits/
// Create file: app/portraits/page.tsx

import CategoryHero from '@/components/gallery/CategoryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';
// import { sanityFetch } from '@/lib/sanity';
// import { projectsByCategoryQuery } from '@/lib/queries';

export const metadata = {
  title: 'Portrait Photography | Paira Art.6',
  description: 'Timeless portrait photography capturing the essence of personality and emotion',
};

export default async function PortraitsPage() {
  // TODO: Fetch from Sanity CMS
  // const projects = await sanityFetch(projectsByCategoryQuery, { category: 'portraits' });

  // Demo images - Replace with Sanity data
  const demoImages = [
    {
      _id: '1',
      url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
      alt: 'Portrait 1',
      title: 'Natural Light Portrait',
    },
    {
      _id: '2',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      alt: 'Portrait 2',
      title: 'Studio Portrait',
    },
    {
      _id: '3',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80',
      alt: 'Portrait 3',
      title: 'Editorial Portrait',
    },
    {
      _id: '4',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
      alt: 'Portrait 4',
      title: 'Environmental Portrait',
    },
    {
      _id: '5',
      url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
      alt: 'Portrait 5',
      title: 'Fashion Portrait',
    },
    {
      _id: '6',
      url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80',
      alt: 'Portrait 6',
      title: 'Lifestyle Portrait',
    },
  ];

  return (
    <main>
      <CategoryHero
        title="Portraits"
        description="Capturing the essence of personality through timeless imagery"
        backgroundImage="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&q=80"
      />

      <section className="py-20 bg-white">
        <div className="container-luxury">
          <GalleryGrid images={demoImages} />
        </div>
      </section>
    </main>
  );
}