import { NextResponse } from "next/server";
import OpenAI from "openai";
import { contentMap, type CreationStyle } from "@/data/contentMap";
import { buildImagePrompt, hasBlockedTerm } from "@/lib/promptBuilder";

type GenerateImageBody = {
  style?: CreationStyle;
};

function fallbackResponse(style: CreationStyle, reason: string) {
  const fallback = contentMap[style].fallbackImages[0];

  return NextResponse.json({
    imageUrl: fallback,
    fallback: true,
    reason
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as GenerateImageBody;
  const style = body.style && contentMap[body.style] ? body.style : "starlight-gukak";
  const prompt = buildImagePrompt(style);

  if (hasBlockedTerm(prompt)) {
    return NextResponse.json({ error: "Blocked prompt" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return fallbackResponse(style, "OPENAI_API_KEY is not configured");
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const first = response.data?.[0];
    const imageUrl = first?.b64_json
      ? `data:image/png;base64,${first.b64_json}`
      : first?.url;

    if (!imageUrl) {
      return fallbackResponse(style, "Image API returned no image URL");
    }

    return NextResponse.json({
      imageUrl,
      fallback: false
    });
  } catch (error) {
    console.error("generate-image failed", error);
    return fallbackResponse(style, "Image API request failed");
  }
}
