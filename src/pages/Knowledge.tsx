import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, Wind, Flame, Mountain, Leaf, Heart, 
  Brain, Moon, Sun, Droplets, ChevronDown, ChevronUp
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LotusIcon, MandalaIcon } from "@/components/icons/SacredIcons";
import { cn } from "@/lib/utils";

const doshaDetails = {
  vata: {
    name: "Vata",
    element: "Air & Space (Ether)",
    color: "from-blue-500 to-purple-500",
    textColor: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    icon: Wind,
    qualities: ["Light", "Cold", "Dry", "Rough", "Mobile", "Subtle", "Clear"],
    characteristics: [
      "Creative and imaginative mind",
      "Quick learner but may forget easily",
      "Enthusiastic and vibrant",
      "Flexible and adaptable",
      "Light and thin body frame",
      "Tends toward dry skin and cold hands",
    ],
    imbalanceSigns: [
      "Anxiety and worry",
      "Insomnia or restless sleep",
      "Constipation and bloating",
      "Dry, cracking skin",
      "Joint pain or stiffness",
      "Difficulty concentrating",
    ],
    balancingTips: [
      "Follow a regular daily routine",
      "Eat warm, cooked, nourishing foods",
      "Favor sweet, sour, and salty tastes",
      "Practice calming activities like yoga",
      "Keep warm and avoid cold, windy weather",
      "Get plenty of rest and sleep",
    ],
    bestFoods: ["Warm soups", "Cooked grains", "Root vegetables", "Ghee", "Sesame oil", "Warm milk"],
    avoidFoods: ["Raw vegetables", "Cold drinks", "Dry crackers", "Caffeine", "Bitter greens"],
  },
  pitta: {
    name: "Pitta",
    element: "Fire & Water",
    color: "from-orange-500 to-red-500",
    textColor: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-500/10",
    icon: Flame,
    qualities: ["Hot", "Sharp", "Light", "Oily", "Liquid", "Spreading"],
    characteristics: [
      "Sharp intellect and focused mind",
      "Natural leadership qualities",
      "Strong appetite and digestion",
      "Medium build, athletic",
      "Warm body temperature",
      "Ambitious and goal-oriented",
    ],
    imbalanceSigns: [
      "Irritability and anger",
      "Acid reflux or heartburn",
      "Skin rashes or inflammation",
      "Excessive sweating",
      "Perfectionism",
      "Sensitivity to heat",
    ],
    balancingTips: [
      "Stay cool and avoid excessive heat",
      "Eat cooling, fresh foods",
      "Favor sweet, bitter, and astringent tastes",
      "Practice moderation in all activities",
      "Spend time in nature near water",
      "Avoid competitive situations",
    ],
    bestFoods: ["Cucumbers", "Melons", "Coconut", "Leafy greens", "Mint", "Sweet fruits"],
    avoidFoods: ["Spicy foods", "Fried foods", "Alcohol", "Sour fruits", "Hot peppers"],
  },
  kapha: {
    name: "Kapha",
    element: "Earth & Water",
    color: "from-green-500 to-teal-500",
    textColor: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    icon: Mountain,
    qualities: ["Heavy", "Slow", "Cold", "Oily", "Smooth", "Dense", "Soft", "Stable"],
    characteristics: [
      "Calm and grounded nature",
      "Strong and sturdy build",
      "Excellent long-term memory",
      "Loving and compassionate",
      "Thick, lustrous hair and skin",
      "Steady energy levels",
    ],
    imbalanceSigns: [
      "Weight gain and sluggishness",
      "Congestion and mucus",
      "Lethargy and depression",
      "Attachment and possessiveness",
      "Water retention",
      "Excessive sleep",
    ],
    balancingTips: [
      "Stay active with regular exercise",
      "Eat light, warm, spicy foods",
      "Favor bitter, pungent, and astringent tastes",
      "Wake up early and avoid daytime naps",
      "Try new experiences and activities",
      "Practice stimulating breathwork",
    ],
    bestFoods: ["Ginger", "Turmeric", "Leafy greens", "Legumes", "Apples", "Berries"],
    avoidFoods: ["Dairy products", "Fried foods", "Sweets", "Heavy meats", "Cold foods"],
  },
};

