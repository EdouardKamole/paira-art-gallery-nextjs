// FILE: app/film/page.tsx
// Create folder: app/film/
// Create file: app/film/page.tsx

'use client';

import { useState } from 'react';
import CategoryHero from '@/components/gallery/CategoryHero';
import { Play, X } from 'lucide-react';

export default function FilmPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Demo videos - Replace with Sanity CMS data
  const videos = [
    {
      _id: '1',
      title: 'Fashion Film 2024',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      description: 'A cinematic journey through modern fashion',
      duration: '2:45',
    },
    {
      _id: '2',
      title: 'Kampala Stories',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Documentary capturing life in Kampala',
      duration: '5:20',
    },
    {
      _id: '3',
      title: 'Brand Commercial',
      thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'High-end brand commercial production',
      duration: '1:30',
    },
    {
      _id: '4',
      title: 'Portrait Series',
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Moving portraits in motion',
      duration: '3:15',
    },
    {
      _id: '5',
      title: 'Event Highlights',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Fashion event coverage and highlights',
      duration: '4:00',
    },
    {
      _id: '6',
      title: 'Behind the Scenes',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'A look behind the camera',
      duration: '2:30',
    },
  ];

  return (
    <main>
      <CategoryHero
        title="Film"
        description="Visual narratives that move - cinematography and video production"
        backgroundImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80"
      />

      <section className="py-20 bg-white">
        <div className="container-luxury">
          
          {/* Showreel Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <p className="luxury-text mb-4">Featured Work</p>
              <h2 className="section-title mb-6">Showreel 2024</h2>
              <p className="subtitle max-w-2xl mx-auto">
                A collection of my best cinematography work
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto aspect-video bg-charcoal-900 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video Grid */}
          <div>
            <h3 className="font-serif text-3xl mb-12">All Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <div
                  key={video._id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(video.videoUrl)}
                  style={{
                    animation: `slide-up 0.6s ease-out ${index * 0.1}s backwards`,
                  }}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${video.thumbnail})` }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-pumpkin-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p className="text-white text-xs font-light">{video.duration}</p>
                    </div>
                  </div>

                  {/* Video Info */}
                  <h4 className="font-serif text-xl mb-2 group-hover:text-pumpkin-500 transition-colors duration-300">
                    {video.title}
                  </h4>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    {video.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
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