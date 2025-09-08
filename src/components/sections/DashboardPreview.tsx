import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Brain, BarChart3 } from 'lucide-react';
import { fadeInUpSpring, staggerContainer, scaleIn, float } from '../../constants/animations';

export const DashboardPreview: React.FC = () => {
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 1000], [0, -10]);
  const scale = useTransform(scrollY, [0, 1000], [1, 0.95]);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900/20 relative overflow-hidden">
      <motion.div 
        className="container mx-auto px-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUpSpring}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-700 to-indigo-600 dark:from-slate-300 dark:to-indigo-400 bg-clip-text text-transparent">
            Interactive Dashboard
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Real-time insights and analytics to track student progress and risk factors
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-6xl mx-auto perspective-1000"
          variants={scaleIn}
          style={{ rotateX, scale }}
        >
          <motion.div
            className="relative group"
            whileHover={{ 
              rotateY: 5, 
              rotateX: -5,
              scale: 1.02,
              transition: { duration: 0.4 }
            }}
            variants={float}
            animate="animate"
          >
            {/* Main dashboard container */}
            <div className="relative bg-white/20 dark:bg-slate-800/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 dark:border-slate-700/30 shadow-2xl transform-gpu">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwY2hhcnRzfGVufDF8fHx8MTc1NzIzNDE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Analytics Dashboard"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              
              {/* Floating status indicators */}
              <motion.div 
                className="absolute top-6 right-6 flex gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge className="bg-emerald-500 text-white px-3 py-1 shadow-lg">
                    <motion.div 
                      className="w-2 h-2 bg-white rounded-full mr-2"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Live Data
                  </Badge>
                </motion.div>
                
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 shadow-lg">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </motion.div>
              
              {/* Interactive data points */}
              <motion.div 
                className="absolute bottom-6 left-6 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Risk Analysis Active</span>
              </motion.div>
              
              {/* Animated overlay grid */}
              <motion.div
                className="absolute inset-8 rounded-2xl opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 48%, rgba(79,70,229,0.1) 49%, rgba(79,70,229,0.1) 51%, transparent 52%),
                    linear-gradient(-45deg, transparent 48%, rgba(147,51,234,0.1) 49%, rgba(147,51,234,0.1) 51%, transparent 52%)
                  `,
                  backgroundSize: '20px 20px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '20px 20px', '0px 0px']
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            {/* 3D depth layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl transform translate-x-4 translate-y-4 -z-20 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};