import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // pehle 0.2 tha
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // duration badha di
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
export default function About() {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.div variants={item}>
        <div>
          <div className="text-lg sm:text-2xl text-center border-t border-gray-400 pt-6">
            <Title text1={"ABOUT"} text2={"US"} />
          </div>
          <div className="flex flex-col my-10 md:flex-row gap-8">
            <img className="w-full md:max-w-112.5 " src={assets.about} alt="" />
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
              <p>
                HappyStore was created with a simple goal — to make stylish and
                affordable men’s fashion accessible to everyone. We combine
                modern designs with comfortable fabrics to deliver outfits that
                fit your everyday lifestyle.
              </p>
              <p>
                From casual essentials to formal wear, our collection is
                thoughtfully curated to help you look confident on every
                occasion. We focus on quality, fair pricing, and customer
                satisfaction in everything we do.
              </p>
              <b>Our Mission</b>
              <p>
                Our mission is to provide trend-driven, high-quality fashion at
                affordable prices while delivering a seamless online shopping
                experience. We aim to become a trusted destination for men who
                value style, comfort, and reliability.
              </p>
            </div>
          </div>
          <div className="text-lg sm:text-xl py-4">
            <Title text1={"WHY"} text2={"CHOOSE US"} />
          </div>
          <div className="flex flex-col sm:flex-row text-sm mb-20">
            <div className="border border-gray-400 md:px-16 py-8 sm:py-20 flex flex-col items-center  justify-center gap-5">
              <b className="sm:text-lg">Quality Assurance:</b>
              <p className="text-gray-600 p-1">
                We carefully select premium fabrics and ensure every product
                goes through strict quality checks before it reaches you. From
                stitching to finishing, we focus on durability, comfort, and
                long-lasting wear so you always get the best value for your
                money.
              </p>
            </div>
            <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col  items-center  justify-center gap-5">
              <b className="sm:text-lg">Convenience:</b>
              <p className="text-gray-600">
                Enjoy a smooth and hassle-free shopping experience with easy
                navigation, secure payments, and quick checkout. Browse, select,
                and order your favorite styles in just a few clicks from the
                comfort of your home.
              </p>
            </div>
            <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col  items-center  justify-center gap-5">
              <b className="sm:text-lg">Exceptional Customer Service:</b>
              <p className="text-gray-600">
                Our support team is always ready to help you with orders,
                returns, or any queries. We believe in building trust with our
                customers by providing quick responses and reliable after-sales
                support.
              </p>
            </div>
          </div>
          <NewsletterBox />
        </div>
      </motion.div>
    </motion.div>
  );
}
