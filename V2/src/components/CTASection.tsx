import React from 'react';
import { motion } from 'motion/react';
import { GlassButton } from './GlassButton';
import { Play, Github } from 'lucide-react';
import { toast } from 'sonner';

interface CTASectionProps {
  onNavigate?: (page: 'landing' | 'dashboard') => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Background elements */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            Join Us in{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Preventing Dropouts
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Try the system today and make a difference in students' lives.
          </p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <GlassButton 
              variant="primary" 
              className="min-w-56 text-lg px-10 py-5"
              onClick={() => onNavigate?.('dashboard')}
            >
              <Play className="w-5 h-5 mr-3" />
              Try Demo
            </GlassButton>
            <GlassButton 
              variant="secondary" 
              className="min-w-56 text-lg px-10 py-5"
              onClick={() => toast.info('GitHub integration coming soon!')}
            >
              <Github className="w-5 h-5 mr-3" />
              Contribute on GitHub
            </GlassButton>
          </motion.div>

          {/* Floating elements */}
          <div className="relative mt-16">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${Math.sin(i) * 20 + 50}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + (i * 0.2),
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Call to action enhancement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 inline-flex items-center px-8 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/20"
          >
            <span className="text-lg">✨ Ready to transform education?</span>
          </motion.div>
        </motion.div>

        {/* Animated background grid */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
              style={{ left: `${i * 5}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}