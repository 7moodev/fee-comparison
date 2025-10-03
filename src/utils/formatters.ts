export function splitSymbol(symbol: string): { base: string; quote: string } {
 

  const commonQuotes = ["USD", "USDT", "USDC", "EUR", "GBP"]
  for (const quote of commonQuotes) {
    if (symbol.endsWith(quote)) {
      const base = symbol.slice(0, -quote.length)
      if (base.length > 0) {
        return { base, quote }
      }
    }
  }
  return { base: symbol, quote: "" }
}

export function formatSymbol(symbol: string): string {
  const { base, quote } = splitSymbol(symbol)
  if (quote) {
    return `${base}/${quote}`
  }
  return base
}

export function formatSource(source: string): string {
  const formatted = source
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
  return formatted
}
export function getBaseToken(symbol: string): string {
  const { base } = splitSymbol(symbol)
  return base
}
