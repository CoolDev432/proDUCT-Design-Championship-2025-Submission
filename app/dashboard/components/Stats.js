"use client"

import React, { useEffect, useState } from "react";
import { Instrument_Serif } from "next/font/google";
import { FaArrowUp, FaPlus } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});


const Stats = () => {
  const [Res, setRes] = useState()
  const { user } = useUser()
  const getStats = async () => {
    const res = await fetch(`/api/getStats?email=${user?.emailAddresses[0].emailAddress}`);
    const resJSON = await res.json();
    console.log(resJSON)
    setRes(resJSON)
  }
  useEffect(() => {
    getStats()
  }, [user])

  return (
    <div
      className={`flex w-full justify-center flex-wrap  items-center mt-5 ${instrumentSerif.className}`}
    >
      <div className="h-70 w-60 rounded-4xl shadow-sx hover:shadow-2xl hover:scale-110 mt-2 transition-1 transition-all flex justify-center flex-col items-center bg-white">
        <div className="p-7 shadow-xl rounded-4xl text-orange-500 m-10">
          <FaArrowUp />
        </div>
        <h1 className="text-orange-500 text-3xl font-bold">Upvotes</h1>
        <p className="text-2xl m-9 text-orange-500">
          {Res?.upvotes}
        </p>
      </div>

      <div className="h-70 w-60 md:ml-16 mt-12 rounded-4xl shadow-sx hover:shadow-2xl md:p-0 p-10  hover:scale-110  transition-1 transition-all flex justify-center flex-col items-center bg-white">
        <div className="p-7 shadow-xl rounded-4xl text-orange-500 m-10">
          <FaPlus />
        </div>
        <h1 className="text-orange-500 text-2xl font-bold">Total Products Published</h1>
        <p className="text-2xl m-9 text-orange-500">
          {Res?.totalProducts}
        </p>
      </div>
    </div>
  );
};

export default Stats;
