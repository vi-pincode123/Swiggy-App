import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './Drawer.css'

export default function Drawer({ open, onClose, title, titleId, children, footer }) {
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const focusTimer = window.setTimeout(() => {
      const target =
        panelRef.current?.querySelector('[data-autofocus]') ||
        panelRef.current?.querySelector('button, input, a[href]')
      target?.focus()
    }, 90)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus()
      }
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="im-drawer"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="im-drawer__scrim" aria-hidden="true" onClick={onClose} />
      <aside
        className="im-drawer__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="im-drawer__head">
          <h2 className="im-drawer__title" id={titleId}>
            {title}
          </h2>
          <button
            type="button"
            className="im-drawer__close"
            onClick={onClose}
            aria-label="Close panel"
          >
            <X size={19} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </header>

        <div className="im-drawer__body">{children}</div>

        {footer && <div className="im-drawer__footer">{footer}</div>}
      </aside>
    </div>
  )
}
