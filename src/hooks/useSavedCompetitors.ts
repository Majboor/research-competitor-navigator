import { useCallback, useEffect, useState } from 'react';
import { Competitor } from '../types';

const STORAGE_KEY = 'competitorfinder:saved';
// Custom event so multiple hook instances in the same tab stay in sync
// (the native `storage` event only fires across tabs).
const SYNC_EVENT = 'competitorfinder:saved-changed';

const readStore = (): Competitor[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Competitor[]) : [];
  } catch {
    return [];
  }
};

const writeStore = (items: Competitor[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be full or unavailable (private mode); fail quietly.
  }
  // Notify every hook instance in this tab.
  window.dispatchEvent(new CustomEvent(SYNC_EVENT));
};

/**
 * Persisted shortlist of competitors a user has bookmarked.
 * Identity is the competitor link (unique per result).
 */
export function useSavedCompetitors() {
  const [saved, setSaved] = useState<Competitor[]>(() =>
    typeof window === 'undefined' ? [] : readStore()
  );

  useEffect(() => {
    const refresh = () => setSaved(readStore());
    window.addEventListener(SYNC_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(SYNC_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const isSaved = useCallback(
    (link: string) => saved.some((c) => c.link === link),
    [saved]
  );

  const toggle = useCallback((competitor: Competitor) => {
    const current = readStore();
    const exists = current.some((c) => c.link === competitor.link);
    const next = exists
      ? current.filter((c) => c.link !== competitor.link)
      : [competitor, ...current];
    writeStore(next);
    return !exists;
  }, []);

  const remove = useCallback((link: string) => {
    writeStore(readStore().filter((c) => c.link !== link));
  }, []);

  const clear = useCallback(() => writeStore([]), []);

  return { saved, count: saved.length, isSaved, toggle, remove, clear };
}
