import React from 'react'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Trending from './components/Trending'

const page = () => {
  return (
    <div className='h-[300vh]'>
      <Nav />
      <Hero />
      <Trending />
    </div>
  )
}

export default page