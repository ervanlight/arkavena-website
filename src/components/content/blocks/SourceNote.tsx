import * as React from "react";

export interface SourceEntry {
  label: string;
  url: string;
  publisher?: string | null;
  accessedAt?: string | null;
}

export interface SourceNoteProps {
  title?: string;
  sources: SourceEntry[];
}

/**
 * Any external factual claim needs a source or explicit owner verification
 * (ARCHITECTURE.md §19, rule 14).
 */
export function SourceNote({ title = "Sumber", sources }: SourceNoteProps) {
  if (sources.length === 0) return null;

  return (
    <section className="my-8 rounded-lg border border-[#E8DED0] bg-[#ECE8E1] p-5">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#68757D]">
        {title}
      </h3>
      <ol className="space-y-2 text-sm text-[#26333C]">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="font-medium text-[#0E1B26] underline underline-offset-2 hover:text-[#B88A4A]"
            >
              {source.label}
            </a>
            {source.publisher && <span className="text-[#68757D]"> — {source.publisher}</span>}
            {source.accessedAt && (
              <span className="text-[#68757D]"> (diakses {source.accessedAt})</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
