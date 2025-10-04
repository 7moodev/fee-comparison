import type React from "react"
import { splitSymbol } from "../utils/formatters"

type CoinLogoProps = {
  symbol: string
  size?: number
}

const CoinLogo: React.FC<CoinLogoProps> = ({ symbol, size = 24 }) => {
  const { base, quote } = splitSymbol(symbol)

  const getLogoPath = (currency: string) => {
    const currencyUpper = currency.toUpperCase()
    // XRP uses webp format
    // if (currencyUpper === "XRP") {
    //   return `src/assets/coins/XRP.webp`
    // }
    return `coins/${currencyUpper}.png`
  }

  const baseLogo = getLogoPath(base)
  const quoteLogo = quote ? getLogoPath(quote) : null

  return (
    <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
      {baseLogo && (
        <img
          src={baseLogo || "/placeholder.svg"}
          alt={base}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: "2px solid #ffffff",
            position: "relative",
            zIndex: 2,
            objectFit: "cover",
          }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
      {quoteLogo && (
        <img
          src={quoteLogo || "/placeholder.svg"}
          alt={quote}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: "2px solid #ffffff",
            position: "relative",
            marginLeft: `-${size * 0.3}px`,
            zIndex: 1,
            objectFit: "cover",
          }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
    </div>
  )
}

export default CoinLogo
