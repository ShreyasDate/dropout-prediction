import React from 'react';
import { motion } from 'motion/react';
import { ParticleBackground } from '../ParticleBackground';
import { Layers, Cpu, Network, Database, Shield, Brain, Sparkles, Zap } from 'lucide-react';
import { fadeInUpSpring, staggerContainer } from '../../constants/animations';

export const TechStackSection: React.FC = () => (
  <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
    <ParticleBackground />
    
    <motion.div 
      className="container mx-auto px-6 relative z-10"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.div 
        className="text-center mb-16"
        variants={fadeInUpSpring}
      >
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          Built with Modern Technology
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Leveraging cutting-edge technologies for reliability, scalability, and performance
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        variants={staggerContainer}
      >
        {[
          { name: 'Next.js', icon: Layers },
          { name: 'Node.js', icon: Cpu },
          { name: 'Flask', icon: Network },
          { name: 'PostgreSQL', icon: Database },
          { name: 'Docker', icon: Shield },
          { name: 'TensorFlow', icon: Brain },
          { name: 'React', icon: Sparkles },
          { name: 'Python', icon: Zap }
        ].map((tech, index) => (
          <motion.div 
            key={tech.name}
            variants={fadeInUpSpring}
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="group"
          >
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
              <motion.div
                className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <tech.icon className="h-6 w-6 text-white" />
              </motion.div>
              <div className="text-lg font-semibold">{tech.name}</div>
              
              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(79,70,229,0.2), transparent 70%)`
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);