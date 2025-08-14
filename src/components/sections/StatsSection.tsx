import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

const stats = [
  {
    number: "77",
    label: "Years of Independence",
    suffix: "+",
    color: "text-primary"
  },
  {
    number: "230",
    label: "Million People",
    suffix: "M+",
    color: "text-gold"
  },
  {
    number: "881",
    label: "Thousand sq km",
    suffix: "K",
    color: "text-secondary"
  },
  {
    number: "5000",
    label: "Years of History",
    suffix: "+",
    color: "text-primary-glow"
  }
];

export const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      stats.forEach((_, index) => {
        gsap.fromTo(`#stat-${index}`,
          { scale: 0, rotation: -180 },
          { 
            scale: 1, 
            rotation: 0, 
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)"
          }
        );
      });
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-muted relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-pakistan rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-gold rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-celebration rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 celebration-text">
            Pakistan in Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the remarkable journey of our nation through these inspiring statistics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              id={`stat-${index}`}
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center relative overflow-hidden group hover:shadow-glow-green transition-all duration-500">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-pakistan opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />
                
                <div className={`text-5xl md:text-6xl font-bold mb-4 ${stat.color} relative z-10`}>
                  {stat.number}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                
                <div className="text-lg font-medium text-foreground/80 relative z-10">
                  {stat.label}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gold rounded-full animate-pulse" />
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary rounded-full animate-sparkle" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};