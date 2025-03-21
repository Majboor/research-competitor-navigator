
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Zap, Globe, PieChart, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left animate-fade-up">
          <div className="inline-flex items-center rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
            The smartest way to find competitors
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6 text-balance">
            Discover Your Competitors
            <br />
            <span className="text-brand-600">In Seconds</span>
          </h1>
          
          <p className="text-xl text-neutral-600 mb-8">
            Find and analyze your competition instantly. Get insights into the market landscape
            and stay ahead of the competition.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
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
          
          <div className="mt-10 flex items-center">
            <p className="text-sm text-neutral-500 mr-4">Trusted by 1,000+ businesses</p>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="inline-block h-8 w-8 rounded-full bg-neutral-200 border-2 border-white"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative bg-white shadow-2xl rounded-2xl overflow-hidden border border-neutral-200">
            <div className="h-12 bg-neutral-100 flex items-center px-4 border-b border-neutral-200">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto bg-white rounded-full py-1 px-3 text-xs text-neutral-500 shadow-sm">
                competitorfinder.com
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="h-6 w-3/4 bg-neutral-100 rounded-md"></div>
                <div className="h-4 w-5/6 bg-neutral-100 rounded-md"></div>
                <div className="h-4 w-2/3 bg-neutral-100 rounded-md"></div>
              </div>
              
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="h-4 w-1/3 bg-neutral-200 rounded-md"></div>
                  <div className="h-4 w-1/6 bg-brand-100 rounded-md"></div>
                </div>
                <div className="h-4 w-5/6 bg-neutral-200 rounded-md mb-2"></div>
                <div className="h-4 w-full bg-neutral-200 rounded-md"></div>
                <div className="mt-3 h-8 w-1/3 bg-brand-500 rounded-md"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200">
                  <div className="h-4 w-2/3 bg-neutral-200 rounded-md mb-2"></div>
                  <div className="h-3 w-full bg-neutral-200 rounded-md"></div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200">
                  <div className="h-4 w-2/3 bg-neutral-200 rounded-md mb-2"></div>
                  <div className="h-3 w-full bg-neutral-200 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
    </div>
  );
};

export default HeroSection;
