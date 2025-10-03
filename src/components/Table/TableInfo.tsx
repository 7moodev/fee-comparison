import "./TableInfo.css"

type Props = {
  className?: string
}

export default function TableInfo({ className = "" }: Props) {
  return (
    <div className={`table-info ${className}`}>
      <div className="table-info-content">
        <ul>
          <li>
            <strong>Maker Output*:</strong> Amount of tokens you would receive upon executing an add liquidity only (ALO) order. Also known as limit order.
          </li>
          <li>
            <strong>Taker Output*:</strong> Amount of tokens you would receive upon executing IOC order. Also known as market order.
          </li>

        </ul>
        <p className="table-info-note">
        Learn more <a href="https://support.bitvavo.com/hc/en-us/articles/4405175148689-What-is-the-trading-fee-when-I-buy-or-sell-crypto" target="_blank" rel="noopener noreferrer">here</a> about the difference between maker and taker fees.
        </p>
      </div>
    </div>
  )
}
