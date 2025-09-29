import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { GlassButton } from './GlassButton';
import { toast } from 'sonner';
import { Github } from 'lucide-react';

const teamMembers = [
  {
    name: 'Pratham Jadhav',
    role: 'Leader & ML Developer',
    initials: 'PJ',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    name: 'Sarah Khambatta',
    role: 'DevOps Engineer',
    initials: 'SK',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    name: 'Shreyas Date',
    role: 'Web Developer',
    initials: 'SD',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Sumit Mate',
    role: 'ML Developer',
    initials: 'SM',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Vinit Limkar',
    role: 'ML Developer',
    initials: 'VL',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Aditi Deshpande',
    role: 'Web Designer',
    initials: 'AD',
    gradient: 'from-pink-500 to-rose-500',
  },
];

export function TeamSection() {
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
            Meet Our{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The minds behind the Dropout Prevention System.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="p-8 backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden text-center cursor-pointer"
                onClick={() => toast.info(`${member.name}'s portfolio coming soon!`)}
              >
                {/* Background glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 blur-xl`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Avatar */}
                <div className="mb-6 flex justify-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${member.gradient} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-background/90 backdrop-blur-xl flex items-center justify-center">
                      <span className="text-2xl text-white">{member.initials}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl mb-2 group-hover:text-white transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-muted-foreground mb-6 group-hover:text-white/80 transition-colors duration-300">
                  {member.role}
                </p>

                {/* GitHub button */}
                <GlassButton 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => toast.info(`${member.name}'s profile coming soon!`)}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </GlassButton>

                {/* Floating particles */}
                <motion.div
                  className="absolute top-6 right-6 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                <motion.div
                  className="absolute bottom-8 left-6 w-1 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{ translateX: '200%' }}
                  transition={{ duration: 0.6 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Team Members', value: '6' },
            { label: 'ML Engineers', value: '3' },
            { label: 'Developers', value: '2' },
            { label: 'Designer', value: '1' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
              className="text-center p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}