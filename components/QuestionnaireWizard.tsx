"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AnswerSummary from "@/components/AnswerSummary";
import ProgressBar from "@/components/ProgressBar";
import QuestionStep from "@/components/QuestionStep";
import {
  emptyAnswers,
  exampleAnswers,
  questionnaireSteps,
  type QuestionField
} from "@/lib/questionnaire";
import { validateQuestionnaireAnswers } from "@/lib/validation";
import type { QuestionnaireAnswers } from "@/lib/types";

function fieldHasError(field: QuestionField, errors: Record<string, string>) {
  return (
    Boolean(errors[field.name]) ||
    Object.keys(errors).some((key) => key.startsWith(`${String(field.name)}.`))
  );
}

export default function QuestionnaireWizard() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(emptyAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const currentStep = questionnaireSteps[stepIndex];
  const validation = useMemo(() => validateQuestionnaireAnswers(answers), [answers]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const saved = window.localStorage.getItem("pokemagique-answers");
      if (!saved) return;

      try {
        setAnswers({ ...emptyAnswers, ...JSON.parse(saved) });
      } catch {
        window.localStorage.removeItem("pokemagique-answers");
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("pokemagique-answers", JSON.stringify(answers));
  }, [answers]);

  function updateText(name: keyof QuestionnaireAnswers, value: string) {
    setAnswers((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function updateTuple(name: keyof QuestionnaireAnswers, index: number, value: string) {
    setAnswers((previous) => {
      const tuple = [...((previous[name] as string[]) ?? [])];
      tuple[index] = value;
      return { ...previous, [name]: tuple };
    });
    setErrors((previous) => ({ ...previous, [`${String(name)}.${index}`]: "" }));
  }

  function toggleValue(name: keyof QuestionnaireAnswers, value: string) {
    setAnswers((previous) => {
      const current = ((previous[name] as string[]) ?? []) as string[];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...previous, [name]: next };
    });
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  function goNext() {
    const nextValidation = validateQuestionnaireAnswers(answers);
    const stepHasErrors = currentStep.fields.some((field) => fieldHasError(field, nextValidation.errors));

    if (stepHasErrors) {
      setErrors(nextValidation.errors);
      return;
    }

    if (stepIndex === questionnaireSteps.length - 1) {
      setShowSummary(true);
      setErrors(nextValidation.errors);
      return;
    }

    setStepIndex((index) => index + 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPrevious() {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    setStepIndex((index) => Math.max(0, index - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editStep(index: number) {
    setStepIndex(index);
    setShowSummary(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function generateProfile() {
    const nextValidation = validateQuestionnaireAnswers(answers);
    setErrors(nextValidation.errors);
    setSubmitError("");

    if (!nextValidation.valid) {
      setShowSummary(false);
      const firstErrorStep = questionnaireSteps.findIndex((step) =>
        step.fields.some((field) => fieldHasError(field, nextValidation.errors))
      );
      setStepIndex(Math.max(0, firstErrorStep));
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Impossible de générer le profil.");
      }

      window.sessionStorage.setItem("pokemagique-profile", JSON.stringify(payload.profile));
      window.localStorage.setItem("pokemagique-answers", JSON.stringify(answers));
      router.push("/resultat");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Une erreur inconnue est survenue."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-pokedex-red">
            Questionnaire Pokédex
          </p>
          <h1 className="mt-2 text-4xl font-black text-pokedex-ink">Crée ton Pokémagique</h1>
        </div>
        {process.env.NODE_ENV !== "production" ? (
          <button
            type="button"
            onClick={() => {
              setAnswers(exampleAnswers);
              setErrors({});
            }}
            className="rounded-full border border-pokedex-ink/15 bg-white px-4 py-2 text-sm font-black text-pokedex-ink shadow-sm transition hover:-translate-y-0.5"
          >
            Remplir avec un exemple
          </button>
        ) : null}
      </div>

      <div className="mb-6 rounded-3xl border border-white/80 bg-white/72 p-4 shadow-sm backdrop-blur">
        <ProgressBar
          current={showSummary ? questionnaireSteps.length : stepIndex + 1}
          total={questionnaireSteps.length}
        />
      </div>

      {showSummary ? (
        <AnswerSummary steps={questionnaireSteps} answers={answers} onEditStep={editStep} />
      ) : (
        <QuestionStep
          step={currentStep}
          answers={answers}
          errors={errors}
          onTextChange={updateText}
          onTupleChange={updateTuple}
          onToggle={toggleValue}
        />
      )}

      {submitError ? (
        <div className="mt-5 rounded-2xl border border-pokedex-red/20 bg-red-50 px-4 py-3 font-bold text-pokedex-red">
          {submitError}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={goPrevious}
          disabled={stepIndex === 0 && !showSummary}
          className="rounded-full border border-pokedex-ink/15 bg-white px-6 py-3 font-black text-pokedex-ink transition hover:bg-pokedex-cream disabled:cursor-not-allowed disabled:opacity-45"
        >
          Précédent
        </button>

        {showSummary ? (
          <button
            type="button"
            onClick={generateProfile}
            disabled={isGenerating || !validation.valid}
            className="rounded-full bg-pokedex-red px-7 py-3 font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-red-600 disabled:cursor-wait disabled:opacity-60"
          >
            {isGenerating ? "Génération en cours..." : "Générer mon Pokémagique"}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-pokedex-ink px-7 py-3 font-black text-white shadow-card transition hover:-translate-y-0.5"
          >
            {stepIndex === questionnaireSteps.length - 1 ? "Voir le récapitulatif" : "Suivant"}
          </button>
        )}
      </div>
    </div>
  );
}
