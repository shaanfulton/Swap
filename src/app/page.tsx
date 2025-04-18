"use client";

import React, { useState, useEffect } from "react";
import { TokenSwap } from "@/components";
import { Token } from "@/lib/tokens";

export default function SwapPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tokens on component mount
  useEffect(() => {
    async function fetchTokens() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/tokens");

        if (!response.ok) {
          throw new Error("Failed to fetch tokens");
        }

        const data = await response.json();
        setTokens(data.tokens);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          Crypto Token Swap
        </h1>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div
            className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <TokenSwap tokens={tokens} />
        )}
      </div>
    </div>
  );
}
