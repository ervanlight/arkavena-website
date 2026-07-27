import * as React from "react";

export interface ChecklistProps {
  title?: string;
  items: string[];
}

export function Checklist({ title, items }: ChecklistProps) {
  if (items.length === 0) return null;

  return (
    <section className="my-6 rounded-lg border border-[#E8DED0] bg-white p-6">
      {title && (
        <h3 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#0E1B26]">
          {title}
        </h3>
      )}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[#26333C]">
            <span
              aria-hidden="true"
              className="mt-1 inline-block h-4 w-4 shrink-0 rounded-sm border-2 border-[#B88A4A]"
            />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
