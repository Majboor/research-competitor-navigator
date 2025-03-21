
import React from 'react';
import { Search, Filter, LineChart, Zap } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10" />,
      title: "Enter Your Industry",
      description: "Start by providing your business category or specific products/services you offer."
    },
    {
      icon: <Filter className="h-10 w-10" />,
      title: "Select Location",
      description: "Choose your target market from our list of 190+ countries and regions."
    },
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Get Results Instantly",
      description: "Our algorithm finds and analyzes your competitors in just seconds."
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Take Action",
      description: "Use the insights to refine your strategy and gain competitive advantage."
    }
  ];

  return (
    <section className="py-20 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">How It Works</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Finding your competitors has never been easier. Here's our simple process:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center h-full z-10 relative">
                <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-4 z-0">
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6H38" stroke="#CBD5E1" strokeWidth="2" />
                    <path d="M32 1L38 6L32 11" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
