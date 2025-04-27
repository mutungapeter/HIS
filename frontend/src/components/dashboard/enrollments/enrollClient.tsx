"use client";

import SuccessFailModal from "@/components/common/Modals/SuccessFailModal";
import createEnrollmentSchema from "@/schemas/enrollments/enrollment";
import { zodResolver } from "@hookform/resolvers/zod";

import SubmitSpinner from "@/components/common/spinners/submitSpinner";
import { ClientType } from "@/lib/definitions/clients";
import { ProgramType } from "@/lib/definitions/programs";
import { useEnrollClientMutation } from "@/redux/services/enrollments/enrollments";
import { useGetProgramsQuery } from "@/redux/services/healthPrograms/healthPrograms";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrUserAdd } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import Select, { MultiValue } from "react-select";
import { z } from "zod";
type ProgramOption = {
  value: number;
  label: string;
};
const EnrollClient = ({ client, refetchData }: { client: ClientType; refetchData: () => void }) => {
  console.log("client", client);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);
  const [enrollClient, {isLoading:iseEnrolling}] = useEnrollClientMutation();
  const { data } = useGetProgramsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  console.log("data-programs", data);
  type FormValues = z.infer<typeof createEnrollmentSchema>;

  const {
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(createEnrollmentSchema),
  });

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setIsError(false);
    handleCloseModal();
  };

  const handleProgramChange = (selected: MultiValue<ProgramOption>) => {
    const programIds = selected.map((p) => p.value);
    setValue("program_ids", programIds);
    trigger("program_ids");
    setSelectedPrograms(selected as ProgramOption[]);
  };

  const onSubmit = async () => {

    const program_ids = selectedPrograms.map((p) => p.value);
    const payload = {
        client: client.id,
      program_ids,
    };
    try {
      const response = await enrollClient(payload).unwrap();
      console.log("response", response);

      setIsError(false);
      setSuccessMessage("Client enrolled successfully !");
      setShowSuccessModal(true);
      setSelectedPrograms([]);
      refetchData();
      
    } catch (error: unknown) {
      setIsError(true);
      console.log("error", error);
      if (error && typeof error === "object" && "data" in error && error.data) {
        const errorData = (error as { data: { error: string } }).data;
        console.log("errorData", errorData);

        setSuccessMessage("Client already enrolled to this program or one of the selected programs");
        setShowSuccessModal(true);
      } else {
        setIsError(true);
        setSuccessMessage("Unexpected error occured!. Please try again.");
        setShowSuccessModal(true);
      }
    }
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="inline-flex items-center justify-center p-2 bg-green-100 text-green-600 rounded-xl cursor-pointer hover:bg-green-200 transition"
      >
        <GrUserAdd className="text-sm text-success-500" />
      </div>
      {isOpen && (
        <div
          className="relative z-300 animate-fadeIn"
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
            className="fixed inset-0 min-h-full z-100 w-screen flex flex-col
             text-center md:items-center
             md:justify-start justify-center overflow-y-auto p-2 md:p-3 md:mt-8"
          >
            <div
              className="relative transform justify-center animate-fadeIn max-h-[90vh]
                overflow-y-auto rounded-md bg-white text-left shadow-xl transition-all   
                w-full sm:max-w-c-500 md:max-w-500 px-3"
            >
              <>
                <div className="sticky top-0 bg-white z-40 flex sm:px-6 px-4 justify-between items-center py-2 border-b">
                  <div>
                    <p className="text-sm md:text-lg lg:text-lg font-semibold">
                      Enroll client to programs
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Add {client.first_name} {client.last_name} to health
                      programs
                    </p>
                  </div>
                  <div className="flex justify-end cursor-pointer">
                    <IoCloseOutline
                      size={30}
                      onClick={handleCloseModal}
                      className="text-gray-500"
                    />
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mt-2 p-4 md:p-4 lg:p-4"
                >
                  <div className="grid grid-cols-1 md:gap-4 gap-2">
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800">
                        {client.first_name} {client.last_name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {client.phone_number}
                      </p>
                    </div>

                    <div>
                      <label>Select Programs</label>
                      <Select
                        options={data?.map((program: ProgramType) => ({
                          value: program.id,
                          label: program.name,
                        }))}
                        isMulti
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999,
                          }),
                          control: (base) => ({
                            ...base,
                            minHeight: "44px",
                            borderColor: "#d1d5db",
                            boxShadow: "none",
                            "&:hover": {
                              borderColor: "#9ca3af",
                            },
                            "&:focus-within": {
                              borderColor: "#9ca3af",
                              boxShadow: "none",
                            },
                          }),
                        }}
                        onChange={handleProgramChange}
                      />

                      {errors.program_ids && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.program_ids.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sticky bottom-0 bg-white  flex md:px-6 gap-4 md:justify-end items-center ">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="border border-gray-300 bg-white shadow-sm text-gray-700 py-2 text-sm px-4 rounded-md w-full min-w-[100px] md:w-auto hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || iseEnrolling}
                      className={`text-white py-2 text-sm px-3 md:px-4 rounded-md w-full min-w-[100px] md:w-auto ${"bg-emerald-600 hover:bg-emerald-700"}`}
                    >
                      {isSubmitting || iseEnrolling? (
                        <span className="flex items-center cursor-not-allowed">
                          <SubmitSpinner />
                          <span>Enrolling...</span>
                        </span>
                      ) : (
                        <span className={`text-white`}>Enroll</span>
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

export default EnrollClient;
