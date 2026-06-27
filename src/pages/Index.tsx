
import React, { useState, lazy, Suspense } from 'react';
import { Bookmark } from 'lucide-react';
import SavedCompetitorsSheet from '@/components/SavedCompetitorsSheet';
import { useSavedCompetitors } from '@/hooks/useSavedCompetitors';
import HeroSection from '@/components/HeroSection';
import HeroSectionB from '@/components/HeroSectionB';
import { useVariant } from '@/hooks/useVariant';
import ResultsCountMenu from '@/components/ResultsCountMenu';
import MobileNav from '@/components/MobileNav';
import { FormData, SearchResponse } from '@/types';
import { searchCompetitors } from '@/utils/api';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useToast } from '@/hooks/use-toast';
import SEOHelmet from '@/components/SEOHelmet';

// Below-the-fold and interaction-gated views are code-split so they don't
// weigh down the initial landing bundle. Only HeroSection ships up front.
const OnboardingForm = lazy(() => import('@/components/OnboardingForm'));
const SearchResults = lazy(() => import('@/components/SearchResults'));
const FeaturesSection = lazy(() => import('@/components/FeaturesSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const HowItWorksSection = lazy(() => import('@/components/HowItWorksSection'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const CTASection = lazy(() => import('@/components/CTASection'));

const SectionFallback = () => (
  <div className="w-full py-16 flex justify-center" aria-hidden="true">
    <div className="h-8 w-8 rounded-full border-2 border-brand-200 border-t-brand-500 animate-spin" />
  </div>
);

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<Error | null>(null);
  const [numResults, setNumResults] = useState(5); // Default number of results
  const [savedOpen, setSavedOpen] = useState(false);
  const { count: savedCount } = useSavedCompetitors();
  const variant = useVariant(); // 'a' (control) or 'b' (?variant=b challenger)
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
    <div className="min-h-screen relative overflow-x-hidden">
      <SEOHelmet 
        title="CompetitorFinder - Find Your Business Competitors"
        description="Discover who your competitors are in any market. Get detailed insights and analysis to stay ahead of the competition."
        canonicalUrl="https://researcher.techrealm.online/"
      />
      
      <a href="#main-content" className="skip-to-content">Skip to main content</a>

      <AnimatedBackground />

      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-display text-xl font-bold text-gradient-brand">CompetitorFinder</span>
          </div>
          <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-4">
            <button className="hidden md:inline-flex text-neutral-600 hover:text-neutral-900 transition-colors">
              About
            </button>
            <button className="hidden md:inline-flex text-neutral-600 hover:text-neutral-900 transition-colors">
              Features
            </button>
            <div className="hidden md:block">
              <ResultsCountMenu value={numResults} onChange={handleResultsCountChange} />
            </div>
            <button className="hidden md:inline-flex text-neutral-600 hover:text-neutral-900 transition-colors">
              Pricing
            </button>
            <button
              className="relative inline-flex items-center gap-1.5 min-h-[44px] px-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              onClick={() => setSavedOpen(true)}
              aria-label="Open saved competitors"
            >
              <Bookmark size={18} className={savedCount > 0 ? 'fill-brand-500 text-brand-500' : ''} />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-semibold rounded-full bg-brand-500 text-white">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              className="inline-flex bg-brand-50 text-brand-600 hover:bg-brand-100 px-3 sm:px-4 py-2 min-h-[44px] items-center rounded-lg transition-colors whitespace-nowrap"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            <MobileNav
              numResults={numResults}
              onResultsCountChange={handleResultsCountChange}
              onGetStarted={handleGetStarted}
            />
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} aria-label="Competitor finder" className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <Suspense fallback={<SectionFallback />}>
          {!showOnboarding && !searchResults && !loading && !searchError && (
            <>
              {variant === 'b' ? (
                <HeroSectionB onGetStarted={handleGetStarted} />
              ) : (
                <HeroSection onGetStarted={handleGetStarted} />
              )}
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
        </Suspense>
      </main>

      <SavedCompetitorsSheet open={savedOpen} onOpenChange={setSavedOpen} />

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
