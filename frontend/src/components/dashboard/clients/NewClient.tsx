"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { z } from "zod";

import SuccessFailModal from "@/components/common/Modals/SuccessFailModal";
import SubmitSpinner from "@/components/common/spinners/submitSpinner";
import { useNewClientMutation } from "@/redux/services/clients/clients";
import createClientSchema from "@/schemas/clients/client";
import { BsChevronDown } from "react-icons/bs";

const AddClient = ({ refetchData }: { refetchData: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
 
  const [isError, setIsError] = useState(false);


  const [newClient, {isLoading:isCreating}] = useNewClientMutation();

 
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(createClientSchema),
  });
  useEffect(() => {
    console.log("Form Errors:", errors);
  }, [errors]);
  

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setIsError(false);
    handleCloseModal();
  };


  const onSubmit = async (formData: z.infer<typeof createClientSchema>) => {
    

   
    console.log("submitting form data");

    try {
      const response = await newClient(formData).unwrap();
      console.log("response", response);

      setIsError(false);
      setSuccessMessage("Client added successfully!");
      setShowSuccessModal(true);
      reset();
      refetchData();
    } catch (error: unknown) {
      console.log("error", error);
      setIsError(true);
      if (error && typeof error === "object" && "data" in error && error.data) {
        const errorData = (error as { data: { error: string } }).data;
        setSuccessMessage(`Failed to add client: ${errorData.error}`);
        setShowSuccessModal(true);
      }else {
        setIsError(true);
        setSuccessMessage("Failed to add client. Please try again.");
        setShowSuccessModal(true);
      }
    }
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto"
      >
        <div
          className="bg-success-500 inline-flex cursor-pointer w-max 
         items-center space-x-3 text-white px-3 py-2 rounded-md hover:bg-success-600 transition duration-300"
        >
          <FiPlus className="text-xl" />
          <span>New Client</span>
        </div>
      </div>

      {isOpen && (
        <div
          className="relative z-9999 animate-fadeIn"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fadeIn"
            aria-hidden="true"
          ></div>

          <div
            className="fixed inset-0 min-h-full   z-100 w-screen flex flex-col text-center md:items-center
           justify-center overflow-y-auto p-2 md:p-3"
          >
            <div
              className="relative transform justify-center animate-fadeIn max-h-[90vh]
                overflow-y-auto rounded-md  bg-white text-left shadow-xl transition-all   
                w-full sm:max-w-c-500 md:max-w-500 px-3"
            >
              <>
                <div className="sticky top-0 bg-white z-40 flex sm:px-6 px-4 justify-between items-center py-2 ">
                  <p className="text-sm md:text-lg lg:text-lg font-semibold ">
                    Add New Client
                  </p>
                  <div className="flex justify-end cursor-pointer">
                    <IoCloseOutline
                      size={30}
                      onClick={handleCloseModal}
                      className="text-gray-500  "
                    />
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mt-2  p-4 md:p-4 lg:p-4 "
                >
                 
                  <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                  <div>
                      <label className="block space-x-1  text-sm font-medium mb-2">
                        First name<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="first_name"
                        type="text"
                        {...register("first_name")}
                        placeholder="Enter first name"
                        className="w-full py-2 px-4 border placeholder:text-sm  rounded-md focus:outline-none "
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block space-x-1  text-sm font-medium mb-2">
                        Last name<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="last_name"
                        type="text"
                        {...register("last_name")}
                        placeholder="Enter last name"
                        className="w-full py-2 px-4 border placeholder:text-sm  rounded-md focus:outline-none "
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block space-x-1  text-sm font-medium mb-2">
                        Phone<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone_number"
                        type="text"
                        {...register("phone_number")}
                        placeholder="e.g 0701234567"
                        className="w-full py-2 px-4 border placeholder:text-sm  rounded-md focus:outline-none "
                      />
                      {errors.phone_number && (
                        <p className="text-red-500 text-sm">
                          {errors.phone_number.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block space-x-1  text-sm font-medium mb-2">
                        Id Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="id_number"
                        type="text"
                        {...register("id_number")}
                        placeholder="e.g 12345678"
                        className="w-full py-2 px-4 border placeholder:text-sm  rounded-md focus:outline-none "
                      />
                      {errors.id_number && (
                        <p className="text-red-500 text-sm">
                          {errors.id_number.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block space-x-1  text-sm font-medium mb-2">
                        Date of birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="date_of_birth"
                        type="date"
                        {...register("date_of_birth")}
                        placeholder="e.g 12345678"
                        className="w-full py-2 px-4 border placeholder:text-sm  rounded-md focus:outline-none "
                      />
                      {errors.date_of_birth && (
                        <p className="text-red-500 text-sm">
                          {errors.date_of_birth.message}
                        </p>
                      )}
                    </div>
                    <div>
                    <div className="relative w-full  ">
                      <label className="block space-x-1 text-sm font-medium mb-2">
                        Gender<span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("gender")}
                        className="w-full 
                                text-sm appearance-none py-3 shadow-sm pl-10 pr-4 rounded-md border border-1
                                  focus:outline-none 
                                   focus:bg-white placeholder:text-sm "
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>

                      <BsChevronDown
                        size={15}
                        className="absolute top-[70%] right-4 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                      {errors.gender && (
                        <p className="text-red-500 text-sm">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                    
                    
                  </div>
                 
                  
                  <div className="sticky bottom-0 bg-white z-40 flex md:px-6  gap-4 md:justify-end items-center py-3 ">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="border border-gray-300 bg-white shadow-sm text-gray-700 py-2 text-sm px-4 rounded-md w-full min-w-[100px] md:w-auto hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || isCreating}
                      className="bg-success-500 text-white py-2 text-sm px-3 md:px-4 rounded-md w-full min-w-[100px] md:w-auto"
                    >
                      {isSubmitting || isCreating ? (
                        <span className="flex items-center">
                          <SubmitSpinner />
                          <span>Adding...</span>
                        </span>
                      ) : (
                        <span>Add Client</span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            </div>

            {showSuccessModal && (
              <SuccessFailModal
                message={successMessage}
                onClose={handleCloseSuccessModal}
                isError={isError}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default AddClient;
