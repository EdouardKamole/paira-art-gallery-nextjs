// FILE: app/blog/[slug]/page.tsx
// Create folder: app/blog/[slug]/
// Create file: app/blog/[slug]/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Share2 } from 'lucide-react';

// All blog posts with complete content
const blogPosts: Record<string, any> = {
  'my-journey-into-photography': {
    _id: '1',
    title: 'My Journey Into Photography',
    slug: 'my-journey-into-photography',
    mainImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Personal Story',
    author: { 
      name: 'Paira Art.6',
      image: '/paira-image1.jpg', // Use your local image
      bio: 'Ugandan photographer and cinematographer based in Kampala'
    },
    body: `
      <p>Photography has been my passion since I was 19 years old. It all started during a high school vacation when I picked up my first camera - a Nikon. Little did I know that this moment would shape the rest of my life and lead me on an incredible creative journey.</p>

      <h2>The Beginning</h2>
      <p>Growing up in Kampala in a humble home, I was always drawn to visual storytelling. I loved how a single image could capture an emotion, a moment, a story that words sometimes couldn't express. My journey wasn't easy - I had to learn everything from scratch, often watching tutorials online and practicing whenever I could.</p>

      <p>The first few years were challenging. I didn't have access to expensive equipment or formal training, but I had determination and passion. Every photo I took taught me something new - about light, composition, timing, and most importantly, about connecting with my subjects.</p>

      <h2>Discovering My Style</h2>
      <p>After a few years with Nikon, I transitioned to Sony cameras. The colors, the quality, and the creative freedom Sony offered completely changed my perspective on photography. It was like seeing the world through new eyes - sharper, more vibrant, more alive.</p>

      <p>I fell in love with the 35mm lens - it became my signature. This lens gives my fashion and lifestyle images a natural, real-life feel with just the right touch of drama. It's wide enough to capture context but intimate enough to tell a story. When I shoot with my 35mm, I feel like I'm not just taking photos - I'm capturing moments that matter.</p>

      <h2>Building a Career</h2>
      <p>My work is built on soft tones, clean composition, and a simple, modern look. Every image I create carries emotion and tells a story. I don't just point and shoot - I think about what the photo should communicate, what feeling it should evoke, what story it should tell.</p>

      <p>Over the years, I've had the privilege of working with designers, fashion brands, influencers, and creative teams across Kampala. Each collaboration has taught me something new and pushed me to grow as an artist. From small local brands to larger commercial projects, I've learned to adapt my style while staying true to my vision.</p>

      <h2>What Drives Me</h2>
      <p>I'm calm, easy to work with, and I focus on making my clients feel comfortable. I believe that the best photos happen when people feel relaxed and authentic. From planning to final delivery, I work professionally and with care. Whether it's fashion, lifestyle, events, or film, I bring simplicity, feeling, and intention to every project.</p>

      <p>What really drives me is the ability to freeze time. In a world that moves so fast, photography allows us to pause, to remember, to feel. When someone looks at one of my photos years from now, I want them to be transported back to that exact moment, to feel what they felt, to remember what mattered.</p>

      <h2>My Creative Process</h2>
      <p>Every shoot starts with understanding the story. I sit down with my clients to understand their vision, their brand, their message. Then I plan every detail - location, lighting, mood, angles. Nothing is left to chance, yet I always leave room for spontaneity and those magical unexpected moments.</p>

      <p>Post-processing is where the magic really comes together. My color grading process involves achieving those soft tones and clean looks that have become my signature. It's subtle work - enhancing natural beauty without over-editing, maintaining authenticity while creating something visually stunning.</p>

      <h2>Looking Forward</h2>
      <p>My vision is to inspire people and tell stories that bring communities together through photography and film. One moment, one frame at a time. This is just the beginning of my journey, and I'm excited to see where it takes me next.</p>

      <p>I'm currently exploring more film work, combining my photography skills with motion and sound. The intersection of photography and cinematography opens up so many creative possibilities, and I can't wait to push those boundaries further.</p>

      <p>To everyone reading this - whether you're a fellow photographer just starting out or someone considering working with me - know that every journey is unique. Don't compare yourself to others. Find your voice, tell your stories, and never stop learning. The camera is just a tool; the real art is in how you see the world.</p>
    `,
  },
  'why-i-love-35mm-lens': {
    _id: '2',
    title: 'Why the 35mm Lens is My Signature Choice',
    slug: 'why-i-love-35mm-lens',
    mainImage: 'https://images.unsplash.com/photo-1606166419283-d00f1aa47c8c?w=1920&q=80',
    publishedAt: '2024-01-10',
    readTime: '6 min read',
    category: 'Photography Tips',
    author: { 
      name: 'Paira Art.6',
      image: '/paira-image1.jpg',
      bio: 'Ugandan photographer and cinematographer based in Kampala'
    },
    body: `
      <p>If you follow my work, you've probably noticed that most of my photos have a distinctive look - natural, intimate, and full of life. The secret? My beloved 35mm lens. This isn't just a piece of gear; it's an extension of my creative vision.</p>

      <h2>Why 35mm?</h2>
      <p>The 35mm focal length sits in a sweet spot between wide-angle and standard perspective. It's wide enough to capture environmental context but intimate enough to make portraits feel personal and engaging. When I shoot fashion or lifestyle content, this lens gives me exactly what I need - the subject and their story, in context.</p>

      <p>Unlike wider lenses that can distort features or telephoto lenses that compress space and isolate subjects, the 35mm maintains natural proportions while still giving you breathing room in the frame. It sees the world almost exactly as our eyes do, which creates an immediate connection between the viewer and the image.</p>

      <h2>Perfect for Fashion Photography</h2>
      <p>In fashion photography, you want to show the clothes, the styling, and the mood - but you also want to show the person wearing them. The 35mm excels at this. I can shoot full-body shots that show the complete outfit while still capturing facial expressions and personality.</p>

      <p>When shooting street style or lifestyle fashion content around Kampala, the 35mm allows me to include the vibrant backgrounds - the colorful buildings, bustling markets, or modern architecture - while keeping my subject as the clear focal point. It tells a complete story in a single frame.</p>

      <h2>The Versatility Factor</h2>
      <p>What I love most about the 35mm is its incredible versatility. In a single shoot, I can go from:</p>

      <p><strong>Wide environmental shots</strong> that establish the scene and location, <strong>medium shots</strong> that focus on styling and overall look, <strong>close-up portraits</strong> by stepping closer to my subject, and <strong>detail shots</strong> of accessories, textures, and styling elements.</p>

      <p>I rarely need to switch lenses during a shoot. This keeps the creative flow going and helps maintain the energy and momentum with my subjects. There's no awkward pause to change gear - just continuous shooting and creating.</p>

      <h2>Technical Advantages</h2>
      <p>Most 35mm lenses, especially prime lenses, are incredibly sharp and fast. The wide apertures (f/1.4 or f/1.8) allow for beautiful background separation when needed, while still giving you more depth of field than longer lenses. This is crucial for fashion work where you want the clothes in focus from head to toe.</p>

      <p>The fast aperture also means I can shoot in challenging lighting conditions - during golden hour, in shaded areas, or even indoors with ambient light. This gives me more creative freedom and eliminates the need for heavy lighting setups for many shoots.</p>

      <h2>Creating That Natural Feel</h2>
      <p>The 35mm forces me to get closer to my subjects, which actually creates better photos. When you're physically closer, you connect more with the person you're photographing. They can hear your direction more clearly, you can read their energy better, and the resulting images feel more intimate and authentic.</p>

      <p>This physical proximity also helps me capture genuine moments and expressions. There's less distance, less barrier between photographer and subject. The resulting images feel real, lived-in, and honest - which is exactly the aesthetic I aim for in my work.</p>

      <h2>Room to Breathe</h2>
      <p>One thing I've learned over the years is the power of negative space. The 35mm naturally creates images with room around the subject - space that doesn't feel empty but rather gives the photo breathing room. This modern, clean aesthetic is part of my signature style.</p>

      <p>In post-processing, this extra space also gives me flexibility for different crops and formats - square for Instagram, vertical for stories, horizontal for websites. The 35mm captures enough that I always have options.</p>

      <h2>My Advice for Aspiring Photographers</h2>
      <p>If you're starting out in fashion or lifestyle photography, consider making the 35mm your go-to lens. Spend a month shooting only with this focal length. You'll learn to see differently, to compose more thoughtfully, and to tell more complete stories in your images.</p>

      <p>The constraint of a single focal length actually expands your creativity. Instead of zooming, you move. Instead of relying on lens compression for aesthetics, you work with light, angles, and composition. These are fundamental skills that will make you a better photographer regardless of what gear you eventually use.</p>

      <p>For me, the 35mm isn't just a lens - it's my creative partner. It has shaped how I see the world and how I tell stories through my photography. Every photographer needs to find their signature look, and for me, it all starts with this one lens.</p>
    `,
  },
  // Add more blog posts here with similar structure...
  'shooting-in-kampala': {
    _id: '3',
    title: 'Shooting in Kampala: My Favorite Locations',
    slug: 'shooting-in-kampala',
    mainImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80',
    publishedAt: '2024-01-05',
    readTime: '7 min read',
    category: 'Behind The Scenes',
    author: { 
      name: 'Paira Art.6',
      image: '/paira-image1.jpg',
      bio: 'Ugandan photographer and cinematographer based in Kampala'
    },
    body: `
      <p>Kampala is a photographer's dream. The mix of modern architecture, colorful streets, natural beauty, and vibrant culture provides endless opportunities for stunning photography. After years of shooting in this city, I've discovered some incredible locations that never fail to deliver amazing results.</p>

      <h2>1. Nakasero Market Area</h2>
      <p>The energy of Nakasero Market is unmatched. The colorful produce, bustling crowds, and authentic street life make it perfect for lifestyle and fashion shoots that need that urban, real-world feel. Early morning light filtering through the market stalls creates beautiful, soft lighting conditions.</p>

      <p>When shooting here, I always arrive early around 7-8 AM. The light is softer, the crowds are more manageable, and vendors are usually more welcoming to photography. The key is being respectful, asking permission, and sometimes buying something from the vendors you photograph near.</p>

      <h2>2. Kololo Hilltop Areas</h2>
      <p>For elevated views of the city and beautiful sunset backdrops, the hilltop areas in Kololo are unbeatable. The modern homes with clean architecture provide excellent backgrounds for fashion photography. The elevated position also gives you that gorgeous city skyline backdrop during golden hour.</p>

      <p>I particularly love shooting here during late afternoon when the sun is lower. The combination of urban landscape and natural light creates a sophisticated, editorial feel that works perfectly for high-end fashion or lifestyle content.</p>

      <h2>3. Botanical Gardens Entebbe</h2>
      <p>When I need lush greenery and natural beauty, the Botanical Gardens in Entebbe is my go-to location. The massive trees, open lawns, and lakeside views provide diverse backdrops all in one location. It's about 45 minutes from central Kampala but absolutely worth the drive.</p>

      <p>The gardens offer everything from dense forest vibes to open, airy spaces by the lake. The natural canopy creates beautiful dappled light, and the well-maintained grounds mean clean backgrounds without urban clutter. Perfect for romantic shoots, bohemian fashion, or peaceful lifestyle content.</p>

      <h2>4. Acacia Mall and Modern Kampala</h2>
      <p>For contemporary, urban fashion shoots, the modern areas around Acacia Mall and surrounding Kisementi neighborhood offer clean, modern architecture and great natural light. The glass facades, geometric patterns, and urban sophistication create a perfect backdrop for high-fashion editorial work.</p>

      <p>I typically shoot here mid-morning or late afternoon. The buildings provide interesting shadow play, and the area is generally quiet enough to work without too many interruptions. The mix of indoor-outdoor spaces also gives flexibility if weather becomes an issue.</p>

      <h2>5. Makindye - Old Kampala Neighborhoods</h2>
      <p>For authentic, colorful, character-filled backgrounds, the neighborhoods in Makindye and surrounding areas are incredible. The painted buildings, texture-rich walls, and genuine street life create dynamic, story-filled images that feel real and lived-in.</p>

      <p>These locations work especially well for urban streetwear, casual fashion, and documentary-style lifestyle shoots. The key is finding those colorful walls and interesting doorways that add character without overwhelming the subject.</p>

      <h2>Tips for Shooting in Kampala</h2>
      <p><strong>Timing is everything:</strong> Golden hour (6-7 AM and 6-7 PM) provides the most beautiful light. Midday sun can be harsh, so scout locations with natural shade.</p>

      <p><strong>Permits and permission:</strong> Always ask permission when shooting on private property or in markets. Being respectful goes a long way.</p>

      <p><strong>Weather considerations:</strong> Kampala's weather can be unpredictable. Always have a backup indoor location or rain plan.</p>

      <p><strong>Safety first:</strong> Some areas are better for photography than others. Know your locations, go with a team when possible, and keep your gear secure.</p>

      <h2>Creating Your Own Spots</h2>
      <p>While these are my favorites, I encourage you to explore and find your own signature locations. Kampala is constantly evolving, with new buildings, renovated areas, and hidden gems appearing all the time. Some of my best shoots have happened in unexpected locations that I discovered while just driving around the city.</p>

      <p>The key is to see potential everywhere. That colorful wall you pass every day could be the perfect backdrop. That quiet street with beautiful morning light could become your go-to spot. Train your eye to see photography opportunities everywhere, and Kampala will never disappoint.</p>
    `,
  },
};

