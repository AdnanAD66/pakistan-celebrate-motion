import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "1947",
    title: "Birth of Pakistan",
    description: "Pakistan gained independence from British rule on August 14, 1947",
    color: "border-primary"
  },
  {
    year: "1956",
    title: "First Constitution",
    description: "Pakistan adopted its first constitution and became an Islamic Republic",
    color: "border-gold"
  },
  {
    year: "1973",
    title: "New Constitution",
    description: "The current constitution was adopted, strengthening democratic institutions",
    color: "border-secondary"
  },
  {
    year: "1998",
    title: "Nuclear Power",
    description: "Pakistan became a nuclear power, ensuring regional security",
    color: "border-primary-glow"
  },
  {
    year: "2024",
    title: "Digital Pakistan",
    description: "Leading technological advancement and digital transformation",
    color: "border-gold-bright"
  }
];

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (isInView && timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      
      gsap.fromTo(items,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-muted to-background relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 celebration-text">
            Journey Through Time
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Milestones that shaped our nation's remarkable journey
          </p>
        </motion.div>

        <div ref={timelineRef} className="max-w-4xl mx-auto">
          {timelineEvents.map((event, index) => (
            <div key={index} className={`timeline-item relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-pakistan transform -translate-x-1/2 hidden lg:block" />
              
              {/* Year circle */}
              <div className="absolute left-1/2 top-8 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center text-sm font-bold text-accent-foreground transform -translate-x-1/2 z-10 shadow-glow-gold border-4 border-background hidden lg:flex">
                {event.year}
              </div>

              {/* Content */}
              <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                <motion.div 
                  className={`bg-card/80 backdrop-blur-sm border-l-4 ${event.color} rounded-lg p-6 shadow-pakistan hover:shadow-glow-green transition-all duration-300`}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4 lg:hidden">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {event.year}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{event.title}</h3>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3 hidden lg:block">{event.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};