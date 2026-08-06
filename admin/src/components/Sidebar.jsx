import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusSquare, List, ShoppingCart, BarChart2 } from "lucide-react";

const links = [
  { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/add",       icon: <PlusSquare   size={18} />, label: "Add Product" },
  { to: "/list",      icon: <List         size={18} />, label: "Products" },
  { to: "/order",     icon: <ShoppingCart size={18} />, label: "Orders" },
];

export default function Sidebar() {
  return (
    <aside className="w-16 md:w-56 min-h-screen bg-[#0f172a] flex flex-col transition-all duration-300 flex-shrink-0">
      <div className="flex flex-col gap-1 p-3 pt-5 flex-1">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="flex-shrink-0">{icon}</span>
            <span className="hidden md:block">{label}</span>
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <div className="hidden md:flex items-center gap-2 px-2 py-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">A</div>
          <div>
            <p className="text-white text-xs font-semibold">Admin</p>
            <p className="text-gray-500 text-[10px]">admin@forever.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
