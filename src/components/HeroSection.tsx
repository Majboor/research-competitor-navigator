
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Zap, Globe, PieChart } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6 animate-fade-up text-balance">
          Discover Your Competitors
          <span className="block text-brand-600">In Seconds</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-neutral-600 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Find and analyze your competition instantly. Get insights into the market landscape
          and stay ahead of the competition.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Button 
            onClick={onGetStarted} 
            size="lg" 
            className="bg-brand-500 hover:bg-brand-600 gap-2 text-lg py-6 px-8 shadow-glow"
          >
            <Search size={20} />
            Find Competitors Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2 text-lg py-6 px-8"
          >
            <PieChart size={20} />
            How It Works
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="glass-card rounded-xl p-8 text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="w-14 h-14 mx-auto bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
          <p className="text-neutral-600">
            Get competitor insights in seconds, not days. Our powerful search finds relevant competitors quickly.
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 text-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="w-14 h-14 mx-auto bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
          <p className="text-neutral-600">
            Search for competitors in any market around the world with our comprehensive database.
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="w-14 h-14 mx-auto bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4">
            <PieChart size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Valuable Insights</h3>
          <p className="text-neutral-600">
            Analyze competitor websites, messaging, and positioning to inform your business strategy.
          </p>
        </div>
      </div>
      
      <div className="mt-20 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-50 text-brand-700 animate-pulse-soft">
          <span className="mr-2 font-medium">Trusted by 1,000+ businesses</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
