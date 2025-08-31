import React from 'react'
import { Instrument_Serif } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
})
const Stats = () => {
  return (
    <div className={`bg-[#F7F6F6] rounded-t-4xl md:w-200 w-full md:h-90 h-full m-auto p-7 ${instrumentSerif.className}`}> 
        <h1 className='text-6xl'>
            Stats.
        </h1>
    </div>  
  )
}

export default Stats