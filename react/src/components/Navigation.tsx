import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { useSmoothScroll } from './SmoothScroll';
import { Moon, Sun, Brain, Menu, Github, FileText, Users, Zap } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { scrollToElement, scrollToTop } = useSmoothScroll();

  const navItems = [
    { label: 'Features', href: 'features', icon: Zap },
    { label: 'How it Works', href: 'workflow', icon: Brain },
    { label: 'Team', href: 'team', icon: Users },
    { label: 'Documentation', href: 'docs', icon: FileText },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToElement(href);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    scrollToTop();
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/20 dark:border-slate-700/20 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={handleLogoClick}
          >
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                AI Dropout Prevention
              </span>
              <div className="text-xs text-slate-500 dark:text-slate-400">Educational Intelligence</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {/* GitHub Link */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-all duration-200"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                ) : (
                  <Sun className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                )}
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/70"
              >
                <Menu className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};