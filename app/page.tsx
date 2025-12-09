// FILE: app/page.tsx
// Replace your app/page.tsx with this stunning homepage

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero images - These will be replaced with Sanity CMS data later
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1920&q=80',
      title: 'Fashion Forward',
      category: 'Editorial',
    },
    {
      url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&q=80',
      title: 'Urban Stories',
      category: 'Lifestyle',
    },
    {
      url: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?w=1920&q=80',
      title: 'Timeless Portraits',
      category: 'Portraits',
    },
    {
      url: 'https://images.unsplash.com/photo-1490725263030-1f0521cec8ec?w=1920&q=80',
      title: 'Commercial Beauty',
      category: 'Commercial',
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const categories = [
    {
      title: 'Portraits',
      href: '/portraits',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
      description: 'Capturing the essence of personality',
    },
    {
      title: 'Commercial',
      href: '/commercial',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      description: 'Elevating brands through visuals',
    },
    {
      title: 'Still Life',
      href: '/still-life',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      description: 'Beauty in simplicity',
    },
    {
      title: 'Editorial',
      href: '/editorial',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      description: 'Magazine-quality storytelling',
    },
    {
      title: 'Runway',
      href: '/runway',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
      description: 'Fashion in motion',
    },
    {
      title: 'Film',
      href: '/film',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
      description: 'Visual narratives that move',
    },
  ];

  return (
    <main>
      
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>
          </div>
        ))}

        {/* Content Over Slider */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white px-6">
            <p className="luxury-text text-white/90 mb-6 animate-fade-in">
              Visual Storytelling from Kampala
            </p>
            <h1 className="hero-title mb-6 animate-slide-up">
              Paira Art.6
            </h1>
            <p className="subtitle text-white/90 mb-12 max-w-2xl mx-auto animate-fade-in-slow">
              {heroImages[currentSlide].category} • {heroImages[currentSlide].title}
            </p>
            <Link
              href="/about"
              className="btn-primary inline-flex items-center gap-2 animate-fade-in-slow"
            >
              Discover My Work
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
          {heroImages.map((_, index) => (
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
            <p className="luxury-text mb-4">Explore My Work</p>
            <h2 className="section-title mb-6">Photography Categories</h2>
            <p className="subtitle max-w-2xl mx-auto">
              From fashion to film, each frame tells a story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.href}
                href={category.href}
                className="card-luxury group overflow-hidden"
                style={{
                  animation: `slide-up 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="luxury-text text-white/80 mb-2">
                      {category.description}
                    </p>
                    <h3 className="font-serif text-3xl mb-3 transform group-hover:translate-x-2 transition-transform duration-300">
                      {category.title}
                    </h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm">View Gallery</span>
                      <ArrowRight className="w-4 h-4" />
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
            <div className="aspect-[3/4] bg-gradient-to-br from-pumpkin-100 to-pumpkin-200 rounded-lg" />
            
            <div>
              <p className="luxury-text mb-4">About the Artist</p>
              <h2 className="section-title mb-8">
                Capturing Stories<br />Through Lens
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-6 text-lg">
                Paira Art.6 (Muwulya Peter) is a Ugandan photographer and cinematographer 
                whose love for art started in childhood. Born and raised in Kampala, 
                he transforms real moments into powerful visual stories.
              </p>
              <p className="text-charcoal-600 leading-relaxed mb-8 text-lg">
                Known for using the 35mm lens, his work features soft tones, clean composition, 
                and a simple, modern look that always carries emotion and tells a story.
              </p>
              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Read Full Story
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
            <p className="luxury-text mb-4">Let's Create Together</p>
            <h2 className="section-title mb-8">Ready to Tell Your Story?</h2>
            <p className="text-xl text-charcoal-600 mb-12 max-w-2xl mx-auto">
              Whether it's fashion, lifestyle, or film, let's create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link href="/blog" className="btn-secondary">
                View Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}