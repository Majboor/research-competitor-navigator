import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { RESULT_COUNT_OPTIONS } from '@/lib/results';

interface ResultsCountMenuProps {
  value: number;
  onChange: (count: number) => void;
  className?: string;
}

/**
 * Touch-friendly results-count selector.
 *
 * Replaces the previous CSS `:hover`-only dropdown, which never opened on
 * touch devices (phones / tablets). Uses Radix DropdownMenu so it opens on
 * tap or click, is keyboard accessible, and closes on outside tap.
 */
const ResultsCountMenu: React.FC<ResultsCountMenuProps> = ({ value, onChange, className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-1 min-h-[44px] px-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${className ?? ''}`}
        aria-label={`Results per search: ${value}. Change`}
      >
        {value} results
        <ChevronDown size={16} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {RESULT_COUNT_OPTIONS.map((count) => (
          <DropdownMenuItem
            key={count}
            onSelect={() => onChange(count)}
            className="min-h-[44px] cursor-pointer justify-between"
          >
            <span>{count} results</span>
            {value === count && <Check size={16} aria-hidden="true" className="text-brand-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResultsCountMenu;
