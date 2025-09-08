import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Brain, Settings, Code, Palette, Github } from 'lucide-react';
import { fadeInUpSpring, staggerContainer } from '../../constants/animations';

export const TeamSection: React.FC = () => (
  <section id="team" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
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
          Meet Our Team
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Passionate educators and technologists working together to prevent student dropouts
        </p>
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={staggerContainer}
      >
        {[
          { name: 'Pratham Jadhav', role: 'Leader and ML Developer', avatar: 'PJ', color: 'from-indigo-500 to-purple-500', icon: Brain },
          { name: 'Sarah Khambatta', role: 'DevOps Engineer', avatar: 'SK', color: 'from-emerald-500 to-teal-500', icon: Settings },
          { name: 'Shreyas Date', role: 'Web Developer', avatar: 'SD', color: 'from-blue-500 to-indigo-500', icon: Code },
          { name: 'Sumit Mate', role: 'ML Developer', avatar: 'SM', color: 'from-violet-500 to-purple-500', icon: Brain },
          { name: 'Vinit Limkar', role: 'ML Developer', avatar: 'VL', color: 'from-purple-500 to-pink-500', icon: Brain },
          { name: 'Aditi Deshpande', role: 'Web Designer', avatar: 'AD', color: 'from-rose-500 to-pink-500', icon: Palette }
        ].map((member, index) => (
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
              <Card className="text-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
                <CardContent className="pt-8 relative">
                  <motion.div 
                    className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${member.color} rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 relative`}
                    whileHover={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    {member.avatar}
                    
                    {/* Role icon overlay */}
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <member.icon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </motion.div>
                    
                    {/* Animated ring */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-white/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">{member.role}</p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="sm" className="bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-xl">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
              
              {/* 3D shadow */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-slate-300/20 dark:from-slate-700/20 dark:to-slate-800/20 rounded-3xl transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);