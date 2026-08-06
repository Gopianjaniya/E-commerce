import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="section-title">
      <p className="text-gray-400 font-semibold tracking-wider uppercase text-sm sm:text-base">
        {text1}{" "}
        <span className="gradient-text font-bold">{text2}</span>
      </p>
      <span className="line" />
    </div>
  );
}

export default Title;
