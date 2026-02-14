import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { SymptomChecker } from "@/components/symptom-checker/SymptomChecker";
import { LotusIcon, MandalaIcon } from "@/components/icons/SacredIcons";

export default function SymptomCheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-background to-cream-100 dark:from-background dark:via-background dark:to-forest-950/20">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <MandalaIcon className="absolute -top-40 -right-40 w-80 h-80 text-sacred-gold/5 animate-spin-slow" />
        <MandalaIcon className="absolute -bottom-40 -left-40 w-80 h-80 text-forest-500/5 animate-spin-slow" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sacred-saffron to-sacred-gold mb-4">
              <LotusIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-3">
              AI Symptom Checker
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Receive personalized Ayurvedic recommendations based on your unique 
              constitution and symptoms, guided by ancient wisdom.
            </p>
          </motion.div>

          {/* Symptom Checker Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SymptomChecker />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid md:grid-cols-3 gap-4"
          >
            <div className="glass-card p-5 rounded-xl text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-semibold text-sm">V</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Vata</h3>
              <p className="text-xs text-muted-foreground">
                Air & Space elements. Governs movement, creativity, and communication.
              </p>
            </div>
            <div className="glass-card p-5 rounded-xl text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-semibold text-sm">P</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Pitta</h3>
              <p className="text-xs text-muted-foreground">
                Fire & Water elements. Governs digestion, metabolism, and intellect.
              </p>
            </div>
            <div className="glass-card p-5 rounded-xl text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-semibold text-sm">K</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Kapha</h3>
              <p className="text-xs text-muted-foreground">
                Earth & Water elements. Governs structure, stability, and immunity.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
