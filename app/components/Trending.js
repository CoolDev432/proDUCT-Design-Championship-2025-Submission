'use client'
import { FiArrowUp } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { LuCrown } from 'react-icons/lu'
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
})

const Trending = () => {
  const [trending, setTrending] = useState([])

  const fetchDocs = async () => {
    try {
      const res = await fetch(`/api/getTrendingIdeas`)
      const resJSON = await res.json()
      setTrending(resJSON.rows)
      console.log(resJSON.rows)
    } catch (err) {
      console.error("Failed to fetch trending ideas:", err)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  return (
    <div className={`${instrumentSerif.className} flex justify-center items-center flex-col mt-4`}>
      <div>
        <p className="text-3xl">Top 5 Trending</p>
        <h1 className="text-9xl">Ideas</h1>
      </div>

      <div className="flex justify-evenly items-center flex-wrap gap-10 mt-10">
        {trending.map((item, index) => (
          <div
            key={item.$id}
            className="relative flex flex-col items-center shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 p-6 rounded-2xl bg-white"
          >
            <div className={`absolute -top-4 -left-4 ${index+1 == 1 && 'bg-yellow-500'} bg-indigo-900 text-white w-10 h-13 p-2 flex items-center justify-center flex-col rounded-full font-bold text-lg shadow-md `}>
                {
                    index+1 == 1 ? (<LuCrown className='scale-120' />) : (<h1>{index+1}</h1>)
                }
            </div>

            <img
              src={item.logo ?? "/fallback.png"}
              alt={item.title ?? "idea"}
              className="w-24 h-24 object-contain rounded-full"
            />
            <p className="mt-4 text-xl font-medium text-gray-800">{item.title}</p>

            <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mt-3 shadow-sm group">
              <FiArrowUp className="text-indigo-600 w-5 h-5 transition-transform group-hover:-translate-y-1" />
              <span className="text-indigo-800 font-semibold text-lg">{item.upvotes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trending
