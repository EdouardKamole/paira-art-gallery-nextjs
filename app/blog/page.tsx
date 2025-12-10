// FILE: app/blog/page.tsx
// Create folder: app/blog/
// Create file: app/blog/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

export const metadata = {
  title: 'Blog | Paira Art.6',
  description: 'Photography tips, behind-the-scenes stories, and creative insights from Paira Art.6',
};

export default async function BlogPage() {
  // TODO: Fetch from Sanity
  // const posts = await sanityFetch(allBlogPostsQuery);

  // Demo blog posts with full content
  const posts = [
    {
      _id: '1',
      slug: 'my-journey-into-photography',
      title: 'My Journey Into Photography',
      excerpt: 'How I discovered my passion for capturing moments and turning them into stories. From humble beginnings to professional work in Kampala.',
      mainImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
      publishedAt: '2024-01-15',
      readTime: '8 min read',
      category: 'Personal Story',
      author: { 
        name: 'Paira Art.6',
        bio: 'Ugandan photographer and cinematographer based in Kampala'
      },
    },
    {
      _id: '2',
      slug: 'why-i-love-35mm-lens',
      title: 'Why the 35mm Lens is My Signature Choice',
      excerpt: "The 35mm lens has become my signature tool. Here's why it's perfect for fashion and lifestyle photography, and how it creates that natural, real-life feel.",
      mainImage: 'https://images.unsplash.com/photo-1606166419283-d00f1aa47c8c?w=800&q=80',
      publishedAt: '2024-01-10',
      readTime: '6 min read',
      category: 'Photography Tips',
      author: { 
        name: 'Paira Art.6',
        bio: 'Ugandan photographer and cinematographer based in Kampala'
      },
    },
    {
      _id: '3',
      slug: 'shooting-in-kampala',
      title: 'Shooting in Kampala: My Favorite Locations',
      excerpt: 'Kampala offers incredible backdrops for photography. Discover my top 5 favorite spots for photoshoots and why they work so well.',
      mainImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
      publishedAt: '2024-01-05',
      readTime: '7 min read',
      category: 'Behind The Scenes',
      author: { 
        name: 'Paira Art.6',
        bio: 'Ugandan photographer and cinematographer based in Kampala'
      },
    },
    {
      _id: '4',
      slug: 'mastering-natural-light',
      title: 'Mastering Natural Light Photography',
      excerpt: 'Natural light can make or break a photo. Learn how I use golden hour, shadows, and ambient light to create dramatic, emotional images.',
      mainImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      publishedAt: '2023-12-20',
      readTime: '10 min read',
      category: 'Photography Tips',
      author: { 
        name: 'Paira Art.6',
        bio: 'Ugandan photographer and cinematographer based in Kampala'
      },
    },
    {
      _id: '5',
      slug: 'behind-the-scenes-fashion-shoot',
      title: 'Behind the Scenes: Fashion Editorial Shoot',
      excerpt: 'A look behind the camera at a recent fashion editorial shoot. The planning, team coordination, execution, and final results.',
      mainImage: 'https://images.unsplash.com/photo-1490725263030-1f0521cec8ec?w=800&q=80',
      publishedAt: '2023-12-15',
      readTime: '9 min read',
      category: 'Behind The Scenes',
      author: { 
        name: 'Paira Art.6',
        bio: 'Ugandan photographer and cinematographer based in Kampala'
      },
    },
    {
      _id: '6',
      slug: 'color-grading-secrets',
      title: 'My Color Grading Secrets Revealed',
      excerpt: 'The complete post-processing workflow I use to achieve soft tones, clean composition, and that signature look in my photography.',
      mainImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      publishedAt: '2023-12-10',
      readTime: '12 min read',
      category: 'Photography Tips',
      author: { 
        name: 'Paira Art.6',
        bio: 'Ugandan photographer and cinematographer based in Kampala'
      },
    },
  ];

  return (
    <main>
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pumpkin-50 to-cream-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-pumpkin-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pumpkin-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="luxury-text mb-6 animate-fade-in">
            Stories & Insights
          </p>
          <h1 className="hero-title mb-8 animate-slide-up">
            Blog
          </h1>
          <p className="subtitle animate-fade-in-slow max-w-2xl mx-auto">
            Photography tips, creative insights, and behind-the-scenes stories from my journey
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-32 bg-white">
        <div className="container-luxury">
          
          {/* Featured Post */}
          {posts[0] && (
            <Link
              href={`/blog/${posts[0].slug}`}
              className="block mb-20 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${posts[0].mainImage})` }}
                  />
                </div>
                <div>
                  <span className="inline-block px-4 py-1 bg-pumpkin-100 text-pumpkin-600 text-xs font-light rounded-full mb-4">
                    {posts[0].category}
                  </span>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-charcoal-500">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(posts[0].publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {posts[0].readTime}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-4xl md:text-5xl mb-6 group-hover:text-pumpkin-500 transition-colors duration-300">
                    {posts[0].title}
                  </h2>
                  <p className="text-charcoal-600 leading-relaxed text-lg mb-6">
                    {posts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-pumpkin-500 font-light">
                    Read Full Story
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group"
                style={{
                  animation: `slide-up 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                <article className="card-luxury overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${post.mainImage})` }}
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal-800 text-xs font-light rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-3 text-xs text-charcoal-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl mb-3 group-hover:text-pumpkin-500 transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-charcoal-600 text-sm leading-relaxed mb-4 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-pumpkin-500 text-sm font-light">
                      Read More
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}