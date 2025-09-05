import React from "react";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer className="w-[99vw] h-[12vh] bg-slate-100 flex justify-center items-center p-4">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" height={60} width={60} alt="logo" />
        <div className={`${instrumentSerif.className}`}>
          <p className="text-xs text-gray-600">the kidpreneur platform</p>
          <h1 className="text-3xl md:text-4xl tracking-tight text-indigo-800">
            proDUCT
          </h1>
          <p className="text-sm text-gray-700">
            Built by Shashwat Singh, Gurukul The School
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
