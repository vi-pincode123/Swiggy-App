import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './ScrollRow.css'

export default function ScrollRow({ children, className = '', ariaLabel = 'Scrollable list' }) {
  const viewportRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const updateArrows = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth
      setCanScrollLeft(viewport.scrollLeft > 4)
      setCanScrollRight(viewport.scrollLeft < maxScroll - 4)
    }

    updateArrows()

    viewport.addEventListener('scroll', updateArrows, { passive: true })
    const observer = new ResizeObserver(updateArrows)
    observer.observe(viewport)
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild)

    return () => {
      viewport.removeEventListener('scroll', updateArrows)
      observer.disconnect()
    }
  }, [])

  const scrollByPage = (direction) => {
    const viewport = viewportRef.current
    if (!viewport) return

    viewport.scrollBy({
      left: direction * Math.max(viewport.clientWidth * 0.82, 280),
      behavior: 'smooth',
    })
  }

  return (
    <div className={`scroll-row ${className}`.trim()}>
      <button
        type="button"
        className={`scroll-row__arrow scroll-row__arrow--left${
          canScrollLeft ? '' : ' is-hidden'
        }`}
        onClick={() => scrollByPage(-1)}
        aria-label="Scroll left"
      >
        <ChevronLeft size={21} strokeWidth={2.5} aria-hidden="true" />
      </button>

      <div
        className="scroll-row__viewport"
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
      >
        <div className="scroll-row__track">{children}</div>
      </div>

      <button
        type="button"
        className={`scroll-row__arrow scroll-row__arrow--right${
          canScrollRight ? '' : ' is-hidden'
        }`}
        onClick={() => scrollByPage(1)}
        aria-label="Scroll right"
      >
        <ChevronRight size={21} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  )
}