// Demo function to get blog post
async function getBlogPost(slug: string) {
  return blogPosts[slug] || blogPosts['my-journey-into-photography'];
}

// Get related posts
function getRelatedPosts(currentSlug: string) {
  return Object.values(blogPosts)
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3);
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  return {
    title: `${post.title} | Paira Art.6 Blog`,
    description: post.body.substring(0, 160).replace(/<[^>]*>/g, ''),
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  const relatedPosts = getRelatedPosts(params.slug);

  return (
    <main>
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.mainImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 w-full pb-16">
          <div className="container-luxury">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </Link>

            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1 bg-white/90 backdrop-blur-sm text-charcoal-800 text-xs font-light rounded-full mb-6">
                {post.category}
              </span>

              <div className="flex items-center gap-4 mb-6 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            
            {/* Article Body */}
            <article 
              className="prose prose-lg max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            {/* Share Section */}
            <div className="border-t border-b border-charcoal-200 py-8 mb-12">
              <div className="flex items-center justify-between">
                <p className="text-charcoal-600 font-light">Share this article</p>
                <button className="flex items-center gap-2 text-pumpkin-500 hover:text-pumpkin-600 transition-colors duration-300">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-light">Share</span>
                </button>
              </div>
            </div>

            {/* Author Card */}
            <div className="border-t border-charcoal-200 pt-12">
              <p className="luxury-text mb-6">WRITTEN BY</p>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-charcoal-200">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-2">{post.author.name}</h3>
                  <p className="text-charcoal-600 leading-relaxed mb-4">
                    {post.author.bio}
                  </p>
                  <Link 
                    href="/about" 
                    className="text-pumpkin-500 hover:text-pumpkin-600 transition-colors duration-300 text-sm font-light inline-flex items-center gap-2 group"
                  >
                    Learn More About Me
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-cream-50">
        <div className="container-luxury">
          <h2 className="font-serif text-3xl mb-12 text-center">More Stories from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${relatedPost.mainImage})` }}
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal-800 text-xs font-light rounded-full">
                      {relatedPost.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-charcoal-500">
                      <Clock className="w-3 h-3" />
                      {relatedPost.readTime}
                    </div>
                    <h3 className="font-serif text-xl mb-2 group-hover:text-pumpkin-500 transition-colors duration-300">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-pumpkin-500 text-sm font-light">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Add custom styles */}
      <style jsx global>{`
        .prose {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
        }

        .prose h2 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 500;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #111827;
          line-height: 1.3;
        }

        .prose h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 500;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .prose p {
          margin-bottom: 1.5rem;
        }

        .prose strong {
          color: #111827;
          font-weight: 600;
        }

        .prose a {
          color: #f97316;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .prose a:hover {
          color: #ea580c;
        }
      `}</style>

    </main>
  );
}