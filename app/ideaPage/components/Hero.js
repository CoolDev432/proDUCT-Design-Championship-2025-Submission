'use client'

import React, { useEffect, useState } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { useUser } from '@clerk/nextjs'
import { FiArrowUp, FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { LuBot } from 'react-icons/lu';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
})

const Hero = () => {
  const { user } = useUser()
  const [ideas, setIdeas] = useState()
  const router = useRouter()
  const [searchParam, setsearch] = useState()

  const fetchIdeas = async () => {
    const res = await fetch(`/api/getIdeas`)
    const resJSON = await res.json()
    setIdeas(resJSON.response.rows)
  }

  const search = async () => {
    const res = await fetch(`/api/search?param=${searchParam}`);
    const resJSON = await res.json();
    setIdeas(resJSON.rows)
  }

  const handleRedirection = (id) => {
    router.push(`/product/${id}`)
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  return (
    <section className={`${instrumentSerif.className} mt-28 px-6 `}>
      <div className="text-center mb-12 mt-40 ">
              <div className="absolute top-40 left-20 w-42 h-42 bg-indigo-500/30 rounded-full blur-3xl z-10"></div>

        <h1 className="text-6xl md:text-8xl  tracking-tight">
          Ideas
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Discover and explore innovative ideas shared by the community.
        </p>
      <div className='mt-5'>
        <input type="text" className='shadow-2xs hover:shadow-xl hover:translate-[-5px] transition-1 transition-all p-2 md:w-120 w-50 ' placeholder='Search with titles!' onChange={(e)=>{setsearch(e.target.value)}} />
        <button className='cursor-pointer hover:translate-[-5px] shadow-2xs hover:shadow-xl p-3 transition-1 transition-all' onClick={()=>{search()}}>
          <FiSearch />
        </button>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto z-50">
        {ideas?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRedirection(item.$id)}
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
       <div className="flex w-[98vw] justify-end p-1">
  <div className="bg-indigo-600 p-4 hover:border-indigo-700 hover:border-2 hover:text-indigo-700 hover:scale-110 hover:bg-white border-solid transition-all duration-200 text-white text-2xl rounded-3xl cursor-pointer">
    <LuBot /> 
  </div>
</div>

    </section>
  )
}

export default Hero
