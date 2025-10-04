import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <div className="footer-title">Purchase Output Comparison Tool</div>
          <div className="footer-description">Compare outputs for purchasing digital assets across different cryptocurrency exchanges</div>
        </div>

        <div className="footer-credit">
          built by{" "}
          <a href="https://github.com/7moodev" target="_blank" rel="noopener noreferrer">
            7moodev
          </a>
        </div>
      </div>

      <div className="footer-disclaimer">
        Data provided for informational purposes only. Fees may vary and are subject to change. Please verify current
        fees with your exchange/broker before trading.
      </div>
    </footer>
  )
}
