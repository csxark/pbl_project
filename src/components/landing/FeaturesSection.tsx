import { motion } from "framer-motion";
import { Leaf, Heart, Brain, Moon, Utensils, Users } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Dosha Assessment",
    description: "Discover your unique Ayurvedic constitution through our comprehensive 12-step quiz.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Utensils,
    title: "Personalized Nutrition",
    description: "Get dosha-specific meal plans and recipes tailored to your body type.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Moon,
    title: "Daily Rituals",
    description: "Follow guided morning and evening routines for optimal balance and energy.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Brain,
    title: "Mindfulness",
    description: "Access meditation sessions, pranayama exercises, and guided breathwork.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Heart,
    title: "Women's Wellness",
    description: "Track your cycle and receive personalized care for every life stage.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with practitioners and share your wellness journey with others.",
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30 lotus-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Your Path to <span className="gradient-text">Balance</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Embrace a holistic approach to wellness with our comprehensive Ayurvedic toolkit.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                {/* Icon */}
                <div className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
