import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GradientOrbs } from './components/GradientOrbs';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { WorkflowSection } from './components/WorkflowSection';
import { FeaturesSection } from './components/FeaturesSection';
import { DashboardPreview } from './components/DashboardPreview';
import { ImpactSection } from './components/ImpactSection';
import { TeamSection } from './components/TeamSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');

  // Force dark mode
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (currentPage === 'dashboard') {
    return (
      <>
        <Dashboard onNavigate={setCurrentPage} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navbar onNavigate={setCurrentPage} />
      
      {/* Background Elements */}
      <GradientOrbs />
      
      {/* Main Content */}
      <main className="relative z-10">
        <section id="home">
          <HeroSection onNavigate={setCurrentPage} />
        </section>
        <section id="problem">
          <ProblemSection />
        </section>
        <section id="workflow">
          <WorkflowSection />
        </section>
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="dashboard">
          <DashboardPreview onNavigate={setCurrentPage} />
        </section>
        <ImpactSection />
        <section id="team">
          <TeamSection />
        </section>
        <CTASection onNavigate={setCurrentPage} />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}