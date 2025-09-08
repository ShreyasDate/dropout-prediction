import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Upload, Database, Brain, BarChart3, AlertTriangle, MessageSquare } from 'lucide-react';
import { fadeInUpSpring, staggerContainer } from '../../constants/animations';

export const WorkflowSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section id="workflow" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 relative overflow-hidden">
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
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our AI-powered system creates a seamless workflow from data collection to intervention
          </p>
        </motion.div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-6 gap-8 items-center relative">
            {/* Animated connection line */}
            <svg className="absolute top-16 left-0 right-0 h-0.5 hidden lg:block z-0">
              <motion.line
                x1="8%" y1="50%" x2="92%" y2="50%"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            
            {[
              { title: 'Teacher Upload', icon: Upload, color: 'bg-indigo-500', description: 'Secure data input' },
              { title: 'Data Processing', icon: Database, color: 'bg-purple-500', description: 'Clean & validate' },
              { title: 'AI Analysis', icon: Brain, color: 'bg-pink-500', description: 'ML predictions' },
              { title: 'Risk Dashboard', icon: BarChart3, color: 'bg-violet-500', description: 'Visual insights' },
              { title: 'Alerts Sent', icon: AlertTriangle, color: 'bg-rose-500', description: 'Notifications' },
              { title: 'Student Support', icon: MessageSquare, color: 'bg-fuchsia-500', description: 'Interventions' }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center group relative z-10"
                variants={fadeInUpSpring}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-4 ${step.color} rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                  whileHover={{ rotate: 12 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(0,0,0,0.1)",
                      "0 20px 40px rgba(0,0,0,0.15)",
                      "0 10px 30px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <step.icon className="h-10 w-10 text-white relative z-10" />
                  
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                </motion.div>
                
                <h3 className="font-semibold text-sm mb-2 text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{step.description}</p>
                
                {/* Step number */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};