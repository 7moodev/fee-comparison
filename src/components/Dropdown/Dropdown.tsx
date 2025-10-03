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
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef =useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()}
  }, [isOpen])

  const filteredOptions = options.filter((option) => {
    const displayText = type === "symbol" ? formatSymbol(option) : formatSource(option)
    return displayText.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleSelect = (value: string | null) => {
    onChange(value)
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDropdownClick = () => {
    if (!isOpen) {
      setIsOpen(true)
      setSearchTerm("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key ==='Escape') {setIsOpen(false)
      setSearchTerm("")
    }
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
      {!isOpen ? (
        <div className="dropdown-select" onClick={handleDropdownClick}>
          {renderSelected()}
          <span className="dropdown-arrow">▼</span>
        </div>
      ) : (
        <div className="dropdown-search-trigger">
          <input
            ref={inputRef}
            type="text"
            placeholder={`Search ${type === "symbol" ? "pairs" : "exchanges"}...`}
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="dropdown-search-input-trigger"
          />
          <span className="dropdown-arrow">▲</span>
        </div>
      )}
      {isOpen && (
        <div className="dropdown-options">
          <div className="dropdown-option" onClick={() => handleSelect(null)}>
            {placeholder}
          </div>
          {filteredOptions.map((option) => (
            <div
              key={option}
              className={`dropdown-option ${selected === option ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {renderOption(option)}
            </div>
          ))}
          {filteredOptions.length === 0 && searchTerm && (
            <div className="dropdown-no-results">
              No results found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
