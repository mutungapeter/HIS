// UserLayout.tsx - Layout for regular users
"use client";

import Header from "@/components/dashboard/Header";
import React from "react";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
  <>
      <Header />
      <main className=" w-full flex flex-col bg-gray-100 min-h-screen">
        <div className="w-full max-w-c-1235 mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
  </>

  );
};

export default DashboardLayout;
