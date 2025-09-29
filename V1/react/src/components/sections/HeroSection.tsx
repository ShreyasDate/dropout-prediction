import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParticleBackground } from '../ParticleBackground';
import { Brain, ArrowRight, ExternalLink, AlertTriangle, Zap, Shield, Target } from 'lucide-react';
import { float } from '../../constants/animations';

interface HeroSectionProps {
  onNavigateToDashboard?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToDashboard }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-200/30 dark:from-black dark:via-gray-900/50 dark:to-gray-800/30">
      <ParticleBackground />
      
      {/* Modern animated background */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent)] pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent)",
            "radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.05),transparent)",
            "radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent)",
            "radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      
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
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 text-sm font-medium border-0 shadow-lg">
                <Zap className="h-4 w-4 mr-2" />
                AI-Powered Innovation
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-emerald-600 dark:from-white dark:via-blue-400 dark:to-emerald-400 bg-clip-text text-transparent leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            >
              AI-Powered
              <br />
              Dropout Prevention
            </motion.h1>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="text-3xl font-light text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                Predict, Intervene, Empower.
              </p>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl opacity-50 blur-xl"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.p 
              className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Advanced machine learning algorithms to identify at-risk students early and provide targeted interventions for better educational outcomes.
            </motion.p>
            
            {/* Feature highlights */}
            <motion.div 
              className="flex flex-wrap gap-6 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Target className="h-4 w-4 text-emerald-500" />
                <span>Precision Targeting</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Brain className="h-4 w-4 text-purple-500" />
                <span>Explainable AI</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(59,130,246,0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={onNavigateToDashboard}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-10 py-5 rounded-2xl shadow-2xl text-lg font-medium border-0"
              >
                <motion.div className="flex items-center">
                  Try Demo
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </motion.div>
                </motion.div>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-10 py-5 rounded-2xl text-lg font-medium">
                View Report
                <ExternalLink className="ml-3 h-5 w-5" />
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
              rotateY: 5, 
              rotateX: -5,
              scale: 1.02,
              transition: { duration: 0.4 }
            }}
            variants={float}
            animate="animate"
          >
            {/* Modern Card Container */}
            <div className="relative bg-white/5 dark:bg-gray-900/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 dark:border-gray-700/30 shadow-2xl transform-gpu">
              {/* Floating badges */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-emerald-500 text-white p-4 rounded-2xl shadow-xl"
                animate={{ 
                  rotate: [0, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Brain className="h-6 w-6" />
              </motion.div>
              
              <motion.div 
                className="absolute -top-3 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Live AI
              </motion.div>
              
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1646756089735-487709743361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudCUyMGRhc2hib2FyZCUyMGNvbXB1dGVyJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1NzMwNTcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Teacher and Student Dashboard"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              
              {/* Modern overlay elements */}
              <motion.div
                className="absolute bottom-6 left-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm flex items-center font-medium shadow-lg"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Detected
              </motion.div>
              
              {/* Modern status indicator */}
              <motion.div
                className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Active
              </motion.div>
            </div>
            
            {/* Modern depth layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-3xl transform translate-x-3 translate-y-3 -z-10 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl transform translate-x-6 translate-y-6 -z-20 blur-md" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};