import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  const response = await fetch(
    "https://router.huggingface.co/fal-ai/fal-ai/qwen-image",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        sync_mode: true,
        prompt,
      }),
    }
  );

  const resJSON = await response.json();
  console.log(resJSON);

  return NextResponse.json(resJSON);
}