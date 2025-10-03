import type React from "react"

type ExchangeLogoProps = {
  exchangeName: string
  size?: number
}

const ExchangeLogo: React.FC<ExchangeLogoProps> = ({ exchangeName, size = 24 }) => {
  const getLogoPath = (exchange: string) => {
    const exchangeLower = exchange.toLowerCase()

    // Map common exchange names to their logo files
    const exchangeMap: Record<string, string> = {
      kraken: "src/assets/exchanges/KRAKEN.png",
      coinbase: "src/assets/exchanges/COINBASE.png",
      bitstamp: "src/assets/exchanges/BITSTAMP.png",
      bitvavo: "src/assets/exchanges/BITVAVO.png",
      binance: "src/assets/exchanges/BINANCE.png",
    }

    return exchangeMap[exchangeLower] || null
  }

  const logoPath = getLogoPath(exchangeName)

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
      {logoPath && (
        <img
          src={logoPath || "/placeholder.svg"}
          alt={exchangeName}
          style={{
            width: size,
            height: size,
            borderRadius: "4px",
            objectFit: "contain",
          }}
        />
      )}
      <span>{exchangeName}</span>
    </div>
  )
}

export default ExchangeLogo
