import React from 'react'

/**
 * Button component with variants and sizes.
 * Variants: 'primary' | 'secondary' | 'danger' | 'ghost'
 * Sizes: 'sm' | 'md' | 'lg'
 */
const variantClasses = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent focus-visible:ring-indigo-500',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 focus-visible:ring-indigo-500',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent focus-visible:ring-red-500',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 border-transparent focus-visible:ring-gray-400',
}
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({ variant='primary', size='md', disabled=false, loading=false, onClick, type='button', className='', children }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg border
        transition-all duration-150 outline-none
        focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      )}
      {children}
    </button>
  )
}
