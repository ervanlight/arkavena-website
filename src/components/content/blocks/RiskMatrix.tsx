import * as React from "react";
import { cn } from "@/lib/utils";

export type RiskLevel = "rendah" | "sedang" | "tinggi";

export interface RiskEntry {
  risk: string;
  likelihood: RiskLevel;
  impact: RiskLevel;
  mitigation: string;
}

const LEVEL_STYLES: Record<RiskLevel, string> = {
  rendah: "bg-[#25775A]/10 text-[#25775A]",
  sedang: "bg-[#A76B1F]/10 text-[#A76B1F]",
  tinggi: "bg-[#A33C3C]/10 text-[#A33C3C]",
};

function LevelTag({ level }: { level: RiskLevel }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
        LEVEL_STYLES[level]
      )}
    >
      {level}
    </span>
  );
}

export interface RiskMatrixProps {
  caption?: string;
  entries: RiskEntry[];
}

export function RiskMatrix({ caption, entries }: RiskMatrixProps) {
  if (entries.length === 0) return null;

  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg border border-[#E8DED0] bg-white">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-[#1C2D38] text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Risiko</th>
              <th scope="col" className="px-4 py-3 font-semibold">Kemungkinan</th>
              <th scope="col" className="px-4 py-3 font-semibold">Dampak</th>
              <th scope="col" className="px-4 py-3 font-semibold">Pengendalian</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.risk} className="border-t border-[#E8DED0] text-[#26333C]">
                <th scope="row" className="px-4 py-3 font-medium text-[#0E1B26]">
                  {entry.risk}
                </th>
                <td className="px-4 py-3">
                  <LevelTag level={entry.likelihood} />
                </td>
                <td className="px-4 py-3">
                  <LevelTag level={entry.impact} />
                </td>
                <td className="px-4 py-3 leading-relaxed">{entry.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-[#68757D]">{caption}</figcaption>
      )}
    </figure>
  );
}
