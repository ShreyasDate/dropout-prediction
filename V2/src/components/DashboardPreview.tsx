import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GlassButton } from './GlassButton';
import { AlertTriangle, TrendingUp, Users, Target, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface DashboardPreviewProps {
  onNavigate?: (page: 'landing' | 'dashboard') => void;
}

export function DashboardPreview({ onNavigate }: DashboardPreviewProps) {
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
            Interactive{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time insights into student performance & dropout risk factors.
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Dashboard */}
          <Card className="p-8 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 relative overflow-hidden">
            {/* Dashboard mockup */}
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU4OTcxODM2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Dashboard Analytics Interface"
                className="w-full h-96 object-cover rounded-2xl opacity-80"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent rounded-2xl" />
              
              {/* Floating tooltips */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-6 left-6 px-4 py-3 rounded-xl backdrop-blur-xl bg-red-500/20 border border-red-500/30"
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-200">High Risk Student Detected</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-20 right-6 px-4 py-3 rounded-xl backdrop-blur-xl bg-orange-500/20 border border-orange-500/30"
              >
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-orange-200">AI Prediction: 82% Dropout Likelihood</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute bottom-6 left-6 px-4 py-3 rounded-xl backdrop-blur-xl bg-blue-500/20 border border-blue-500/30"
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-200">Intervention Recommended</span>
                </div>
              </motion.div>
            </div>

            {/* Stats overlay */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Students', value: '1,247', icon: Users, color: 'text-blue-400' },
                { label: 'At Risk', value: '23', icon: AlertTriangle, color: 'text-red-400' },
                { label: 'Interventions', value: '18', icon: Target, color: 'text-green-400' },
                { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-purple-400' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                  className="p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-2xl">{stat.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated background elements */}
            <motion.div
              className="absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </Card>
        </motion.div>

        {/* CTA to try dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <GlassButton 
            variant="primary" 
            className="px-8 py-4 text-lg"
            onClick={() => onNavigate?.('dashboard')}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Try Interactive Dashboard
          </GlassButton>
        </motion.div>
      </div>
    </section>
  );
}