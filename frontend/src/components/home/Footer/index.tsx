// components/Footer.tsx
"use client";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeIn}
      className="mt-16 text-center py-10 text-gray-500"
    >
      <h2 className="text-2xl font-semibold mb-2">Health Information System</h2>
      <p className="text-sm">&copy; {year} All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
