import React from 'react';
import { motion } from 'motion/react';
import { Github, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-16 px-6 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Title */}
          <h3 className="text-2xl md:text-3xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Dropout Prediction Project
          </h3>
          
          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-8">
            Built for Smart India Hackathon 2025
          </p>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          >
            <motion.a
              href="#"
              className="flex items-center space-x-2 px-6 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4 opacity-60" />
            </motion.a>
            
            <motion.a
              href="#"
              className="flex items-center space-x-2 px-6 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span>Contact</span>
              <ExternalLink className="w-4 h-4 opacity-60" />
            </motion.a>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-sm text-muted-foreground mb-4">Built with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Next.js', 'Node.js', 'TensorFlow', 'PostgreSQL'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                  className="px-4 py-2 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 border-t border-white/5"
          >
            <p className="text-sm text-muted-foreground">
              © 2025 Dropout Prevention System. Empowering education through AI.
            </p>
          </motion.div>
        </motion.div>

        {/* Background decoration */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
}