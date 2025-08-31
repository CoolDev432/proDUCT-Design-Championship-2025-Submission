'use client'

import React , { useEffect, useState } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { useUser } from '@clerk/nextjs'
import { MdThumbUp } from 'react-icons/md';
import { useRouter } from 'next/navigation'  

const instrumentSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
})

const Hero = () => {
  const { user } = useUser()
  const [Res, setRes] = useState([])
  const router = useRouter()   

  const fetchIdeas = async () => {
      const res = await fetch(`/api/getIdeas`)
      const resJSON = await res.json()
      console.log(resJSON.response.rows)
      setRes(resJSON.response.rows)
  }

  const handleRedirection = (id) => {
      router.push(`/product/${id}`)   
  }

  useEffect(() => {
    fetchIdeas()
  }, [])
  
  return (
    <div>
        <div className={`${instrumentSerif.className} flex justify-center items-center flex-col`}>
            <h1 className={`${instrumentSerif.className} text-9xl`}>
                Ideas
            </h1>
            <div className='flex justify-evenly w-full flex-wrap items-center '>
              {
                Res.length > 0 ? Res.map((items,index)=>(
                  <div 
                    key={index} 
                    className="mt-19 cursor-pointer bg-white w-90 text-black shadow-black p-9 rounded-2xl flex justify-center flex-col items-center hover:scale-110 hover:shadow-2xl hover:translate-y-2 border-1 transition-all"
                    onClick={()=>handleRedirection(items.$id)}
                  >
                    <img src={items.logo} alt="Logo" className='h-20 w-20 rounded-full mb-3 hover:scale-110 transition-all' />
                    <h1 className='text-4xl font-bold'>{items.title}</h1>
                  </div>
                )) : (
                  <div>NOTHING</div>
                )
              }
            </div>
        </div>
    </div>
  )
}

export default Hero
