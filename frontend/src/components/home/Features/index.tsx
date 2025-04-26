// components/Features.tsx
"use client";
import { motion } from "framer-motion";
import { JSX } from "react";
import { FaUserPlus } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdLocalHospital } from "react-icons/md";
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const featureCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      variants={featureCardVariant}
      className="flex md:flex-row flex-col items-center text-center md:text-start gap-4 bg-white p-6 md:items-start rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
    >
      <div className="bg-primary-100 p-4 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    
    <motion.div
      initial="visible"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeIn}
      className="max-w-c-1154 mx-auto py-15 px-5"
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Key Features
      </h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
         className="flex flex-col gap-6"
      >
        <div
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
        
        >

        <FeatureCard
          icon={<MdLocalHospital size={36} className="text-primary" />}
          title="Health Programs"
          description="Create and manage health programs "
        />
        <FeatureCard
          icon={<FaUserPlus size={36} className="text-primary" />}
          title="Register Clients"
          description="Register clients and track their enrollments."
        />
        <FeatureCard
          icon={<HiOutlineClipboardList size={36} className="text-primary" />}
          title="Enrollments"
          description="Enroll clients in health programs."
        />
        </div>
       
      </motion.div>
    </motion.div>
  );
};

export default Features;
