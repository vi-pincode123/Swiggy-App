import { Link } from 'react-router-dom'
import { BadgePercent, Bike, ChevronRight, MapPin } from 'lucide-react'
import './ListingHero.css'

export default function ListingHero({ location, restaurantCount }) {
  const city = location.split(',')[0]

  return (
    <section className="listing-hero" aria-labelledby="listing-title">
      <div className="listing-hero__glow" aria-hidden="true" />

      <div className="container listing-hero__inner">
        <nav className="listing-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={12} strokeWidth={2.4} aria-hidden="true" />
          <span aria-current="page">Restaurants</span>
        </nav>

        <div className="listing-hero__row">
          <div className="listing-hero__copy">
            <span className="listing-hero__eyebrow">
              <MapPin size={13} strokeWidth={2.4} aria-hidden="true" />
              Now delivering in {city}
            </span>
            <h1 id="listing-title">Order food online in {city}</h1>
            <p>
              Explore {restaurantCount}+ local favourites and top restaurant chains,
              delivered hot to your doorstep.
            </p>
          </div>

          <ul className="listing-hero__stats">
            <li>
              <span className="listing-hero__stat-icon" aria-hidden="true">
                <Bike size={18} strokeWidth={2.2} />
              </span>
              <span>
                <strong>30 min</strong>
                <small>average delivery</small>
              </span>
            </li>
            <li>
              <span className="listing-hero__stat-icon" aria-hidden="true">
                <BadgePercent size={18} strokeWidth={2.2} />
              </span>
              <span>
                <strong>Best offers</strong>
                <small>every single day</small>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
