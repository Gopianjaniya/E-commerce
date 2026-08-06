import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { motion } from "framer-motion";
import { Award, Smile, Zap } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const whyUs = [
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    title: "Quality Assurance",
    desc: "We carefully select premium fabrics and ensure every product passes strict quality checks before it reaches you.",
  },
  {
    icon: <Zap size={28} strokeWidth={1.5} />,
    title: "Convenience",
    desc: "Enjoy a smooth shopping experience with easy navigation, secure payments, and quick checkout in just a few clicks.",
  },
  {
    icon: <Smile size={28} strokeWidth={1.5} />,
    title: "Exceptional Support",
    desc: "Our team is always ready to help with orders, returns, or any queries. Quick responses, every time.",
  },
];

export default function About() {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Title text1="ABOUT" text2="US" />
          <p className="text-gray-400 text-sm mt-1">Our story, mission, and values</p>
        </div>

        {/* Story section */}
        <div className="flex flex-col md:flex-row gap-10 mb-16 items-center">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl blur-2xl opacity-50 scale-110" />
              <img
                src={assets.about}
                alt="About ApnaCart"
                className="relative w-full rounded-3xl shadow-xl object-cover aspect-video"
              />
            </div>
          </div>
          <div className="md:w-1/2 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Fashion for Every Story
            </h2>
            <p className="text-gray-500 leading-relaxed">
              ApnaCart was created with a simple goal — to make stylish and affordable fashion
              accessible to everyone. We combine modern designs with comfortable fabrics to deliver
              outfits that fit your everyday lifestyle.
            </p>
            <p className="text-gray-500 leading-relaxed">
              From casual essentials to formal wear, our collection is thoughtfully curated to help
              you look confident on every occasion. We focus on quality, fair pricing, and customer
              satisfaction in everything we do.
            </p>
            <div className="pt-2">
              <h3 className="font-bold text-gray-800 mb-2">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To provide trend-driven, high-quality fashion at affordable prices while delivering a
                seamless shopping experience. We aim to become India's most trusted fashion destination.
              </p>
            </div>
            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[["50K+","Customers"],["200+","Products"],["98%","Satisfaction"]].map(([n,l]) => (
                <div key={l}>
                  <p className="text-2xl font-extrabold gradient-text">{n}</p>
                  <p className="text-xs text-gray-400 font-medium">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Title text1="WHY" text2="CHOOSE US" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyUs.map(({ icon, title, desc }) => (
              <div key={title} className="card p-7 text-center hover:shadow-lg transition-shadow">
                <div className="policy-icon mx-auto mb-4">{icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <NewsletterBox />
      </div>
    </motion.div>
  );
}
