'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { useUser } from '@clerk/nextjs'

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
})

const Hero = () => {
  const { user } = useUser()
  const [problem, setProblem] = useState("")
  const [logo, setLogo] = useState([])
  const [idea, setIdea] = useState("")
  const [Res, setRes] = useState("")
  const [plan, setPlan] = useState("")
  const [title, settitle] = useState('')
  const [email, setEmail] = useState()

  useEffect(() => {
    setEmail(user?.emailAddresses[0].emailAddress)
  }, [user])
  

  const btn = useRef(null)

  const createIdea = async () => {
    btn.current.innerText = 'Thinking....'
    const res = await fetch(`/api/createIdea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problem,
        idea,
        plan,
      }),
    })
    const data = await res.json()
    console.log("Response:", data)
    setRes(data.answer) // <-- FIXED
  }

  const submit = async () => {
    const formData = new FormData()
    formData.append("logo", logo)
    formData.append("content", Res)
    formData.append("title", title)
    formData.append("email", email)
    formData.append("name", user?.firstName)


    const res = await fetch(`/api/createProduct`, {
      method: "POST",
      body: formData
    })

        alert(`Your idea has been submitted!`)
  }

  useEffect(() => {
    console.log(logo)
  }, [logo])




  return (
    <div className={`${instrumentSerif.className} flex flex-col items-center mt-30`}>
      <div className="mb-3 text-left">
        <p className="md:text-6xl text-4xl">AI</p>
        <h1 className="md:text-9xl text-7xl">Ideation</h1>
      </div>

      {Res === "" ? (
        <>
          <div className="flex flex-row flex-wrap justify-center gap-6 w-full max-w-6xl">
            <div className="bg-[#F7F7F7] w-90 h-90 rounded-2xl p-4">
              <h1 className="text-shadow-xs text-2xl text-shadow-black">
                What is the problem you want to solve?
              </h1>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="bg-white h-65 w-79 mt-3 p-1"
              />
            </div>

            <div className="bg-[#F7F7F7] w-90 h-90 rounded-2xl p-4">
              <h1 className="text-shadow-xs text-2xl text-shadow-black">
                What is the vague idea of a solution you have?
              </h1>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="bg-white h-65 w-79 mt-3 p-1"
              />
            </div>
            <div className="bg-[#F7F7F7] w-90 h-90 rounded-2xl p-4">
              <h1 className="text-shadow-xs text-2xl text-shadow-black">
                What is your existing plan (So AI can refine upon it!)
              </h1>
              <textarea
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="bg-white h-65 w-79 mt-3 p-1"
              />
            </div>
          </div>

          <div
            ref={btn}
            onClick={createIdea}
            className="bg-black p-3 rounded-2xl text-white m-6 cursor-pointer hover:scale-110 hover:shadow-2xl shadow-black transition-all"
          >
            Start
          </div>
        </>
      ) : (
        <div className="m-10 flex justify-center items-center flex-col">
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files?.[0])}
          />

          <input
            type="text"
            placeholder="Enter Title Here."
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="m-5 p-4 rounded-2xl w-90 border border-black"
          />

          <textarea
            value={Res}
            onChange={(e) => setcontent(e.target.value)}
            className="p-3 border border-black h-90 md:w-320 w-full sm:w-full"
            placeholder="Your AI-generated plan will appear here..."
          />

          <div
            onClick={submit}
            className="bg-black p-3 rounded-2xl text-white m-6 cursor-pointer hover:scale-110 hover:shadow-2xl shadow-black transition-all"
          >
            Submit
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
