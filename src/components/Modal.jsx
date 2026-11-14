import React, { useEffect, useRef } from 'react'

/**
 * Accessible Modal dialog component with backdrop blur and optional dismissal.
 * 
 * Props:
 * @param {boolean} isOpen
 * @param {string} title
 * @param {React.ReactNode} children
 * @param {React.ReactNode} [footer]
 * @param {function} [onClose] - If omitted, modal cannot be dismissed by clicking outside or pressing Escape
 * @param {string} [overlayClassName]
 */
export default function Modal({
  isOpen,
  title,
  children,
  footer,
  onClose,
  overlayClassName = '',
}) {
  const modalRef = useRef(null)

  // Escape key handler (only if onClose provided)
  useEffect(() => {
    if (!isOpen || !onClose) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus trap / auto-focus first actionable item
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length > 0) {
        focusable[0].focus()
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${overlayClassName}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        // Dismiss on clicking backdrop only if onClose is provided
        if (e.target === e.currentTarget && onClose) {
          onClose()
        }
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-200 scale-100 opacity-100"
      >
        <div className="flex items-start justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 rounded-lg p-1 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="text-gray-600 text-sm mb-6 leading-relaxed">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
