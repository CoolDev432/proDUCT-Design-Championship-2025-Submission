import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  const response = await fetch(
    "https://router.huggingface.co/fal-ai/fal-ai/qwen-image",
    {
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        sync_mode: true,
        prompt,
      }),
    }
  );

  const result = await response.json();
  console.log(result);

  return NextResponse.json(result);
}