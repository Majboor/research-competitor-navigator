
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import OnboardingForm from '@/components/OnboardingForm';
import { FormData, SearchResponse } from '@/types';
import { searchCompetitors } from '@/utils/api';
import SearchResults from '@/components/SearchResults';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useToast } from '@/hooks/use-toast';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<Error | null>(null);
  const [numResults, setNumResults] = useState(5); // Default number of results
  const { toast } = useToast();

  const handleGetStarted = () => {
    setShowOnboarding(true);
    setSearchResults(null);
  };

  const handleFormCancel = () => {
    setShowOnboarding(false);
  };

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true);
    setSearchError(null);
    
    try {
      // Determine the search query based on category
      const query = data.category === 'other' && data.customCategory 
        ? data.customCategory 
        : data.category;
        
      // Determine the location
      const location = data.location || data.customLocation || 'us';
      
      console.log(`Searching for ${query} in ${location}, requesting ${numResults} results`);
      
      // Call the API with the number of results to fetch
      const results = await searchCompetitors(query, location, numResults);
      
      console.log('Search results:', results);
      
      setSearchResults(results);
      setShowOnboarding(false);
      
      toast({
        title: "Search completed",
        description: `Found ${results.results.length} competitors for your search.`,
      });
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error instanceof Error ? error : new Error('An unknown error occurred'));
      
      toast({
        title: "Search failed",
        description: "There was a problem finding competitors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchResults(null);
    setSearchError(null);
    setShowOnboarding(true);
  };

  // Function to change the number of results
  const handleResultsCountChange = (count: number) => {
    setNumResults(count);
    // If we already have search results, update the toast to inform the user
    if (searchResults) {
      toast({
        title: "Results count updated",
        description: `Will now show up to ${count} competitors in future searches.`,
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-brand-600">CompetitorFinder</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
              About
            </button>
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Features
            </button>
            <div className="relative group">
              <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Results Count
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                <div className="py-1">
                  {[5, 10, 20, 50].map((count) => (
                    <button
                      key={count}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                        numResults === count ? 'bg-gray-100 font-medium' : ''
                      }`}
                      onClick={() => handleResultsCountChange(count)}
                    >
                      {count} results
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Pricing
            </button>
            <button 
              className="bg-brand-50 text-brand-600 hover:bg-brand-100 px-4 py-2 rounded-lg transition-colors"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        {!showOnboarding && !searchResults && !loading && !searchError && (
          <>
            <HeroSection onGetStarted={handleGetStarted} />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection onGetStarted={handleGetStarted} />
          </>
        )}
        
        {showOnboarding && (
          <OnboardingForm 
            onSubmit={handleFormSubmit} 
            onCancel={handleFormCancel} 
          />
        )}

        {(searchResults || loading || searchError) && (
          <SearchResults 
            results={searchResults} 
            loading={loading} 
            error={searchError}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="relative z-10 border-t border-neutral-200 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CompetitorFinder</h3>
              <p className="text-neutral-600 text-sm">
                Find and analyze your competition instantly. Get insights into the market landscape.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><a href="#" className="hover:text-brand-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><a href="#" className="hover:text-brand-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><a href="#" className="hover:text-brand-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} CompetitorFinder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
