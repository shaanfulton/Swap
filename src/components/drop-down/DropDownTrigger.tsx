"use client";

import React from "react";
import { useDropDown } from "./DropDown";

interface DropDownTriggerProps {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export default function DropDownTrigger({
  children,
  className = "",
  placeholder = "Select an option",
}: DropDownTriggerProps) {
  const { toggle, selectedOption } = useDropDown();

  // Determine what content to show in the trigger
  const renderContent = () => {
    // If there's a selected option, show that
    if (selectedOption) {
      return selectedOption;
    }

    // Otherwise show the placeholder or children
    return children || placeholder;
  };

  return (
    <button
      type="button"
      className={`flex items-center justify-between cursor-pointer ${className}`}
      onClick={toggle}
      aria-haspopup="listbox"
    >
      <span className="flex-1">{renderContent()}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2 flex-shrink-0"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}
