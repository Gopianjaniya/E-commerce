import React from "react";
import { NavLink } from "react-router-dom";
import { CalendarCheck, ListOrderedIcon, PlusCircleIcon } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <div className="w-[18%] min-h-screen border-r border-gray-300">
        <div className="flex flex-col  gap-4 pt-6 pl-[20%] text-[15px]  ">
          <NavLink
            to={"/add"}
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <PlusCircleIcon size={25} />
            <p className="hidden md:block">Add item</p>
          </NavLink>
          <NavLink
            to={"/list"}
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <ListOrderedIcon size={25} />
            <p className="hidden md:block">List item</p>
          </NavLink>{" "}
          <NavLink
            to={"/order"}
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <CalendarCheck size={25} />
            <p className="hidden md:block">Oredr</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}
