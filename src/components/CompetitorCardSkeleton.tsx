import React from 'react';

interface CompetitorCardSkeletonProps {
  index?: number;
}

/**
 * Premium shimmer skeleton that mirrors the real CompetitorCard layout so the
 * transition from loading -> loaded feels seamless rather than jarring.
 */
const CompetitorCardSkeleton: React.FC<CompetitorCardSkeletonProps> = ({ index = 0 }) => {
  return (
    <div
      className="glass-card rounded-2xl p-6 animate-rise-in"
      style={{ animationDelay: `${index * 0.08}s` }}
      aria-hidden="true"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="skeleton-shimmer h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <div className="skeleton-shimmer h-3.5 w-28 rounded-full" />
            <div className="skeleton-shimmer h-2.5 w-16 rounded-full" />
          </div>
        </div>
        <div className="skeleton-shimmer h-6 w-6 rounded-full" />
      </div>

      <div className="space-y-2.5 mb-5">
        <div className="skeleton-shimmer h-3 w-full rounded-full" />
        <div className="skeleton-shimmer h-3 w-11/12 rounded-full" />
        <div className="skeleton-shimmer h-3 w-3/5 rounded-full" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-200/60">
        <div className="skeleton-shimmer h-2.5 w-24 rounded-full" />
        <div className="skeleton-shimmer h-7 w-20 rounded-lg" />
      </div>
    </div>
  );
};

export default CompetitorCardSkeleton;
