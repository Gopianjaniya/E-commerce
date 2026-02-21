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

export default function Contact() {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.div variants={item}>
        <div>
          <div className="text-center text2xl pt-10 border-t border-gray-400">
            <Title text1={"CONTACT"} text2={"US"} />
          </div>
          <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
            <img
              className="w-full md:max-w-120"
              src={assets.contactImage}
              alt=""
            />
            <div className="flex flex-col justify-center items-start gap-6">
              <p className="font-semibold text-xl text-gray-600">Our Store</p>
              <p className="text-gray-500">
                54709 Willms Station <br />
                Suite 350,Washington,USA
              </p>
              <p className="text-gray-500">
                Tel:(415) 555-0132
                <br />
                Email:admin@forever.com
              </p>
              <p className="font-semibold text-xl text-gray-600">
                Careers at Forever
              </p>
              <p className="text-gray-500">
                Learn more about our teams and job openings.
              </p>
              <button className="border border-gray-600  px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300">
                Explore jobs
              </button>{" "}
            </div>
          </div>
          <NewsletterBox />
        </div>
      </motion.div>
    </motion.div>
  );
}
