import * as React from "react";

export interface ProcessStep {
  title: string;
  description: string;
  output?: string;
}

export interface ProcessStepsProps {
  title?: string;
  steps: ProcessStep[];
}

export function ProcessSteps({ title, steps }: ProcessStepsProps) {
  if (steps.length === 0) return null;

  return (
    <section className="my-8">
      {title && (
        <h3 className="mb-5 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0E1B26]">
          {title}
        </h3>
      )}
      <ol className="space-y-5 border-l border-[#E8DED0] pl-6">
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full bg-[#B88A4A] text-xs font-bold text-white"
            >
              {index + 1}
            </span>
            <h4 className="font-semibold text-[#0E1B26]">{step.title}</h4>
            <p className="mt-1 leading-relaxed text-[#26333C]">{step.description}</p>
            {step.output && (
              <p className="mt-1 text-sm text-[#68757D]">
                <span className="font-semibold">Keluaran:</span> {step.output}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
