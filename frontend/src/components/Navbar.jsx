import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  User,
} from "lucide-react";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const [visiable, setVisiable] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setcartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setcartItems({});
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center py-5 font-medium ">
      <div className="overflow-hidden w-20 h-15">
        <img
          onClick={() => (token ? navigate("/") : navigate("/login"))}
          src={assets.logo}
          className="w-20 h-15 rounded-full "
          alt=""
        />
      </div>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p className="text-red-800">Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p className="text-red-800">Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p className="text-red-800">About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p className="text-red-800">Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <SearchIcon
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer"
        />
        <div className="group ralative">
          <User
            onClick={() => navigate("/login")}
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            {token && (
              <div className=" flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
        <Link to={"/cart"} className="relative">
          <ShoppingBagIcon className="w-5 min-w-5" />
          <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <MenuIcon
          onClick={() => setVisiable(true)}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* menubar for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden  bg-white  transition-all ${
          visiable ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisiable(false)}
            className="flex items-center gap-2 p-3 cursor-pointer"
          >
            <ChevronRight className="h-4" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisiable(false)}
            className="py-2 pl-6 border"
            to={"/"}
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisiable(false)}
            className="py-2 pl-6 border"
            to={"/collection"}
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisiable(false)}
            className="py-2 pl-6 border"
            to={"/about"}
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisiable(false)}
            className="py-2 pl-6 border"
            to={"/contact"}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
}
