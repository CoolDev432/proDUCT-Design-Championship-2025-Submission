import { NextResponse } from "next/server"
import { Groq } from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  const body = await req.json()
  const { q1, q2, q3 } = body

  const prompt = `⚠️ Do Not Exceed 900 words In Your Answer! This is a strict order. DO NOT USE ### OR ** IN YOUR ANSWER TOO!
A student just took a personality quiz to figure out what startup idea suits him/her the most. They were asked 3 questions. Their answers:

Q.1) What do you enjoy the most?
Ans: ${q1}

Q.2) If you could build something cool, what would it be?
Ans: ${q2}

Q.3) How do you like working best?
Ans: ${q3}

Analyze these answers and help the student find their perfect idea! Talk in a friendly and relatable manner. Keep it brief and short but not too short. Give them ONLY 1 startup idea!
`

  const chatCompletion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [{ role: "user", content: prompt }],
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null
  })

  const answer = chatCompletion.choices?.[0]?.message?.content || "No response."

  return NextResponse.json({ answer })
}
