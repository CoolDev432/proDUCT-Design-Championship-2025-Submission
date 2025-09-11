import { NextResponse } from "next/server"
import { Groq } from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  const body = await req.json()
  const { problem, idea, plan } = body

  const prompt = `⚠️ Do Not Exceed 900 words In Your Answer! This is a strict order
A student wants to start a startup. Here is the problem he wants to solve: ${problem}. The vague idea of his solution is: ${idea}. His vague plan is: ${plan}. The student wants to be a kidpreneur. Give him a reliable plan he/she can execute in school. Like what skills he/she will need to learn to execute the startup. Give reliable marketing ideas and strategies (as its the MOST important part of any startup) with the name of platform where they can advertise on for free or the least amount of money. At the end of every idea, add this: 'This might not be your final idea. Think and research more about it and then submit it to proDUCT to get feedback from a community of people just like you. Happy Building!'. ⚠️ IMPORTANT: DO NOT USE ### AND * IN YOUR ANSWER.

Format:

Inspiration (Problem):

Solution:

Plan:

What I'll need to learn or get help with:
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
console.log(chatCompletion)
  const answer = chatCompletion.choices?.[0]?.message?.content;

  return NextResponse.json({ answer })
}
