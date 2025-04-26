

import PageLoadingSpinner from "@/components/common/spinners/pageLoadingSpinner"
import ClientDetails from "@/components/dashboard/clients/ClientProfile"
import { Suspense } from "react"


const ClientProfilePage=async({ params}:{params: Promise<{id: string}>} )=>{
    const id = (await params).id
         
    return (
        
            <Suspense fallback={<PageLoadingSpinner />}>
        <ClientDetails client_id={id} />
            </Suspense>
      
    )
}
export default ClientProfilePage