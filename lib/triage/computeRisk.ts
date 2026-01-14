// lib/triage/computeRisk.ts
import { TriagePayload, TriageResult } from "./types";

export function computeRisk(payload: TriagePayload): TriageResult {
  const { redFlags = [], duration, symptoms = [], ageGroup } = payload;

  // ---- helpers ----
  const has = (s: string) => symptoms.includes(s);
  const hasAny = (arr: string[]) => arr.some((x) => symptoms.includes(x));
  const hasRed = (keyword: string) =>
    redFlags.some((rf) => rf.toLowerCase().includes(keyword.toLowerCase()));

  const isSenior = ageGroup === "8+";
  const isYoung = ageGroup === "<1";

  const dur = duration ?? "<6h";
  const durWeight =
    dur === "<6h" ? 0 : dur === "6-24h" ? 1 : dur === "1-3d" ? 2 : 3;

  // ---- 1) RED: emergency / urgent care now ----
  // Treat these as urgent regardless of other info.
  // Note: your RED_FLAG_OPTIONS include combined labels; we match by keywords.
  const emergencyRed =
    redFlags.length > 0 &&
    (hasRed("breathing") ||
      hasRed("seizure") ||
      hasRed("faint") ||
      hasRed("collapse") ||
      hasRed("severe pain") ||
      hasRed("cry") ||
      hasRed("blood"));

  if (emergencyRed) {
    return {
      riskLevel: "red",
      summary:
        "Some warning signs can be urgent. It’s safest to seek veterinary care now.",
      actions: [
        "Go to an emergency vet (or the nearest open clinic) as soon as possible.",
        "If your pet is struggling to breathe, collapsing, seizing, or in severe pain, treat it as an emergency.",
        "Call the clinic ahead and describe the red-flag signs you selected.",
        "Keep your pet warm, calm, and minimize movement during transport.",
      ],
    };
  }

  // ---- 2) Build a simple risk score for YELLOW vs GREEN ----
  // Symptoms (base points)
  let score = 0;

  // Core symptoms
  if (has("Vomiting")) score += 2;
  if (has("Diarrhea")) score += 2;
  if (has("Not eating")) score += 3;
  if (has("Lethargy")) score += 3;
  if (has("Skin issue")) score += 1;
  if (has("Limping")) score += 1;
  if (has("Other")) score += 1;

  // Duration amplifies risk
  score += durWeight;

  // Age amplifies risk slightly (more cautious for <1 or 8+)
  if (isYoung) score += 1;
  if (isSenior) score += 1;

  // Combination rules (the biggest improvement vs your current version)
  const giCombo = hasAny(["Vomiting", "Diarrhea"]) && has("Not eating");
  const lowEnergyCombo = has("Lethargy") && has("Not eating");
  const persistentGI = hasAny(["Vomiting", "Diarrhea"]) && durWeight >= 2; // 1-3d or >3d

  if (giCombo) score += 2;
  if (lowEnergyCombo) score += 2;
  if (persistentGI) score += 2;

  // ---- 3) Decide risk level ----
  // Thresholds tuned for a conservative MVP:
  // - score >= 7 => Yellow (book within 24h)
  // - else Green
  const isYellow = score >= 7;

  if (isYellow) {
    return {
      riskLevel: "yellow",
      summary:
        "These signs may need timely attention—especially if they persist or your pet is very young/older.",
      actions: [
        "Book a vet appointment within 24 hours (earlier if symptoms worsen).",
        "Keep notes: when it started, how often it happens, and any changes in eating/drinking.",
        "Offer fresh water; avoid sudden diet changes until you’ve spoken to a vet.",
        "If new red-flag signs appear (breathing trouble, collapse, seizures, blood, severe pain), seek urgent care immediately.",
      ],
    };
  }

  // ---- 4) GREEN: monitor & supportive care ----
  return {
    riskLevel: "green",
    summary:
      "This looks more likely to be mild. Monitor closely and seek help if it doesn’t improve.",
    actions: [
      "Monitor for the next 12–24 hours and re-check if symptoms change.",
      "Ensure fresh water is available; watch for reduced drinking or dehydration.",
      "If symptoms persist beyond 24 hours, worsen, or you’re worried, contact a vet.",
      "If any red-flag signs appear (breathing trouble, collapse, seizures, blood, severe pain), seek urgent care immediately.",
    ],
  };
}
