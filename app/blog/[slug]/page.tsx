// app/blog/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, ArrowRight, Clock, Share2 } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getBlogPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    content,
    publishedAt,
    readTime,
    author
  }`;
  return client.fetch(query, { slug });
}

async function getRelatedPosts(currentSlug: string, category: string) {
  const query = `*[_type == "blog" && slug.current != $currentSlug && category == $category][0...3]{
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    readTime
  }`;
  return client.fetch(query, { currentSlug, category });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Paira Art.6 Blog`,
    description: post.excerpt,
  };
}

// Custom components for PortableText rendering
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value || !value.asset) {
        return null;
      }
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).width(1200).quality(80).url()}
            alt={value.alt || 'Blog image'}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-charcoal-500 text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-3xl md:text-4xl font-medium mt-12 mb-6 text-charcoal-900 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-2xl md:text-3xl font-medium mt-8 mb-4 text-charcoal-900">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-lg leading-relaxed mb-6 text-charcoal-700">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-pumpkin-500 pl-6 my-8 italic text-xl text-charcoal-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-charcoal-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => {
      const href = value?.href || '#';
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pumpkin-500 hover:text-pumpkin-600 underline transition-colors duration-300"
        >
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, post.category);

  return (
    <main>
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        {post.mainImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${urlFor(post.mainImage).width(1920).quality(80).url()})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-pumpkin-500 to-pumpkin-600">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          </div>
        )}

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
                {post.category || 'Uncategorized'}
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
                  {post.readTime || '5 min read'}
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
            <article className="prose prose-lg max-w-none mb-16">
              {post.content ? (
                <PortableText 
                  value={post.content} 
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-charcoal-600">No content available for this post.</p>
              )}
            </article>

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
            {post.author && (
              <div className="border-t border-charcoal-200 pt-12">
                <p className="luxury-text mb-6">WRITTEN BY</p>
                <div className="flex items-start gap-6">
                  {post.author.image && (
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-charcoal-200">
                      <Image
                        src={urlFor(post.author.image).width(96).height(96).quality(80).url()}
                        alt={post.author.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-2xl mb-2">{post.author.name}</h3>
                    {post.author.bio && (
                      <p className="text-charcoal-600 leading-relaxed mb-4">
                        {post.author.bio}
                      </p>
                    )}
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
            )}

          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-cream-50">
          <div className="container-luxury">
            <h2 className="font-serif text-3xl mb-12 text-center">More Stories from the Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug.current}`}
                  className="group"
                >
                  <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden relative bg-charcoal-100">
                      {relatedPost.mainImage ? (
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ 
                            backgroundImage: `url(${urlFor(relatedPost.mainImage).width(800).quality(80).url()})` 
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-charcoal-400">
                          <p className="text-sm">No image</p>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal-800 text-xs font-light rounded-full">
                        {relatedPost.category || 'Uncategorized'}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 text-xs text-charcoal-500">
                        <Clock className="w-3 h-3" />
                        {relatedPost.readTime || '5 min read'}
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
      )}

    </main>
  );
}