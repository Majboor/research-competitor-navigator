
import React from 'react';
import { Competitor } from '../types';
import { ExternalLink } from 'lucide-react';

interface CompetitorCardProps {
  competitor: Competitor;
  index: number;
}

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor, index }) => {
  const animationDelay = `${index * 0.1}s`;
  
  return (
    <div 
      className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-glow animate-fade-up"
      style={{ animationDelay }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-left line-clamp-2 text-balance flex-1">
          {competitor.title}
        </h3>
        <a 
          href={competitor.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-8 w-8 rounded-full bg-brand-100 text-brand-600 hover:bg-brand-200 transition-colors ml-2 flex-shrink-0"
        >
          <ExternalLink size={16} />
        </a>
      </div>
      
      <p className="text-neutral-600 text-sm line-clamp-3 mb-4 text-left">
        {competitor.snippet}
      </p>
      
      <div className="text-xs text-neutral-500 truncate text-left">
        {new URL(competitor.link).hostname}
      </div>
    </div>
  );
};

export default CompetitorCard;
