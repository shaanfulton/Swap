"use client";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

type DropDownContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  toggle: () => void;
  close: () => void;
};

const DropDownContext = createContext<DropDownContextType | undefined>(
  undefined
);

export const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error("useDropDown must be used within a DropDown provider");
  }
  return context;
};

interface DropDownProps {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
}

export default function DropDown({
  children,
  className = "",
  defaultValue = null,
  onChange,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultValue
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  // When selected option changes, call onChange if provided
  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption, onChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropDownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedOption,
        setSelectedOption,
        toggle,
        close,
      }}
    >
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
}
