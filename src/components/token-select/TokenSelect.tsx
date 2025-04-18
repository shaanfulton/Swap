"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownItem,
} from "@/components";
import { Token } from "@/lib/tokens";

interface TokenSelectProps {
  tokens: Token[];
  selectedToken: Token | null;
  onSelectToken: (token: Token) => void;
  className?: string;
}

export default function TokenSelect({
  tokens,
  selectedToken,
  onSelectToken,
  className = "",
}: TokenSelectProps) {
  // Custom trigger content to show token icon and symbol
  const triggerContent = useMemo(() => {
    if (!selectedToken) return "Select Token";

    return (
      <div className="flex items-center">
        {selectedToken.image && (
          <div className="mr-2 relative w-5 h-5">
            <Image
              src={selectedToken.image}
              alt={selectedToken.name}
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
        )}
        <span className="ml-2 text-gray-500 text-xs">
          {selectedToken.symbol.toUpperCase()}
        </span>
      </div>
    );
  }, [selectedToken]);

  return (
    <DropDown className={`w-full ${className}`}>
      <DropDownTrigger
        className="w-full px-3 py-2 text-left border border-gray-300 rounded-md 
                  bg-white dark:bg-gray-800 dark:border-gray-600
                  hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        {triggerContent}
      </DropDownTrigger>

      <DropDownContent className="max-h-60 overflow-auto">
        {tokens.map((token) => (
          <DropDownItem
            key={token.id}
            value={token.id}
            onClick={() => onSelectToken(token)}
            className="flex items-center"
          >
            {token.image && (
              <div className="mr-2 relative w-5 h-5">
                <Image
                  src={token.image}
                  alt={token.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            )}
            <span className="font-medium">{token.symbol}</span>
            <span className="ml-2 text-gray-500 text-xs">{token.name}</span>
          </DropDownItem>
        ))}
      </DropDownContent>
    </DropDown>
  );
}
