
import React from 'react';
import { SearchResponse } from '../types';
import CompetitorCard from './CompetitorCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Download } from 'lucide-react';

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
  onReset 
}) => {
  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center animate-fade-in">
        <div className="mb-4 relative">
          <Loader2 className="h-12 w-12 text-brand-500 animate-spin" />
        </div>
        <h3 className="text-xl font-medium text-neutral-700 mb-2">Searching for competitors...</h3>
        <p className="text-neutral-500">We're analyzing the market for you</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center animate-fade-in">
        <div className="bg-red-50 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-neutral-700 mb-2">Error Finding Competitors</h3>
        <p className="text-neutral-500 mb-6">{error.message || 'Something went wrong. Please try again.'}</p>
        <Button onClick={onReset} variant="outline" className="gap-2">
          <ArrowLeft size={16} />
          Start Over
        </Button>
      </div>
    );
  }

  if (!results || !results.results) {
    return null;
  }

  const hasResults = results.results && results.results.length > 0;

  return (
    <div className="w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Your Competitors</h2>
          <p className="text-neutral-500">Based on your search: {results.query}</p>
        </div>
        <div className="flex items-center gap-2">
          {hasResults && (
            <Button
              onClick={() => exportResultsToCsv(results)}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Download size={16} />
              Export CSV
            </Button>
          )}
          <Button onClick={onReset} variant="outline" size="sm" className="gap-2">
            <ArrowLeft size={16} />
            New Search
          </Button>
        </div>
      </div>
      
      {hasResults ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.results.map((competitor, index) => (
            <CompetitorCard key={index} competitor={competitor} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-neutral-700 mb-2">No competitors found</h3>
          <p className="text-neutral-500 mb-6">Try adjusting your search criteria</p>
          <Button onClick={onReset} variant="outline" className="gap-2">
            <ArrowLeft size={16} />
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
