import OpenAI from "openai";
import { calculatePrice } from "@/lib/calculatePrice";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  const systemPrompt = `
You are a helpful assistant for a cargo shipping company.

Rules:
- The company ships only between UK and Nigeria.
- Minimum shipment weight is 10kg.
- Help users calculate shipping estimates.
- Ask for:
  - origin country
  - destination country
  - weight in kg
- Keep answers short and friendly.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ],
  });

  return Response.json({
    reply: completion.choices[0].message.content
  });
}