import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-0">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={assets.logo} className="w-10 h-10 rounded-xl" alt="ApnaCart" />
            <span className="text-white font-bold text-xl gradient-text">ApnaCart</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-sm">
            Your go-to destination for stylish and affordable fashion for the
            entire family. Quality you can feel, style you can trust.
          </p>
          <div className="flex gap-3">
            {[
              { icon: <Instagram size={17} />, href: "#" },
              { icon: <Twitter size={17} />, href: "#" },
              { icon: <Facebook size={17} />, href: "#" },
              { icon: <Youtube size={17} />, href: "#" },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-blue-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</p>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/collection", label: "Collection" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Get in Touch</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-gray-400">
              <Phone size={14} />
              +91-235-733-4576
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <Mail size={14} />
              support@apnacart.com
            </li>
          </ul>
          <div className="mt-5">
            <p className="text-xs text-gray-500 mb-2">Accepted Payments</p>
            <div className="flex gap-2">
              {["VISA", "MC", "UPI", "COD"].map((p) => (
                <span
                  key={p}
                  className="text-[10px] font-bold bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-gray-300"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2025 ApnaCart. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
