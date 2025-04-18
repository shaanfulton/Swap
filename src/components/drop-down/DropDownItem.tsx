"use client";

import React from "react";
import { useDropDown } from "./DropDown";

interface DropDownItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  value: string;
}

export default function DropDownItem({
  children,
  className = "",
  onClick,
  value,
}: DropDownItemProps) {
  const { close, setSelectedOption, selectedOption } = useDropDown();

  const handleClick = () => {
    setSelectedOption(value);
    if (onClick) onClick();
    close();
  };

  const isSelected = selectedOption === value;

  return (
    <div
      className={`
        px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer
        dark:text-gray-200 dark:hover:bg-gray-700
        ${isSelected ? "bg-gray-100 dark:bg-gray-700 font-medium" : ""}
        ${className}
      `}
      onClick={handleClick}
      role="option"
      aria-selected={isSelected}
    >
      {children}
    </div>
  );
}
