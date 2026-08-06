import React from "react";
import { toast } from "react-toastify";
import { Mail, Sparkles } from "lucide-react";

export default function NewsletterBox() {
  const onSubmitHandle = (e) => {
    e.preventDefault();
    toast.success("🎉 Subscribed! Check your email for your 20% off coupon.");
    e.target.reset();
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl px-8 py-12 text-center text-white shadow-xl relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute -top-8 -right-8 w-40 h-40 border border-white/10 rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 border border-white/10 rounded-full" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/20">
            <Sparkles size={12} />
            LIMITED TIME OFFER
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Get 20% Off Your First Order
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and be the first to know about new
            arrivals and exclusive deals.
          </p>

          <form onSubmit={onSubmitHandle} className="flex gap-2 max-w-sm mx-auto">
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-9 pr-3 py-3 bg-white text-gray-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/40"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-orange px-5 py-3 text-sm whitespace-nowrap rounded-xl"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
