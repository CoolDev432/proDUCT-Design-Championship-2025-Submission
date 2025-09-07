'use client'

import React, { useState, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'
import { useUser } from '@clerk/nextjs'

const Forum = () => {
  const { user } = useUser()
  const [Content, setContent] = useState("")
  const [Title, setTitle] = useState("")
  const [Res, setRes] = useState([])

  const sendPost = async () => {
    await fetch("/api/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user?.fullName || "Anonymous",
        post_content: Content,
        email: user?.emailAddresses[0].emailAddress,
        title: Title
      }),
    })
    setContent("")
    getPost()
  }

  const getPost = async () => {
    const res = await fetch(`/api/getPosts`)
    const resJSON = await res.json()
    setRes(resJSON.rows)
  }

  useEffect(() => {
    getPost()

    const interval = setInterval(() => {
      getPost()
    }, 60000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='bg-slate-100'>
      <div className='h-[71vh] mt-2 rounded-t-2xl w-[99vw] overflow-y-scroll m-auto relative '>
        <div className="fixed top-70 left-20 w-62 opacicty-60 h-62 bg-indigo-500/30 rounded-full blur-3xl z-10"></div>
        <div className='flex justify-center items-center flex-col w-full z-50'>
          {Res?.map((item, index) => (
            <div
              key={index}
              className={`w-full flex ${
                item?.email === user?.emailAddresses[0].emailAddress
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className='bg-white m-auto mt-10 w-220 p-10 flex justify-center flex-col items-center rounded-3xl'
              >
                <h1 className='text-3xl font-bold font-sans p-20'>
                  {
                    item?.title
                  }
                </h1>
                <p className='whitespace-pre-line'>{item?.post_content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center items-center flex-col'>
        <input type="text" className='shadow-2xs m-2 hover:shadow-xl  hover:translate-[-5px] transition-1 transition-all p-3 md:w-120 w-50 rounded-2xl border-1' placeholder='Title for post' onChange={(e)=>{
          setTitle(e.target.value)
        }} />
        <textarea
          placeholder='Type here!'
          value={Content}
          onChange={(e) => setContent(e.target.value)}
          className='shadow-2xs hover:shadow-xl hover:translate-[-5px] transition-1 transition-all p-3 md:w-120 w-50 rounded-2xl border-1'
        />
        <button
          className='m-4 shadow-xl cursor-pointer hover:scale-120 rounded-2xl transition-1 transition-all p-2'
          onClick={sendPost}
        >
          <FiSend />
        </button>
      </div>
    </div>
  )
}

export default Forum
