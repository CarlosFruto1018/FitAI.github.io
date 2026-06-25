export type LLMProvider = "anthropic" | "local";

export function getProvider(): LLMProvider {
  if (process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY.includes("...")) {
    return "anthropic";
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

  return "";
}
