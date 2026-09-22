import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getAgentModel() {
  const provider = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

  const rawModel = process.env.OPENROUTER_DEFAULT_MODEL?.replace(/['"]/g, "").trim();

  // fallback
  const modelId = rawModel || "openrouter/auto";

  return provider(modelId);
}