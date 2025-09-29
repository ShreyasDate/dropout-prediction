
import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ScrollToTop } from './components/ScrollToTop';
import { DashboardPage } from './components/dashboard/DashboardPage';

// Section Components
import { HeroSection } from './components/sections/HeroSection';
import { AuthSection } from './components/sections/AuthSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { WorkflowSection } from './components/sections/WorkflowSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { DashboardPreview } from './components/sections/DashboardPreview';
import { TechStackSection } from './components/sections/TechStackSection';
import { TeamSection } from './components/sections/TeamSection';
import { CTASection } from './components/sections/CTASection';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');
  const sections = ['features', 'workflow', 'team', 'docs'];

  // Check for dashboard route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/dashboard') {
      setCurrentPage('dashboard');
    }
  }, []);

  // Handle navigation
  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
    window.history.pushState({}, '', '/dashboard');
  };

  // const navigateToLanding = () => {
  //   setCurrentPage('landing');
  //   window.history.pushState({}, '', '/');
  // };

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPage(path === '/dashboard' ? 'dashboard' : 'landing');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <Navigation onNavigateToDashboard={navigateToDashboard} />
      <ScrollIndicator sections={sections} />
      <ScrollToTop />
      <HeroSection onNavigateToDashboard={navigateToDashboard} />
      <AuthSection />
      <ProblemSection />
      <FeaturesSection />
      <WorkflowSection />
      <DashboardPreview onNavigateToDashboard={navigateToDashboard} />
      <TechStackSection />
      <TeamSection />
      <CTASection />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}