// app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity';

export const metadata = {
  title: 'Blog | Paira Art.6',
  description: 'Photography tips, behind-the-scenes stories, and creative insights from Paira Art.6',
};

export const revalidate = 60;

async function getBlogPosts() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    publishedAt,
    readTime,
    featured,
    author
  }`;
  return client.fetch(query);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPost = posts.find((post: any) => post.featured) || posts[0];
  const regularPosts = posts.filter((post: any) => post._id !== featuredPost?._id);

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
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug.current}`}
              className="block mb-20 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-charcoal-100">
                  {featuredPost.mainImage ? (
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${urlFor(featuredPost.mainImage).width(800).quality(80).url()})` 
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal-400">
                      <p>No image</p>
                    </div>
                  )}
                </div>
                <div>
                  <span className="inline-block px-4 py-1 bg-pumpkin-100 text-pumpkin-600 text-xs font-light rounded-full mb-4">
                    {featuredPost.category || 'Uncategorized'}
                  </span>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-charcoal-500">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime || '5 min read'}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-4xl md:text-5xl mb-6 group-hover:text-pumpkin-500 transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="text-charcoal-600 leading-relaxed text-lg mb-6">
                    {featuredPost.excerpt}
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
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post: any, index: number) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group"
                  style={{
                    animation: `slide-up 0.6s ease-out ${index * 0.1}s backwards`,
                  }}
                >
                  <article className="card-luxury overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden relative bg-charcoal-100">
                      {post.mainImage ? (
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ 
                            backgroundImage: `url(${urlFor(post.mainImage).width(800).quality(80).url()})` 
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-charcoal-400">
                          <p className="text-sm">No image</p>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal-800 text-xs font-light rounded-full">
                        {post.category || 'Uncategorized'}
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
                          {post.readTime || '5 min read'}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl mb-3 group-hover:text-pumpkin-500 transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-charcoal-600 text-sm leading-relaxed mb-4 flex-grow">
                        {post.excerpt || 'No excerpt available'}
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
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No blog posts yet. Create your first post in Sanity Studio!
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}