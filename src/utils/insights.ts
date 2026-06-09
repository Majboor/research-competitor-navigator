import { Competitor } from '../types';

/**
 * Client-side competitive-intelligence engine.
 *
 * Turns a flat list of competitor search results into structured insights:
 * market concentration, the dominant domains, and the positioning themes
 * (keywords) that rivals lean on in their titles and descriptions.
 *
 * Everything here is pure and synchronous — no network, no side effects —
 * so it renders instantly and is trivial to reason about and test.
 */

export interface DomainStat {
  domain: string;
  count: number;
  share: number; // 0..1 of total competitors
  sampleLink: string;
}

export interface KeywordStat {
  word: string;
  count: number;
}

export interface TldStat {
  tld: string;
  count: number;
}

export interface CompetitorInsights {
  totalCompetitors: number;
  uniqueDomains: number;
  /** Herfindahl-style concentration, 0 (fragmented) .. 1 (monopoly). */
  concentration: number;
  concentrationLabel: 'Fragmented' | 'Moderate' | 'Concentrated';
  /** Share held by the single most-frequent domain, 0..1. */
  topDomainShare: number;
  topDomains: DomainStat[];
  topKeywords: KeywordStat[];
  tlds: TldStat[];
}

// Common English + e-commerce boilerplate words that carry no signal.
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'you', 'your', 'with', 'from', 'that', 'this', 'are',
  'our', 'all', 'best', 'new', 'get', 'buy', 'shop', 'shopping', 'store',
  'stores', 'online', 'sale', 'sales', 'price', 'prices', 'free', 'shipping',
  'deals', 'deal', 'offer', 'offers', 'more', 'find', 'browse', 'top', 'com',
  'www', 'https', 'http', 'official', 'site', 'website', 'home', 'page',
  'products', 'product', 'brand', 'brands', 'quality', 'great', 'over',
  'out', 'now', 'can', 'has', 'have', 'will', 'about', 'into', 'their', 'them',
  'they', 'was', 'were', 'been', 'its', 'not', 'but', 'per', 'each', 'any',
  'one', 'two', 'also', 'via', 'inc', 'ltd', 'llc', 'co', 'wide', 'range',
]);

/** Extract a clean, lowercased hostname without a leading "www.". */
export function domainOf(link: string): string {
  try {
    return new URL(link).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    // Fall back to a best-effort parse for malformed links.
    const stripped = link.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
    return stripped.split('/')[0].toLowerCase() || 'unknown';
  }
}

/** Top-level domain suffix, e.g. "com", "co.uk". */
function tldOf(domain: string): string {
  const parts = domain.split('.');
  if (parts.length <= 1) return domain;
  const last = parts[parts.length - 1];
  const secondLast = parts[parts.length - 2];
  // Recognise common two-part public suffixes.
  const compound = new Set(['co', 'com', 'org', 'gov', 'ac', 'net']);
  if (parts.length >= 3 && compound.has(secondLast)) {
    return `${secondLast}.${last}`;
  }
  return last;
}

function tallyKeywords(competitors: Competitor[], limit: number): KeywordStat[] {
  const counts = new Map<string, number>();
  for (const c of competitors) {
    const text = `${c.title ?? ''} ${c.snippet ?? ''}`.toLowerCase();
    // Words = runs of letters (3+ chars); drops numbers, punctuation, symbols.
    const words = text.match(/[a-z][a-z'-]{2,}/g) ?? [];
    // De-dupe within a single competitor so one verbose listing can't dominate.
    const seen = new Set<string>();
    for (const raw of words) {
      const word = raw.replace(/^['-]+|['-]+$/g, '');
      if (word.length < 3 || STOP_WORDS.has(word) || seen.has(word)) continue;
      seen.add(word);
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .filter((k) => k.count > 1) // a theme must recur across >=2 rivals
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit);
}

export function computeInsights(competitors: Competitor[]): CompetitorInsights {
  const total = competitors.length;

  const domainCounts = new Map<string, { count: number; sampleLink: string }>();
  const tldCounts = new Map<string, number>();

  for (const c of competitors) {
    const domain = domainOf(c.link);
    const existing = domainCounts.get(domain);
    if (existing) {
      existing.count += 1;
    } else {
      domainCounts.set(domain, { count: 1, sampleLink: c.link });
    }
    const tld = tldOf(domain);
    tldCounts.set(tld, (tldCounts.get(tld) ?? 0) + 1);
  }

  const topDomains: DomainStat[] = [...domainCounts.entries()]
    .map(([domain, { count, sampleLink }]) => ({
      domain,
      count,
      share: total ? count / total : 0,
      sampleLink,
    }))
    .sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain));

  // Herfindahl-Hirschman Index on domain shares → normalized concentration.
  const hhi = topDomains.reduce((sum, d) => sum + d.share * d.share, 0);
  const topDomainShare = topDomains.length ? topDomains[0].share : 0;

  let concentrationLabel: CompetitorInsights['concentrationLabel'] = 'Fragmented';
  if (hhi >= 0.25) concentrationLabel = 'Concentrated';
  else if (hhi >= 0.12) concentrationLabel = 'Moderate';

  const tlds: TldStat[] = [...tldCounts.entries()]
    .map(([tld, count]) => ({ tld, count }))
    .sort((a, b) => b.count - a.count || a.tld.localeCompare(b.tld))
    .slice(0, 6);

  return {
    totalCompetitors: total,
    uniqueDomains: domainCounts.size,
    concentration: hhi,
    concentrationLabel,
    topDomainShare,
    topDomains: topDomains.slice(0, 8),
    topKeywords: tallyKeywords(competitors, 18),
    tlds,
  };
}
