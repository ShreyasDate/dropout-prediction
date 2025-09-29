import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ParticleBackground } from '../ParticleBackground';
import { ArrowRight, Github } from 'lucide-react';
import { fadeInUpSpring, staggerContainer } from '../../constants/animations';

export const CTASection: React.FC = () => (
  <section id="docs" className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 text-white relative overflow-hidden">
    <ParticleBackground />
    
    {/* Animated background shapes */}
    <motion.div
      className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -20, 0]
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    
    <motion.div
      className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full blur-xl"
      animate={{
        scale: [1, 1.3, 1],
        x: [0, -20, 0],
        y: [0, 30, 0]
      }}
      transition={{ duration: 6, repeat: Infinity }}
    />
    
    <div className="container mx-auto px-6 relative z-10">
      <motion.div 
        className="text-center max-w-4xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
          variants={fadeInUpSpring}
        >
          Join Us in Preventing Dropouts
        </motion.h2>
        
        <motion.p 
          className="text-xl mb-12 opacity-90 max-w-2xl mx-auto"
          variants={fadeInUpSpring}
        >
          Try the System Today and Make a Difference in Students' Lives
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUpSpring}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-4 rounded-xl shadow-xl text-lg">
              <motion.div className="flex items-center">
                Try Demo
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div
            variants={fadeInUpSpring}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-xl text-lg">
              <Github className="mr-2 h-5 w-5" />
              Contribute on GitHub
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);