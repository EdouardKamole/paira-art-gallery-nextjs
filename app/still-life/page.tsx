// FILE 2: app/still-life/page.tsx
// ==============================================

import CategoryHero from '@/components/gallery/CategoryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const metadata = {
  title: 'Still Life Photography | Paira Art.6',
  description: 'Beauty in simplicity - still life photography with artistic vision',
};

export default function StillLifePage() {
  const demoImages = [
    { _id: '1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', alt: 'Still Life 1' },
    { _id: '2', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', alt: 'Still Life 2' },
    { _id: '3', url: 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80', alt: 'Still Life 3' },
    { _id: '4', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', alt: 'Still Life 4' },
    { _id: '5', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80', alt: 'Still Life 5' },
    { _id: '6', url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80', alt: 'Still Life 6' },
  ];

  return (
    <main>
      <CategoryHero
        title="Still Life"
        description="Finding beauty in simplicity through artistic composition"
        backgroundImage="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&q=80"
      />
      <section className="py-20 bg-white">
        <div className="container-luxury">
          <GalleryGrid images={demoImages} />
        </div>
      </section>
    </main>
  );
}
