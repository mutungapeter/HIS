import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

import ClickOutside from "@/hooks/ClickOutside";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { BsChevronDown } from "react-icons/bs";
import { IoIosLogIn } from "react-icons/io";
// import { PiGearLight } from "react-icons/pi";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutUserMutation } from "@/redux/services/auth/auth";
import { userLoggedOut } from "@/redux/services/auth/authSlice";


const ProfileInfo= dynamic(() => import("@/lib/profileInfo"), {
    ssr: false,
    
  });
const DashboardDropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  const router = useRouter();
 
  const dispatch = useAppDispatch();
  
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  
  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading("Logging out...");
      
      await logoutUser({}).unwrap();
      
      toast.update(loadingToast, {
        render: "Logged out successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      
      dispatch(userLoggedOut());
      
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        
     
        <div className="hidden text-right lg:block p-1">
          <ProfileInfo/> 
         
        </div>
    
        <span className="relative h-10 w-10 lg:h-10 lg:w-10 md:h-10 md:w-10">
          <span className="absolute inset-0 rounded-full border-1 border-primary" />
         
          <Image
            src="/avatar/avatar2.jpg"
            alt=""
            width={36}
            height={36}
            className="rounded-full absolute inset-0 m-auto object-cover"
          />
         </span>
        <BsChevronDown size={12} className="hidden text-current sm:block" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-1 shadow-md flex min-h-30 w-auto min-w-90 z-9999
             font-satoshi flex-col rounded-sm border 
              bg-white  `}
        >
          <div className=" mt-3 mb-3 mx-auto">
          
          </div>
         
         
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-normal duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
            ) : (
              <IoIosLogIn size={17} className="" />
            )}
            {isLoading ? "Logging Out..." : "Log Out"}
           
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DashboardDropdownUser;
