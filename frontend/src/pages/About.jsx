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
          <div className="text-2xl text-center border-t border-gray-400 pt-8">
            <Title text1={"ABOUT"} text2={"US"} />
          </div>
          <div className="flex flex-col my-10 md:flex-row gap-16">
            <img className="w-full md:max-w-112.5 " src={assets.about} alt="" />
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corrupti aspernatur necessitatibus voluptates laudantium tenetur
                voluptatum ipsa enim recusandae, voluptatibus tempore!
                Repellendus suscipit perspiciatis iste sint?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                quo, quam ea ex adipisci repudiandae minima porro soluta dolores
                aliquid.
              </p>
              <b>Our Mission</b>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                omnis error culpa? Necessitatibus illum omnis aliquid nemo,
                incidunt eos quo!
              </p>
            </div>
          </div>
          <div className="text-xl py-4">
            <Title text1={"WHY"} text2={"CHOOSE US"} />
          </div>
          <div className="flex flex-col sm:flex-row text-sm mb-20">
            <div className="border border-gray-400 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Quality Assurance:</b>
              <p className="text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
                laborum minus nisi corrupti, dolores numquam.
              </p>
            </div>
            <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Convenience:</b>
              <p className="text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
                laborum minus nisi corrupti, dolores numquam.
              </p>
            </div>
            <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Exceptional Customer Service:</b>
              <p className="text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
                laborum minus nisi corrupti, dolores numquam.
              </p>
            </div>
          </div>
          <NewsletterBox />
        </div>
      </motion.div>
    </motion.div>
  );
}
