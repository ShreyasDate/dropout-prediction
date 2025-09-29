import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { Upload, Database, Brain, BarChart3, Bell, Heart } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Teacher Upload',
    description: 'Teachers upload attendance, marks, and fees',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Database,
    title: 'Data Processing',
    description: 'System merges & validates records',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'ML model predicts dropout risk',
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: BarChart3,
    title: 'Risk Dashboard',
    description: 'Clear insights for teachers',
    color: 'from-green-500 to-yellow-500',
  },
  {
    icon: Bell,
    title: 'Alerts Sent',
    description: 'Notifications for intervention',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Heart,
    title: 'Student Support',
    description: 'Counseling & support actions',
    color: 'from-orange-500 to-red-500',
  },
];

export function WorkflowSection() {
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
            How It{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered system follows a seamless 6-step process to identify and support at-risk students.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <Card 
                className="p-8 backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden h-full cursor-pointer"
                onClick={() => toast.info(`${step.title} feature coming soon!`)}
              >
                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl flex items-center justify-center">
                  <span className="text-sm text-white/80">{index + 1}</span>
                </div>

                {/* Icon with gradient background */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} p-0.5 mb-4`}>
                    <div className="w-full h-full rounded-2xl bg-background/80 backdrop-blur-xl flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting line (for larger screens) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  />
                )}

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 blur-xl`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated flow visualization */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center space-x-4 px-8 py-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Processing Flow</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}