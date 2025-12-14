import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera, Award, Users } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export const metadata = {
  title: 'About Paira Art.6 | Ugandan Photographer',
  description: 'Learn about Paira Art.6 (Muwulya Peter), award-winning Ugandan photographer and cinematographer from Kampala',
};

export const revalidate = 60;

// Default story content
const defaultStoryParagraphs = [
  "Paira Art.6 (Muwulya Peter) is a Ugandan Photographer and Cinematographer whose love for art started in childhood. Born and raised in Kampala, he grew up in a humble home that shaped his passion, discipline, and creative vision.",
  "He began photography at 19 during his high school vacation, starting with a Nikon before transitioning to Sony, falling in love with its color, quality, and creative freedom. Although he enjoys trying out different brands, he is best known for using the 35mm lens, which gives his fashion and lifestyle images a natural, real-life feel with a touch of drama.",
  "Paira's work is built on soft tones, clean composition, and a simple, modern look. His images always carry emotion and tell a story. He is calm, easy to work with, and focuses on making clients feel comfortable. From planning to final delivery, working professionally and with care."
];

const defaultProfessionalStory = [
  "He has worked with designers, fashion brands, influencers, and creative teams across Kampala creating visuals that help them stand out and connect with their audiences. Clients choose Paira for his consistency, attention to detail, and ability to turn real moments into powerful visual stories.",
  "Whether it's fashion, lifestyle, events, or film, he brings simplicity, feeling, and intention to every project. His vision is to inspire people and tell stories that bring communities together through photography and film, one moment, one frame at a time."
];

// Custom PortableText components
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-6">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mb-3">{children}</h3>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-pumpkin-500 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

async function getAboutData() {
  const query = `*[_type == "about"][0]{
    profileImage,
    name,
    title,
    bio,
    professionalStory,
    stats,
    clients,
    equipment
  }`;
  
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}

async function getBanner() {
  const query = `*[_type == "pageBanner" && page == "about" && isActive == true][0]{
    title, description, backgroundImage
  }`;
  
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData();
  const banner = await getBanner();

  const stats = [
    { 
      icon: Camera, 
      value: aboutData?.stats?.experience || '5+', 
      label: 'Years Experience' 
    },
    { 
      icon: Award, 
      value: aboutData?.stats?.projects || '50+', 
      label: 'Projects Completed' 
    },
    { 
      icon: Users, 
      value: aboutData?.stats?.clients || '100+', 
      label: 'Happy Clients' 
    },
  ];

  const clients = aboutData?.clients && aboutData.clients.length > 0 
    ? aboutData.clients 
    : [
        'Fashion Brands',
        'Creative Agencies',
        'Influencers',
        'Design Studios',
        'Event Organizers',
        'Corporate Clients',
      ];

  const equipment = aboutData?.equipment && aboutData.equipment.length > 0
    ? aboutData.equipment
    : [
        { name: 'Sony Camera System', description: 'Primary shooting setup' },
        { name: '35mm Lens', description: 'Signature focal length' },
        { name: 'Professional Lighting', description: 'Studio and portable' },
        { name: 'Cinema Gear', description: 'Video production equipment' },
      ];

  const bannerImage = banner?.backgroundImage 
    ? urlFor(banner.backgroundImage).width(1920).quality(80).url()
    : 'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1920&q=80';

  // Check if bio is valid and has content
  const hasValidBio = aboutData?.bio && Array.isArray(aboutData.bio) && aboutData.bio.length > 0;
  const hasValidProfessionalStory = aboutData?.professionalStory && Array.isArray(aboutData.professionalStory) && aboutData.professionalStory.length > 0;

  return (
    <main>
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="luxury-text text-white/90 mb-6 animate-fade-in">
            {aboutData?.title || 'Ugandan Photographer & Cinematographer'}
          </p>
          <h1 className="hero-title mb-8 animate-slide-up">
            {aboutData?.name || 'Paira Art.6'}
          </h1>
          <p className="subtitle text-white/90 animate-fade-in-slow">
            Muwulya Peter
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Profile Image */}
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
              {aboutData?.profileImage ? (
                <Image
                  src={urlFor(aboutData.profileImage).width(800).quality(80).url()}
                  alt={aboutData?.name || 'Paira Art.6 - Muwulya Peter'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <Image
                  src="/assets/paire-image1.jpg"
                  alt="Paira Art.6 - Muwulya Peter"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
            
            {/* Biography */}
            <div>
              <p className="luxury-text mb-4">My Story</p>
              <h2 className="section-title mb-8">
                A Journey Through<br />Art & Vision
              </h2>
              
              {hasValidBio ? (
                <div className="space-y-6 text-charcoal-600 leading-relaxed text-lg">
                  <PortableText 
                    value={aboutData.bio} 
                    components={portableTextComponents}
                  />
                </div>
              ) : (
                <div className="space-y-6 text-charcoal-600 leading-relaxed text-lg">
                  {defaultStoryParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 card-luxury"
                  style={{
                    animation: `slide-up 0.6s ease-out ${index * 0.2}s backwards`,
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-pumpkin-500/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-pumpkin-500" />
                  </div>
                  <h3 className="font-display text-5xl mb-2">{stat.value}</h3>
                  <p className="luxury-text">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Experience Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="luxury-text mb-4">Professional Work</p>
              <h2 className="section-title mb-8">
                Creating Visual<br />Stories
              </h2>
              
              {hasValidProfessionalStory ? (
                <div className="space-y-6 text-charcoal-600 leading-relaxed text-lg">
                  <PortableText 
                    value={aboutData.professionalStory} 
                    components={portableTextComponents}
                  />
                </div>
              ) : (
                <div className="space-y-6 text-charcoal-600 leading-relaxed text-lg">
                  {defaultProfessionalStory.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>

            <div>
              {/* Clients */}
              <div className="mb-12">
                <h3 className="font-serif text-2xl mb-6">Clients & Collaborations</h3>
                <div className="grid grid-cols-2 gap-4">
                  {clients.map((client: string, index: number) => (
                    <div
                      key={index}
                      className="p-4 border border-charcoal-100 rounded-lg hover:border-pumpkin-500 transition-colors duration-300"
                    >
                      <p className="text-sm text-charcoal-700">{client}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="font-serif text-2xl mb-6">Equipment & Tools</h3>
                <div className="space-y-4">
                  {equipment.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-cream-50 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-pumpkin-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-serif text-lg mb-1">{item.name}</h4>
                        <p className="text-sm text-charcoal-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
            <p className="luxury-text mb-4">Let's Work Together</p>
            <h2 className="section-title mb-8">Ready to Create?</h2>
            <p className="text-xl text-charcoal-600 mb-12 max-w-2xl mx-auto">
              Whether you need portraits, commercial work, or cinematography, let's bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/portraits" className="btn-secondary">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}