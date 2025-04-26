import { ImSpinner10 } from "react-icons/im";

const PageLoadingSpinner = () => {
    return (
      <>
    <div className="flex inset-0 h-screen items-center justify-center bg-white bg-opacity-50 z-[999999]">
      <ImSpinner10 className="h-10 w-10 text-primary animate-spin" />
    </div>
      </>
    );
  };
  
  export default PageLoadingSpinner;