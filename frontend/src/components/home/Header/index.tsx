

"use client";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  FiHome,
  FiLogIn,
  FiMenu,
  FiUserPlus,
  FiX
} from "react-icons/fi";
import { GiHospitalCross } from "react-icons/gi";
import DropdownUser from "./DropdownUser";



const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const {
    user,
  } = useAppSelector((state: RootState) => state.auth);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  

  return (
    <header className="bg-white w-full border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-x-3">
              <GiHospitalCross className="text-2xl text-primary" />
              <h1 className="text-2xl font-bold text-primary-600">HIS</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/" 
                  ? "text-primary-600" 
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <FiHome className={`mr-2 h-5 w-5 ${pathname === "/" ? "text-primary-600" : ""}`} />
              <span>Home</span>
            </Link>
            
           
            {user ? (
              <>
             
              <DropdownUser />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FiLogIn className="mr-2 h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FiUserPlus className="mr-2 h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

         
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            onClick={closeMenu}
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/"
                ? "text-primary bg-gray-50"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <FiHome className={`mr-3 h-5 w-5 ${pathname === "/" ? "text-primary" : ""}`} />
            <span>Home</span>
          </Link>
          
        

         
          {user ? (
              <DropdownUser />
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FiLogIn className="mr-2 h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FiUserPlus className="mr-2 h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
