import React from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Shield, TrendingUp, Clock, Heart } from 'lucide-react';

const impacts = [
  {
    icon: Shield,
    title: 'Prevent dropouts before they happen',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Boost retention rates',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Clock,
    title: 'Save teacher time with automation',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Heart,
    title: 'Support students who need it most',
    gradient: 'from-pink-500 to-red-500',
  },
];

export function ImpactSection() {
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
            Making a Real{' '}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming education through intelligent intervention and support systems.
          </p>
        </motion.div>

        {/* Impact Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className="flex items-center space-x-6 p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden cursor-pointer"
                onClick={() => toast.info(`${impact.title.split(' ').slice(0, 2).join(' ')} feature coming soon!`)}
              >
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${impact.gradient} p-0.5 shrink-0`}>
                  <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-xl flex items-center justify-center">
                    <impact.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl leading-relaxed group-hover:text-white transition-colors duration-300">
                    {impact.title}
                  </h3>
                </div>

                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${impact.gradient} opacity-0 blur-xl`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Pulse effect */}
                <motion.div
                  className={`absolute -inset-4 bg-gradient-to-r ${impact.gradient} opacity-0 blur-2xl`}
                  animate={{
                    opacity: [0, 0.05, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.8,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <div className="relative">
            {/* Central circle */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-background/90 backdrop-blur-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>

            {/* Orbiting elements */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut",
                }}
                initial={{
                  x: Math.cos((i * Math.PI) / 2) * 80 - 12,
                  y: Math.sin((i * Math.PI) / 2) * 80 - 12,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}