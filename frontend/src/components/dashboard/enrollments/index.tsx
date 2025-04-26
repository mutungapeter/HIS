"use client";

import Pagination from "@/components/common/Pagination";
import DataTable, { Column } from "@/components/common/Table/DataTable";
import { useFilters } from "@/hooks/useFilters";
import { EnrollmentType } from "@/lib/definitions/enrollments";
import { PAGE_SIZE } from "@/lib/utils/constants";
import { CustomDate } from "@/lib/utils/dates";
import { useGetEnrollmentsQuery } from "@/redux/services/enrollments/enrollments";



import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { GoSearch } from "react-icons/go";


const Enrollments = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filters, currentPage, handleFilterChange, handlePageChange } =
    useFilters({
      initialFilters: {
        search: searchParams.get("search") || "",
       
      },
      initialPage: parseInt(searchParams.get("search") || "1", 10),
      router,
      debounceTime: 100,
      debouncedFields: ["search"],
    });

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      page_size: PAGE_SIZE,
      ...filters,
    }),
    [currentPage, filters]
  );
  const { data, isLoading, error } = useGetEnrollmentsQuery(
    queryParams,

    { refetchOnMountOrArgChange: true }
  );

  console.log("data", data);
  
  const columns: Column<EnrollmentType>[] = [
    {
      header: "Client",
      accessor: "client",
      cell: (data: EnrollmentType) => (
        <span className="text-sm font-semibold ">
          {data.client}
        </span>
      ),
    },
    
    
    {
      header: "Program",
      accessor: "program",
      cell: (data: EnrollmentType) => (
        <span className="text-sm ">
          {data.program}
        </span>
      ),
    },
    {
        header: "Enrolled on",
        accessor: "created_at",
        cell: (data: EnrollmentType) => (
          <span className="text-sm font-medium">
            {CustomDate(data.created_at)}
          </span>
        ),
      },
   
//     {
//       header: "Actions",
//       accessor: "id",
//       cell: (booking: any) => (
//         <div className="flex items-center justify-center space-x-2">
// {booking.status !== "Paid" ? (
//     <PayBooking refetchBookings={refetchanys} booking={booking} />
//   ) : (
//     <div className="p-3 rounded-xl invisible shadow-sm">
      
//     </div>
//   )}          <RescheduleAirany
//             booking={booking}
//             refetchbookings={refetchanys}
//           />
//           {/* <UpdateAiranyStatus
//             booking={booking}
//             refetchbookings={refetchanys}
//           /> */}
//           {/* <div
//             onClick={() => openDeleteModal(booking.id)}
//             className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 cursor-pointer transition duration-200 shadow-sm"
//             title="Delete Property"
//           >
//             <FiTrash2 className="text-sm" />
//           </div> */}
          
          
          
//           <Link
//             href={`/dashboard/bookings/airbnb-bookings/${booking.id}`}
//             className="flex items-center justify-center p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition duration-200 shadow-md hover:shadow-lg"
//             title="View Event Details"
//           >
//             <FiEye className="text-sm" />
//           </Link>
//         </div>
//       ),
//     },
  ];

  return (
    <div className="bg-white w-full  p-2 md:p-4 shadow-md rounded-lg font-nunito">
      <div className=" p-3  flex flex-col md:flex-row md:items-center lg:items-center md:gap-0 lg:gap-0 gap-4 lg:justify-between md:justify-between">
        <h2 className="font-semibold text-black text-xl">
          All Enrollments
        </h2>
      </div>

      <div className="flex flex-col gap-4 mt-5 lg:gap-0 md:gap-0 lg:flex-row md:flex-row  md:items-center p-2 
       md:justify-start">
        <div className="relative w-full md:w-auto md:min-w-[50%]  flex items-center gap-2 text-gray-500 focus-within:text-blue-600 px-2">
          <GoSearch size={20} className="" />
          <input
            type="text"
            name="search"
            onChange={handleFilterChange}
            value={filters.search}
            placeholder="Search by phone ,ID No. or program name"
            className="w-full md:w-auto text-gray-900 md:min-w-[35%] flex-grow text-sm px-2 py-2 bg-transparent outline-none border-b border-gray-300 focus:border-blue-600"
          />
        </div>
        
      </div>
      {/* <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteBooking}
        isDeleting={isDeleting}
        confirmationMessage="Are you sure you want to delete this Booking ?"
        deleteMessage="This action cannot be undone."
       
      /> */}
      <DataTable
        data={data?.results}
        columns={columns}
        isLoading={isLoading}
        error={error}
      />
      {data && data.count > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={data.count}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Enrollments;
