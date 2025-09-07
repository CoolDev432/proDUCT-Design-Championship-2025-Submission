'use client'
import React, { useEffect, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import { LuCrown } from 'react-icons/lu'
import { Instrument_Serif } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
})

const Trending = () => {
  const [trending, setTrending] = useState([])

  const fetchDocs = async () => {
    try {
      const res = await fetch(`/api/getTrendingIdeas`)
      const resJSON = await res.json()
      setTrending(resJSON.rows)
    } catch (err) {
      console.error('Failed to fetch trending ideas:', err)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  return (
    <div
      className={`${instrumentSerif.className} font-extralight relative bg-slate-50 py-20 px-6 sm:px-12 flex flex-col justify-center items-center text-center overflow-hidden`}
    >

      <div className="relative z-10 max-w-5xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mt-2">
          <span className="text-indigo-700">Trending Ideas.</span>
        </h1>

        <div className="flex justify-evenly items-center flex-wrap mt-14">
          {trending.map((item, index) => (
            <div
              key={item.$id}
              className="relative m-8 flex flex-col items-center shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 p-6 rounded-2xl bg-white w-72"
            >
              <div
                className={`absolute -top-4 -left-4 flex items-center justify-center w-12 h-12 rounded-full shadow-md text-white font-bold text-lg ${
                  index + 1 === 1
                    ? 'bg-yellow-500'
                    : 'bg-indigo-700'
                }`}
              >
                {index + 1 === 1 ? (
                  <LuCrown className="w-6 h-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              <img
                src={item.logo ?? '/fallback.png'}
                alt={item.title ?? 'idea'}
                className="w-24 h-24 object-contain rounded-full"
              />

              <p className="mt-4 text-xl font-semibold text-gray-800">
                {item.title}
              </p>

              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mt-4 shadow-sm group">
                <FiArrowUp className="text-indigo-600 w-5 h-5 transition-transform group-hover:-translate-y-1" />
                <span className="text-indigo-800 font-semibold text-lg">
                  {item.upvotes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trending
