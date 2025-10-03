"use client"

import { useState } from "react"
import fees from "./data/cleaned_data_large.json"
import Table from "./components/Table/Table"
import Dropdown from "./components/Dropdown/Dropdown"
import NotionalSelector from "./components/NotionalSelector/NotionalSelector"
import Footer from "./components/Footer/Footer"
import type { FeeEntry } from "./types"
import "./App.css"

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [notional, setNotional] = useState(100)
  const [sortConfig, setSortConfig] = useState<{ key: "maker" | "taker" | null; direction: "asc" | "desc" }>({
    key: null,
    direction: "asc",
  })

  const symbols = Array.from(new Set(fees.map((f: FeeEntry) => f.symbol)))
  const sources = Array.from(new Set(fees.map((f: FeeEntry) => f.source)))

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1 className="app-title">Crypto Exchanges Fee Overview</h1>
          <p className="app-subtitle">Compare trading fees across different cryptocurrency exchanges</p>
        </header>

        <div className="controls-wrapper">
          <div className="controls-grid">
            <div className="control-item">
              <label className="control-label">Trading Pair</label>
              <Dropdown
                options={symbols}
                selected={selectedSymbol}
                onChange={setSelectedSymbol}
                placeholder="Select pair..."
                type="symbol"
              />
            </div>

            <div className="control-item">
              <label className="control-label">Exchange</label>
              <Dropdown
                options={sources}
                selected={selectedSource}
                onChange={setSelectedSource}
                placeholder="Select exchange..."
                type="source"
              />
            </div>

            <div className="control-item">
              <label className="control-label">Notional Amount</label>
              <NotionalSelector selected={notional} onChange={setNotional} />
            </div>
          </div>

          <Table
            data={fees}
            notional={notional}
            selectedSymbol={selectedSymbol}
            selectedSource={selectedSource}
            sortConfig={sortConfig}
            onSort={setSortConfig}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
