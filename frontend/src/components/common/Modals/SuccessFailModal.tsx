import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
const SuccessFailModal = ({
  message,
  onClose,
  isError = false,
}: {
  message: string;
  onClose: () => void;
  isError?: boolean;
}) => {
  return (
    <div className="fixed inset-0 z-99999 flex flex-col  items-center justify-center animate-fadeIn font-nunito">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-30"
      ></div>
      <div
        className="bg-white min-h-[45vh]  rounded-lg shadow-xl p-6
       md:max-w-c-550 max-w-c-300 w-full z-50 flex flex-col transform scale-100 animate-fadeIn "
      >
        <div className="flex flex-col  items-center justify-center ">
          <div
            className={`md:w-16 md:h-16 h-12 w-12 rounded-full flex items-center justify-center mb-4
            ${isError ? "border border-red-300" : "border border-success-300"}`}
          >
            {isError ? (
              <MdOutlineClose className="text-red-500 text-xl md:text-4xl" />
            ) : (
              <MdOutlineCheck className="text-success-500 text-xl md:text-4xl" />
            )}
          </div>
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <h2
              className={`text-2xl font-semibold ${
                isError ? "text-danger-600" : "text-success-600"
              }`}
            >
              {isError ? "Error" : "Success"}
            </h2>
            <h3 className="text-sm md:text-xl font-medium">{message}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessFailModal;