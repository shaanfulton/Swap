"use client";

import React from "react";

interface DropDownSeparatorProps {
  className?: string;
}

export default function DropDownSeparator({
  className = "",
}: DropDownSeparatorProps) {
  return (
    <div
      className={`h-px my-1 bg-gray-200 dark:bg-gray-700 ${className}`}
      role="separator"
    />
  );
}
