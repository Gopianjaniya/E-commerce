import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero-bg relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-y-20 translate-x-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-10 -translate-x-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="flex flex-col-reverse sm:flex-row items-center gap-10 sm:gap-16">
          {/* Left */}
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              NEW ARRIVALS ARE HERE
            </div>

            <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-4">
              Dress to{" "}
              <span className="gradient-text">Impress</span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-md mx-auto sm:mx-0 leading-relaxed">
              Discover our latest collection of premium fashion for men, women,
              and kids. Quality you can feel, style you can trust.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
              <button
                onClick={() => navigate("/collection")}
                className="btn-primary px-8 py-3 text-sm"
              >
                Shop Now →
              </button>
              <button
                onClick={() => navigate("/about")}
                className="btn-outline px-8 py-3 text-sm"
              >
                Our Story
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 justify-center sm:justify-start">
              {[
                { num: "50K+", label: "Happy Customers" },
                { num: "200+", label: "Products" },
                { num: "4.9★", label: "Rating" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <p className="text-xl font-bold text-gray-900">{num}</p>
                  <p className="text-xs text-gray-500 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero image */}
          <div className="flex-1 flex justify-center sm:justify-end relative">
            <div className="relative w-72 sm:w-full sm:max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-2xl opacity-40 scale-110" />
              <img
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                src={assets.heroImage}
                alt="Hero fashion"
              />
              {/* floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">✓</div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Free Delivery</p>
                  <p className="text-[10px] text-gray-400">Orders over ₹499</p>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white rounded-2xl shadow-lg px-3 py-2 text-center">
                <p className="text-xs font-bold">20% OFF</p>
                <p className="text-[10px] font-medium">First Order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
