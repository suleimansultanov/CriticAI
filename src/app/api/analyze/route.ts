import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { SYSTEM_PROMPT } from "@/lib/ai-prompt";
import type { AuditResult } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1500,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mediaType || "image/png"};base64,${imageBase64}`,
              },
            },
            {
              type: "text",
              text: "Analyze this landing page screenshot. Be brutally honest.",
            },
          ],
        },
      ],
    });

    const text = response.choices[0]?.message?.content;
    if (!text) {
      throw new Error("No text response from AI");
    }

    const result: AuditResult = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
