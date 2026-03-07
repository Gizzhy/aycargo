import OpenAI from "openai";
import { calculatePrice } from "@/lib/calculatePrice";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `
You are a cargo shipping assistant.

The company ships only between UK and Nigeria.

If the user asks for a shipping price, use the calculate_shipping tool.
Minimum weight is 10kg.
`,
      },
      {
        role: "user",
        content: message,
      },
    ],

    tools: [
      {
        type: "function",
        function: {
          name: "calculate_shipping",
          description: "Calculate shipping price",
          parameters: {
            type: "object",
            properties: {
              from: {
                type: "string",
                enum: ["uk", "nigeria"],
              },
              to: {
                type: "string",
                enum: ["uk", "nigeria"],
              },
              weight: {
                type: "number",
              },
            },
            required: ["from", "to", "weight"],
          },
        },
      },
    ],
  });

  const toolCall = completion.choices[0].message.tool_calls?.[0];

  if (toolCall) {
    const args = JSON.parse(toolCall.function.arguments);

    const price = calculatePrice(args.from, args.to, args.weight);

    return Response.json({
      reply: `Estimated shipping cost for ${args.weight}kg from ${args.from} to ${args.to} is ${price}.`,
    });
  }

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}
