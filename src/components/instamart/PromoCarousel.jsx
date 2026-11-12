import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from 'lucide-react'
import './PromoCarousel.css'

const AUTOPLAY_MS = 5600

export default function PromoCarousel({ banners, onShop, onExplore }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const regionRef = useRef(null)

  useEffect(() => {
    if (paused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % banners.length)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [paused, banners.length, index])

  const goTo = (next) => setIndex(((next % banners.length) + banners.length) % banners.length)

  const handleBlur = (event) => {
    if (!regionRef.current?.contains(event.relatedTarget)) setPaused(false)
  }

  return (
    <section
      className="im-promo"
      aria-label="Featured grocery offers"
      ref={regionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={handleBlur}
    >
      <div className="container">
        <div className={`im-promo__viewport im-promo__viewport--${banners[index].theme}`}>
          <div
            className="im-promo__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
            aria-live="off"
          >
            {banners.map((banner, slideIndex) => {
              const isActive = slideIndex === index
              return (
                <article
                  key={banner.id}
                  className={`im-promo__slide im-promo__slide--${banner.theme}`}
                  aria-roledescription="slide"
                  aria-label={`${slideIndex + 1} of ${banners.length}: ${banner.eyebrow}`}
                  aria-hidden={!isActive}
                >
                  <div className="im-promo__content">
                    <p className="im-promo__eyebrow">{banner.eyebrow}</p>
                    <h2 className="im-promo__title">{banner.title}</h2>
                    <p className="im-promo__subtitle">{banner.subtitle}</p>

                    <span className="im-promo__offer">
                      <Tag size={14} strokeWidth={2.3} aria-hidden="true" />
                      {banner.offer}
                    </span>

                    <div className="im-promo__actions">
                      <button
                        type="button"
                        className="im-promo__btn im-promo__btn--primary"
                        onClick={() => onShop(banner.filter)}
                        tabIndex={isActive ? 0 : -1}
                      >
                        {banner.primaryLabel}
                        <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="im-promo__btn im-promo__btn--ghost"
                        onClick={onExplore}
                        tabIndex={isActive ? 0 : -1}
                      >
                        {banner.secondaryLabel}
                      </button>
                    </div>
                  </div>

                  <div className="im-promo__media">
                    <img src={banner.image} alt={banner.imageAlt} loading="lazy" />
                    <span className="im-promo__sticker" aria-hidden="true">
                      <span className="im-promo__sticker-label">{banner.eyebrow}</span>
                      <span className="im-promo__sticker-value">7 min delivery</span>
                    </span>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="im-promo__controls">
            <div className="im-promo__dots" role="group" aria-label="Choose a banner">
              {banners.map((banner, dotIndex) => (
                <button
                  key={banner.id}
                  type="button"
                  className={`im-promo__dot${dotIndex === index ? ' is-active' : ''}`}
                  onClick={() => goTo(dotIndex)}
                  aria-label={`Go to ${banner.eyebrow} banner`}
                  aria-current={dotIndex === index ? 'true' : undefined}
                />
              ))}
            </div>

            <div className="im-promo__arrows">
              <button
                type="button"
                className="im-promo__arrow"
                onClick={() => goTo(index - 1)}
                aria-label="Previous banner"
              >
                <ChevronLeft size={19} strokeWidth={2.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="im-promo__arrow"
                onClick={() => goTo(index + 1)}
                aria-label="Next banner"
              >
                <ChevronRight size={19} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
