import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Scene3D } from '../3d/Scene3D';
import { CelebrationButton } from '../ui/celebration-button';

export const HeroSection = () => {
  console.log('HeroSection rendering');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('HeroSection useEffect running');
    try {
      const tl = gsap.timeline();

      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(dateRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.5"
      );
    } catch (error) {
      console.error('Error in HeroSection animation:', error);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          ref={dateRef}
          className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-3 h-3 bg-gradient-gold rounded-full animate-pulse" />
          <span className="text-gold font-semibold tracking-wider">14 AUGUST 1947</span>
          <div className="w-3 h-3 bg-gradient-pakistan rounded-full animate-pulse" />
        </motion.div>

        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 celebration-text leading-tight"
          style={{
            textShadow: '0 0 30px rgba(69, 214, 42, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)'
          }}
        >
          PAKISTAN
          <br />
          <span className="text-4xl md:text-6xl lg:text-7xl">ZINDABAD</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-secondary mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          Celebrating <span className="text-gold font-semibold">78 years</span> of 
          <br className="hidden md:block" /> 
          <span className="celebration-text font-bold"> Freedom, Unity & Progress</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <CelebrationButton variant="pakistan" size="xl" className="flag-wave">
            Join the Celebration
          </CelebrationButton>
          
          <CelebrationButton variant="gold" size="xl" className="animate-float">
            Pakistan's History
          </CelebrationButton>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 md:left-20">
          <div className="w-16 h-16 bg-gradient-pakistan rounded-full opacity-60 animate-float" 
               style={{ animationDelay: '0s' }} />
        </div>
        
        <div className="absolute top-40 right-10 md:right-20">
          <div className="w-12 h-12 bg-gradient-gold rounded-full opacity-70 animate-float" 
               style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="absolute bottom-20 left-1/4">
          <div className="w-8 h-8 bg-secondary rounded-full opacity-50 animate-sparkle" />
        </div>
        
        <div className="absolute bottom-32 right-1/4">
          <div className="w-20 h-20 bg-gradient-celebration rounded-full opacity-30 animate-float" 
               style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};