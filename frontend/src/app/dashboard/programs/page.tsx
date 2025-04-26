'use client';

import PageLoadingSpinner from "@/components/common/spinners/pageLoadingSpinner";
import Programs from "@/components/dashboard/programs";
import { Suspense } from "react";
const ProgramsPage=()=>{
    
      
    return(
            <Suspense fallback={<PageLoadingSpinner />}>
            <Programs />
            </Suspense>
       
    )
}
export default ProgramsPage