import React, { useState } from 'react';
import { Competitor } from '../types';
import { ExternalLink, Globe, ArrowUpRight, Bookmark } from 'lucide-react';
import { useSavedCompetitors } from '@/hooks/useSavedCompetitors';
import { safeHostname, safeHref } from '@/lib/url';
import { cn } from '@/lib/utils';

interface CompetitorCardProps {
  competitor: Competitor;
  index: number;
}

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor, index }) => {
  const animationDelay = `${index * 0.08}s`;
  const href = safeHref(competitor.link);
  const hostname = safeHostname(competitor.link).replace(/^www\./, '');
  const [faviconOk, setFaviconOk] = useState(true);
  const initial = (hostname.replace(/^[^a-z0-9]*/i, '')[0] || '?').toUpperCase();
  const { isSaved, toggle } = useSavedCompetitors();
  const saved = isSaved(competitor.link);
  const title = competitor.title || 'Untitled competitor';

  return (
    <div
      className="group glass-card lift-card relative block rounded-2xl p-6 animate-rise-in border-neutral-200/70 hover:border-brand-300/70"
      style={{ animationDelay }}
    >
      {/* Hover accent bar */}
      <span className="accent-bar pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-brand-400 via-brand-500 to-indigo-500" />

      {/* Full-card click target for visiting the site (inert when the URL is unusable) */}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0 rounded-2xl"
          aria-label={`Visit ${title}`}
        />
      )}

      <div className="relative z-10 pointer-events-none flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Favicon with graceful monogram fallback */}
          <div className="relative h-10 w-10 flex-shrink-0 rounded-xl bg-white ring-1 ring-neutral-200/80 shadow-subtle flex items-center justify-center overflow-hidden">
            {faviconOk && hostname ? (
              <img
                src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`}
                alt=""
                loading="lazy"
                className="h-6 w-6"
                onError={() => setFaviconOk(false)}
              />
            ) : (
              <span className="text-sm font-semibold text-brand-600">{initial}</span>
            )}
          </div>
          <div className="min-w-0">
            {/* Rank pill */}
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-600">
              #{index + 1}
            </span>
            {hostname && (
              <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500 truncate">
                <Globe size={12} className="flex-shrink-0" />
                <span className="truncate">{hostname}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Save / bookmark toggle */}
          <button
            type="button"
            onClick={() => toggle(competitor)}
            aria-pressed={saved}
            aria-label={saved ? 'Remove from saved' : 'Save competitor'}
            title={saved ? 'Remove from saved' : 'Save competitor'}
            className={cn(
              'pointer-events-auto relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors',
              saved
                ? 'bg-brand-500 text-white hover:bg-brand-600'
                : 'bg-neutral-100 text-neutral-500 hover:bg-brand-100 hover:text-brand-600'
            )}
          >
            <Bookmark size={16} className={saved ? 'fill-current' : ''} />
          </button>

          <span
            className={cn(
              'pointer-events-none flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300',
              href
                ? 'bg-neutral-100 text-neutral-400 group-hover:bg-brand-500 group-hover:text-white group-hover:scale-110'
                : 'bg-neutral-100 text-neutral-300'
            )}
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>

      <h3 className="relative z-10 pointer-events-none font-display font-semibold text-lg text-left leading-snug line-clamp-2 text-balance break-words text-neutral-900 transition-colors group-hover:text-brand-700">
        {title}
      </h3>

      <p className="relative z-10 pointer-events-none mt-2 text-neutral-600 text-sm leading-relaxed line-clamp-3 text-left break-words">
        {competitor.snippet || 'No description available.'}
      </p>

      <div className="relative z-10 pointer-events-none mt-5 flex items-center justify-between border-t border-neutral-200/60 pt-4">
        <span className="text-xs font-medium text-neutral-400">Competitor result</span>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300',
            href
              ? 'text-brand-600 opacity-70 group-hover:opacity-100 group-hover:gap-2.5'
              : 'text-neutral-300'
          )}
        >
          {href ? 'Visit site' : 'No link'}
          <ExternalLink size={14} />
        </span>
      </div>
    </div>
  );
};

export default CompetitorCard;
