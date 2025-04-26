"use client";
import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="font-nunito animate-pulse">
      <div className="grid grid-cols-1 gap-4">
      
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="h-7 bg-gray-200 rounded-md w-48 dark:bg-gray-700"></div>
          <div className="mt-3 md:mt-0 mb-3 dark:bg-gray-800 p-2 md:justify-end flex flex-wrap gap-4 items-center">
            
            <div className="w-36 h-10 bg-gray-200 rounded-md dark:bg-gray-700"></div>
           
            <div className="w-36 h-10 bg-gray-200 rounded-md dark:bg-gray-700"></div>
            
            <div className="w-6 h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {[1, 2, 3, 4].map((item) => (
            <MetricCardSkeleton key={item} />
          ))}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>

       
      </div>
    </div>
  );
};

const MetricCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <div className="w-6 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
        <div className="w-16 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
      </div>
      <div className="mt-3">
        <div className="h-6 bg-gray-200 rounded w-24 mb-2 dark:bg-gray-700"></div>
        <div className="h-8 bg-gray-200 rounded-md w-20 mb-3 dark:bg-gray-700"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-24 dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-200 rounded w-16 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

const ChartSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6">
        <div className="w-full">
          <div className="h-6 bg-gray-200 rounded w-40 mb-2 dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-200 rounded w-64 dark:bg-gray-700"></div>
        </div>
      </div>
      
      <div className="w-full flex items-center md:justify-end mb-4">
        <div className="inline-flex p-3 rounded-xl bg-gray-200 shadow-sm border border-gray-300 w-64 h-16 dark:bg-gray-700 dark:border-gray-600"></div>
      </div>

     
      <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-700 w-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-gray-400 animate-spin dark:border-gray-600 dark:border-t-gray-500"></div>
      </div>
    </div>
  );
};


export default DashboardSkeleton;