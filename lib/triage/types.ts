// lib/triage/types.ts

export type RiskLevel = "green" | "yellow" | "red";

export type TriagePayload = {
  petType: "Dog" | "Cat" | "Other" | null; // Allow null for initial state
  petTypeOther?: string;
  ageGroup: "<1" | "1-7" | "8+" | null;
  symptoms: string[];
  symptomOther?: string;
  duration: "<6h" | "6-24h" | "1-3d" | ">3d" | null;
  redFlags: string[];
};

export type TriageResult = {
  riskLevel: RiskLevel;
  summary: string;
  actions: string[];
};

export const SYMPTOM_OPTIONS = [
  "Vomiting",
  "Diarrhea",
  "Not eating",
  "Lethargy",
  "Skin issue",
  "Limping",
  "Other",
];

export const RED_FLAG_OPTIONS = [
  "Blood present",
  "Seizure / Fainting",
  "Breathing trouble",
  "Collapse",
  "Severe pain (crying)",
];
