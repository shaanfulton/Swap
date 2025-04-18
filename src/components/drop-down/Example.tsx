"use client";

import React, { useState } from "react";
import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownItem,
  DropDownSeparator,
} from "./";

export default function DropDownExample() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <h3>Select Country:</h3>

      <DropDown
        defaultValue={selectedValue}
        onChange={(value) => setSelectedValue(value)}
      >
        <DropDownTrigger
          className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm 
                    dark:bg-gray-800 dark:border-gray-600
                    hover:bg-gray-50 dark:hover:bg-gray-700"
          placeholder="Select a country"
        />

        <DropDownContent>
          <DropDownItem value="United States">United States</DropDownItem>
          <DropDownItem value="Canada">Canada</DropDownItem>
          <DropDownItem value="United Kingdom">United Kingdom</DropDownItem>
          <DropDownItem value="Australia">Australia</DropDownItem>
          <DropDownSeparator />
          <DropDownItem value="Other">Other</DropDownItem>
        </DropDownContent>
      </DropDown>

      {selectedValue && (
        <p className="mt-2 text-sm text-gray-500">
          You selected: <span className="font-medium">{selectedValue}</span>
        </p>
      )}
    </div>
  );
}
