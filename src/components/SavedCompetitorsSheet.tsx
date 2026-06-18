import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bookmark, ExternalLink, Trash2, Download } from 'lucide-react';
import { useSavedCompetitors } from '@/hooks/useSavedCompetitors';
import { Competitor } from '../types';

const escapeCsv = (value: string) => `"${(value ?? '').replace(/"/g, '""')}"`;

const exportSavedToCsv = (items: Competitor[]) => {
  const header = ['Title', 'Link', 'Snippet'];
  const rows = items.map((c) =>
    [escapeCsv(c.title), escapeCsv(c.link), escapeCsv(c.snippet)].join(',')
  );
  const csv = [header.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'saved-competitors.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const hostOf = (link: string) => {
  try {
    return new URL(link).hostname;
  } catch {
    return link;
  }
};

interface SavedCompetitorsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SavedCompetitorsSheet: React.FC<SavedCompetitorsSheetProps> = ({
  open,
  onOpenChange,
}) => {
  const { saved, remove, clear } = useSavedCompetitors();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <Bookmark size={18} className="text-brand-600" />
            Saved competitors
          </SheetTitle>
          <SheetDescription>
            Your shortlist is stored in this browser so it's here next time you visit.
          </SheetDescription>
        </SheetHeader>

        {saved.length > 0 && (
          <div className="flex items-center gap-2 py-3 border-b border-neutral-200">
            <Button
              onClick={() => exportSavedToCsv(saved)}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Download size={16} />
              Export CSV
            </Button>
            <Button
              onClick={clear}
              variant="ghost"
              size="sm"
              className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
              Clear all
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
          {saved.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="bg-brand-50 text-brand-500 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Bookmark size={24} />
              </div>
              <h3 className="font-medium text-neutral-700 mb-1">Nothing saved yet</h3>
              <p className="text-sm text-neutral-500 max-w-xs">
                Tap the bookmark icon on any competitor to add it to your shortlist.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {saved.map((competitor) => (
                <li
                  key={competitor.link}
                  className="group rounded-xl border border-neutral-200 p-4 hover:border-brand-200 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-medium text-sm text-neutral-800 line-clamp-2 flex-1">
                      {competitor.title}
                    </h4>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <a
                        href={competitor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-7 w-7 rounded-full flex items-center justify-center text-brand-600 hover:bg-brand-100 transition-colors"
                        aria-label="Open competitor site"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => remove(competitor.link)}
                        className="h-7 w-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Remove from saved"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 truncate">
                    {hostOf(competitor.link)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SavedCompetitorsSheet;
