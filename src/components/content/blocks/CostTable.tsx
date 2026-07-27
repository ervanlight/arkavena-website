import * as React from "react";

export interface CostRow {
  item: string;
  unit?: string;
  low?: string;
  high?: string;
  note?: string;
}

export interface CostTableProps {
  caption: string;
  /** Date the figures were gathered. Required for any published cost content. */
  dataAsOf: string;
  rows: CostRow[];
}

export function CostTable({ caption, dataAsOf, rows }: CostTableProps) {
  if (rows.length === 0) return null;

  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg border border-[#E8DED0] bg-white">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-[#1C2D38] text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Item</th>
              <th scope="col" className="px-4 py-3 font-semibold">Satuan</th>
              <th scope="col" className="px-4 py-3 font-semibold">Kisaran bawah</th>
              <th scope="col" className="px-4 py-3 font-semibold">Kisaran atas</th>
              <th scope="col" className="px-4 py-3 font-semibold">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item} className="border-t border-[#E8DED0] text-[#26333C]">
                <th scope="row" className="px-4 py-3 font-medium text-[#0E1B26]">
                  {row.item}
                </th>
                <td className="px-4 py-3">{row.unit ?? "—"}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-ibm-plex-mono)]">
                  {row.low ?? "—"}
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-ibm-plex-mono)]">
                  {row.high ?? "—"}
                </td>
                <td className="px-4 py-3 text-[#68757D]">{row.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-sm text-[#68757D]">
        {caption} · Data per {dataAsOf}. Angka bersifat indikatif dan perlu
        diverifikasi ulang untuk setiap proyek.
      </figcaption>
    </figure>
  );
}
