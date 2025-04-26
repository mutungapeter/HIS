"use client";
import { PiCalendarDotsLight } from "react-icons/pi";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuRefreshCcw } from "react-icons/lu";
import styles from "./DatePicker.module.css";
import DashboardSkeleton from "./skeleton";
import { useGetMetricsQuery } from "@/redux/services/clients/clients";
import StatisticsChart from "./StatisticsChart";
import ProgramEnrollmentsChart from "./EnrollmentsChart";
import MetricsContent from "./Metrics";

const DashboardMetrics = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const minYear = new Date(currentYear - 90, 0, 1);

  const [selectedYear, setSelectedYear] = useState<Date | null>(() => {
    const yearParam = searchParams.get("year");
    return yearParam ? new Date(Number(yearParam), 0, 1) : new Date();
  });

  const [selectedMonth, setSelectedMonth] = useState<Date | null>(() => {
    const monthParam = searchParams.get("month");
    return monthParam ? new Date(currentYear, Number(monthParam) - 1, 1) : null;
  });

  // Filters derived from selectedYear and selectedMonth
  const filters = useMemo(() => {
    const year = selectedYear?.getFullYear();
    const month =
      selectedMonth?.getMonth() !== undefined
        ? selectedMonth?.getMonth() + 1
        : undefined;

    return { year, month };
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const urlParams = new URLSearchParams();
    if (filters.year) urlParams.set("year", String(filters.year));
    if (filters.month) urlParams.set("month", String(filters.month));
    router.push(`?${urlParams.toString()}`);
  }, [filters, router]);

  const { data: metricsData, isLoading } = useGetMetricsQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  const handleResetFilters = () => {
    const now = new Date();
    setSelectedYear(now);
    setSelectedMonth(null);
  };
  console.log("metricsData", metricsData);
  if (isLoading) {
    return <DashboardSkeleton />;
  }
  return (
    <div className="font-nunito">
      <div className="grid grid-cols-1 gap-4 md:px-0 px-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Dashboard Overview
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm mb-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="relative">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                Filter by Year
              </label>
              <div className={styles.datepickerWrapper}>
                <DatePicker
                  selected={selectedYear}
                  onChange={(date) => setSelectedYear(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  showIcon
                  icon={
                    <PiCalendarDotsLight className="text-gray-500" size={18} />
                  }
                  placeholderText="Select year"
                  minDate={minYear}
                  maxDate={new Date()}
                  isClearable
                  className={`${styles.datepickerInput} w-full py-2 px-3
           rounded-md border border-gray-200 dark:border-gray-700   outline-none transition-all`}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                Filter by Month
              </label>
              <div className={styles.datepickerWrapper}>
                <DatePicker
                  selected={selectedMonth}
                  onChange={(date) => setSelectedMonth(date)}
                  showMonthYearPicker
                  dateFormat="MMMM"
                  showIcon
                  icon={
                    <PiCalendarDotsLight className="text-gray-500" size={18} />
                  }
                  placeholderText="Select month"
                  isClearable
                  className={`${styles.datepickerInput} w-full py-2 px-3 rounded-md border
           border-gray-200 dark:border-gray-700  outline-none transition-all`}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors mt-2 sm:mt-6"
          >
            <LuRefreshCcw size={16} />
            <span>Reset</span>
          </button>
        </div>

        <MetricsContent data={metricsData} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatisticsChart data={metricsData} />
          <ProgramEnrollmentsChart data={metricsData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
