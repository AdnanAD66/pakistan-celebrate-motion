import { useEffect } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { Footer } from '@/components/sections/Footer';
import { ParticleEffect, ConfettiEffect } from '@/components/effects/ParticleEffect';

const Index = () => {
  useEffect(() => {
    console.log('Index component mounted');
    // Set page title and meta for SEO
    document.title = "Pakistan Independence Day 2024 - Celebrating 77 Years of Freedom";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Celebrate Pakistan Independence Day 2024 with stunning 3D animations, fireworks, and interactive experiences. Join us in commemorating 77 years of freedom, unity, and progress.');
    }
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* Background effects */}
      <ParticleEffect />
      <ConfettiEffect />
      
      {/* Hero section with 3D elements */}
      <HeroSection />
      
      {/* Statistics section */}
      <StatsSection />
      
      {/* Timeline section */}
      <TimelineSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
