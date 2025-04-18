export interface Token {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

export interface ExchangeRate {
  base: string;
  target: string;
  rate: number;
}

// Token data
export const tokens: Token[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "/tokens/btc.svg",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "/tokens/eth.svg",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "/tokens/sol.svg",
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    image: "/tokens/usdc.svg",
  },
  {
    id: "arbitrum",
    symbol: "ARB",
    name: "Arbitrum",
    image: "/tokens/arb.svg",
  },
];

// Mock exchange rates (rate is how many target tokens you get for 1 base token)
export const exchangeRates: ExchangeRate[] = [
  { base: "bitcoin", target: "ethereum", rate: 13.12 },
  { base: "bitcoin", target: "solana", rate: 358.75 },
  { base: "bitcoin", target: "usdc", rate: 30120.5 },
  { base: "bitcoin", target: "arbitrum", rate: 12500.32 },

  { base: "ethereum", target: "bitcoin", rate: 0.0762 },
  { base: "ethereum", target: "solana", rate: 27.32 },
  { base: "ethereum", target: "usdc", rate: 2295.75 },
  { base: "ethereum", target: "arbitrum", rate: 958.86 },

  { base: "solana", target: "bitcoin", rate: 0.00278 },
  { base: "solana", target: "ethereum", rate: 0.0366 },
  { base: "solana", target: "usdc", rate: 83.45 },
  { base: "solana", target: "arbitrum", rate: 35.12 },

  { base: "usdc", target: "bitcoin", rate: 0.0000332 },
  { base: "usdc", target: "ethereum", rate: 0.000436 },
  { base: "usdc", target: "solana", rate: 0.01198 },
  { base: "usdc", target: "arbitrum", rate: 0.4178 },

  { base: "arbitrum", target: "bitcoin", rate: 0.00008 },
  { base: "arbitrum", target: "ethereum", rate: 0.00104 },
  { base: "arbitrum", target: "solana", rate: 0.0285 },
  { base: "arbitrum", target: "usdc", rate: 2.394 },
];

// Helper function to get exchange rate
export function getExchangeRate(
  fromToken: string,
  toToken: string
): number | null {
  if (fromToken === toToken) return 1;

  const rate = exchangeRates.find(
    (rate) => rate.base === fromToken && rate.target === toToken
  );

  return rate ? rate.rate : null;
}
