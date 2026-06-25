// Unified LLM client — uses Anthropic if available, falls back to Gemini, then local
export type LLMProvider = "anthropic" | "gemini" | "local";

export function getProvider(): LLMProvider {
  if (process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY.includes("...")) {
    return "anthropic";
  }
  if (process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("...")) {
    return "gemini";
  }
  return "local";
}

export async function llmComplete(system: string, user: string): Promise<string> {
  const provider = getProvider();

  if (provider === "anthropic") {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const res = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system,
      messages: [{ role: "user", content: user }],
    });
    return res.content[0].type === "text" ? res.content[0].text : "";
  }

  if (provider === "gemini") {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const res = await model.generateContent(`${system}\n\n${user}`);
    return res.response.text();
  }

  return "";
}
