"use client";

import Pagination from "@/components/common/Pagination";
import DataTable, { Column } from "@/components/common/Table/DataTable";
import { useFilters } from "@/hooks/useFilters";
import { ClientType } from "@/lib/definitions/clients";
import { PAGE_SIZE } from "@/lib/utils/constants";
import { CustomDate } from "@/lib/utils/dates";
import { useGetClientsQuery } from "@/redux/services/clients/clients";
import Link from "next/link";


import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FiEye } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import EnrollClient from "../enrollments/enrollClient";
import EditClient from "./EditClient";
import AddClient from "./NewClient";


const Clients = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { filters, currentPage, handleFilterChange, handlePageChange } =
    useFilters({
      initialFilters: {
        search: searchParams.get("search") || "",
      },
      initialPage: parseInt(searchParams.get("page") || "1", 10),
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
  const { data, isLoading, error, refetch } = useGetClientsQuery(queryParams,{ refetchOnMountOrArgChange: true });

  console.log("data", data);
  
  const columns: Column<ClientType>[] = [
    {
      header: "Name",
      accessor: "first_name",
      cell: (data: ClientType) => (
        <span className="text-sm font-semibold ">
          {data.first_name} {data.last_name}
        </span>
      ),
    },
    
    
    {
      header: "Phone",
      accessor: "phone_number",
      cell: (data: ClientType) => (
        <span className="text-sm ">
          {data.phone_number}
        </span>
      ),
    },
    {
      header: "ID No.",
      accessor: "id_number",
      cell: (data: ClientType) => (
        <span className="text-sm ">
          {data.id_number}
        </span>
      ),
    },
    {
      header: "D.O.B.",
      accessor: "date_of_birth",
      cell: (data: ClientType) => (
        <span className="text-sm ">
          {CustomDate(data.date_of_birth)}
        </span>
      ),
    },
    {
        header: "Created At",
        accessor: "created_at",
        cell: (data: ClientType) => (
          <span className="text-sm font-medium">
            {CustomDate(data.created_at)}
          </span>
        ),
      },
   
    {
      header: "Actions",
      accessor: "id",
      cell: (data: ClientType) => (
        <div className="flex items-center justify-center space-x-2">
          <EnrollClient client={data} refetchData={refetch} />
          {/* <div
            onClick={() => openDeleteModal(booking.id)}
            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 cursor-pointer transition duration-200 shadow-sm"
            title="Delete Property"
          >
            <FiTrash2 className="text-sm" />
          </div> */}
          
          
          <EditClient client={data} refetchData={refetch} />
          <Link
            href={`/dashboard/clients/${data.id}`}
            className="flex items-center justify-center p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition duration-200 shadow-md hover:shadow-lg"
            title="View client details"
          >
            <FiEye className="text-sm" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white w-full  p-2 md:p-4 shadow-md rounded-lg font-nunito">
      <div className=" p-3  flex flex-col md:flex-row md:items-center lg:items-center md:gap-0 lg:gap-0 gap-4 lg:justify-between md:justify-between">
        <h2 className="font-semibold text-black text-xl">
          All Clients
        </h2>
        <div>
          <AddClient refetchData={refetch} />
        </div>
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
            placeholder="Search by phone or ID number"
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

export default Clients;
