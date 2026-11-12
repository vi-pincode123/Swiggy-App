import { useState } from 'react'
import { ArrowUpRight, ChevronDown, ChevronUp, MapPin } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader.jsx'
import { CITIES } from '../../data/homeData.js'
import './Cities.css'

const INITIAL_CITY_COUNT = 12

export default function Cities({ onCitySelect }) {
  const [expanded, setExpanded] = useState(false)
  const visibleCities = expanded ? CITIES : CITIES.slice(0, INITIAL_CITY_COUNT)

  return (
    <section className="section cities-section" id="cities" aria-labelledby="cities-title">
      <div className="container">
        <SectionHeader
          eyebrow="We're growing"
          title="Cities with Food Delivery"
          subtitle="From big-city favourites to our hometowns — Foodie delivers happiness across India."
          titleId="cities-title"
          action={<span className="cities-count">{CITIES.length}+ cities and counting</span>}
        />

        <ul className="cities-grid" id="cities-grid">
          {visibleCities.map((city) => (
            <li key={city}>
              <a
                className="city-card"
                href="#top"
                onClick={() => onCitySelect?.(city)}
                aria-label={`Order food in ${city}`}
              >
                <span className="city-card__icon" aria-hidden="true">
                  <MapPin size={16} strokeWidth={2.2} />
                </span>
                <span className="city-card__name">{city}</span>
                <ArrowUpRight
                  className="city-card__arrow"
                  size={15}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="cities__action">
          <button
            className="cities__toggle"
            type="button"
            aria-expanded={expanded}
            aria-controls="cities-grid"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? 'Show Less' : 'Show More'}
            {expanded ? (
              <ChevronUp size={17} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <ChevronDown size={17} strokeWidth={2.4} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
