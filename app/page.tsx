// FILE: app/page.tsx
// Next.js Homepage with Your Existing Sanity Setup

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { sanityFetch, urlFor } from '@/lib/sanity';

// GROQ Query for Homepage
const homepageQuery = `*[_type == "homepage"][0]{
  heroSection{
    slides[]{
      image,
      title,
      category
    },
    subtitle,
    mainTitle,
    ctaText,
    ctaLink
  },
  categoriesSection{
    sectionSubtitle,
    sectionTitle,
    sectionDescription,
    categories[]{
      title,
      "slug": slug.current,
      description,
      image
    }
  },
  aboutSection{
    sectionSubtitle,
    sectionTitle,
    image,
    paragraph1,
    paragraph2,
    ctaText,
    ctaLink
  },
  ctaSection{
    subtitle,
    title,
    description,
    primaryButton{
      text,
      link
    },
    secondaryButton{
      text,
      link
    }
  }
}`;

// TypeScript Interfaces
interface HeroSlide {
  image: any;
  title: string;
  category: string;
}

interface Category {
  title: string;
  slug: string;
  description: string;
  image: any;
}

interface HomepageData {
  heroSection: {
    slides: HeroSlide[];
    subtitle: string;
    mainTitle: string;
    ctaText: string;
    ctaLink: string;
  };
  categoriesSection: {
    sectionSubtitle: string;
    sectionTitle: string;
    sectionDescription: string;
    categories: Category[];
  };
  aboutSection: {
    sectionSubtitle: string;
    sectionTitle: string;
    image: any;
    paragraph1: string;
    paragraph2: string;
    ctaText: string;
    ctaLink: string;
  };
  ctaSection: {
    subtitle: string;
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Sanity
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await sanityFetch<HomepageData>(homepageQuery);
        if (!result) {
          setError('No homepage data found. Please add content in Sanity Studio.');
          return;
        }
        setData(result);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!data?.heroSection?.slides?.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSection.slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data?.heroSection?.slides]);

  const nextSlide = () => {
    if (!data?.heroSection?.slides) return;
    setCurrentSlide((prev) => (prev + 1) % data.heroSection.slides.length);
  };

  const prevSlide = () => {
    if (!data?.heroSection?.slides) return;
    setCurrentSlide(
      (prev) => (prev - 1 + data.heroSection.slides.length) % data.heroSection.slides.length
    );
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pumpkin-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="luxury-text text-charcoal-600">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 bg-pumpkin-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-serif text-charcoal-800 mb-2">Content Not Available</h2>
          <p className="text-charcoal-600 mb-6">
            {error || 'Unable to load homepage content.'}
          </p>
          <p className="text-sm text-charcoal-500">
            Please ensure you've created and published the Homepage document in Sanity Studio.
          </p>
        </div>
      </div>
    );
  }

  const { heroSection, categoriesSection, aboutSection, ctaSection } = data;

  return (
    <main>
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        {heroSection.slides?.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${urlFor(slide.image).url()})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>
          </div>
        ))}

        {/* Content Over Slider */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-6">
            <p className="luxury-text !text-white mb-6 animate-fade-in">
              {heroSection.subtitle}
            </p>

            <h1 className="hero-title mb-6 animate-slide-up !text-pumpkin-500">
              {heroSection.mainTitle}
            </h1>

            <p className="subtitle !text-white mb-12 max-w-2xl mx-auto animate-fade-in-slow">
              {heroSection.slides[currentSlide]?.category} •{' '}
              {heroSection.slides[currentSlide]?.title}
            </p>

            <Link
              href={heroSection.ctaLink || '/about'}
              className="btn-primary inline-flex items-center gap-2 animate-fade-in-slow"
            >
              {heroSection.ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSection.slides?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-pumpkin-500 w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 bg-cream-50">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <p className="luxury-text mb-4">{categoriesSection.sectionSubtitle}</p>
            <h2 className="section-title mb-6">{categoriesSection.sectionTitle}</h2>
            <p className="subtitle max-w-2xl mx-auto">{categoriesSection.sectionDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesSection.categories?.map((category, index) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="card-luxury group overflow-hidden"
                style={{
                  animation: `slide-up 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* Background Image */}
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${urlFor(category.image).url()})` }}
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="luxury-text text-white mb-2">{category.description}</p>

                    <h3 className="font-serif text-3xl mb-3 text-white transform group-hover:translate-x-2 transition-transform duration-300">
                      {category.title}
                    </h3>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm text-white">DISCOVER MY WORK</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-32 bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
              <Image
                src={urlFor(aboutSection.image).url()}
                alt={aboutSection.sectionTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="luxury-text mb-4">{aboutSection.sectionSubtitle}</p>
              <h2 className="section-title mb-8 whitespace-pre-line">
                {aboutSection.sectionTitle}
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-6 text-lg">
                {aboutSection.paragraph1}
              </p>
              <p className="text-charcoal-600 leading-relaxed mb-8 text-lg">
                {aboutSection.paragraph2}
              </p>
              <Link
                href={aboutSection.ctaLink || '/about'}
                className="btn-primary inline-flex items-center gap-2"
              >
                {aboutSection.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-pumpkin-50 to-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-pumpkin-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pumpkin-300 rounded-full blur-3xl" />
        </div>

        <div className="container-luxury relative z-10">
          <div className="glass max-w-4xl mx-auto p-16 rounded-2xl text-center">
            <p className="luxury-text mb-4">{ctaSection.subtitle}</p>
            <h2 className="section-title mb-8">{ctaSection.title}</h2>
            <p className="text-xl text-charcoal-600 mb-12 max-w-2xl mx-auto">
              {ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={ctaSection.primaryButton?.link || '/contact'} className="btn-primary">
                {ctaSection.primaryButton?.text || 'Get in Touch'}
              </Link>
              <Link href={ctaSection.secondaryButton?.link || '/blog'} className="btn-secondary">
                {ctaSection.secondaryButton?.text || 'View Blog'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}