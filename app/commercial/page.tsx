// app/commercial/page.tsx
import CategoryHero from '@/components/gallery/CategoryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { getPageBanner, getGalleryImages, urlFor } from '@/lib/sanity';

export const metadata = {
  title: 'Commercial Photography | Paira Art.6',
  description: 'Professional commercial photography elevating brands through sophisticated visuals',
};

// Revalidate every 60 seconds to get fresh data
export const revalidate = 60;

export default async function CommercialPage() {
  // Fetch banner data from Sanity
  const banner = await getPageBanner('commercial');
  
  // Fetch gallery images from Sanity
  const sanityImages = await getGalleryImages('commercial');
  
  // Transform Sanity images to match GalleryGrid format
  const images = sanityImages.map((img) => ({
    _id: img._id,
    url: urlFor(img.image).width(800).quality(80).url(),
    alt: img.title || 'Commercial photography',
    title: img.title,
    description: img.description,
  }));

  // Fallback values if no banner is set in Sanity
  const bannerTitle = banner?.title || 'Commercial';
  const bannerDescription = banner?.description || 'Elevating brands through sophisticated visual narratives';
  const bannerImage = banner?.backgroundImage 
    ? urlFor(banner.backgroundImage).width(1920).quality(80).url()
    : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80';

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
                No images available yet. Add images in Sanity Studio to display them here.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}