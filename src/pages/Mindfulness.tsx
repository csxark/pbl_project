import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { LotusIcon, OmIcon } from "@/components/icons/SacredIcons";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Wind,
  Moon,
  Sun,
  Heart,
  Timer,
  Headphones,
} from "lucide-react";

interface MeditationSession {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  icon: typeof Moon;
}

const sessions: MeditationSession[] = [
  {
    id: "1",
    title: "Morning Awakening",
    duration: "10 min",
    category: "Morning",
    description: "Start your day with clarity and intention",
    icon: Sun,
  },
  {
    id: "2",
    title: "Pitta Cooling",
    duration: "15 min",
    category: "Dosha Balance",
    description: "Calm fire energy and find inner peace",
    icon: Moon,
  },
  {
    id: "3",
    title: "Heart Opening",
    duration: "20 min",
    category: "Chakra",
    description: "Connect with compassion and love",
    icon: Heart,
  },
  {
    id: "4",
    title: "Deep Sleep",
    duration: "30 min",
    category: "Evening",
    description: "Prepare body and mind for restorative sleep",
    icon: Moon,
  },
];

const pranayamaExercises = [
  {
    id: "nadi-shodhana",
    name: "Nadi Shodhana",
    subtitle: "Alternate Nostril Breathing",
    description: "Balances left and right brain hemispheres, calms the mind",
    duration: 5,
    phases: { inhale: 4, hold: 4, exhale: 4 },
    benefit: "Reduces anxiety, improves focus",
  },
  {
    id: "sheetali",
    name: "Sheetali",
    subtitle: "Cooling Breath",
    description: "Perfect for Pitta types - cools the body and mind",
    duration: 5,
    phases: { inhale: 4, hold: 2, exhale: 6 },
    benefit: "Reduces body heat, calms anger",
  },
  {
    id: "bhramari",
    name: "Bhramari",
    subtitle: "Humming Bee Breath",
    description: "Creates vibrations that calm the nervous system",
    duration: 5,
    phases: { inhale: 4, hold: 0, exhale: 8 },
    benefit: "Relieves tension, improves sleep",
  },
];

const Mindfulness = () => {
  const [selectedPranayama, setSelectedPranayama] = useState(pranayamaExercises[0]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [phaseTime, setPhaseTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setPhaseTime((prev) => {
          const currentMax = selectedPranayama.phases[currentPhase];

          if (prev >= currentMax) {
            // Move to next phase
            if (currentPhase === "inhale") {
              setCurrentPhase(selectedPranayama.phases.hold > 0 ? "hold" : "exhale");
            } else if (currentPhase === "hold") {
              setCurrentPhase("exhale");
            } else {
              setCurrentPhase("inhale");
              setCycles((c) => c + 1);
            }
            return 0;
          }

          return prev + 1;
        });

        setTotalTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, currentPhase, selectedPranayama]);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setCurrentPhase("inhale");
    setPhaseTime(0);
    setTotalTime(0);
    setCycles(0);
  };

  const breatheCircleScale = () => {
    if (currentPhase === "inhale") {
      return 1 + (phaseTime / selectedPranayama.phases.inhale) * 0.3;
    } else if (currentPhase === "exhale") {
      return 1.3 - (phaseTime / selectedPranayama.phases.exhale) * 0.3;
    }
    return 1.3;
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <LotusIcon className="w-16 h-16 text-saffron mx-auto mb-4" />
            <h1 className="font-display text-3xl md:text-4xl text-forest mb-2">
              Mindfulness Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Cultivate inner peace through meditation and breathwork
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Pranayama Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Wind className="w-6 h-6 text-forest" />
                <h2 className="font-display text-2xl text-forest">Pranayama Timer</h2>
              </div>

              {/* Breathing Circle */}
              <div className="glass-card rounded-3xl p-8 mb-6">
                <div className="relative w-64 h-64 mx-auto mb-8">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-forest/20" />

                  {/* Animated breathing circle */}
                  <motion.div
                    className="absolute inset-8 rounded-full bg-gradient-to-br from-forest to-forest-light flex items-center justify-center"
                    animate={{
                      scale: isTimerRunning ? breatheCircleScale() : 1,
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <div className="text-center text-cream">
                      <OmIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <div className="text-3xl font-display capitalize">
                        {isTimerRunning ? currentPhase : "Ready"}
                      </div>
                      {isTimerRunning && (
                        <div className="text-5xl font-display mt-2">
                          {selectedPranayama.phases[currentPhase] - phaseTime}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-display text-forest">{cycles}</div>
                    <div className="text-sm text-muted-foreground">Cycles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-display text-forest">
                      {Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Time</div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    variant={isTimerRunning ? "saffron" : "forest"}
                    size="lg"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="gap-2"
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-5 h-5" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" /> Start
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" size="lg" onClick={resetTimer}>
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Pranayama Selection */}
              <div className="space-y-3">
                {pranayamaExercises.map((exercise) => (
                  <motion.button
                    key={exercise.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => {
                      setSelectedPranayama(exercise);
                      resetTimer();
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedPranayama.id === exercise.id
                        ? "bg-forest text-cream"
                        : "bg-cream-dark hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{exercise.name}</h3>
                        <p className={`text-sm ${selectedPranayama.id === exercise.id ? "text-cream/70" : "text-muted-foreground"}`}>
                          {exercise.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="w-4 h-4" />
                        {exercise.phases.inhale}-{exercise.phases.hold}-{exercise.phases.exhale}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Meditation Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Headphones className="w-6 h-6 text-gold" />
                <h2 className="font-display text-2xl text-forest">Guided Sessions</h2>
              </div>

              <div className="space-y-4">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass-card rounded-2xl p-6 hover:shadow-medium transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-saffron to-gold flex items-center justify-center">
                        <session.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg text-forest">
                            {session.title}
                          </h3>
                          <span className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
                            {session.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {session.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {session.duration}
                        </span>
                        <Button variant="saffron" size="icon" className="rounded-full">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Daily Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 neomorphic p-8 text-center"
              >
                <OmIcon className="w-10 h-10 text-gold/50 mx-auto mb-4" />
                <p className="font-display text-xl text-forest italic leading-relaxed">
                  "Yoga is the journey of the self, through the self, to the self."
                </p>
                <p className="text-muted-foreground mt-4">— The Bhagavad Gita</p>
              </motion.div>

              {/* Sound Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Volume2 className="w-5 h-5 text-forest" />
                  <h3 className="font-display text-lg text-forest">Ambient Sounds</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Temple Bells", "Rain", "Ocean", "Forest", "Singing Bowl", "Wind Chimes"].map(
                    (sound) => (
                      <button
                        key={sound}
                        className="px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-saffron hover:text-white transition-colors text-sm"
                      >
                        {sound}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mindfulness;
