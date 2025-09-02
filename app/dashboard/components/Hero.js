'use client'

import React from 'react'
import { Instrument_Serif } from 'next/font/google'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
})

const Hero = () => {
  const { user } = useUser();
  return (
    <div className={`${instrumentSerif.className} p-3 mt-50`}>
      <div className="flex justify-center items-center w-full">
        <h1 className="text-6xl md:text-9xl text-center">
          Dashboard
        </h1>
      </div>
    </div>
  )
}

export default Hero