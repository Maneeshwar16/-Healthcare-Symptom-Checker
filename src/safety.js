const RED_FLAG_PATTERNS = [
  /chest\s*pain/i,
  /short(ness)?\s*of\s*breath/i,
  /severe\s*headache/i,
  /weakness\s*on\s*one\s*side/i,
  /slurred\s*speech/i,
  /confusion\s*or\s*disorientation/i,
  /faint(ing)?/i,
  /uncontrolled\s*bleeding/i,
  /pregnan(t|cy)\s*complications?/i,
  /suicid(al|e)/i,
  /overdose/i,
  /anaphylaxis|throat\s*swelling|hives\s*with\s*breathing\s*difficulty/i,
];

export function detectRedFlags(symptomsText) {
  if (!symptomsText || typeof symptomsText !== "string") return [];
  const matches = RED_FLAG_PATTERNS.filter((re) => re.test(symptomsText));
  return matches.map((re) => re.source);
}

export function applySafetyAdjustments(result) {
  const out = { ...result };

  // Ensure disclaimer exists and is strong
  if (!out.disclaimer || typeof out.disclaimer !== "string") {
    out.disclaimer = "This is educational information, not a diagnosis. Consult a licensed clinician. In emergencies, call local emergency services.";
  }

  // Bound number of conditions and normalize likelihoods
  if (Array.isArray(out.conditions)) {
    out.conditions = out.conditions
      .slice(0, 5)
      .map((c) => ({
        name: String(c.name || "Unknown"),
        likelihood: ["low", "medium", "high"].includes(String(c.likelihood)) ? c.likelihood : "low",
        rationale: String(c.rationale || ""),
      }));
  } else {
    out.conditions = [];
  }

  // Bound recommendations
  if (Array.isArray(out.recommendations)) {
    out.recommendations = out.recommendations.slice(0, 6).map((r) => String(r));
  } else {
    out.recommendations = [];
  }

  // If red flags present, force emergency triage
  if (out.redFlagsDetected) {
    out.triage = "emergency now";
    if (!out.recommendations.some((r) => /emergency/i.test(r))) {
      out.recommendations.unshift("Seek immediate medical attention by calling local emergency services.");
    }
  }

  return out;
}


