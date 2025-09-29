import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { UserX, TrendingDown, CreditCard } from 'lucide-react';

const problems = [
  {
    icon: UserX,
    title: 'Poor Attendance',
    stat: '23%',
    description: 'of dropouts linked to absenteeism',
    gradient: 'from-red-500/20 to-orange-500/20',
    iconColor: 'text-red-400',
  },
  {
    icon: TrendingDown,
    title: 'Declining Grades',
    stat: '31%',
    description: 'caused by unnoticed academic decline',
    gradient: 'from-yellow-500/20 to-red-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: CreditCard,
    title: 'Financial Issues',
    stat: '18%',
    description: 'due to unpaid fees',
    gradient: 'from-blue-500/20 to-purple-500/20',
    iconColor: 'text-blue-400',
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            The Challenge We're{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Solving
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Institutions face critical challenges in identifying at-risk students before it's too late.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className={`p-8 backdrop-blur-xl bg-gradient-to-br ${problem.gradient} border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden cursor-pointer`}
                onClick={() => toast.info(`${problem.title} analytics coming soon!`)}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-4">
                      <problem.icon className={`w-8 h-8 ${problem.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl mb-4">{problem.title}</h3>
                  
                  {/* Stat */}
                  <div className="mb-4">
                    <span className="text-5xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {problem.stat}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}