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
    <div className={`${instrumentSerif.className} p-3`}>
      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6 md:gap-13 md:text-2xl mb-4">
        <div className="flex gap-3 items-center mb-2 md:mb-0">
          <UserButton />
          <h1>
            {user?.firstName}
          </h1>
        </div>
        <div className="flex gap-4">
          <Link href={`/ideation`}>
            Ideation
          </Link>
          <Link href={`/ideaPage`}>
            ideaPage
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <h1 className="text-6xl md:text-9xl text-center">
          Dashboard
        </h1>
      </div>
    </div>
  )
}

export default Hero