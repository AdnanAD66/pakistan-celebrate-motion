import { motion } from 'framer-motion';
import { CelebrationButton } from '../ui/celebration-button';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-primary/20 to-background border-t border-primary/20 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-pakistan rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-gold rounded-full blur-2xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 celebration-text">
              Pakistan Paindabad!
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Together we build a stronger, more prosperous Pakistan for future generations.
              <br />
              <span className="text-gold font-semibold">Unity, Work, Progress</span>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CelebrationButton variant="ghost" size="lg">
              Learn More About Pakistan
            </CelebrationButton>
            <CelebrationButton variant="celebration" size="lg">
              Share Your Wishes
            </CelebrationButton>
          </motion.div>

          <motion.div
            className="flex justify-center items-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-gradient-flag rounded-sm border border-primary/20" />
              <span>Made with 💚 for Pakistan</span>
            </div>
          </motion.div>

          {/* Decorative stars */}
          <div className="absolute top-8 left-8 text-gold animate-sparkle">⭐</div>
          <div className="absolute top-16 right-12 text-secondary animate-sparkle" style={{ animationDelay: '1s' }}>✨</div>
          <div className="absolute bottom-8 left-16 text-primary animate-sparkle" style={{ animationDelay: '2s' }}>🌟</div>
          <div className="absolute bottom-12 right-8 text-gold animate-sparkle" style={{ animationDelay: '1.5s' }}>⭐</div>
        </div>
      </div>
    </footer>
  );
};