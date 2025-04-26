"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MetricsResponse } from "./metricsType";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartDataKey = "enrollments" | "clientRegistrations";

const seriesNameToKey: Record<string, ChartDataKey> = {
  "Total  enrollments": "enrollments",
  "Total Client registrations": "clientRegistrations",
};

export default function StatisticsChart({ data }: { data: MetricsResponse }) {
  const chartData: Record<ChartDataKey, number[]> = {
    enrollments:
      data?.enrollment_metrics.monthly_enrollments.map((item) => item.count) ||
      [],
    clientRegistrations:
      data?.client_metrics.monthly_registrations.map((item) => item.count) ||
      [],
  };

  const hasEnrollmentData = chartData.enrollments.some((count) => count > 0);
  const hasClientData = chartData.clientRegistrations.some(
    (count) => count > 0
  );
  const hasData = hasEnrollmentData || hasClientData;

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3B82F6", "#6366F1", "#10B981", "#06B6D4", "#F59E0B"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      selection: {
        enabled: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: [2, 2, 2, 2, 2],
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 4,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          const dataType = w.globals.seriesNames[seriesIndex];
          const dataKey = seriesNameToKey[dataType];
          const count = chartData[dataKey][dataPointIndex];
          return `${count}`;
        },
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "Bookings & Sales trends",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Total  enrollments",
      data: chartData.enrollments,
    },
    {
      name: "Total Client registrations",
      data: chartData.clientRegistrations,
    },
  ];
  return (
    <>
      <div
        className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800
     dark:bg-white/[0.03] sm:px-6 sm:pt-6 space-y-3"
      >
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Enrollments and Client Registrations analytics
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Monthly trends across all the two metrics
            </p>
          </div>
        </div>

        <div className="w-full flex items-center md:justify-end">
          <div
            className="inline-flex flex-row items-center
         p-3 rounded-xl bg-slate-50 
        shadow-sm border border-slate-200 gap-4 md:gap-8 justify-between"
          >
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs font-medium text-slate-500">
                Total Enrollments
              </span>
              <span className="text-lg font-bold text-slate-800">
                {data?.enrollment_metrics.total_enrollments || 0}
              </span>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <span className="text-s font-medium text-slate-500">
                Total Clients
              </span>
              <span className="text-lg font-bold text-slate-800">
                {data?.client_metrics.total_clients || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto md:overflow-x-hidden custom-scrollbar">
          <div className="min-w-[1000px] xl:min-w-full">
            {!hasData ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-500">
                  No enrollment or client registration data for selected period
                </p>
              </div>
            ) : (
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={310}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
