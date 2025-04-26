export interface MetricsResponse {
    client_metrics: {
      total_clients: number;
      monthly_registrations: {
        month: string;
        year: number;
        count: number;
        month_name: string;
      }[];
      gender_distribution: {
        gender: string;
        count: number;
      }[];
      new_clients_this_month: number;
    };
    enrollment_metrics: {
      total_enrollments: number;
      monthly_enrollments: {
        month: string; 
        year: number;
        count: number;
        month_name: string;
      }[];
      program_enrollments: {
        program__name: string;
        count: number;
      }[];
      new_enrollments_this_month: number;
    };
    program_metrics: {
      total_programs: number;
    };
   
  }
  