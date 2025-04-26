import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const ProfileInfo: React.FC = () => {
  const { user, loading, error } = useAppSelector((state: RootState) => state.auth);
// console.log("user", user)
  if (loading) return <span className="text-primary">Loading...</span>;
  if (error) return <span className="text-primary">Error</span>;

  return (
    <>
      {user ? (
        <span className="block text-sm font-normal font-satoshi dark:text-white text-primary-800 transition-colors">
          Welcome, {user.username}
        </span>
      ) : (
        <span className="block text-sm font-normal font-satoshi dark:text-white">Guest</span>
      )}
    </>
  );
};

export default ProfileInfo;
