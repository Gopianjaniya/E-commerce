import React from "react";
import { Repeat2, ShieldCheck, Headphones, Truck } from "lucide-react";

const policies = [
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: "Free Delivery",
    desc: "Free shipping on all orders above ₹499 across India.",
  },
  {
    icon: <Repeat2 size={28} strokeWidth={1.5} />,
    title: "Easy Exchange",
    desc: "Hassle-free size and product exchanges within 7 days.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: "7-Day Returns",
    desc: "Not happy? Return it within 7 days, no questions asked.",
  },
  {
    icon: <Headphones size={28} strokeWidth={1.5} />,
    title: "24/7 Support",
    desc: "Our customer team is ready to help you around the clock.",
  },
];

export default function OurPolicy() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {policies.map(({ icon, title, desc }) => (
          <div key={title} className="policy-card">
            <div className="policy-icon">{icon}</div>
            <h3 className="font-bold text-gray-800 text-base mb-1">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
