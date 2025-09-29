import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { 
  Merge, 
  AlertTriangle, 
  UserCheck, 
  Activity, 
  Eye, 
  Zap 
} from 'lucide-react';

const features = [
  {
    icon: Merge,
    title: 'Data Fusion',
    description: 'Combine academic, behavioral & financial data',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: AlertTriangle,
    title: 'Early Alerts',
    description: 'Proactive risk notifications',
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: UserCheck,
    title: 'Teacher Validation',
    description: 'Human context for AI predictions',
    gradient: 'from-green-500/20 to-teal-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Activity,
    title: 'Counseling Dashboard',
    description: 'Centralized intervention tracking',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Eye,
    title: 'Explainable AI',
    description: 'Transparent reasoning for predictions',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Zap,
    title: 'Scalable Deployment',
    description: 'Works for any institution',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            Powerful{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI capabilities designed to help educational institutions prevent student dropouts effectively.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className={`p-8 backdrop-blur-xl bg-gradient-to-br ${feature.gradient} border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden h-full cursor-pointer`}
                onClick={() => toast.info(`${feature.title} feature coming soon!`)}
              >
                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                
                {/* Icon container */}
                <div className="mb-6">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl mb-4 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{ translateX: '200%' }}
                  transition={{ duration: 0.6 }}
                />

                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-8 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20">
            <Zap className="w-5 h-5 text-yellow-400 mr-3" />
            <span className="text-lg">All features designed for maximum impact and ease of use</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}