"use client";

import React from "react";
import { GrGroup } from "react-icons/gr";
import { IoBookOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import MetricCard from "./MetricsCard";
interface ClientMetrics {
  total_clients: number;
}

interface EnrollmentMetrics {
  total_enrollments: number;
}

interface ProgramMetrics {
  total_programs: number;
}

interface MetricsResponse {
  client_metrics: ClientMetrics;
  enrollment_metrics: EnrollmentMetrics;
  program_metrics: ProgramMetrics;
}

const MetricsContent = ({ data }: { data: MetricsResponse }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
      <MetricCard
        icon={<GrGroup className="text-gray-800 size-6 dark:text-white/90" />}
        title="Total Clients"
        count={data?.client_metrics.total_clients || 0}
      />
      <MetricCard
        icon={<IoBookOutline className="text-gray-800 size-6 dark:text-white/90" />}
        title="Total Enrollments"
        count={data?.enrollment_metrics.total_enrollments || 0}
      />
      <MetricCard
        icon={<LiaClipboardListSolid className="text-gray-800 size-6 dark:text-white/90" />}
        title="Total Programs"
        count={data?.program_metrics.total_programs || 0}
      />
    </div>
  );
};

export default MetricsContent;