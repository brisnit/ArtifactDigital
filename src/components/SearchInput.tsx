import { KeyboardEvent, useRef, useEffect } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  onSearch: (q: string) => void
  autoFocus?: boolean
}

export default function SearchInput({ value, onChange, onSearch, autoFocus }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch(value)
  }

  return (
    <div className="search-input-wrapper">
      <div className="search-input-inner">
        <span className="search-input-icon" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          type="search"
          className="search-input-field"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search symptoms, doctors, locations, services, or questions"
          aria-label="Search Baptist Health"
          autoComplete="off"
        />
        {value && (
          <button
            className="search-input-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <ClearIcon />
          </button>
        )}
      </div>
      <button
        className="search-submit-btn"
        onClick={() => onSearch(value)}
        disabled={!value.trim()}
        aria-label="Submit search"
      >
        SEARCH
        <span className="search-submit-arrow" aria-hidden="true">›</span>
      </button>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
