import React from 'react'
import { FiMessageSquare, FiZap } from 'react-icons/fi'
import { FiFeather } from 'react-icons/fi'

import { Instrument_Serif } from 'next/font/google'
const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
})


const About = () => {
  return (
    <div className={`${instrumentSerif.className} h-fit w-[99vw] px-6 py-20 relative overflow-hidden`}>
      <div className="absolute left-3 md:top-40 top-20 w-72 h-72 md:bg-indigo-500/40 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div className="flex justify-center items-center flex-col relative z-10">
        <h1 className="md:text-6xl text-5xl font-bold text-center">
          What is <span className="text-indigo-800">proDUCT</span>?
        </h1>

        <div className="flex justify-evenly items-center md:flex-row flex-col">
          <div className="bg-white m-9 shadow-xl hover:shadow-2xl h-80 w-80 rounded-2xl transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
            <FiMessageSquare className="text-indigo-600 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">IdeaPage</h2>
            <p className="text-gray-600">
              See others ideas, comment, and upvote to support creative projects.
            </p>
          </div>

          <div className="bg-white shadow-xl hover:shadow-2xl h-80 w-80 m-9 rounded-2xl transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
            <h1 className='text-6xl text-indigo-600 w-12 h-12 mb-4'>
              ?
            </h1>
            <h2 className="text-xl font-semibold mb-2">Personality Quiz</h2>
            <p className="text-gray-600">
              Unsure what startup idea is best for you? Well, take our personality quiz. By answering just 3 questions, get your perfect startup idea!
            </p>
          </div>

          <div className="bg-white shadow-xl hover:shadow-2xl h-80 w-80 rounded-2xl transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
            <FiZap className="text-indigo-600 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ideation</h2>
            <p className="text-gray-600">
              Get AI-powered help to curate and refine your amazing ideas instantly.
            </p>
          </div>

          <div className="bg-white shadow-xl hover:shadow-2xl h-80 w-80 rounded-2xl transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
            <FiFeather className='text-6xl text-indigo-600 w-12 h-12 mb-4' />
            <h2 className="text-xl font-semibold mb-2">LogoGen</h2>
            <p className="text-gray-600">
              Describe your startup and use AI to transform into a logo!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
