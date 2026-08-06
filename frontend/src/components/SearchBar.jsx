import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { SearchIcon, X } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  return showSearch && visible ? (
    <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <SearchIcon size={16} className="text-gray-400 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products…"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowSearch(false)}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  ) : null;
}
