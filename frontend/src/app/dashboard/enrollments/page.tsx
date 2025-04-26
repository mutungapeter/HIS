'use client';

import PageLoadingSpinner from "@/components/common/spinners/pageLoadingSpinner";

import Enrollments from "@/components/dashboard/enrollments";

import { Suspense } from "react";
const EnrollmentsPage=()=>{
    
      
    return(
            <Suspense fallback={<PageLoadingSpinner />}>
            <Enrollments />
            </Suspense>
       
    )
}
export default EnrollmentsPage