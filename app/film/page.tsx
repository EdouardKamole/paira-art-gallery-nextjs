// FILE: app/film/page.tsx
'use client';

import { useState, useEffect } from 'react';
import CategoryHero from '@/components/gallery/CategoryHero';
import { Play, X } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity';

interface Video {
  _id: string;
  title: string;
  description?: string;
  thumbnail: any;
  videoType: 'youtube' | 'vimeo' | 'file';
  youtubeUrl?: string;
  vimeoUrl?: string;
  videoFile?: any;
  duration?: string;
  isShowreel: boolean;
  order: number;
}

interface PageBanner {
  title: string;
  description: string;
  backgroundImage: any;
}

export default function FilmPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [showreel, setShowreel] = useState<Video | null>(null);
  const [banner, setBanner] = useState<PageBanner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch banner
        const bannerQuery = `*[_type == "pageBanner" && page == "film" && isActive == true][0]{
          title, description, backgroundImage
        }`;
        const bannerData = await client.fetch(bannerQuery);
        setBanner(bannerData);

        // Fetch videos
        const videosQuery = `*[_type == "film"] | order(order asc){
          _id, title, description, thumbnail, videoType, 
          youtubeUrl, vimeoUrl, videoFile, duration, isShowreel, order
        }`;
        const videosData = await client.fetch(videosQuery);
        
        const showreelVideo = videosData.find((v: Video) => v.isShowreel);
        const regularVideos = videosData.filter((v: Video) => !v.isShowreel);
        
        setShowreel(showreelVideo);
        setVideos(regularVideos);
      } catch (error) {
        console.error('Error fetching film data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getEmbedUrl = (video: Video): string => {
    if (video.videoType === 'youtube' && video.youtubeUrl) {
      const videoId = video.youtubeUrl.split('v=')[1]?.split('&')[0] || 
                      video.youtubeUrl.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (video.videoType === 'vimeo' && video.vimeoUrl) {
      const videoId = video.vimeoUrl.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    if (video.videoType === 'file' && video.videoFile) {
      return video.videoFile.asset.url;
    }
    return '';
  };

  // Helper function to safely get thumbnail URL
  const getThumbnailUrl = (thumbnail: any): string => {
    if (!thumbnail) {
      return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80'; // Fallback image
    }
    try {
      return urlFor(thumbnail).width(800).quality(80).url();
    } catch (error) {
      console.error('Error generating thumbnail URL:', error);
      return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80';
    }
  };

  const bannerTitle = banner?.title || 'Film';
  const bannerDescription = banner?.description || 'Visual narratives that move - cinematography and video production';
  const bannerImage = banner?.backgroundImage 
    ? urlFor(banner.backgroundImage).width(1920).quality(80).url()
    : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80';

  if (loading) {
    return (
      <main>
        <CategoryHero
          title="Film"
          description="Loading..."
          backgroundImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80"
        />
        <section className="py-20 bg-white">
          <div className="container-luxury text-center">
            <p className="text-gray-500">Loading videos...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <CategoryHero
        title={bannerTitle}
        description={bannerDescription}
        backgroundImage={bannerImage}
      />

      <section className="py-20 bg-white">
        <div className="container-luxury">
          
          {/* Showreel Section */}
          {showreel && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <p className="luxury-text mb-4">Featured Work</p>
                <h2 className="section-title mb-6">Showreel 2024</h2>
                <p className="subtitle max-w-2xl mx-auto">
                  {showreel.description || 'A collection of my best cinematography work'}
                </p>
              </div>
              
              <div className="max-w-5xl mx-auto aspect-video bg-charcoal-900 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(showreel)}
                  title="Showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Video Grid */}
          {videos.length > 0 ? (
            <div>
              <h3 className="font-serif text-3xl mb-12">All Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                  <div
                    key={video._id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedVideo(getEmbedUrl(video))}
                    style={{
                      animation: `slide-up 0.6s ease-out ${index * 0.1}s backwards`,
                    }}
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ 
                          backgroundImage: `url(${getThumbnailUrl(video.thumbnail)})` 
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-pumpkin-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      {video.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                          <p className="text-white text-xs font-light">{video.duration}</p>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <h4 className="font-serif text-xl mb-2 group-hover:text-pumpkin-500 transition-colors duration-300">
                      {video.title}
                    </h4>
                    {video.description && (
                      <p className="text-charcoal-600 text-sm leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No videos available yet. Add videos in Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-50"
            aria-label="Close video"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div
            className="w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src={selectedVideo}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}