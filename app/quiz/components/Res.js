import React from "react";

const Res = ({ answer }) => {
  if (!answer) return null;

  return (
    <div className="shadow-xl bg-white rounded-2xl p-6 max-w-7xl w-[90vw] h-[70vh] overflow-y-auto whitespace-pre-line">
      <p
        className="prose prose-slate max-w-none text-base leading-relaxed"
      >
        {answer}
      </p>
    </div>
  );
};

export default Res;
