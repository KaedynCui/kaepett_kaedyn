// components/triage/TriageWizard.tsx
"use client";

import React, { useState } from "react";
import { TriagePayload, TriageResult } from "@/lib/triage/types";
import { computeRisk } from "@/lib/triage/computeRisk";
import {
  Step1PetType,
  Step2Age,
  Step3Symptoms,
  Step4Duration,
  Step5RedFlags,
} from "./WizardSteps";
import { TriageResultCard } from "./TriageResult";

const INITIAL_PAYLOAD: TriagePayload = {
  petType: null,
  ageGroup: null,
  symptoms: [],
  duration: null,
  redFlags: [],
};

export default function TriageWizard() {
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [payload, setPayload] = useState<TriagePayload>(INITIAL_PAYLOAD);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [isComputing, setIsComputing] = useState(false);

  const totalSteps = 5;

  const updatePayload = (update: Partial<TriagePayload>) => {
    setPayload((prev) => ({ ...prev, ...update }));
  };
  const canProceed =
    (step === 1 && payload.petType) ||
    (step === 2 && payload.ageGroup) ||
    (step === 3 && payload.symptoms.length > 0) ||
    (step === 4 && payload.duration) ||
    step === 5;
  const handleNext = () => {
    // Basic validation
    if (step === 1 && !payload.petType) return;
    if (step === 2 && !payload.ageGroup) return;
    if (step === 3 && payload.symptoms.length === 0) return;
    if (step === 4 && !payload.duration) return;

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    setIsComputing(true);
    // Simulate tiny delay for UX "thinking" effect
    setTimeout(() => {
      const outcome = computeRisk(payload);
      setResult(outcome);
      setShowResult(true);
      setIsComputing(false);
    }, 800);
  };

  // 用onrestart替代了
  // const handleRestart = () => {
  //   setPayload(INITIAL_PAYLOAD);
  //   setStep(1);
  //   setResult(null);
  // };

  // If we have a result, show the result card
  // ✅ 只有在 showResult 时才显示结果
  if (showResult && result) {
    return (
      <TriageResultCard
        result={result}
        onBack={() => {
          setShowResult(false); // 回到 Wizard
          setStep(totalSteps); // 回到最后一步（可修改 Red Flags）
        }}
        onRestart={() => {
          setShowResult(false);
          setPayload(INITIAL_PAYLOAD);
          setStep(1);
          setResult(null);
        }}
      />
    );
  }

  // Loading State
  if (isComputing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 animate-pulse text-sm text-center">
          Reviewing your answers and checking for common risk signals…
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
          <span>Triage Assessment</span>
          <span>
            {step} / {totalSteps}
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/40 min-h-[400px] flex flex-col">
        <div className="flex-grow">
          {step === 1 && (
            <Step1PetType payload={payload} onChange={updatePayload} />
          )}
          {step === 2 && (
            <Step2Age payload={payload} onChange={updatePayload} />
          )}
          {step === 3 && (
            <Step3Symptoms payload={payload} onChange={updatePayload} />
          )}
          {step === 4 && (
            <Step4Duration payload={payload} onChange={updatePayload} />
          )}
          {step === 5 && (
            <Step5RedFlags payload={payload} onChange={updatePayload} />
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-white/5">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-xl bg-transparent border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-colors font-medium"
            >
              Back
            </button>
          ) : (
            <div className="w-[88px]" /> /* Spacer */
          )}

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`
    flex-1 px-6 py-3 rounded-xl font-bold
    transition-all flex items-center justify-center gap-2
    ${
      canProceed
        ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02]"
        : "bg-indigo-600/40 text-white/40 cursor-not-allowed"
    }
  `}
          >
            {step === totalSteps ? "Get Result" : "Next"}
            {step !== totalSteps && (
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
