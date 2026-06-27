import { useMemo } from 'react';

export type LandingVariant = 'a' | 'b';

/**
 * Reads the active landing-page variant from the URL query string.
 *
 * Usage:
 *   /            -> variant "a" (default / control)
 *   /?variant=b  -> variant "b" (A/B test challenger)
 *
 * The value is normalised and validated so any unexpected input falls
 * back to the control ("a"). This makes it safe to link people directly
 * to a specific variant for A/B experiments without additional tooling.
 */
export function useVariant(): LandingVariant {
  return useMemo(() => {
    if (typeof window === 'undefined') return 'a';
    const raw = new URLSearchParams(window.location.search)
      .get('variant')
      ?.trim()
      .toLowerCase();
    return raw === 'b' ? 'b' : 'a';
  }, []);
}
