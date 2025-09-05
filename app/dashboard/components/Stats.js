import React from "react";
import { Instrument_Serif } from "next/font/google";
import { FaLightbulb, FaChartLine, FaUsers } from "react-icons/fa";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const Stats = () => {
  return (
    <section
      className={`max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 ${instrumentSerif.className}`}
    >

        <h1>
          Stats come here
        </h1>
    </section>
  );
};

export default Stats;
