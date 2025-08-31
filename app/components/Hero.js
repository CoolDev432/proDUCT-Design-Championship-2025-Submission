'use client'

import React, { useEffect, useRef } from "react"
import { Instrument_Serif } from "next/font/google"
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs"
import gsap from "gsap"
import Link from "next/link"

const instrumentSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
})

const Hero = () => {
    const head = useRef()
    useEffect(() => {
        gsap.fromTo(head.current, { opacity: 0 }, { opacity: 1, duration: 2 })
    }, [])

    return (
        <div ref={head} className={`${instrumentSerif.className} flex justify-center items-center mt-20 flex-col`}>
            <div>
                <p className="md:text-4xl text-3xl">
                    The Best Way To
                </p>
                <h1 className="md:text-8xl text-6xl">
                    Publish Your <u>Idea</u>
                </h1>
            </div>
            <SignedOut>
                <div className="bg-black h-10 w-50 text-white flex justify-evenly rounded-2xl">
                    <SignInButton className={`cursor-pointer`} />
                    <SignUpButton className={`cursor-pointer`} />
                </div>
            </SignedOut>

            <SignedIn>
                <div className="bg-black h-10 p-3 w-90 text-white flex justify-evenly items-center rounded-2xl mt-2">
                    <div className="flex items-center gap-2">
                    <UserButton />
                    <Link href={`/dashboard`}>
                        Dashbaord
                    </Link>
                    </div>
                    <SignOutButton className={`cursor-pointer`} />
                </div>
            </SignedIn>


            <div className="w-[95vw] flex justify-between mt-10">
                <div className="md:h-40 h-30 mt-20 md:w-40 w-10 bg-black hover:translate-y-2.5 hover:rotate-6 transition-all transition-2">

                </div>

            </div>
        </div>
    )
}

export default Hero