"use client"

import { useState, useRef, useEffect } from "react"
import { formatSymbol, formatSource } from "@/utils/formatters"
import CoinLogo from "../CoinLogo"
import ExchangeLogo from "../ExchangeLogo"
import "./Dropdown.css"

type Props = {
  options: string[]
  selected: string | null
  onChange: (val: string | null) => void
  placeholder: string
  type?: "symbol" | "source"
}

export default function Dropdown({ options, selected, onChange, placeholder, type }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (value: string | null) => {
    onChange(value)
    setIsOpen(false)
  }

  const renderOption = (option: string) => {
    if (type === "symbol") {
      return (
        <>
          <CoinLogo symbol={option} size={20} />
          <span>{formatSymbol(option)}</span>
        </>
      )
    } else if (type === "source") {
      return (
        <>
          <ExchangeLogo exchangeName={formatSource(option)} size={20} />
        </>
      )
    }
    return <span>{option}</span>
  }

  const renderSelected = () => {
    if (!selected) return placeholder
    if (type === "symbol") {
      return (
        <div className="dropdown-selected-content">
          <CoinLogo symbol={selected} size={20} />
          <span>{formatSymbol(selected)}</span>
        </div>
      )
    } else if (type === "source") {
      return (
        <div className="dropdown-selected-content">
          <ExchangeLogo exchangeName={formatSource(selected)} size={20} />
        </div>
      )
    }
    return selected
  }

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <div className="dropdown-select" onClick={() => setIsOpen(!isOpen)}>
        {renderSelected()}
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          <div className="dropdown-option" onClick={() => handleSelect(null)}>
            {placeholder}
          </div>
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-option ${selected === option ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {renderOption(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
