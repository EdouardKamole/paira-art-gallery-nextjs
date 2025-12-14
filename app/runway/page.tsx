// ========================================
// FILE 3: app/runway/page.tsx
// ========================================
import CategoryHero from '@/components/gallery/CategoryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { getPageBanner, getGalleryImages, urlFor } from '@/lib/sanity';

export const metadata = {
  title: 'Runway Photography | Paira Art.6',
  description: 'Capturing fashion in motion on the runway',
};

export const revalidate = 60;

export default async function RunwayPage() {
  const banner = await getPageBanner('runway');
  const sanityImages = await getGalleryImages('runway');
  
  const images = sanityImages.map((img) => ({
    _id: img._id,
    url: urlFor(img.image).width(800).quality(80).url(),
    alt: img.title || 'Runway photography',
    title: img.title,
    description: img.description,
  }));

  const bannerTitle = banner?.title || 'Runway';
  const bannerDescription = banner?.description || 'Fashion in motion - capturing the energy of the runway';
  const bannerImage = banner?.backgroundImage 
    ? urlFor(banner.backgroundImage).width(1920).quality(80).url()
    : 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80';

  return (
    <main>
      <CategoryHero
        title={bannerTitle}
        description={bannerDescription}
        backgroundImage={bannerImage}
      />
      <section className="py-20 bg-white">
        <div className="container-luxury">
          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No images available yet. Add images in Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

