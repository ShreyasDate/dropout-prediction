import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Database, AlertTriangle, CheckCircle, BarChart3, Brain, Zap } from 'lucide-react';
import { fadeInUpSpring, staggerContainer } from '../../constants/animations';

export const FeaturesSection: React.FC = () => (
  <section id="features" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
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
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Comprehensive tools designed to identify, analyze, and support at-risk students
        </p>
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={staggerContainer}
      >
        {[
          {
            icon: Database,
            title: 'Data Fusion',
            description: 'Combines academic, behavioral, and financial data for comprehensive analysis',
            color: 'from-indigo-500 to-indigo-600',
            bgColor: 'from-indigo-500/10 to-indigo-600/5'
          },
          {
            icon: AlertTriangle,
            title: 'Early Alerts',
            description: 'Proactive notifications when risk factors are detected',
            color: 'from-orange-500 to-red-500',
            bgColor: 'from-orange-500/10 to-red-500/5'
          },
          {
            icon: CheckCircle,
            title: 'Teacher Validation',
            description: 'Allows educators to verify and provide context to AI predictions',
            color: 'from-emerald-500 to-emerald-600',
            bgColor: 'from-emerald-500/10 to-emerald-600/5'
          },
          {
            icon: BarChart3,
            title: 'Counseling Dashboard',
            description: 'Centralized view for counselors to track and manage interventions',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'from-purple-500/10 to-purple-600/5'
          },
          {
            icon: Brain,
            title: 'Explainable AI',
            description: 'Transparent insights into why students are flagged as at-risk',
            color: 'from-violet-500 to-violet-600',
            bgColor: 'from-violet-500/10 to-violet-600/5'
          },
          {
            icon: Zap,
            title: 'Low-cost Deployment',
            description: 'Efficient implementation suitable for institutions of all sizes',
            color: 'from-rose-500 to-pink-500',
            bgColor: 'from-rose-500/10 to-pink-500/5'
          }
        ].map((feature, index) => (
          <motion.div 
            key={index} 
            variants={fadeInUpSpring}
            className="group"
          >
            <motion.div
              whileHover={{ 
                y: -10,
                rotateY: 10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative h-full"
            >
              <Card className={`h-full bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group`}>
                <CardContent className="pt-8 relative">
                  <motion.div 
                    className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                  
                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20"
                    style={{
                      background: `linear-gradient(135deg, transparent 60%, rgba(255,255,255,0.1) 100%)`
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                </CardContent>
              </Card>
              
              {/* 3D depth effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/10 to-slate-300/10 dark:from-slate-700/10 dark:to-slate-800/10 rounded-3xl transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);