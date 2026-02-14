import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LotusIcon, MandalaIcon } from "@/components/icons/SacredIcons";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Floating Mandala Decorations */}
      <motion.div 
        className="absolute top-20 left-10 text-gold/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <MandalaIcon className="w-32 h-32 md:w-48 md:h-48" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-10 text-saffron/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <MandalaIcon className="w-24 h-24 md:w-40 md:h-40" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Lotus Icon */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <LotusIcon className="w-16 h-16 md:w-20 md:h-20 text-saffron" />
              <motion.div 
                className="absolute inset-0 bg-saffron/30 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-saffron-light text-lg md:text-xl tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Ancient Wisdom, Modern Wellness
          </motion.p>

          {/* Main Title */}
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl text-cream mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            VedicWell
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Discover your unique constitution and embark on a personalized journey 
            to balance, vitality, and inner peace through the timeless wisdom of Ayurveda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/assessment">
              <Button variant="hero" size="xl" className="min-w-[200px]">
                Discover Your Dosha
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="glass" size="xl" className="min-w-[200px] text-cream border-cream/30">
                Explore Wellness
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-cream/40 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-cream rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
