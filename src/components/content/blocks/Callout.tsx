import * as React from "react";
import { cn } from "@/lib/utils";

export type CalloutTone = "info" | "warning" | "risk" | "success";

const TONES: Record<CalloutTone, { wrapper: string; label: string }> = {
  info: { wrapper: "border-[#1C2D38]/20 bg-[#1C2D38]/5", label: "Catatan" },
  warning: { wrapper: "border-[#A76B1F]/30 bg-[#A76B1F]/8", label: "Perhatian" },
  risk: { wrapper: "border-[#A33C3C]/30 bg-[#A33C3C]/8", label: "Risiko" },
  success: { wrapper: "border-[#25775A]/30 bg-[#25775A]/8", label: "Rekomendasi" },
};

export interface CalloutProps {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ tone = "info", title, children }: CalloutProps) {
  const preset = TONES[tone];

  return (
    <aside
      className={cn(
        "my-6 rounded-lg border-l-4 px-5 py-4 text-[#26333C]",
        preset.wrapper
      )}
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#68757D]">
        {title ?? preset.label}
      </p>
      <div className="space-y-2 text-base leading-relaxed">{children}</div>
    </aside>
  );
}
