import { useEffect, useState } from 'react'
import {
  BadgePercent,
  Bike,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Search,
} from 'lucide-react'
import { LOCATION_SUGGESTIONS } from '../../data/homeData.js'
import './Hero.css'

export default function Hero({ presetLocation = '' }) {
  const [location, setLocation] = useState('')
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!presetLocation) return
    setLocation(presetLocation)
    setError('')
    setFeedback('')
  }, [presetLocation])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!location.trim()) {
      setError('Please enter a delivery location to continue.')
      setFeedback('')
      return
    }

    setError('')
    setFeedback(
      `Showing ${query.trim() ? `results for “${query.trim()}”` : 'top restaurants'} near ${location.trim()}.`,
    )
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__pattern" aria-hidden="true" />
      <div className="hero__glow hero__glow--one" aria-hidden="true" />
      <div className="hero__glow hero__glow--two" aria-hidden="true" />

      <div className="hero__gallery hero__gallery--left" aria-hidden="true">
        <figure className="hero__photo hero__photo--pizza">
          <img src="/images/hero-pizza.jpg" alt="" />
        </figure>
        <figure className="hero__photo hero__photo--biryani">
          <img src="/images/hero-biryani.jpg" alt="" />
        </figure>
        <span className="hero__floating-chip hero__floating-chip--left">
          <Bike size={15} strokeWidth={2.4} />
          30 min delivery
        </span>
      </div>

      <div className="hero__gallery hero__gallery--right" aria-hidden="true">
        <figure className="hero__photo hero__photo--burger">
          <img src="/images/hero-burger.jpg" alt="" />
        </figure>
        <figure className="hero__photo hero__photo--dessert">
          <img src="/images/hero-dessert.jpg" alt="" />
        </figure>
        <span className="hero__floating-chip hero__floating-chip--right">
          <BadgePercent size={15} strokeWidth={2.4} />
          Free delivery
        </span>
      </div>

      <div className="container hero__inner">
        <span className="hero__eyebrow">
          <Sparkles size={14} strokeWidth={2.4} aria-hidden="true" />
          Food delivery &amp; instant grocery
        </span>

        <h1 className="hero__title" id="hero-title">
          Order food &amp; groceries.
          <span className="hero__title-accent">Foodie it!</span>
        </h1>

        <p className="hero__subtitle">
          Discover the best restaurants around you and get everything you need — from
          piping-hot meals to daily essentials — delivered to your door.
        </p>

        <div className="hero__mobile-foods" aria-hidden="true">
          <img src="/images/hero-pizza.jpg" alt="" />
          <img src="/images/hero-burger.jpg" alt="" />
          <img src="/images/hero-biryani.jpg" alt="" />
          <img src="/images/hero-dessert.jpg" alt="" />
        </div>

        <form
          className="hero-search"
          onSubmit={handleSubmit}
          role="search"
          aria-label="Find restaurants and groceries"
        >
          <div className={`hero-search__field${error ? ' has-error' : ''}`}>
            <span className="hero-search__icon" aria-hidden="true">
              <MapPin size={20} strokeWidth={2.2} />
            </span>
            <label className="hero-search__control">
              <span className="hero-search__label">Deliver to</span>
              <input
                type="text"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value)
                  if (error) setError('')
                }}
                placeholder="Enter your delivery location"
                list="foodie-locations"
                autoComplete="off"
                aria-label="Delivery location"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'hero-error' : undefined}
              />
            </label>
            <datalist id="foodie-locations">
              {LOCATION_SUGGESTIONS.map((city) => (
                <option value={city} key={city} />
              ))}
            </datalist>
          </div>

          <span className="hero-search__divider" aria-hidden="true" />

          <div className="hero-search__field">
            <span className="hero-search__icon" aria-hidden="true">
              <Search size={20} strokeWidth={2.2} />
            </span>
            <label className="hero-search__control">
              <span className="hero-search__label">Search for</span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Restaurant, cuisine or dish"
                aria-label="Search for a restaurant, cuisine or dish"
              />
            </label>
          </div>

          <button className="hero-search__button" type="submit">
            <Search size={18} strokeWidth={2.5} aria-hidden="true" />
            Search
          </button>
        </form>

        {error && (
          <p className="hero__message hero__message--error" id="hero-error" role="alert">
            {error}
          </p>
        )}

        {feedback && (
          <p className="hero__message" role="status">
            <CheckCircle2 size={17} strokeWidth={2.4} aria-hidden="true" />
            {feedback}
          </p>
        )}

        <ul className="hero__trust">
          <li>
            <Bike size={15} aria-hidden="true" />
            30 min average delivery
          </li>
          <li>
            <BadgePercent size={15} aria-hidden="true" />
            No minimum order
          </li>
          <li>
            <ShieldCheck size={15} aria-hidden="true" />
            Hygienic packaging
          </li>
        </ul>
      </div>
    </section>
  )
}
