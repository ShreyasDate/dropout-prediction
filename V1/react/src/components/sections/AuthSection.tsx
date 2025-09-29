import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { BookOpen, Users, Shield, Lock } from 'lucide-react';
import { fadeInUpSpring, staggerContainer, scaleIn } from '../../constants/animations';

export const AuthSection: React.FC = () => (
  <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
    <motion.div 
      className="container mx-auto px-6"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={fadeInUpSpring}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            variants={fadeInUpSpring}
          >
            Secure Access Portal
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            variants={fadeInUpSpring}
          >
            Choose your role to access the system
          </motion.p>
        </div>
        
        <motion.div variants={scaleIn}>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Institute', icon: Shield, color: 'from-indigo-500 to-indigo-600', bgColor: 'from-indigo-500/10 to-indigo-600/5' },
                  { title: 'Teacher', icon: Users, color: 'from-purple-500 to-purple-600', bgColor: 'from-purple-500/10 to-purple-600/5' },
                  { title: 'Student/Parent', icon: BookOpen, color: 'from-emerald-500 to-emerald-600', bgColor: 'from-emerald-500/10 to-emerald-600/5' }
                ].map((role) => (
                  <motion.div 
                    key={role.title}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -10,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    variants={fadeInUpSpring}
                    className="group"
                  >
                    <div className={`relative bg-gradient-to-br ${role.bgColor} rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300`}>
                      <motion.div 
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${role.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <role.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                        Sign in as {role.title}
                      </h3>
                      
                      {/* Animated border */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `linear-gradient(45deg, transparent, rgba(79,70,229,0.1), transparent)`,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="flex items-center justify-center mt-8 text-sm text-gray-500 dark:text-gray-400"
                variants={fadeInUpSpring}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Lock className="h-4 w-4 mr-2" />
                </motion.div>
                Secure access with end-to-end encryption
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);