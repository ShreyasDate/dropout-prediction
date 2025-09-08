import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { UserX, TrendingUp, DollarSign } from 'lucide-react';
import { fadeInUpSpring, staggerContainer } from '../../constants/animations';

export const ProblemSection: React.FC = () => (
  <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 relative overflow-hidden">
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
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
          The Challenge We're Solving
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Educational institutions face critical challenges in identifying at-risk students before it's too late
        </p>
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={staggerContainer}
      >
        {[
          {
            icon: UserX,
            title: 'Poor Attendance',
            description: 'Students skipping classes without early intervention',
            stat: '23%',
            color: 'from-red-500 to-pink-500',
            bgGradient: 'from-red-500/10 to-pink-500/5'
          },
          {
            icon: TrendingUp,
            title: 'Declining Grades',
            description: 'Academic performance drops going unnoticed',
            stat: '31%',
            color: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-500/10 to-red-500/5'
          },
          {
            icon: DollarSign,
            title: 'Financial Issues',
            description: 'Unpaid fees leading to student dropout',
            stat: '18%',
            color: 'from-yellow-500 to-orange-500',
            bgGradient: 'from-yellow-500/10 to-orange-500/5'
          }
        ].map((problem, index) => (
          <motion.div 
            key={index} 
            variants={fadeInUpSpring}
            className="group"
          >
            <motion.div
              whileHover={{ 
                y: -15,
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="relative"
            >
              <Card className={`h-full bg-gradient-to-br ${problem.bgGradient} backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:shadow-xl rounded-3xl overflow-hidden`}>
                <CardContent className="pt-8 text-center relative z-10">
                  <motion.div 
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${problem.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <problem.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className={`text-4xl font-bold bg-gradient-to-r ${problem.color} bg-clip-text text-transparent mb-4`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {problem.stat}
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">{problem.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{problem.description}</p>
                </CardContent>
                
                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)`
                  }}
                />
              </Card>
              
              {/* 3D shadow layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-slate-300/20 dark:from-slate-700/20 dark:to-slate-800/20 rounded-3xl transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);