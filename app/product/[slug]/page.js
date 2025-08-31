'use client'

import React, { useEffect, useState, use } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { useUser } from '@clerk/nextjs'

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
})

export default function Idea({ params }) {
  const { user } = useUser()
  const { slug } = use(params)
  const [Res, setRes] = useState(null)

  const fetchInfo = async () => {
    const res = await fetch(`/api/getIdeaByEmail?id=${slug}&email=${user?.emailAddresses[0].emailAddress}`)
    const resJSON = await res.json()
    setRes(resJSON)
  }

  const upvote = async () => {
    const res = await fetch(`/api/incrementUpvotes?id=${slug}&email=${user?.emailAddresses[0].emailAddress}`)
    const resJSON = await res.json()
    setRes(prev => ({ ...prev, liked: resJSON.liked, upvotes: resJSON.upvotes }))
  }


  useEffect(() => {
    if (user) fetchInfo()
  }, [user])

  return (
    <div className="flex justify-center px-6">
      <div className="mt-12 max-w-4xl w-full">
        <div className="flex items-center justify-between bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            {Res?.logo && (
              <img
                src={Res.logo}
                alt="Logo"
                className="h-16 w-16 rounded-xl border object-cover"
              />
            )}
            <div>
              <h1 className={`${instrumentSerif.className} text-3xl font-bold`}>
                {Res?.title}
              </h1>
            </div>
          </div>
          <button
            className={`flex flex-col items-center px-3 py-2 rounded-lg border cursor-pointer transition ${Res?.liked
                ? "bg-orange-500 text-white border-orange-500"
                : "hover:bg-gray-50"
              }`}
            onClick={upvote}
          >
            {
              Res?.liked ? (

                <FiArrowDown className="w-6 h-6" />
              ) :
                (<FiArrowUp className="w-6 h-6" />
                )
            }
            <span className="font-semibold text-sm mt-1">
              {
                Res?.liked ? (
                  <h1>Downvote</h1>
                ) :
                (
                  <h1>Upvote</h1>
                )
              }
            </span>
            <h1>{Res?.upvotes}</h1>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-8 mt-6">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
            {Res?.content}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Discussion</h2>
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      </div>
    </div>
  )
}
