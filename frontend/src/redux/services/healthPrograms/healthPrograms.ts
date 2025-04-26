import { apiSlice } from "../../api/apiSlice";

interface GetProgramsInterface {
 
  name?:string;
  page?: number;
  page_size?: number;
}
export const programsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query({
      query: ({
        page, 
        page_size,
        name
       
      }: GetProgramsInterface = {}) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

        if (page) queryParams.page = page;
        if (page_size) queryParams.page_size = page_size;
        if (name) queryParams.name = name;
        
        
        return {
          url: `health-programs/`,
          method: "GET",
          params: queryParams,
        };
      },
    }),
   
    newProgram: builder.mutation({
      query: (data) => ({
        url: `health-programs/create/`,
        method: "POST",
        body: data,
        
      }),
    }),
    updateProgram: builder.mutation({
      query: ({id, data}) => ({
        url: `health-programs/${id}/update/`,
        method: "PATCH",
        body: data,
        
      }),
    }),
    deleteProgram: builder.mutation({
      query: (id) => ({
        url: `health-programs/${id}/delete/`,
        method: "DELETE",
       
        
      }),
    }),
    
  }),
});
export const {
 useGetProgramsQuery,
 useNewProgramMutation,
 useUpdateProgramMutation,
 useDeleteProgramMutation
} = programsApi;
