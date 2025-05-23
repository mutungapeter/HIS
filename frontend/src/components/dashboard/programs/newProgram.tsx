"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { z } from "zod";

import SuccessFailModal from "@/components/common/Modals/SuccessFailModal";
import SubmitSpinner from "@/components/common/spinners/submitSpinner";
import { useNewProgramMutation } from "@/redux/services/healthPrograms/healthPrograms";
import programSchema from "@/schemas/programs/program";

const NewProgram = ({ refetchData }: { refetchData: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [newProgram, {isLoading:isCreating}] = useNewProgramMutation();

 
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(programSchema),
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


  const onSubmit = async (formData: z.infer<typeof programSchema>) => {
    

   
    console.log("submitting form data");

    try {
      const response = await newProgram(formData).unwrap();
      console.log("response", response);

      setIsError(false);
      setSuccessMessage("Program added successfully!");
      setShowSuccessModal(true);
      reset();
      refetchData();
    } catch (error: unknown) {
      console.log("error", error);
      setIsError(true);
      if (error && typeof error === "object" && "data" in error && error.data) {
        const errorData = (error as { data: { error: string } }).data;
        setSuccessMessage(`Failed to add Program: ${errorData.error}`);
        setShowSuccessModal(true);
      }else {
        setIsError(true);
        setSuccessMessage("Failed to add program. Please try again.");
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
          <span>Add Program</span>
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
                    Add New Program
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
                 
                  <div className="grid grid-cols-1   gap-4">
                  <div>
                      <label className="block space-x-1  text-sm font-medium mb-2">
                        Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        placeholder="e.g HIV"
                        className="w-full py-2 px-4 border placeholder:text-sm  rounded-md focus:outline-none "
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block space-x-1  text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        id="description"
                       
                        {...register("description")}
                        placeholder="program description here"
                        className="w-full resize-y h-20
                        py-2 px-4 rounded-md border border-1 
                         focus:outline-primary focus:border-primary focus:bg-white placeholder:text-sm md:placeholder:text-sm lg:placeholder:text-sm"
             />
                      {errors.description && (
                        <p className="text-red-500 text-sm">
                          {errors.description.message}
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
                        <span>Add Program</span>
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
export default NewProgram;
