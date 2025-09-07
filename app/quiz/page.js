"use client";

import React, { useState, useEffect } from "react";
import Q1 from "./components/Q1";
import Q2 from "./components/Q2";
import Q3 from "./components/Q3";
import Res from "./components/Res";

const Quiz = () => {
  const [Count, setCount] = useState(1);
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [res, setres] = useState(``);

  const totalQuestions = 3;

  const firstAnswer = (answer) => {setQ1(answer);}
  const secondAnswer = (answer) => {setQ2(answer);}
  const thirdAnswer = (answer) => {setQ3(answer);}

  const aiAnswer = async () => {
    const res = await fetch("/api/personalityQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q1, q2, q3 }),
    });

    const resJSON = await res.json();
    setres(resJSON.answer);
  };

  const handleSubmit = async () => {
    await aiAnswer();
    setCount(Count + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-gray-50 px-4">
      <h1 className={`font-serif text-3xl md:text-5xl font-bold mt-10 mb-8 text-gray-800 text-center z-50 relative`}>
        Personality Quiz
      </h1>
      <div className="absolute top-70 left-20 w-62 h-62 bg-indigo-500/30 rounded-full blur-2xl z-10 hidden sm:block transition-1 transition-all animate-pulse"></div>
      <div className="absolute top-70 left-320 w-52 h-52 bg-pink-500/30 rounded-full blur-3xl animate-pulse  z-10 hidden sm:block"></div>

      <div className="w-full flex justify-center z-50 relative">
        {Count === 1 ? (
          <Q1 firstAnswer={firstAnswer}  />
        ) : Count === 2 ? (
          <Q2 secondAnswer={secondAnswer} />
        ) : Count === 3 ? (
          <Q3 thirdAnswer={thirdAnswer} />
        ) : Count === 4 ? (
          <Res answer={res} />
        ) : null}
      </div>

      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={() => setCount(Count === 1 ? totalQuestions : Count - 1)}
          className="bg-black cursor-pointer text-white px-6 py-3 rounded-3xl hover:scale-105 transition-transform"
        >
          ←
        </button>

        {Count < totalQuestions && (
          <button
            onClick={() => setCount(Count + 1)}
            className="bg-black cursor-pointer text-white px-6 py-3 rounded-3xl hover:scale-105 transition-transform"
          >
            →
          </button>
        )}

        {Count === totalQuestions && (
          <button
            onClick={handleSubmit}
            className="bg-black cursor-pointer text-white px-6 py-3 rounded-3xl hover:scale-105 transition-transform"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
