import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LotusIcon, MandalaIcon } from "@/components/icons/SacredIcons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  category: string;
  options: {
    text: string;
    dosha: "vata" | "pitta" | "kapha";
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    category: "Physical",
    question: "What best describes your body frame?",
    options: [
      { text: "Thin, light, and tall or short with visible joints", dosha: "vata" },
      { text: "Medium build, athletic, well-proportioned", dosha: "pitta" },
      { text: "Larger frame, solid, tends to gain weight easily", dosha: "kapha" },
    ],
  },
  {
    id: 2,
    category: "Physical",
    question: "How would you describe your skin?",
    options: [
      { text: "Dry, thin, cool to touch, prone to roughness", dosha: "vata" },
      { text: "Warm, slightly oily, sensitive, prone to redness", dosha: "pitta" },
      { text: "Thick, soft, cool, smooth, slightly oily", dosha: "kapha" },
    ],
  },
  {
    id: 3,
    category: "Physical",
    question: "What is your typical body temperature preference?",
    options: [
      { text: "Prefer warmth, often feel cold", dosha: "vata" },
      { text: "Prefer cool environments, often feel warm", dosha: "pitta" },
      { text: "Adaptable, but dislike cold and damp weather", dosha: "kapha" },
    ],
  },
  {
    id: 4,
    category: "Digestion",
    question: "How would you describe your appetite?",
    options: [
      { text: "Variable, sometimes strong, sometimes weak", dosha: "vata" },
      { text: "Strong, get irritable if I miss a meal", dosha: "pitta" },
      { text: "Steady but slow, can skip meals easily", dosha: "kapha" },
    ],
  },
  {
    id: 5,
    category: "Digestion",
    question: "What is your digestion like?",
    options: [
      { text: "Irregular, prone to gas and bloating", dosha: "vata" },
      { text: "Fast and strong, occasionally acidic", dosha: "pitta" },
      { text: "Slow and steady, sometimes sluggish", dosha: "kapha" },
    ],
  },
  {
    id: 6,
    category: "Mental",
    question: "How do you typically learn new things?",
    options: [
      { text: "Quick to learn, quick to forget", dosha: "vata" },
      { text: "Sharp focus, good retention", dosha: "pitta" },
      { text: "Slow to learn, but excellent long-term memory", dosha: "kapha" },
    ],
  },
  {
    id: 7,
    category: "Mental",
    question: "Under stress, you tend to become?",
    options: [
      { text: "Anxious, worried, fearful", dosha: "vata" },
      { text: "Irritable, critical, aggressive", dosha: "pitta" },
      { text: "Withdrawn, resistant, stubborn", dosha: "kapha" },
    ],
  },
  {
    id: 8,
    category: "Sleep",
    question: "How would you describe your sleep patterns?",
    options: [
      { text: "Light sleeper, wake up easily, irregular patterns", dosha: "vata" },
      { text: "Moderate, usually 6-8 hours, may have vivid dreams", dosha: "pitta" },
      { text: "Deep, heavy sleeper, hard to wake up", dosha: "kapha" },
    ],
  },
  {
    id: 9,
    category: "Energy",
    question: "How would you describe your energy levels?",
    options: [
      { text: "Bursts of energy followed by fatigue", dosha: "vata" },
      { text: "Moderate but consistent throughout the day", dosha: "pitta" },
      { text: "Steady but takes time to get going", dosha: "kapha" },
    ],
  },
  {
    id: 10,
    category: "Emotional",
    question: "What emotions do you experience most often?",
    options: [
      { text: "Enthusiasm, creativity, but also worry and fear", dosha: "vata" },
      { text: "Passion, determination, but also anger and jealousy", dosha: "pitta" },
      { text: "Calmness, contentment, but also attachment and lethargy", dosha: "kapha" },
    ],
  },
  {
    id: 11,
    category: "Lifestyle",
    question: "How do you handle finances and spending?",
    options: [
      { text: "Impulsive spender, money comes and goes", dosha: "vata" },
      { text: "Spend on quality items, organized with finances", dosha: "pitta" },
      { text: "Good saver, careful with spending", dosha: "kapha" },
    ],
  },
  {
    id: 12,
    category: "Lifestyle",
    question: "What type of activities do you prefer?",
    options: [
      { text: "Creative activities, travel, variety", dosha: "vata" },
      { text: "Competitive sports, intellectual challenges", dosha: "pitta" },
      { text: "Relaxed activities, spending time with loved ones", dosha: "kapha" },
    ],
  },
];

