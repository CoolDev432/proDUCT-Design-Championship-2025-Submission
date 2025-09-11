import { NextResponse } from "next/server"
import { Mistral } from "@mistralai/mistralai"

// Initialize Mistral client
const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY, // set this in .env.local
})

export async function POST(req) {
  const body = await req.json()
  const { problem, idea, plan } = body

  // Build the user prompt
  const prompt = `⚠️ Do Not Exceed 900 words In Your Answer! This is a strict order
A student wants to start a startup. Here is the problem he wants to solve: ${problem}. The vague idea of his solution is: ${idea}. His vague plan is: ${plan}. The student wants to be a kidpreneur. Give him a reliable plan he/she can execute in school. Like what skills he/she will need to learn to execute the startup. Give reliable marketing ideas and strategies (as its the MOST important part of any startup) with the name of platform where they can advertise on for free or the least amount of money. At the end of every idea, add this: 'This might not be your final idea. Think and research more about it and then submit it to proDUCT to get feedback from a community of people just like you. Happy Building!'. ⚠️ IMPORTANT: DO NOT USE ### AND * IN YOUR ANSWER.

Format:

Inspiration (Problem):

Solution:

Plan:

What I'll need to learn or get help with:
`

  try {
    // Send request to Mistral
    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest", // you can also use small/medium
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt }
          ],
        },
      ],
    })

    let answer = chatResponse.choices?.[0]?.message?.content || "No response."

    // Clean up any hidden tags
    if (answer.includes("</think>")) {
      const parts = answer.split("</think>")
      answer = parts.slice(1).join("</think>").trim()
    }

    console.log(answer)
    return NextResponse.json({ answer })
  } catch (error) {
    console.error("Mistral API error:", error)
    return NextResponse.json({ error: "Failed to get response from Mistral" }, { status: 500 })
  }
}
