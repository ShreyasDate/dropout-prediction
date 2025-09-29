import React from 'react';
import { motion } from 'motion/react';

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export function GlassButton({ children, variant = 'primary', className = '', onClick }: GlassButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative group overflow-hidden px-8 py-4 rounded-2xl transition-all duration-300
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 dark:border-white/20 text-blue-900 dark:text-white shadow-lg hover:from-blue-500/30 hover:to-purple-600/30' 
          : 'backdrop-blur-xl border border-border/50 text-foreground hover:border-border hover:bg-white/5 dark:hover:bg-white/5'
        }
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Liquid gradient background */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${
          variant === 'primary' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20' 
            : 'bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10'
        }`}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
        transition={{ duration: 0.6, delay: 0.1 }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Ripple effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-blue-500/20 dark:bg-white/20 scale-0"
        whileTap={{ scale: 1, opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}