const Assessment = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, "vata" | "pitta" | "kapha">>({});
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAnswer = (dosha: "vata" | "pitta" | "kapha") => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: dosha,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateDosha = () => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(answers).forEach((dosha) => {
      counts[dosha]++;
    });
    return counts;
  };

  const getDominantDosha = () => {
    const counts = calculateDosha();
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0][0] as "vata" | "pitta" | "kapha";
  };

  const handleComplete = async () => {
    setIsSaving(true);
    const counts = calculateDosha();
    const dominantDosha = getDominantDosha();
    const total = 12;

    if (user) {
      try {
        await supabase.from("dosha_assessments").insert({
          user_id: user.id,
          dominant_dosha: dominantDosha,
          vata_score: counts.vata,
          pitta_score: counts.pitta,
          kapha_score: counts.kapha,
          answers: answers,
        });

        await updateProfile({
          dominant_dosha: dominantDosha,
          vata_percentage: Math.round((counts.vata / total) * 100),
          pitta_percentage: Math.round((counts.pitta / total) * 100),
          kapha_percentage: Math.round((counts.kapha / total) * 100),
        });

        toast({
          title: "Assessment saved!",
          description: "Your dosha profile has been updated.",
        });
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    }

    setIsSaving(false);
    setShowResults(true);
  };

  const doshaInfo = {
    vata: {
      name: "Vata",
      element: "Air & Space",
      color: "from-sky-400 to-blue-300",
      textColor: "text-sky-500 dark:text-sky-400",
      description: "You are creative, energetic, and quick-thinking. Your constitution is governed by movement and change.",
      tips: ["Practice grounding routines", "Favor warm, nourishing foods", "Prioritize regular sleep schedule", "Embrace calming practices like yoga"],
    },
    pitta: {
      name: "Pitta",
      element: "Fire & Water",
      color: "from-orange-400 to-amber-300",
      textColor: "text-orange-500 dark:text-orange-400",
      description: "You are focused, ambitious, and a natural leader. Your constitution is driven by transformation and metabolism.",
      tips: ["Stay cool and avoid overheating", "Favor cooling foods and herbs", "Balance work with relaxation", "Practice patience and compassion"],
    },
    kapha: {
      name: "Kapha",
      element: "Earth & Water",
      color: "from-emerald-400 to-green-300",
      textColor: "text-emerald-500 dark:text-emerald-400",
      description: "You are calm, grounded, and nurturing. Your constitution provides stability and strength.",
      tips: ["Stay active and exercise regularly", "Favor light, warm, spicy foods", "Embrace new experiences", "Practice stimulating breathwork"],
    },
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  if (showResults) {
    const dosha = getDominantDosha();
    const info = doshaInfo[dosha];
    const counts = calculateDosha();

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Result Header */}
              <div className="relative inline-block mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <LotusIcon className="w-20 h-20 text-secondary mx-auto mb-4" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                Your Dosha Profile
              </h1>
              <p className="text-muted-foreground text-lg mb-12">
                Based on your answers, here is your Ayurvedic constitution
              </p>

              {/* Main Dosha Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-3xl p-10 mb-12"
              >
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${info.color} mx-auto mb-6 flex items-center justify-center shadow-glow`}>
                  <span className="font-display text-5xl text-white">
                    {info.name[0]}
                  </span>
                </div>

                <h2 className={`font-display text-4xl ${info.textColor} mb-2`}>
                  {info.name} Dominant
                </h2>
                <p className="text-muted-foreground mb-6">
                  {info.element}
                </p>
                <p className="text-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                  {info.description}
                </p>

                {/* Dosha Distribution */}
                <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {Object.entries(counts).map(([d, count]) => (
                    <div key={d} className="text-center">
                      <div className={`text-2xl font-display ${d === dosha ? info.textColor : "text-muted-foreground"}`}>
                        {Math.round((count / 12) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">{d}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-display text-2xl text-foreground mb-6">
                  Personalized Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {info.tips.map((tip, index) => (
                    <div key={index} className="neomorphic p-5 text-left">
                      <span className="text-secondary font-semibold mr-2">✦</span>
                      <span className="text-foreground">{tip}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <Button
                      variant="hero"
                      size="xl"
                      onClick={() => navigate("/dashboard")}
                    >
                      Continue to Dashboard
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="hero"
                        size="xl"
                        onClick={() => navigate("/auth")}
                      >
                        Sign Up to Save Results
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => navigate("/dashboard")}
                      >
                        Continue as Guest
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Discover Your Dosha
            </h1>
            <p className="text-muted-foreground text-lg">
              Answer these questions to reveal your unique Ayurvedic constitution
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{question.category}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-secondary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-8 md:p-10"
            >
              {/* Mandala decoration */}
              <div className="absolute top-4 right-4 text-accent/10">
                <MandalaIcon className="w-20 h-20" />
              </div>

              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.dosha)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                      answers[currentQuestion] === option.dosha
                        ? "border-secondary bg-secondary/10"
                        : "border-transparent bg-muted/50 hover:bg-muted"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-foreground">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              variant="saffron"
              onClick={handleNext}
              disabled={!answers[currentQuestion] || isSaving}
              className="gap-2"
            >
              {isSaving ? "Saving..." : currentQuestion === questions.length - 1 ? "See Results" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
