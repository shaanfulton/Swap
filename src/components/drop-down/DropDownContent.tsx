"use client";

import React from "react";
import { useDropDown } from "./DropDown";

interface DropDownContentProps {
  children: React.ReactNode;
  className?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

export default function DropDownContent({
  children,
  className = "",
  position = "bottom-left",
}: DropDownContentProps) {
  const { isOpen } = useDropDown();

  if (!isOpen) return null;

  const positionClasses = {
    "bottom-left": "top-full left-0",
    "bottom-right": "top-full right-0",
    "top-left": "bottom-full left-0",
    "top-right": "bottom-full right-0",
  };

  return (
    <div
      className={`
        absolute z-10 mt-1 w-full min-w-[200px] rounded-md bg-white 
        shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
        dark:bg-gray-800 dark:ring-white dark:ring-opacity-10
        ${positionClasses[position]}
        ${className}
      `}
      role="listbox"
    >
      {children}
    </div>
  );
}
