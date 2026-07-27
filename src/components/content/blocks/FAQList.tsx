import * as React from "react";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FAQListProps {
  title?: string;
  items: FaqEntry[];
}

/**
 * FAQ answers must be visible in the page body — FAQ structured data may never
 * describe content the visitor cannot read (ARCHITECTURE.md §12.5).
 */
export function FAQList({ title = "Pertanyaan umum", items }: FAQListProps) {
  if (items.length === 0) return null;

  return (
    <section className="my-10">
      <h2 className="mb-5 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0E1B26]">
        {title}
      </h2>
      <dl className="divide-y divide-[#E8DED0] rounded-lg border border-[#E8DED0] bg-white">
        {items.map((entry) => (
          <div key={entry.question} className="px-6 py-5">
            <dt className="font-semibold text-[#0E1B26]">{entry.question}</dt>
            <dd className="mt-2 leading-relaxed text-[#26333C]">{entry.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
