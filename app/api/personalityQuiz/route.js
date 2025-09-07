import { NextResponse } from "next/server"

export async function POST(req) {
    const body = await req.json()
    const { q1,q2,q3 } = body

    const requestBody = {
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `⚠️ Do Not Exceed 900 words In Your Answer! This is a strict order. DO NOT USE ### OR ** IN YOUR ANSWER TOO!
                       A stuent just took a personality quiz to figure out what startup idea suits him/her the most. They were asked 3 questions. There answers:

                       Q.1) What do you enjoy the most?
                        Ans: ${q1}

                        Q.2) If you could build something cool, what would it be?
                        Ans: ${q2}

                        Q.3) How do you like working best?
                        Ans: ${q3}


                        Analyze these answers and help the student find their perfect idea! Talk in a friendly and relatable manner.Keep it brief and short but not too short. Give them ONLY 1 startup idea!
                        `,
                    },
                ],
            },
        ],
        model: "deepseek-ai/DeepSeek-V3.1:fireworks-ai",
    }

    const aiResponse = await fetch("https://router.huggingface.co/v1/chat/completions", {
        headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(requestBody),
    })

    const result = await aiResponse.json();
    console.log(result)
 let answer = result.choices?.[0]?.message?.content || "";

if (answer.includes("</think>")) {
  const parts = answer.split("</think>")
  answer = parts.slice(1).join("</think>").trim()
}
    console.log(answer)
return NextResponse.json({ answer: answer })}