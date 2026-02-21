import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import { motion } from "framer-motion";

const baseEase = [0.22, 1, 0.36, 1];

const heroAnim = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: baseEase },
  },
};

const collectionAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: baseEase },
  },
};

const bestSellerAnim = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: baseEase },
  },
};

const policyAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: baseEase },
  },
};

const newsletterAnim = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: baseEase },
  },
};
export default function Home() {
  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={heroAnim}>
        <Hero />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={collectionAnim}>
        <LatestCollection />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={bestSellerAnim}>
        <BestSeller />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={policyAnim}>
        <OurPolicy />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={newsletterAnim}>
        <NewsletterBox />
      </motion.div>
    </div>
  );
}
