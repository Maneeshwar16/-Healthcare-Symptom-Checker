import OpenAI from "openai";

const client = (() => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  try {
    return new OpenAI({ apiKey });
  } catch {
    return null;
  }
})();

const SYSTEM_PROMPT = `You are a cautious healthcare educator, not a clinician. 
Purpose: help users understand possible explanations for symptoms and suggest prudent next steps.
Strict rules:
- Always include a clear educational-only disclaimer. Do not provide diagnosis.
- Avoid definitive language; prefer probabilities and differentials.
- Emphasize seeing a licensed clinician for evaluation.
- If any emergency red flags are present (e.g., chest pain, stroke signs, suicidal ideation), advise immediate emergency services.
- Keep responses concise, structured, and actionable.
Output JSON only.`;

function buildUserPrompt({ symptoms, age, sex, redFlags }) {
  const demo = [
    age != null ? `Age: ${age}` : null,
    sex ? `Sex: ${sex}` : null,
  ]
    .filter(Boolean)
    .join(" | ");

  const red = redFlags && redFlags.length ? `\nRed flags noted: ${redFlags.join(", ")}` : "";

  return `Symptoms: ${symptoms}${demo ? `\n${demo}` : ""}${red}`;
}

const RESPONSE_GUIDANCE = `Return strict JSON with keys:
{
  "conditions": [
    { "name": string, "likelihood": "low"|"medium"|"high", "rationale": string }
  ],
  "recommendations": [string],
  "disclaimer": string,
  "triage": "self-care"|"see PCP"|"urgent care"|"emergency now"
}`;

export async function suggestConditions(input) {
  if (!client) {
    return mockSuggestion(input);
  }

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(input) },
        { role: "system", content: RESPONSE_GUIDANCE },
      ],
    });

    const text = completion.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(text);
    return normalizeOutput(parsed);
  } catch (err) {
    return mockSuggestion(input);
  }
}

function normalizeOutput(obj) {
  const conditions = Array.isArray(obj.conditions) ? obj.conditions : [];
  const recommendations = Array.isArray(obj.recommendations) ? obj.recommendations : [];
  const disclaimer = typeof obj.disclaimer === "string" && obj.disclaimer ? obj.disclaimer : defaultDisclaimer();
  const triage = obj.triage || "see PCP";
  return { conditions, recommendations, disclaimer, triage };
}

function defaultDisclaimer() {
  return "This is for educational purposes only and is not a medical diagnosis or treatment. Seek advice from a licensed healthcare professional. If this is an emergency, call local emergency services immediately.";
}

function mockSuggestion({ symptoms, redFlags }) {
  const hasEmergency = redFlags && redFlags.length > 0;
  const conditions = [
    { name: "Viral upper respiratory infection", likelihood: "medium", rationale: "Common with cough, sore throat, congestion." },
    { name: "Allergic rhinitis", likelihood: "low", rationale: "Possible if sneezing/itchy eyes, seasonal pattern." },
  ];
  const recommendations = [
    "Hydration and rest",
    "Over-the-counter analgesic/antipyretic as needed",
    "Monitor symptoms and seek care if worsening or persistent > 48-72 hours",
  ];
  const triage = hasEmergency ? "emergency now" : "see PCP";
  return { conditions, recommendations, disclaimer: defaultDisclaimer(), triage };
}


