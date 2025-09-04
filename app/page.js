import React from 'react'
import Hero from './components/Hero'
import Trending from './components/Trending'

const page = () => {
  return (
    <div className='h-[300vh]'>
      <Hero />
      <Trending />
    </div>
  )
}

export default page