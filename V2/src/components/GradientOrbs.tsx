import React from 'react';
import { motion } from 'motion/react';

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large primary orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 dark:from-blue-500/30 to-purple-600/20 dark:to-purple-600/30 blur-3xl"
        style={{ top: '10%', right: '10%' }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Medium secondary orb */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400/15 dark:from-cyan-400/20 to-blue-500/15 dark:to-blue-500/20 blur-2xl"
        style={{ top: '60%', left: '5%' }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Small accent orb */}
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-pink-500/15 dark:from-pink-500/20 to-purple-500/15 dark:to-purple-500/20 blur-2xl"
        style={{ top: '30%', left: '70%' }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating liquid shapes */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/10 dark:from-blue-400/15 to-cyan-400/10 dark:to-cyan-400/15 blur-xl"
        style={{ top: '80%', right: '30%' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-purple-400/10 dark:from-purple-400/15 to-pink-400/10 dark:to-pink-400/15 blur-xl"
        style={{ top: '20%', left: '20%' }}
        animate={{
          y: [0, 30, 0],
          x: [0, -25, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}