// components/CTA.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const JoinNowSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeIn}
      className=" py-15 px-10 text-center text-white"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
       Get started with Health Information System
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-emerald-50 mt-3 mb-8 text-lg max-w-xl mx-auto"
      >
        Join thousands of people who are using our platform to manage their health information system.
      </motion.p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/register"
          className="bg-white text-primary hover:bg-emerald-50 inline-flex items-center font-medium px-8 py-4 rounded-md transition shadow-md"
        >
          <span className="font-bold">Get Started Now</span>
          <FiChevronRight size={20} className="ml-2" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default JoinNowSection;
