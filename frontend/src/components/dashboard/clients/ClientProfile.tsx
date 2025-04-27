"use client";
import { CustomDate } from "@/lib/utils/dates";
import { useGetClientDetailsQuery } from "@/redux/services/clients/clients";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import {
  LuInfo,
  LuPhone,
  LuUser
} from "react-icons/lu";

import ActionModal from "@/components/common/Modals/ActionModal";
import ContentSpinner from "@/components/common/spinners/dataLoadingSpinner";
import DataTable, { Column } from "@/components/common/Table/DataTable";
import { EnrollmentType } from "@/lib/definitions/enrollments";
import { useDeleteClietEnrollmentMutation } from "@/redux/services/enrollments/enrollments";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const ClientDetails = ({ client_id }: { client_id: string }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEnrolledProgram, setSelectedEnrolledProgram] = useState<number | null>(null);
  const { data, isLoading, error, refetch } = useGetClientDetailsQuery(client_id,{ refetchOnMountOrArgChange: true } );
    const [deleteClietEnrollment, {isLoading:isDeleting}]=useDeleteClietEnrollmentMutation()

    console.log("data", data)
  const columns: Column<EnrollmentType>[] = [
    {
      header: "Program",
      accessor: "program",
      cell: (data: EnrollmentType) => (
        <span className="text-sm font-semibold ">{data.program}</span>
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
    {
      header: "Actions",
      accessor: "id",
      cell: (data: EnrollmentType) => (
        <div className="flex items-center  text-center space-x-2">
          <div
            onClick={() => openDeleteModal(data.id)}
            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 cursor-pointer transition duration-200 shadow-sm"
            title="Delete Property"
          >
            <FiTrash2 className="text-sm" />
          </div>
        </div>
      ),
    },
  ];
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEnrolledProgram(null);
    
  };

 

  const openDeleteModal = (program: number) => {
    setSelectedEnrolledProgram(program);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteProgam = async () => {
    try {
      await deleteClietEnrollment(selectedEnrolledProgram).unwrap();
      toast.success("Client removed from  program successfully!");
      closeDeleteModal();
      refetch();
    } catch (error: unknown) {
      console.log("error", error);
      if (error && typeof error === "object" && "data" in error && error.data) {
        const errorData = (error as { data: { error: string } }).data;
        console.log("errorData", errorData);
        toast.error(errorData.error || "Failed to remove program");
        closeDeleteModal();
      } else {
        toast.error("Failed to remove program. Please try again.");
        closeDeleteModal();
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <ContentSpinner />
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
          Error loading booking details. Please try again later.
        </div>
      ) : (
        <div className="w-full max-w-c-1000 md:px-0  px-3 mx-auto font-nunito">
          <Link
            href="/dashboard/clients"
            className="flex items-center space-x-3 justify-start py-5 cursor-pointer"
          >
            <IoIosArrowBack className="text-primary text-xl" />
            <span className="text-lg md:text-xl">Back</span>
          </Link>
          <div className="bg-white rounded-xl shadow-sm mb-6 ">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 h-24 rounded-t-xl"></div>
            <div className="px-6 pt-4 pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md -mt-10">
                  <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                    <LuUser className="text-blue-600 w-10 h-10" />
                  </div>
                </div>

                {/* client Details */}
                <div className="text-center sm:text-left flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {data.first_name} {data.last_name}
                    </h1>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-gray-600">
                    <div className="flex items-center justify-center sm:justify-start">
                      <LuInfo className="w-4 h-4 mr-1" />
                      <span>ID No.: {data.id_number}</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center justify-center sm:justify-start">
                      <LuPhone className="w-4 h-4 mr-1" />
                      <span>{data.phone_number}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Client&apos;s Details
              </h2>
              <p className="text-sm text-gray-500">
                Client&apos;s personal details and contact information
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <LuUser className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">ID Number</p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {data.id_number || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Date of Birth
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {CustomDate(data.date_of_birth)}
                  </p>
                </div>
               
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {data.phone_number || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Gender</p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {data.gender || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Enrolled Programs
              </h2>
              <p className="text-sm text-gray-500">
                Healthcare programs the client is enrolled in
              </p>
            </div>

            {data?.enrollments.length > 0 ? (
              <DataTable
                data={data?.enrollments}
                columns={columns}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                No programs enrolled
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Account activity
              </h2>
              <p className="text-sm text-gray-500">
                Client&apos;s account activity including created at and last updated
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Created At
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {CustomDate(data.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {CustomDate(data.modified_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ActionModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteProgam}
        isDeleting={isDeleting}
        confirmationMessage="Are you sure you want to unenroll client from this program?"
        deleteMessage="This action cannot be undone."
        actionText="Unenroll"
        title="Unenroll client from a program"
       
      /> 
        </div>
      )}
    </>
  );
};

export default ClientDetails;
