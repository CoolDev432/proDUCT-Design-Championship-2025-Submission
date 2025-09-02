'use client'

import React, { useEffect, useState } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { useUser } from '@clerk/nextjs'
import { FiArrowUp } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
})

const Hero = () => {
  const { user } = useUser()
  const [ideas, setIdeas] = useState()
  const router = useRouter()

  const fetchIdeas = async () => {
    const res = await fetch(`/api/getIdeas`)
    const resJSON = await res.json()
    setIdeas(resJSON.response.rows)
  }

  const handleRedirection = (id) => {
    router.push(`/product/${id}`)
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  return (
    <section className={`${instrumentSerif.className} mt-28 px-6`}>
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl  tracking-tight">
          Ideas
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Discover and explore innovative ideas shared by the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {ideas?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRedirection(item.id)}
            className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
          >
            <img src={item?.logo} className='h-20 w-20 rounded-4xl' alt="" />
            <h2 className="text-2xl  text-gray-900 mb-4 line-clamp-2">
              {item.title}
            </h2>
            <h2>
             By: {item?.name || 'No Name'}
            </h2>
            <div className="flex items-center justify-between mt-auto">
              <button
                className="flex items-center gap-2 bg-indigo-50 text-indigo-600 font-semibold px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors"
              >
                <FiArrowUp />
                {item?.upvotes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero
