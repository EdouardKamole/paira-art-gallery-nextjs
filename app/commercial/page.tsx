// FILE 1: app/commercial/page.tsx
// ==============================================

import CategoryHero from '@/components/gallery/CategoryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const metadata = {
  title: 'Commercial Photography | Paira Art.6',
  description: 'Professional commercial photography elevating brands through sophisticated visuals',
};

export default function CommercialPage() {
  const demoImages = [
    { _id: '1', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', alt: 'Commercial 1' },
    { _id: '2', url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80', alt: 'Commercial 2' },
    { _id: '3', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', alt: 'Commercial 3' },
    { _id: '4', url: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=800&q=80', alt: 'Commercial 4' },
    { _id: '5', url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80', alt: 'Commercial 5' },
    { _id: '6', url: 'https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?w=800&q=80', alt: 'Commercial 6' },
  ];

  return (
    <main>
      <CategoryHero
        title="Commercial"
        description="Elevating brands through sophisticated visual narratives"
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
      />
      <section className="py-20 bg-white">
        <div className="container-luxury">
          <GalleryGrid images={demoImages} />
        </div>
      </section>
    </main>
  );
}