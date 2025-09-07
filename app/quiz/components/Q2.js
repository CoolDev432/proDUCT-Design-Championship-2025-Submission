'use client'

import React, { useState } from 'react'
import { Instrument_Serif } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
})

const Q2 = ({ secondAnswer }) => {
  return (
    <div className={`${instrumentSerif.className} flex flex-col items-center p-12 shadow-2xl`}>
      <h2 className="md:text-5xl text-3xl font-bold text-center">
       If you could build something cool, what would it be?
      </h2>
      <textarea
        type="text"
        className="p-4 md:w-[32rem] w-full text-xl h-48 border border-gray-300 rounded-xl mt-10 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Type your answer here..."
        onChange={(e) => {
          secondAnswer(e.target.value)
        }}
      />
    </div>
  )
}

export default Q2
