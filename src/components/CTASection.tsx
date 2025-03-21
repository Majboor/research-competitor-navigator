
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to discover your competition?</h2>
        <p className="text-xl text-brand-50 max-w-2xl mx-auto mb-10">
          Join thousands of businesses that use CompetitorFinder to stay ahead of the curve.
        </p>
        <Button 
          onClick={onGetStarted} 
          size="lg" 
          className="bg-white text-brand-600 hover:bg-brand-50 gap-2 text-lg py-6 px-8 shadow-lg"
        >
          Find Competitors Now
          <ArrowRight size={20} />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
