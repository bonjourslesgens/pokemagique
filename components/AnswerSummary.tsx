"use client";

import type { QuestionStepConfig } from "@/lib/questionnaire";
import type { QuestionnaireAnswers } from "@/lib/types";

interface AnswerSummaryProps {
  steps: QuestionStepConfig[];
  answers: QuestionnaireAnswers;
  onEditStep: (index: number) => void;
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (typeof value === "string") return value || "Non renseigné";
  return "Non renseigné";
}

export default function AnswerSummary({ steps, answers, onEditStep }: AnswerSummaryProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/80 bg-white/86 p-5 shadow-card backdrop-blur sm:p-7">
      <div className="mb-7">
        <h2 className="text-3xl font-black text-pokedex-ink">Récapitulatif de tes réponses</h2>
        <p className="mt-2 max-w-2xl leading-7 text-pokedex-ink/70">
          Vérifie tout avant la génération finale. Tu peux revenir modifier une étape.
        </p>
      </div>

      <div className="grid gap-4">
        {steps.map((step, stepIndex) => (
          <article key={step.title} className="rounded-2xl border border-pokedex-ink/10 bg-white p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-black text-pokedex-ink">{step.title}</h3>
              <button
                type="button"
                onClick={() => onEditStep(stepIndex)}
                className="rounded-full border border-pokedex-blue/25 px-4 py-2 text-sm font-black text-pokedex-blue transition hover:bg-pokedex-blue hover:text-white"
              >
                Modifier
              </button>
            </div>
            <dl className="grid gap-3 md:grid-cols-2">
              {step.fields.map((field) => (
                <div key={String(field.name)} className="rounded-xl bg-pokedex-cream px-3 py-2">
                  <dt className="text-xs font-black uppercase tracking-[0.12em] text-pokedex-ink/56">
                    {field.label}
                  </dt>
                  <dd className="mt-1 break-words font-semibold text-pokedex-ink">
                    {formatValue(answers[field.name])}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
