/**
 * Safely derive a human-readable hostname from an arbitrary URL string.
 *
 * The competitor `link` comes from an external API and is not guaranteed to be
 * a well-formed absolute URL. Calling `new URL(link)` on a malformed or empty
 * value throws, which — inside a `.map()` render — would crash the entire
 * results grid. This helper never throws and always returns a display string.
 */
export function safeHostname(rawUrl: string | null | undefined): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  try {
    return new URL(trimmed).hostname;
  } catch {
    // Retry assuming the scheme was omitted (e.g. "example.com/path").
    try {
      return new URL(`https://${trimmed}`).hostname;
    } catch {
      // Last resort: strip scheme/path manually so we still show something.
      return trimmed
        .replace(/^[a-z]+:\/\//i, '')
        .split('/')[0]
        .split('?')[0]
        .trim();
    }
  }
}

/**
 * Returns a safe href for an anchor tag. If the value isn't a usable URL we
 * return `undefined` so the link is inert rather than pointing somewhere wrong.
 */
export function safeHref(rawUrl: string | null | undefined): string | undefined {
  if (!rawUrl || typeof rawUrl !== 'string') return undefined;
  const trimmed = rawUrl.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[\w.-]+\.[a-z]{2,}(\/|$|\?)/i.test(trimmed)) return `https://${trimmed}`;
  return undefined;
}
