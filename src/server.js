import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";
import { suggestConditions } from "./llm.js";
import { detectRedFlags, applySafetyAdjustments } from "./safety.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

const requestSchema = z.object({
  symptoms: z.string().min(5, "Please provide more detail in the symptoms."),
  age: z.number().int().min(0).max(120).optional(),
  sex: z.enum(["male", "female", "intersex", "unknown"]).optional(),
  gender: z.enum(["male", "female"]).optional(),
});

app.post("/api/check", async (req, res) => {
  const parse = requestSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: parse.error.flatten(),
    });
  }

  const { symptoms, age } = parse.data;
  const sex = parse.data.sex ?? parse.data.gender; // map gender to sex if provided

  try {
    const redFlags = detectRedFlags(symptoms);

    const result = await suggestConditions({ symptoms, age, sex, redFlags });
    const safe = applySafetyAdjustments({
      ...result,
      redFlagsDetected: redFlags.length > 0,
    });

    return res.json(safe);
  } catch (err) {
    return res.status(500).json({
      error: "Unable to process symptoms at this time.",
      hint: "Try again shortly. If this is an emergency, call local emergency services.",
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Symptom Checker API listening on http://localhost:${port}`);
});


