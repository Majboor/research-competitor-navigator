import React from 'react';
import { Menu, Check } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { RESULT_COUNT_OPTIONS } from '@/lib/results';

interface MobileNavProps {
  numResults: number;
  onResultsCountChange: (count: number) => void;
  onGetStarted: () => void;
}

/**
 * Mobile navigation drawer.
 *
 * On phones the desktop header links (About / Features / Pricing) and the
 * results-count selector were all hidden, leaving no way to reach them. This
 * hamburger + slide-in Sheet exposes them with comfortable 44px+ touch targets.
 */
const MobileNav: React.FC<MobileNavProps> = ({
  numResults,
  onResultsCountChange,
  onGetStarted,
}) => {
  const links = ['About', 'Features', 'Pricing'];

  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <Menu size={22} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-xs overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-brand-600">CompetitorFinder</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col">
          {links.map((label) => (
            <button
              key={label}
              className="text-left text-neutral-700 hover:text-brand-600 hover:bg-neutral-50 rounded-lg px-3 py-3 min-h-[44px] transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-6 border-t border-neutral-200 pt-4">
          <p className="px-3 text-xs font-medium uppercase tracking-wide text-neutral-400 mb-1">
            Results per search
          </p>
          <div className="flex flex-col">
            {RESULT_COUNT_OPTIONS.map((count) => (
              <button
                key={count}
                onClick={() => onResultsCountChange(count)}
                className={`flex items-center justify-between rounded-lg px-3 py-3 min-h-[44px] text-left transition-colors ${
                  numResults === count
                    ? 'bg-brand-50 text-brand-600 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>{count} results</span>
                {numResults === count && <Check size={16} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-neutral-200 pt-4">
          <SheetClose asChild>
            <button
              onClick={onGetStarted}
              className="w-full bg-brand-500 text-white hover:bg-brand-600 px-4 py-3 min-h-[44px] rounded-lg transition-colors"
            >
              Get Started
            </button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
