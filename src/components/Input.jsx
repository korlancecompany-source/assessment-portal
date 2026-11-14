import React from 'react'

/**
 * Accessible Input with label, error display, focus ring, and aria attributes.
 * Props: label, id, type, value, onChange, error, placeholder, required,
 *        autoComplete, maxLength, className
 */
export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = '',
  required = false,
  autoComplete,
  maxLength,
  className = '',
}) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`
  const errorId = `${inputId}-error`

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 select-none"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`
          w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white
          border rounded-lg outline-none
          transition-all duration-150 placeholder:text-gray-400
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error
            ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      />
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
