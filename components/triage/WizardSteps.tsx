// components/triage/WizardSteps.tsx
import React from "react";
import {
  TriagePayload,
  SYMPTOM_OPTIONS,
  RED_FLAG_OPTIONS,
} from "@/lib/triage/types";

// 通用卡片样式 helper
const cardBaseClass =
  "relative flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-md";
const cardInactiveClass =
  "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] text-gray-300";
const cardActiveClass =
  "bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)] text-white ring-1 ring-indigo-400";

// 通用输入框样式
const inputClass =
  "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all mt-4";

// --- Step 1: Pet Type ---
export const Step1PetType = ({
  payload,
  onChange,
}: {
  payload: TriagePayload;
  onChange: (u: Partial<TriagePayload>) => void;
}) => {
  const types = ["Dog", "Cat", "Other"] as const;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        What kind of pet do you have?
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {types.map((type) => (
          <div
            key={type}
            onClick={() => onChange({ petType: type })}
            className={`${cardBaseClass} ${
              payload.petType === type ? cardActiveClass : cardInactiveClass
            }`}
          >
            <span className="text-3xl mb-2">
              {type === "Dog" ? "🐕" : type === "Cat" ? "🐈" : "🐾"}
            </span>
            <span className="font-medium">{type}</span>
          </div>
        ))}
      </div>
      {payload.petType === "Other" && (
        <input
          type="text"
          placeholder="Please specify (e.g., Rabbit, Bird)..."
          className={inputClass}
          value={payload.petTypeOther || ""}
          onChange={(e) => onChange({ petTypeOther: e.target.value })}
          autoFocus
        />
      )}
    </div>
  );
};

// --- Step 2: Age Group ---
export const Step2Age = ({
  payload,
  onChange,
}: {
  payload: TriagePayload;
  onChange: (u: Partial<TriagePayload>) => void;
}) => {
  const ages = ["<1", "1-7", "8+"] as const;
  const labels = { "<1": "Puppy / Kitten", "1-7": "Adult", "8+": "Senior" };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        How old is your pet?
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {ages.map((age) => (
          <div
            key={age}
            onClick={() => onChange({ ageGroup: age })}
            className={`${cardBaseClass} flex-row justify-between px-8 py-5 ${
              payload.ageGroup === age ? cardActiveClass : cardInactiveClass
            }`}
          >
            <span className="text-lg font-medium">{labels[age]}</span>
            <span className="opacity-60 font-mono">{age} yrs</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Step 3: Symptoms ---
export const Step3Symptoms = ({
  payload,
  onChange,
}: {
  payload: TriagePayload;
  onChange: (u: Partial<TriagePayload>) => void;
}) => {
  const toggleSymptom = (sym: string) => {
    const current = payload.symptoms;
    if (current.includes(sym)) {
      onChange({ symptoms: current.filter((s) => s !== sym) });
    } else {
      onChange({ symptoms: [...current, sym] });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-2">
        What symptoms are they showing?
      </h2>
      <p className="text-gray-400 text-sm mb-6">Select all that apply.</p>
      <div className="grid grid-cols-2 gap-3">
        {SYMPTOM_OPTIONS.map((sym) => {
          const isSelected = payload.symptoms.includes(sym);
          return (
            <div
              key={sym}
              onClick={() => toggleSymptom(sym)}
              className={`${cardBaseClass} py-4 px-4 text-sm font-medium text-center ${
                isSelected ? cardActiveClass : cardInactiveClass
              }`}
            >
              {sym}
            </div>
          );
        })}
      </div>
      {payload.symptoms.includes("Other") && (
        <input
          type="text"
          placeholder="Describe other symptoms..."
          className={inputClass}
          value={payload.symptomOther || ""}
          onChange={(e) => onChange({ symptomOther: e.target.value })}
        />
      )}
    </div>
  );
};

// --- Step 4: Duration ---
export const Step4Duration = ({
  payload,
  onChange,
}: {
  payload: TriagePayload;
  onChange: (u: Partial<TriagePayload>) => void;
}) => {
  const durations = ["<6h", "6-24h", "1-3d", ">3d"] as const;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        How long has this been going on?
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {durations.map((d) => (
          <div
            key={d}
            onClick={() => onChange({ duration: d })}
            className={`${cardBaseClass} py-4 ${
              payload.duration === d ? cardActiveClass : cardInactiveClass
            }`}
          >
            <span className="font-medium text-lg">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Step 5: Red Flags ---
export const Step5RedFlags = ({
  payload,
  onChange,
}: {
  payload: TriagePayload;
  onChange: (u: Partial<TriagePayload>) => void;
}) => {
  const toggleFlag = (flag: string) => {
    const current = payload.redFlags;
    if (current.includes(flag)) {
      onChange({ redFlags: current.filter((f) => f !== flag) });
    } else {
      onChange({ redFlags: [...current, flag] });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-red-100 mb-2">
        Are there any critical signs?
      </h2>
      <p className="text-red-200/60 text-sm mb-6">
        Please check carefully. These are medical emergencies.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {RED_FLAG_OPTIONS.map((flag) => {
          const isSelected = payload.redFlags.includes(flag);
          return (
            <div
              key={flag}
              onClick={() => toggleFlag(flag)}
              className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-md ${
                isSelected
                  ? "bg-red-500/20 border-red-500/50 text-red-50 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  : "bg-white/5 border-white/10 hover:bg-red-900/10 hover:border-red-500/30 text-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded border mr-4 flex items-center justify-center transition-colors ${
                  isSelected ? "bg-red-500 border-red-500" : "border-gray-500"
                }`}
              >
                {isSelected && <span className="text-xs">✓</span>}
              </div>
              <span className="font-medium">{flag}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
