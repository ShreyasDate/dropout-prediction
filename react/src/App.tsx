
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ScrollToTop } from './components/ScrollToTop';

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
  const sections = ['features', 'workflow', 'team', 'docs'];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navigation />
      <ScrollIndicator sections={sections} />
      <ScrollToTop />
      <HeroSection />
      <AuthSection />
      <ProblemSection />
      <FeaturesSection />
      <WorkflowSection />
      <DashboardPreview />
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