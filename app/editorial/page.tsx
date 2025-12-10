import CategoryHero from '@/components/gallery/CategoryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const metadata = {
  title: 'Editorial Photography | Paira Art.6',
  description: 'Magazine-quality editorial photography telling compelling visual stories',
};

export default function EditorialPage() {
  const demoImages = [
    { _id: '1', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', alt: 'Editorial 1' },
    { _id: '2', url: 'https://images.unsplash.com/photo-1490725263030-1f0521cec8ec?w=800&q=80', alt: 'Editorial 2' },
    { _id: '3', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', alt: 'Editorial 3' },
    { _id: '4', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', alt: 'Editorial 4' },
    { _id: '5', url: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?w=800&q=80', alt: 'Editorial 5' },
    { _id: '6', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80', alt: 'Editorial 6' },
  ];

  return (
    <main>
      <CategoryHero
        title="Editorial"
        description="Creating magazine-quality narratives through powerful imagery"
        backgroundImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
      />
      <section className="py-20 bg-white">
        <div className="container-luxury">
          <GalleryGrid images={demoImages} />
        </div>
      </section>
    </main>
  );
}