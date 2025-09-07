'use client'

import React, { useEffect, useRef } from "react"
import { Instrument_Serif } from "next/font/google"
import gsap from "gsap"
import Link from "next/link"
import { useUser, UserButton } from "@clerk/nextjs"

const instrumentSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
})

const Nav = () => {
    const { user } = useUser()
    const nav = useRef(null)

    useEffect(() => {
        if (nav.current) {
            gsap.fromTo(
                nav.current,
                { opacity: 0, y: -20 }, 
                { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
            )
        }
    }, [])

    return (
        <nav
            ref={nav}
            className={`${instrumentSerif.className} fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex md:flex-row flex-col items-center justify-between">
                <div className="flex flex-col items-end">
                    <p className="text-sm md:text-base text-black">
                        the kidpreneur platform
                    </p>
                    <h1 className="text-4xl md:text-5xl  tracking-tight">
                        proDUCT
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex-row  flex  gap-6 text-lg font-medium">
                        <Link href="/ideation" className="hover:text-indigo-600 transition-colors">
                            Ideation
                        </Link>
                        <Link href="/ideaPage" className="hover:text-indigo-600 transition-colors">
                            Idea Page
                        </Link>
                        <Link href="/" className="hover:text-indigo-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/quiz" className="hover:text-indigo-600 transition-colors">
                            Personality Quiz
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <UserButton afterSignOutUrl="/" />
                        {user?.firstName && (
                            <span className="hidden sm:inline text-gray-700 font-medium">
                                {user.firstName}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
