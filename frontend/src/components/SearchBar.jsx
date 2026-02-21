import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { SearchIcon, X } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visiable, setVisiable] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisiable(true);
    } else {
      setVisiable(false);
    }
  },[location]);

  return showSearch && visiable ? (
    <>
      <div className="border-t bg-gray-50 text-center border-gray-400">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2  my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="flex-1 outline-none bg-inherit text-sm "
          />
          <SearchIcon className="w-4" />
        </div>
        <X
          onClick={() => {
            setShowSearch(false);
          }}
          className="inline w-4 cursor-pointer"
        />
      </div>
    </>
  ) : null;
}
