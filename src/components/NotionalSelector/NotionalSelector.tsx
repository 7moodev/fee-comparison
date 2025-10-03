"use client"

import "./NotionalSelector.css"

type Props = {
  selected: number
  onChange: (newValue: number) => void
}

export default function NotionalSelector({ selected, onChange }: Props) {
  const options = [100, 500, 1000]

  return (
    <div className="notional-selector">
      {options.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)} className={selected === opt ? "active" : ""}>
          €{opt}
        </button>
      ))}
    </div>
  )
}
