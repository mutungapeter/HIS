"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import JoinNowSection from "@/components/home/joinNowSection";

export default function Home() {
  return (
    
         <div className="min-h-screen">
      <Header />

      <div
        className=" max-w-c-1235 mx-auto py-16 
     font-satoshi px-4 bg-gradient-to-b from-white to-gray-50"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center leading-tight">
            <span className="text-primary">
              Welcome to Health Information System
            </span>
            <br />
            Your management hub
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-600 text-center max-w-2xl"
          >
            Manage your health information system with ease and efficiency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/register"
              className="bg-primary hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-md transition flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              Create Account
              <FiChevronRight />
            </Link>
            <Link
              href="/login"
              className="border
             border-primary-600 text-primary-600 
             hover:bg-emerald-50 font-medium px-4 py-2 text-center rounded-md transition"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-gray-100 mx-auto py-6  ">
        <Features />
      </div>
      <div className="bg-gradient-to-r py-6 from-primary-600 to-primary-500">
        <JoinNowSection />
      </div>
      <div className="bg-white mx-auto">
        <Footer />
      </div>
    </div>
 
   
  );
}