const ayurvedaPrinciples = [
  {
    title: "The Science of Life",
    icon: BookOpen,
    content: "Ayurveda, meaning 'Science of Life' in Sanskrit, is one of the world's oldest holistic healing systems. Originating in India over 5,000 years ago, it emphasizes the balance between mind, body, and spirit for optimal health and well-being.",
  },
  {
    title: "The Five Elements",
    icon: Leaf,
    content: "Ayurveda is based on the concept that everything in the universe is composed of five elements: Space (Akasha), Air (Vayu), Fire (Tejas), Water (Jala), and Earth (Prithvi). These elements combine to form the three doshas.",
  },
  {
    title: "Mind-Body Connection",
    icon: Brain,
    content: "Ayurveda recognizes the profound connection between mental and physical health. Emotional imbalances can manifest as physical symptoms, and physical ailments can affect mental well-being.",
  },
  {
    title: "Circadian Rhythms",
    icon: Sun,
    content: "Ayurveda emphasizes living in harmony with nature's rhythms. Different times of day are dominated by different doshas: Kapha (6-10), Pitta (10-2), and Vata (2-6), both AM and PM.",
  },
  {
    title: "Digestive Fire (Agni)",
    icon: Flame,
    content: "Central to Ayurveda is the concept of Agni, the digestive fire. Strong Agni ensures proper digestion, absorption, and assimilation of nutrients, while weak Agni leads to toxin accumulation (Ama).",
  },
  {
    title: "Seasonal Routines",
    icon: Moon,
    content: "Ritucharya, or seasonal routine, involves adjusting diet, lifestyle, and practices according to the seasons to maintain dosha balance throughout the year.",
  },
];

const Knowledge = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("vata");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <MandalaIcon className="w-20 h-20 text-secondary mx-auto" />
              <motion.div
                className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Ayurvedic Wisdom
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the ancient science of life and learn how to balance your unique constitution
              for optimal health and well-being.
            </p>
          </motion.div>

          {/* Ayurveda Basics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-secondary" />
              Foundations of Ayurveda
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ayurvedaPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="glass-card h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-3">
                        <principle.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {principle.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Dosha Deep Dive */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
              <LotusIcon className="w-6 h-6 text-secondary" />
              Understanding the Doshas
            </h2>
            
            <Tabs defaultValue="vata" className="space-y-8">
              <TabsList className="bg-muted/50 w-full justify-start flex-wrap h-auto gap-2 p-2">
                {Object.entries(doshaDetails).map(([key, dosha]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="gap-2 data-[state=active]:bg-card"
                  >
                    <dosha.icon className="w-4 h-4" />
                    {dosha.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(doshaDetails).map(([key, dosha]) => (
                <TabsContent key={key} value={key} className="space-y-6">
                  {/* Dosha Header Card */}
                  <Card className={cn("overflow-hidden", dosha.bgColor)}>
                    <div className={`h-2 bg-gradient-to-r ${dosha.color}`} />
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-6 flex-wrap">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${dosha.color} flex items-center justify-center shadow-lg`}>
                          <dosha.icon className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h3 className={`font-display text-3xl ${dosha.textColor}`}>
                            {dosha.name} Dosha
                          </h3>
                          <p className="text-muted-foreground text-lg">{dosha.element}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {dosha.qualities.map((quality) => (
                              <span
                                key={quality}
                                className="px-3 py-1 rounded-full text-sm bg-card/80 text-foreground"
                              >
                                {quality}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Characteristics */}
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Heart className="w-5 h-5 text-secondary" />
                          Key Characteristics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {dosha.characteristics.map((char, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <Leaf className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              {char}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Imbalance Signs */}
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Droplets className="w-5 h-5 text-secondary" />
                          Signs of Imbalance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {dosha.imbalanceSigns.map((sign, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <span className="w-4 h-4 text-orange-500 dark:text-orange-400 shrink-0">⚠</span>
                              {sign}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Balancing Tips */}
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Sun className="w-5 h-5 text-secondary" />
                          Balancing Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {dosha.balancingTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <span className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0">✓</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Foods */}
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Leaf className="w-5 h-5 text-secondary" />
                          Dietary Guidance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="font-semibold text-foreground mb-2">Best Foods:</p>
                          <div className="flex flex-wrap gap-2">
                            {dosha.bestFoods.map((food) => (
                              <span
                                key={food}
                                className="px-3 py-1 rounded-full text-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              >
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-2">Foods to Avoid:</p>
                          <div className="flex flex-wrap gap-2">
                            {dosha.avoidFoods.map((food) => (
                              <span
                                key={food}
                                className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-600 dark:text-red-400"
                              >
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Knowledge;
