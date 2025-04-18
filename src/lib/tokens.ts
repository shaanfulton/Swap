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
    id: "Bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "/tokens/btc.svg",
  },
  {
    id: "Ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "/tokens/eth.svg",
  },
  {
    id: "Solana",
    symbol: "SOL",
    name: "Solana",
    image: "/tokens/sol.svg",
  },
  {
    id: "USD Coin",
    symbol: "USDC",
    name: "USD Coin",
    image: "/tokens/usdc.svg",
  },
  {
    id: "Arbitrum",
    symbol: "ARB",
    name: "Arbitrum",
    image: "/tokens/arb.svg",
  },
];

// Mock exchange rates (rate is how many target tokens you get for 1 base token)
export const exchangeRates: ExchangeRate[] = [
  { base: "Bitcoin", target: "Ethereum", rate: 13.12 },
  { base: "Bitcoin", target: "Solana", rate: 358.75 },
  { base: "Bitcoin", target: "USD Coin", rate: 30120.5 },
  { base: "Bitcoin", target: "Arbitrum", rate: 12500.32 },

  { base: "Ethereum", target: "Bitcoin", rate: 0.0762 },
  { base: "Ethereum", target: "Solana", rate: 27.32 },
  { base: "Ethereum", target: "USD Coin", rate: 2295.75 },
  { base: "Ethereum", target: "Arbitrum", rate: 958.86 },

  { base: "Solana", target: "Bitcoin", rate: 0.00278 },
  { base: "Solana", target: "Ethereum", rate: 0.0366 },
  { base: "Solana", target: "USD Coin", rate: 83.45 },
  { base: "Solana", target: "Arbitrum", rate: 35.12 },

  { base: "USD Coin", target: "Bitcoin", rate: 0.0000332 },
  { base: "USD Coin", target: "Ethereum", rate: 0.000436 },
  { base: "USD Coin", target: "Solana", rate: 0.01198 },
  { base: "USD Coin", target: "Arbitrum", rate: 0.4178 },

  { base: "Arbitrum", target: "Bitcoin", rate: 0.00008 },
  { base: "Arbitrum", target: "Ethereum", rate: 0.00104 },
  { base: "Arbitrum", target: "Solana", rate: 0.0285 },
  { base: "Arbitrum", target: "USD Coin", rate: 2.394 },
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
