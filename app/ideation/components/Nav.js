'use client'

import React , {useEffect, useRef} from "react"
import { Instrument_Serif } from "next/font/google"
import gsap from "gsap"

const instrumentSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
})

const Nav = () => {
        const nav = useRef()
        useEffect(() => {
            gsap.fromTo(nav.current, {opacity: 0}, {opacity: 1, duration: 2})
        }, [])
    return (
        <div ref={nav} className={`${instrumentSerif.className} p-6 flex justify-between w-[99vw]`}>
            <div className="w-50">
            <p className="text-right">
                the kidpreneur platform
            </p>
            <h1 className={`text-5xl`}>
                proDUCT
            </h1>
            </div>

            <div className="bg-black h-30 w-20">

            </div>
        </div>
    )
}

export default Nav
