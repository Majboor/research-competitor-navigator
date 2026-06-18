
import React, { useState } from 'react';
import { SearchResponse } from '../types';
import CompetitorCard from './CompetitorCard';
import CompetitorInsights from './CompetitorInsights';
import CompetitorCardSkeleton from './CompetitorCardSkeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, LayoutGrid, BarChart3, Radar, SearchX, ListChecks } from 'lucide-react';

const escapeCsv = (value: string) => `"${(value ?? '').replace(/"/g, '""')}"`;

const exportResultsToCsv = (results: SearchResponse) => {
  const header = ['Title', 'Link', 'Snippet'];
  const rows = results.results.map((c) =>
    [escapeCsv(c.title), escapeCsv(c.link), escapeCsv(c.snippet)].join(',')
  );
  const csv = [header.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const slug = (results.query || 'competitors').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  link.href = url;
  link.download = `competitors-${slug}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

interface SearchResultsProps {
  results: SearchResponse | null;
  loading: boolean;
  error: Error | null;
  onReset: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  error,
  onReset,
}) => {
  const [view, setView] = useState<'cards' | 'insights'>('cards');

  if (loading) {
    return (
      <div className="w-full py-12 animate-fade-in">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          {/* Aurora radar loader */}
          <div className="relative mb-6 h-20 w-20">
            <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,#0ea5e9,transparent)] animate-spin-slow" />
            <span className="absolute inset-[3px] rounded-full bg-white/90 backdrop-blur-sm" />
            <span className="absolute inset-0 flex items-center justify-center text-brand-500">
              <Radar className="h-8 w-8 animate-pulse-soft" />
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-neutral-800 mb-1">
            Scanning the market
          </h3>
          <p className="text-neutral-500">
            Analysing competitors and ranking the best matches&hellip;
          </p>
        </div>

        {/* Skeleton grid mirroring the real result cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CompetitorCardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center animate-fade-in">
        <div className="glass-card rounded-2xl px-10 py-12 flex flex-col items-center text-center max-w-md">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100">
            <SearchX className="h-8 w-8" />
          </div>
          <h3 className="font-display text-xl font-semibold text-neutral-800 mb-2">
            We hit a snag finding competitors
          </h3>
          <p className="text-neutral-500 mb-6">
            {error.message || 'Something went wrong. Please try again.'}
          </p>
          <Button onClick={onReset} className="gap-2 bg-brand-500 hover:bg-brand-600">
            <ArrowLeft size={16} />
            Try another search
          </Button>
        </div>
      </div>
    );
  }

  if (!results || !results.results) {
    return null;
  }

  const hasResults = results.results && results.results.length > 0;
  const count = results.results.length;

  return (
    <div className="w-full animate-fade-in py-4">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-brand-100">
              <ListChecks size={13} />
              {count} {count === 1 ? 'competitor' : 'competitors'} found
            </span>
            {results.query && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                Query:{' '}
                <span className="text-neutral-900 font-semibold">{results.query}</span>
              </span>
            )}
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900">
            Your <span className="text-gradient-brand">competitor</span> landscape
          </h2>
          <p className="mt-1 text-neutral-500">
            Ranked matches from across the market &mdash; open any card to dig deeper.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {hasResults && (
            <div className="inline-flex rounded-lg border border-neutral-200 bg-white/70 p-0.5" role="tablist" aria-label="Results view">
              <button
                role="tab"
                aria-selected={view === 'cards'}
                onClick={() => setView('cards')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                  view === 'cards'
                    ? 'bg-brand-50 text-brand-600 font-medium'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <LayoutGrid size={15} />
                Competitors
              </button>
              <button
                role="tab"
                aria-selected={view === 'insights'}
                onClick={() => setView('insights')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                  view === 'insights'
                    ? 'bg-brand-50 text-brand-600 font-medium'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <BarChart3 size={15} />
                Insights
              </button>
            </div>
          )}
          {hasResults && (
            <Button
              onClick={() => exportResultsToCsv(results)}
              variant="outline"
              size="sm"
              className="gap-2 transition-transform hover:-translate-y-0.5"
            >
              <Download size={16} />
              Export CSV
            </Button>
          )}
          <Button
            onClick={onReset}
            size="sm"
            className="gap-2 bg-brand-500 hover:bg-brand-600 transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            New Search
          </Button>
        </div>
      </div>

      {hasResults ? (
        view === 'insights' ? (
          <CompetitorInsights competitors={results.results} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.results.map((competitor, index) => (
              <CompetitorCard key={index} competitor={competitor} index={index} />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400 ring-1 ring-neutral-200">
            <SearchX className="h-8 w-8" />
          </div>
          <h3 className="font-display text-xl font-semibold text-neutral-800 mb-2">
            No competitors found
          </h3>
          <p className="text-neutral-500 mb-6 max-w-sm">
            We couldn&apos;t find matches for this combination. Try a broader category or a
            different market.
          </p>
          <Button onClick={onReset} className="gap-2 bg-brand-500 hover:bg-brand-600">
            <ArrowLeft size={16} />
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
