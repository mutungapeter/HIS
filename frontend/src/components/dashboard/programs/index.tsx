"use client";

import Pagination from "@/components/common/Pagination";
import DataTable, { Column } from "@/components/common/Table/DataTable";
import { useFilters } from "@/hooks/useFilters";
import { ProgramType } from "@/lib/definitions/programs";
import { PAGE_SIZE } from "@/lib/utils/constants";
import { CustomDate } from "@/lib/utils/dates";
import { useDeleteProgramMutation, useGetProgramsQuery } from "@/redux/services/healthPrograms/healthPrograms";


import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { GoSearch } from "react-icons/go";
import NewProgram from "./newProgram";
import EditProgram from "./EditProgram";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import ActionModal from "@/components/common/Modals/ActionModal";
import ContentSpinner from "@/components/common/spinners/dataLoadingSpinner";


const Programs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const { filters, currentPage, handleFilterChange, handlePageChange } =
    useFilters({
      initialFilters: {
        name: searchParams.get("name") || "",
      },
      initialPage: parseInt(searchParams.get("page") || "1", 10),
      router,
      debounceTime: 100,
      debouncedFields: ["name"],
    });

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      page_size: PAGE_SIZE,
      ...filters,
    }),
    [currentPage, filters]
  );

  const { data, isLoading, error, refetch } = useGetProgramsQuery(queryParams,{ refetchOnMountOrArgChange: true });
  const [deleteProgram,{isLoading:isDeleting}] = useDeleteProgramMutation();
  console.log("data", data);
   const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
      setSelectedProgram(null);
      
    };
  
   
  
    const openDeleteModal = (program: number) => {
      setSelectedProgram(program);
      setIsDeleteModalOpen(true);
    };
    const handleDeleteProgram = async () => {
      try {
        await deleteProgram(selectedProgram).unwrap();
        toast.success("Program deleted successfully!");
        closeDeleteModal();
        refetch();
      } catch (error: unknown) {
        console.log("error", error);
        if (error && typeof error === "object" && "data" in error && error.data) {
          const errorData = (error as { data: { error: string } }).data;
          console.log("errorData", errorData);
          toast.error(errorData.error || "Failed to delete program");
          closeDeleteModal();
        } else {
          toast.error("Failed to delete program. Please try again.");
          closeDeleteModal();
        }
      }
    };
  const columns: Column<ProgramType>[] = [
    {
      header: "Name",
      accessor: "name",
      cell: (data: ProgramType) => (
        <span className="text-sm font-semibold ">
          {data.name}
        </span>
      ),
    },
    
    
    {
      header: "Description",
      accessor: "description",
      cell: (data: ProgramType) => (
        <span className="text-sm ">
          {data.description}
        </span>
      ),
    },
    {
        header: "Created At",
        accessor: "created_at",
        cell: (data: ProgramType) => (
          <span className="text-sm font-medium">
            {CustomDate(data.created_at)}
          </span>
        ),
      },
   
    {
      header: "Actions",
      accessor: "id",
      cell: (data: ProgramType) => (
        <div className="flex items-center justify-center space-x-2">
          <EditProgram program={data} refetchData={refetch} />
         
          <div
            onClick={() => openDeleteModal(data.id)}
            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 cursor-pointer transition duration-200 shadow-sm"
            title="Delete program"
          >
            <FiTrash2 className="text-sm" />
          </div>
          
          

        </div>
      ),
    },
  ];

  return (
    <div className="bg-white w-full  p-2 md:p-4 shadow-md rounded-lg font-nunito">
      <div className=" p-3  flex flex-col md:flex-row md:items-center lg:items-center md:gap-0 lg:gap-0 gap-4 lg:justify-between md:justify-between">
        <h2 className="font-semibold text-black text-xl">
          Programs
        </h2>
        <NewProgram refetchData={refetch} />
      </div>

      <div className="flex flex-col gap-4 mt-5 lg:gap-0 md:gap-0 lg:flex-row md:flex-row  md:items-center p-2 
       md:justify-start">
        <div className="relative w-full md:w-auto md:min-w-[50%]  flex items-center gap-2 text-gray-500 focus-within:text-blue-600 px-2">
           <GoSearch size={20} className="" />
          <input
            type="text"
            name="name"
            onChange={handleFilterChange}
            placeholder="Search by program name"
            className="w-full md:w-auto text-gray-900 md:min-w-[35%] flex-grow text-sm px-2 py-2 bg-transparent outline-none border-b border-gray-300 focus:border-blue-600"
          />
        </div>
        
      </div>
      <ActionModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteProgram}
        isDeleting={isDeleting}
        confirmationMessage="Are you sure you want to delete this health program ?"
        deleteMessage="This action cannot be undone."
        title="Delete Health Program"
        actionText="Delete"
       
      />
      {data && data.count > 0 ? (
        <DataTable
        data={data?.results}
        columns={columns}
        isLoading={isLoading}
        error={error}
      />
      ) : (
        <div className="text-center py-4">
          {isLoading ? (
            <ContentSpinner />
          ) : (
            <p>No programs found.</p>
          )}
        </div>
      )}
      
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

export default Programs;
