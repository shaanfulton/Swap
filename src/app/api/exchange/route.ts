import { NextResponse } from "next/server";
import { getExchangeRate, tokens } from "@/lib/tokens";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromToken = searchParams.get("from");
  const toToken = searchParams.get("to");
  const amount = searchParams.get("amount");

  // Validate input parameters
  if (!fromToken || !toToken || !amount) {
    return NextResponse.json(
      { error: "Missing required parameters: from, to, amount" },
      { status: 400 }
    );
  }

  // Validate amount is a number
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    return NextResponse.json(
      { error: "Amount must be a valid number" },
      { status: 400 }
    );
  }

  // Validate tokens exist
  const fromTokenExists = tokens.some((token) => token.id === fromToken);
  const toTokenExists = tokens.some((token) => token.id === toToken);

  if (!fromTokenExists || !toTokenExists) {
    return NextResponse.json(
      { error: "Invalid token identifier" },
      { status: 400 }
    );
  }

  // Get exchange rate
  const rate = getExchangeRate(fromToken, toToken);

  if (rate === null) {
    return NextResponse.json(
      { error: "Exchange rate not available for the specified token pair" },
      { status: 404 }
    );
  }

  // Calculate converted amount
  const convertedAmount = parsedAmount * rate;

  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    fromToken,
    toToken,
    fromAmount: parsedAmount,
    toAmount: convertedAmount,
    rate,
    timestamp: new Date().toISOString(),
  });
}
