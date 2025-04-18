"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Token } from "@/lib/tokens";
import { TokenSelect } from "@/components";

interface TokenSwapProps {
  tokens: Token[];
}

export default function TokenSwap({ tokens }: TokenSwapProps) {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch exchange rate and calculate conversion
  const calculateConversion = useCallback(async () => {
    if (!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) === 0) {
      setToAmount("");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/exchange?from=${fromToken.id}&to=${toToken.id}&amount=${fromAmount}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch exchange rate");
      }

      const data = await response.json();
      setToAmount(data.toAmount.toFixed(6));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setToAmount("");
    } finally {
      setLoading(false);
    }
  }, [fromToken, toToken, fromAmount]);

  // Calculate conversion when inputs change
  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  // Swap from and to tokens
  const handleSwap = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-xl font-bold mb-6 text-center">Swap Tokens</h2>

      <div className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">From</label>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <TokenSelect
                tokens={tokens}
                selectedToken={fromToken}
                onSelectToken={setFromToken}
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                inputMode="decimal"
                pattern="^[0-9]*[.,]?[0-9]*$"
                value={fromAmount}
                onChange={(e) => {
                  // Only allow numbers and at most one decimal point
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setFromAmount(value);
                  }
                }}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           bg-white dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            disabled={!fromToken || !toToken}
          >
            <img src="/swap.svg" alt="Swap" width="20" height="20" />
          </button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">To</label>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <TokenSelect
                tokens={tokens}
                selectedToken={toToken}
                onSelectToken={setToToken}
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Exchange Rate */}
        {fromToken && toToken && fromAmount && !error && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            1 {fromToken.symbol} ={" "}
            {loading
              ? "..."
              : toAmount && fromAmount
              ? (parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)
              : "?"}{" "}
            {toToken.symbol}
          </div>
        )}

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {/* Swap Button */}
        <button
          disabled={!fromToken || !toToken || !fromAmount || loading || !!error}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                   disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-700"
        >
          {loading ? "Loading..." : "Swap"}
        </button>
      </div>
    </div>
  );
}
