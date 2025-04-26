'use client';

import PageLoadingSpinner from "@/components/common/spinners/pageLoadingSpinner";
import Clients from "@/components/dashboard/clients";

import { Suspense } from "react";
const ClientsPage=()=>{
    
      
    return(
            <Suspense fallback={<PageLoadingSpinner />}>
            <Clients />
            </Suspense>
       
    )
}
export default ClientsPage