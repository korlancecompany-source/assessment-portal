import React, { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Fully functional searchable dropdown — no external library.
 * Props: options (string[]), value (string), onChange(string),
 *        label, error, placeholder, id
 */
export default function Combobox({
  options = [],
  value = '',
  onChange,
  label,
  error,
  placeholder = 'Select or type to search...',
  id,
}) {
  const inputId = id || `combobox-${label?.toLowerCase().replace(/\s+/g, '-')}`
  const listboxId = `${inputId}-listbox`
  const errorId = `${inputId}-error`

  const [query, setQuery] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const itemRefs = useRef([])

  const filtered = options.filter(opt =>
    opt.toLowerCase().includes(query.toLowerCase())
  )

  // Sync query when value prop changes externally
  useEffect(() => {
    setQuery(value)
  }, [value])

  // Click-outside closes dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
        // Revert query to current selected value if no match
        setQuery(value)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex].scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  const selectOption = useCallback((opt) => {
    onChange(opt)
    setQuery(opt)
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }, [onChange])

  function handleInputChange(e) {
    setQuery(e.target.value)
    setIsOpen(true)
    setHighlightedIndex(-1)
    if (e.target.value === '') onChange('')
  }

  function handleInputFocus() {
    setIsOpen(true)
  }

  function handleKeyDown(e) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true)
        return
      }
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(i => Math.min(i + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          selectOption(filtered[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightedIndex(-1)
        setQuery(value)
        inputRef.current?.blur()
        break
      case 'Tab':
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
    }
  }

  function toggleDropdown() {
    if (isOpen) {
      setIsOpen(false)
      setHighlightedIndex(-1)
    } else {
      setIsOpen(true)
      inputRef.current?.focus()
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 select-none">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Input */}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={highlightedIndex >= 0 ? `${listboxId}-opt-${highlightedIndex}` : undefined}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            w-full px-3.5 py-2.5 pr-10 text-sm text-gray-900 bg-white
            border rounded-lg outline-none
            transition-all duration-150 placeholder:text-gray-400
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            ${error
              ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        />

        {/* Chevron button */}
        <button
          type="button"
          tabIndex={-1}
          onClick={toggleDropdown}
          aria-label={isOpen ? 'Close options' : 'Open options'}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown list */}
        {isOpen && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label || 'Options'}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-500 text-center select-none">
                No course found
              </li>
            ) : (
              filtered.map((opt, idx) => {
                const isSelected = opt === value
                const isHighlighted = idx === highlightedIndex
                return (
                  <li
                    key={opt}
                    id={`${listboxId}-opt-${idx}`}
                    ref={el => (itemRefs.current[idx] = el)}
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={e => {
                      e.preventDefault()
                      selectOption(opt)
                    }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`
                      flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer select-none
                      transition-colors duration-100
                      ${isHighlighted ? 'bg-indigo-50 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}
                      ${isSelected ? 'font-medium' : ''}
                    `}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                )
              })
            )}
          </ul>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
