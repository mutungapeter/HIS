
import { apiSlice } from "../../api/apiSlice";

interface GetClientsInterface {

  
  search?:string;
  page?: number;
  page_size?: number;
}
interface GetMetricsInterface{
  year?:number;
  month?:number;
}
export const clientsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: ({
        page, 
        page_size,
        search
      }: GetClientsInterface = {}) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        if (page) queryParams.page = page;
        if (page_size) queryParams.page_size = page_size;
        if (search) queryParams.search = search;
        
        
        return {
          url: `clients/`,
          method: "GET",
          params: queryParams,
        };
      },
    }),
   
    newClient: builder.mutation({
      query: (data) => ({
        url: `clients/create/`,
        method: "POST",
        body: data,
        
      }),
    }),
    updateClient: builder.mutation({
      query: ({id, data}) => ({
        url: `clients/${id}/update/`,
        method: "PATCH",
        body: data,
        
      }),
    }),
    getClientDetails: builder.query({
      query: (id) => ({
        url: `clients/${id}/`,
        method: "GET"
        
      }),
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients/${id}/delete/`,
        method: "DELETE"
        
      }),
    }),
    getMetrics: builder.query({
      query: ({ year, month }: GetMetricsInterface = {}) => {
        const queryParams: Record<string, number> = {};
    
        
        queryParams.year = year ?? new Date().getFullYear();
    
        if (month) {
          queryParams.month = month;
        }
    
        return {
          url: "clients/metrics/",
          method: "GET",
          params: queryParams,
        };
      },
    }),
    
  }),
});
export const {
  useGetClientsQuery,
  useNewClientMutation,
  useUpdateClientMutation,
  useGetClientDetailsQuery,
  useGetMetricsQuery
} = clientsApi;
