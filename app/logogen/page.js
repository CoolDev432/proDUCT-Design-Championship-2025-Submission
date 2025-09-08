import React from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
const LogoGen = () => {
  return (
    <div> 
          <Nav />
          <Hero />
           <div className="absolute top-70 left-20 w-62 h-62 bg-indigo-500/30 rounded-full blur-2xl z-10 hidden sm:block transition-1 transition-all animate-pulse"></div>
      <div className="absolute top-70 left-320 w-52 h-52 bg-pink-500/30 rounded-full blur-3xl animate-ping  z-10 hidden sm:block"></div>
    </div>
  )
}

export default LogoGen