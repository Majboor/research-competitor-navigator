import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';

interface HeroSectionBProps {
  onGetStarted: () => void;
}

/**
 * Variant B of the landing hero (A/B test challenger).
 *
 * Distinct from the control (HeroSection.tsx) on all three test axes:
 *  - Headline: benefit/outcome framing ("Know exactly who you're up against")
 *    instead of the control's feature framing ("Discover Your Competitors").
 *  - Layout: single centred column with a dark gradient stage and an inline
 *    search-style CTA, versus the control's two-column split with a browser
 *    mockup on the right.
 *  - CTA: one primary "Analyze my market" action plus supporting proof stats,
 *    versus the control's two side-by-side buttons.
 *
 * Rendered when the URL carries ?variant=b (see useVariant()).
 */
const HeroSectionB: React.FC<HeroSectionBProps> = ({ onGetStarted }) => {
  return (
    <div className="relative z-10 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 px-6 py-16 sm:px-12 sm:py-20 shadow-2xl">
        {/* Ambient glow accents */}
        <div className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brand-400 opacity-30 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>

        <div className="relative text-center animate-fade-up">
          <div className="mx-auto inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-50 backdrop-blur-sm ring-1 ring-white/20">
            <Sparkles size={14} className="mr-2 text-brand-200" />
            AI-powered competitive intelligence
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl text-balance">
            Know exactly who you&rsquo;re
            <br />
            <span className="bg-gradient-to-r from-brand-200 to-white bg-clip-text text-transparent">
              up against
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-50/90 sm:text-xl">
            Enter your product and market, and get a ranked map of your real
            competitors in seconds. No research team required.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-stretch gap-3 sm:max-w-lg">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="w-full gap-2 bg-white py-6 text-lg font-semibold text-brand-700 shadow-glow hover:bg-brand-50"
            >
              <Search size={20} />
              Analyze my market
              <ArrowRight size={20} />
            </Button>
            <p className="text-sm text-brand-100/80">
              Free to try &middot; No credit card &middot; Results in ~10 seconds
            </p>
          </div>

          {/* Proof stats row */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 px-4 py-5 ring-1 ring-white/10">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-100">
                <Target size={20} />
              </div>
              <div className="text-2xl font-bold text-white">1,000+</div>
              <div className="text-sm text-brand-100/80">businesses analyzed</div>
            </div>
            <div className="rounded-xl bg-white/5 px-4 py-5 ring-1 ring-white/10">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-100">
                <TrendingUp size={20} />
              </div>
              <div className="text-2xl font-bold text-white">10 sec</div>
              <div className="text-sm text-brand-100/80">average search time</div>
            </div>
            <div className="rounded-xl bg-white/5 px-4 py-5 ring-1 ring-white/10">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-100">
                <Sparkles size={20} />
              </div>
              <div className="text-2xl font-bold text-white">Global</div>
              <div className="text-sm text-brand-100/80">market coverage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionB;
