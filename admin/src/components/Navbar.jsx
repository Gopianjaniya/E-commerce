import { LogOut } from "lucide-react";
import { assets } from "../assets/assets.js";

export default function Navbar({ setToken }) {
  return (
    <>
      <div className="flex items-center py-2 px-[4%] justify-between">
        <div className=" ">
          <img
            className="w-[max(10%,80px)] relative"
            src={assets.logo}
            alt=""
          />
          <p className=" font-bold text-xs absolute top-14 md:left-15 text-[#c586A5]">
            ADMIN PANEL
          </p>
        </div>
        <button
          onClick={() => setToken("")}
          className="bg-gray-600 text-white  sm:py-2 px-3 py-2 sm:px-7 rounded-full text-xs sm:text-sm flex justify-center items-center "
        >
          Logout
        </button>
      </div>
    </>
  );
}
