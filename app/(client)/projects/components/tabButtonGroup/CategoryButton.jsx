"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const CategoryButton = ({
  children,
  onClick,
  className,
  variant = "outline",
}) => {
  if (variant === "outline") {
    return (
      <button
        // variant="text"
        className={`hover:bg-primary active:text-white active:bg-secondary hover:text-white !text-white dark:text-text duration-300  border border-secondary dark:border-secondary min-w-[120px] md:min-w-36 rounded-md bg-primary dark:bg-primary h-10 p-1 md:h-12 capitalize text-md  md:p-1  ${className} `}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <Button
      className={`bg-secondary border border-secondary dark:border-secondary text-white duration-300 focus:ring-0 min-w-[100px] md:min-w-36 rounded-md h-10 p-1 md:h-12 capitalize text-md hover:opacity-90 md:p-1  ${className} `}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CategoryButton;
