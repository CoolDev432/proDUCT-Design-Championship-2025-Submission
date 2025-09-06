'use client'

import React from "react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <section
      className={`${instrumentSerif.className} text-center flex flex-col items-center gap-6`}
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight">
        Welcome to your <span className="text-indigo-700">Dashboard</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
        Track your ideas, analyze feedback, and refine them into something
        extraordinary.
      </p>
    </section>
  );
};

export default Hero;
