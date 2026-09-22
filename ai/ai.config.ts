import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getAgentModel() {
  const provider = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

// Falls back to gemini-2.0-flash if OPENROUTER_DEFAULT_MODEL is not set
  const modelId = process.env.OPENROUTER_DEFAULT_MODEL || "google/gemini-2.0-flash-001";

  return provider(modelId);
}