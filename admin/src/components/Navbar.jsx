import React from "react";
import { assets } from "../assets/assets.js";

export default function Navbar({setToken}) {
  return (
    <>
      <div className="flex items-center py-2 px-[4%] justify-between">
        <div className=" ">
          <img
            className="w-[max(10%,80px)]   relative"
            src={assets.logo}
            alt=""
          />
          <p className=" font-bold   text-xs absolute top-14 left-16 text-[#c586A5]">
            ADMIN PANEL
          </p>
        </div>
        <button onClick={()=>setToken('')} className="bg-gray-600 text-white py-2 sm:px-7 rounded-full text-xs sm:text-sm">
          Logout
        </button>
      </div>
    </>
  );
}
