export type FeeEntry = {
  symbol: string
  source: string
  datetime: string
  fees: {
    maker: {
      [notional: string]: number
    }
    taker: {
      [notional: string]: number
    }
  }
}
