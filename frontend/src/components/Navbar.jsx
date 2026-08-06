import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  SearchIcon,
  ShoppingBagIcon,
  User,
  Menu,
  X,
  ChevronDown,
  Heart,
  Package,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useContext, useRef, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user-menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "navbar-glass shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={token ? "/" : "/login"} className="flex items-center gap-2 flex-shrink-0">
            <img
              src={assets.logo}
              className="w-10 h-10 rounded-xl object-cover shadow-sm"
              alt="ApnaCart logo"
            />
            <span className="hidden sm:block font-bold text-lg gradient-text tracking-tight">
              ApnaCart
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to}>
                {({ isActive }) => (
                  <span className={`nav-link ${isActive ? "active" : ""}`}>
                    {label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBagIcon size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white text-[10px] font-bold rounded-full shadow">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => (token ? setUserMenuOpen(!userMenuOpen) : navigate("/login"))}
                className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="User menu"
              >
                <User size={20} />
                {token && <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />}
              </button>

              {/* Dropdown */}
              {token && userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-medium">ACCOUNT</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <UserCircle size={16} />
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Package size={16} />
                    My Orders
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => { setUserMenuOpen(false); logout(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* Panel */}
          <div className="w-72 bg-white h-full shadow-2xl flex flex-col mobile-menu-enter">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <img src={assets.logo} className="w-9 h-9 rounded-xl object-cover" alt="" />
                <span className="font-bold gradient-text text-lg">ApnaCart</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1 flex-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            {token && (
              <div className="p-4 border-t border-gray-100 space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <UserCircle size={16} />
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Package size={16} />
                  My Orders
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); logout(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
