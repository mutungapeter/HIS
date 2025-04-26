"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MetricsResponse } from "./metricsType";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ProgramEnrollmentsChart({
  data,
}: {
  data: MetricsResponse;
}) {
  const programs =
    data?.enrollment_metrics?.program_enrollments?.map(
      (item) => item.program__name
    ) || [];
  const enrollmentCounts =
    data?.enrollment_metrics?.program_enrollments?.map((item) => item.count) ||
    [];

  const options: ApexOptions = {
    colors: ["#465fff", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 310,
    },
    legend: {
      position: "bottom",
      fontFamily: "Outfit",
      fontSize: "14px",
      offsetY: 0,
      itemMargin: {
        horizontal: 8,
        vertical: 5,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontFamily: "Outfit, sans-serif",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontFamily: "Outfit, sans-serif",
            },
            total: {
              show: true,
              label: "Total Enrollments",
              fontSize: "16px",
              fontFamily: "Outfit, sans-serif",
              formatter: function (w) {
                return w.globals.seriesTotals
                  .reduce((a: number, b: number) => a + b, 0)
                  .toString();
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      colors: ["#fff"],
    },
    labels: programs,
    tooltip: {
      y: {
        formatter: (val: number) => val.toString(),
      },
    },
  };

  return (
    <div
      className="overflow-hidden rounded-2xl border 
    border-gray-200
     bg-white px-5 pb-5 pt-5
     dark:border-gray-800
     dark:bg-white/[0.03] sm:px-6 sm:pt-6"
    >
      <div className="flex flex-col gap-5 mb-6">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Program Enrollments Distribution
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Breakdown of enrollments by health program
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto md:overflow-x-hidden custom-scrollbar">
        <div className="min-w-[650px] xl:min-w-full">
          {programs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500">
                No program enrollment data for selected period
              </p>
            </div>
          ) : (
            <ReactApexChart
              options={options}
              series={enrollmentCounts}
              type="donut"
              height={310}
            />
          )}
        </div>
      </div>
    </div>
  );
}
