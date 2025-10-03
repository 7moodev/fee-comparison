"use client"

import { useMemo } from "react"
import type { FeeEntry } from "@/types"
import CoinLogo from "../CoinLogo"
import ExchangeLogo from "../ExchangeLogo"
import { formatSymbol, formatSource, getBaseToken } from "@/utils/formatters"
import "./Table.css"

type Props = {
  data: FeeEntry[]
  notional: number
  selectedSymbol: string | null
  selectedSource: string | null
  sortConfig: { key: "maker" | "taker" | null; direction: "asc" | "desc" }
  onSort: (cfg: { key: "maker" | "taker"; direction: "asc" | "desc" }) => void
}

type FeeRow = {
  symbol: string
  source: string
  makerOutput: number | null
  takerOutput: number | null
  datetime: string
}

export default function Table({ data, notional, selectedSymbol, selectedSource, sortConfig, onSort }: Props) {
  const latestEntries = useMemo(() => {
    const map = new Map<string, FeeEntry>()
    data.forEach((entry) => {
      const key = `${entry.symbol}-${entry.source}`
      const prev = map.get(key)
      if (!prev || new Date(entry.datetime) > new Date(prev.datetime)) {
        map.set(key, entry)
      }
    })
    return Array.from(map.values())
  }, [data])

  const rows = useMemo(() => {
    let entries = latestEntries

    if (selectedSymbol) {
      entries = entries.filter((r) => r.symbol === selectedSymbol)
    }
    if (selectedSource) {
      entries = entries.filter((r) => r.source === selectedSource)
    }

    const feeRows: FeeRow[] = entries.map((entry) => ({
      symbol: entry.symbol,
      source: entry.source,
      makerOutput: entry.fees.maker[notional.toString()] ?? null,
      takerOutput: entry.fees.taker[notional.toString()] ?? null,
      datetime: entry.datetime,
    }))

    return feeRows
  }, [latestEntries, selectedSymbol, selectedSource, notional])

  const sortedRows = useMemo(() => {
    if (sortConfig.key === null) return rows

    return [...rows].sort((a, b) => {
      const aVal = sortConfig.key === "maker" ? a.makerOutput : a.takerOutput
      const bVal = sortConfig.key === "maker" ? b.makerOutput : b.takerOutput
      if (aVal === null) return 1
      if (bVal === null) return -1
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal
    })
  }, [rows, sortConfig])

  const requestSort = (key: "maker" | "taker") => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    onSort({ key, direction })
  }

  return (
    <div className="table-container">
      <table className="fee-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th>Source</th>
            <th className="sortable" onClick={() => requestSort("maker")}>
              Maker Output{" "}
              <span className="sort-indicator">
                {sortConfig.key === "maker" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↕"}
              </span>
            </th>
            <th className="sortable" onClick={() => requestSort("taker")}>
              Taker Output{" "}
              <span className="sort-indicator">
                {sortConfig.key === "taker" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↕"}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td colSpan={4} className="no-results">
                No results found
              </td>
            </tr>
          ) : (
            sortedRows.map((row, i) => (
              <tr key={i}>
                <td>
                  <div className="cell-with-logo">
                    <CoinLogo symbol={row.symbol} size={20} />
                    <span>{formatSymbol(row.symbol)}</span>
                  </div>
                </td>
                <td>
                  <ExchangeLogo exchangeName={formatSource(row.source)} size={20} />
                </td>
                <td>
                  {row.makerOutput !== null ? (
                    <>
                      {row.makerOutput} <span className="token-unit">{getBaseToken(row.symbol)}</span>
                    </>
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  {row.takerOutput !== null ? (
                    <>
                      {row.takerOutput} <span className="token-unit">{getBaseToken(row.symbol)}</span>
                    </>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
