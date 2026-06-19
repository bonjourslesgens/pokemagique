"use client";

import type { QuestionField, QuestionStepConfig } from "@/lib/questionnaire";
import type { QuestionnaireAnswers } from "@/lib/types";

interface QuestionStepProps {
  step: QuestionStepConfig;
  answers: QuestionnaireAnswers;
  errors: Record<string, string>;
  onTextChange: (name: keyof QuestionnaireAnswers, value: string) => void;
  onTupleChange: (name: keyof QuestionnaireAnswers, index: number, value: string) => void;
  onToggle: (name: keyof QuestionnaireAnswers, value: string) => void;
}

function fieldError(errors: Record<string, string>, field: QuestionField, index?: number) {
  return index === undefined
    ? errors[field.name]
    : errors[`${String(field.name)}.${index}`] ?? errors[field.name];
}

export default function QuestionStep({
  step,
  answers,
  errors,
  onTextChange,
  onTupleChange,
  onToggle
}: QuestionStepProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/80 bg-white/86 p-5 shadow-card backdrop-blur sm:p-7">
      <div className="mb-7">
        <h2 className="text-3xl font-black text-pokedex-ink">{step.title}</h2>
        <p className="mt-2 max-w-2xl leading-7 text-pokedex-ink/70">{step.description}</p>
      </div>

      <div className="space-y-7">
        {step.fields.map((field) => (
          <div key={String(field.name)} className="space-y-3">
            <label className="block text-base font-black text-pokedex-ink">
              {field.label}
              {field.required ? <span className="text-pokedex-red"> *</span> : null}
            </label>

            {field.kind === "text" ? (
              <input
                value={(answers[field.name] as string) ?? ""}
                onChange={(event) => onTextChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-2xl border border-pokedex-ink/15 bg-white px-4 py-3 outline-none ring-pokedex-blue/20 transition focus:border-pokedex-blue focus:ring-4"
              />
            ) : null}

            {field.kind === "textarea" ? (
              <textarea
                value={(answers[field.name] as string) ?? ""}
                onChange={(event) => onTextChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className="w-full resize-y rounded-2xl border border-pokedex-ink/15 bg-white px-4 py-3 outline-none ring-pokedex-blue/20 transition focus:border-pokedex-blue focus:ring-4"
              />
            ) : null}

            {field.kind === "radio" ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {field.options?.map((option) => {
                  const selected = answers[field.name] === option;
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => onTextChange(field.name, option)}
                      className={`rounded-2xl border px-4 py-3 text-left font-bold transition ${
                        selected
                          ? "border-pokedex-red bg-pokedex-red text-white shadow-sm"
                          : "border-pokedex-ink/12 bg-white text-pokedex-ink hover:border-pokedex-blue"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {field.kind === "checkbox" ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {field.options?.map((option) => {
                  const values = (answers[field.name] as string[]) ?? [];
                  const selected = values.includes(option);
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => onToggle(field.name, option)}
                      className={`rounded-2xl border px-4 py-3 text-left font-bold transition ${
                        selected
                          ? "border-pokedex-blue bg-pokedex-blue text-white shadow-sm"
                          : "border-pokedex-ink/12 bg-white text-pokedex-ink hover:border-pokedex-blue"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {field.kind === "tripleText" || field.kind === "doubleText" ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {Array.from({ length: field.kind === "tripleText" ? 3 : 2 }).map((_, index) => {
                  const values = (answers[field.name] as string[]) ?? [];
                  return (
                    <div key={`${String(field.name)}-${index}`} className="space-y-2">
                      <input
                        value={values[index] ?? ""}
                        onChange={(event) => onTupleChange(field.name, index, event.target.value)}
                        placeholder={`${index + 1}`}
                        className="w-full rounded-2xl border border-pokedex-ink/15 bg-white px-4 py-3 outline-none ring-pokedex-blue/20 transition focus:border-pokedex-blue focus:ring-4"
                      />
                      {fieldError(errors, field, index) ? (
                        <p className="text-sm font-bold text-pokedex-red">
                          {fieldError(errors, field, index)}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}

            {field.kind !== "tripleText" && field.kind !== "doubleText" && fieldError(errors, field) ? (
              <p className="text-sm font-bold text-pokedex-red">{fieldError(errors, field)}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
