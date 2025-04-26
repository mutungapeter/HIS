import { apiSlice } from "../../api/apiSlice";

interface GetEnrollmentsInterface {
  
 search?:string;
  page?: number;
  page_size?: number;
}

export const enrollmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollments: builder.query({
      query: ({
        page, 
        page_size,
        search
        
       
      }: GetEnrollmentsInterface = {}) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        if (page) queryParams.page = page;
        if (page_size) queryParams.page_size = page_size;
        if (search) queryParams.search = search;
        
        
        return {
          url: `enrollments/`,
          method: "GET",
          params: queryParams,
        };
      },
    }),
   
    enrollClient: builder.mutation({
      query: (data) => ({
        url: `enrollments/create/`,
        method: "POST",
        body: data,
        
      }),
    }),
    deleteClietEnrollment: builder.mutation({
      query: (id) => ({
        url: `enrollments/${id}/delete/`,
        method: "DELETE",
      
      }),
    }),
   
  }),
});

export const {
  useGetEnrollmentsQuery,
  useEnrollClientMutation,
  useDeleteClietEnrollmentMutation
} = enrollmentsApi;
