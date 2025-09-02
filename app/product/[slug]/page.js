'use client'

import React, { useEffect, useState, use } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { FiSend, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { useUser } from '@clerk/nextjs'

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
})

export default function Idea({ params }) {
  const { user } = useUser()
  const { slug } = use(params)
  const [Comment, setComment] = useState("")
  const [Res, setRes] = useState(null)
  const [Comments, setComments] = useState([])

  const fetchInfo = async () => {
    const res = await fetch(`/api/getIdeaByEmail?id=${slug}&email=${user?.emailAddresses[0].emailAddress}`)
    const resJSON = await res.json()
    setRes(resJSON)
  }

  const fetchComments = async () => {
    const comments = await fetch(`/api/getComment?productId=${slug}`)
    const commentsJSON = await comments.json()
    setComments(commentsJSON)
  }

  const comment = async () => {
    if (!Comment.trim()) return
    const res = await fetch(
      `/api/createComment?comment=${Comment}&name=${user?.firstName}&productId=${slug}`
    )
    await res.json()
    fetchComments()
  }

  const upvote = async () => {
    const res = await fetch(`/api/incrementUpvotes?id=${slug}&email=${user?.emailAddresses[0].emailAddress}`)
    const resJSON = await res.json()
    setRes(prev => ({ ...prev, liked: resJSON.liked, upvotes: resJSON.upvotes }))
  }

  useEffect(() => {
    if (user) fetchInfo(); fetchComments()
  }, [user])

  return (
    <div className="flex justify-center w-full px-4 sm:px-6">
      <div className="mt-8 w-[95vw] max-w-6xl">
        <div className="flex flex-col sm:flex-row  sm:justify-between w-full bg-white rounded-xl shadow p-4 sm:p-6 gap-4">
          <div className="flex items-center gap-4">
            {Res?.logo && (
              <img
                src={Res.logo}
                alt="Logo"
                className="h-16 w-16 rounded-xl border object-cover"
              />
            )}
            <h1 className={`${instrumentSerif.className} text-2xl sm:text-3xl font-bold`}>
              {Res?.title}
            </h1>
          </div>

          <button
            className={`flex flex-col items-center px-3 py-2 rounded-lg border cursor-pointer transition ${Res?.liked
                ? "bg-orange-500 text-white border-orange-500"
                : "hover:bg-gray-50"
              }`}
            onClick={upvote}
          >
            {Res?.liked ? (
              <FiArrowDown className="w-6 h-6" />
            ) : (
              <FiArrowUp className="w-6 h-6" />
            )}
            <span className="font-semibold text-sm mt-1">
              {Res?.liked ? "Downvote" : "Upvote"}
            </span>
            <h1>{Res?.upvotes}</h1>
          </button>
        </div>

        <div className="bg-white rounded-xl w-full shadow p-4 sm:p-6 mt-6">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base sm:text-lg">
            {Res?.content}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6 flex flex-col w-full">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Comments</h2>

          <div className="flex w-full gap-2 sm:gap-3">
            <input
              type="text"
              value={Comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm sm:text-base"
            />
            <div
              onClick={comment}
              className="flex items-center justify-center bg-slate-200 text-black cursor-pointer hover:scale-105 transition-all rounded-full p-3"
            >
              <FiSend />
            </div>
          </div>

          <div className="h-64 w-full mt-4 overflow-y-auto space-y-4">
            {Comments?.map((item, index) => (
              <div key={index} className="flex justify-start">
                <div className="relative bg-slate-100 px-4 py-3 rounded-2xl shadow max-w-[85%] break-words">
                  <p className="text-base text-gray-800">{item?.comment}</p>
                  <p className="text-xs text-gray-600 font-semibold mt-1">– {item?.name}</p>
                  <div className="absolute left-3 -bottom-2 w-3 h-3 bg-slate-100 rotate-45"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
