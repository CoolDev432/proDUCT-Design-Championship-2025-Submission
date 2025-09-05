'use client'

import React from 'react'
import About from './components/About'
import Hero from './components/Hero'
import Trending from './components/Trending'
import Footer from './components/Footer'

const Page = () => {
  return (
    <div className="h-[200vh]">
      <Hero />
      <About />
      <Trending />
      <Footer />
    </div>
  )
}

export default Page
