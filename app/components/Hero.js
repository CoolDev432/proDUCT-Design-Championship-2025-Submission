import React from "react";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-slate-100 min-h-[80vh] w-full shadow-2xl flex flex-col justify-center items-center px-6 sm:px-12 text-center overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 md:bg-pink-500/40 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans leading-tight">
          Turn Your Ideas Into <br />
          <span className="text-indigo-700">Impactful</span> Startups
        </h1>

        <p className="text-gray-600 font-medium text-lg sm:text-xl md:text-2xl font-sans mt-6 opacity-90">
          A community-driven platform for students to refine concepts, get valuable feedback, and launch their venture.
        </p>

        <div>
          <SignedOut>
            <SignInButton />
            <SignOutButton />
          </SignedOut>
          <SignedIn>
            <div>
            <button className="bg-blue-600 p-3 text-white rounded-3xl m-3 cursor-pointer hover:opacity-80 transition-all transition-1">
              <Link href={`/dashboard`}>
                  Dashboard
              </Link>
            </button>
            <SignOutButton>
              <button className="cursor-pointer text-red-700">
                Sign Out
              </button>
            </SignOutButton>
            </div>
          </SignedIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
