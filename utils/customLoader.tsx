"use client";

import { useAuth } from "@/context/authProvider";
import BounceLoader from "react-spinners/BounceLoader";

type CustomPros = {
  children: React.ReactNode;
};

export const Custom = ({ children }: CustomPros) => {
  const { isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <BounceLoader
            color="#053B50"
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
