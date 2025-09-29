import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParticleBackground } from '../ParticleBackground';
import { Brain, Sparkles, ArrowRight, ExternalLink, AlertTriangle } from 'lucide-react';
import { float } from '../../constants/animations';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <ParticleBackground />
      
      {/* Animated background gradients */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.1),transparent)] pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.1),transparent)",
            "radial-gradient(circle_at_50%_40%,rgba(147,51,234,0.1),transparent)",
            "radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.1),transparent)",
            "radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.1),transparent)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <motion.div 
        className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 pt-20"
        style={{ y: y1, opacity }}
      >
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", damping: 20 }}
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Innovation
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-800 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            >
              AI-Powered Dropout Prevention
            </motion.h1>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-xl">
                Predict, Intervene, Empower.
              </p>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg opacity-20 blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.p 
              className="text-lg text-slate-500 dark:text-slate-400 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Advanced machine learning algorithms to identify at-risk students early and provide targeted interventions for better educational outcomes.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(79,70,229,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 px-8 py-4 rounded-xl">
                View Report
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative perspective-1000"
          initial={{ opacity: 0, x: 100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, type: "spring", damping: 20 }}
          style={{ y: y2 }}
        >
          <motion.div
            className="relative"
            whileHover={{ 
              rotateY: 8, 
              rotateX: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            variants={float}
            animate="animate"
          >
            {/* 3D Card Container */}
            <div className="relative bg-white/10 dark:bg-slate-800/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-2xl transform-gpu">
              {/* Floating badges */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-indigo-500 text-white p-3 rounded-2xl shadow-lg"
                animate={{ 
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Brain className="h-6 w-6" />
              </motion.div>
              
              <motion.div 
                className="absolute -top-2 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Live AI
              </motion.div>
              
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1646756089735-487709743361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudCUyMGRhc2hib2FyZCUyMGNvbXB1dGVyJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1NzMwNTcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Teacher and Student Dashboard"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              
              {/* Animated overlay elements */}
              <motion.div
                className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                Risk Detected
              </motion.div>
            </div>
            
            {/* 3D depth layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl transform translate-x-2 translate-y-2 -z-10 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl transform translate-x-4 translate-y-4 -z-20 blur-md" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};