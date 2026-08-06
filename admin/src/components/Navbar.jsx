import { LogOut, Bell, Settings } from "lucide-react";
import { assets } from "../assets/assets.js";

export default function Navbar({ setToken }) {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-14 px-5">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <img src={assets.logo} className="w-8 h-8 rounded-xl object-cover" alt="Logo" />
          <div>
            <span className="font-bold gradient-text text-base">ApnaCart</span>
            <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">Admin</span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings size={18} />
          </button>
          <div className="w-px h-5 bg-gray-200 mx-1" />
          <button
            onClick={() => setToken("")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
