import { MapPin, Star, Tag } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader.jsx'
import ScrollRow from '../ui/ScrollRow.jsx'
import { DINEOUT_RESTAURANTS } from '../../data/homeData.js'
import './DineoutRestaurants.css'

export default function DineoutRestaurants() {
  return (
    <section className="section dineout-section" id="dineout" aria-labelledby="dineout-title">
      <div className="container">
        <SectionHeader
          eyebrow="Eat out, save more"
          title="Dineout restaurants near you"
          subtitle="Reserve a table at the city's most-loved restaurants — with exclusive offers."
          titleId="dineout-title"
          action={<a href="#cities">Explore cities</a>}
        />

        <ScrollRow ariaLabel="Dineout restaurants">
          {DINEOUT_RESTAURANTS.map((restaurant) => (
            <article className="dineout-card" key={restaurant.id}>
              <div className="dineout-card__media">
                <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
                <span className="dineout-card__offer">
                  <Tag size={11} strokeWidth={2.5} aria-hidden="true" />
                  {restaurant.offer}
                </span>
              </div>

              <div className="dineout-card__body">
                <div className="dineout-card__title-row">
                  <h3 className="dineout-card__name">{restaurant.name}</h3>
                  <span
                    className="dineout-card__rating"
                    aria-label={`Rated ${restaurant.rating} out of 5`}
                  >
                    <Star size={11} strokeWidth={0} fill="currentColor" aria-hidden="true" />
                    {restaurant.rating}
                  </span>
                </div>

                <p className="dineout-card__cuisines">{restaurant.cuisines}</p>

                <div className="dineout-card__meta">
                  <span className="dineout-card__price">{restaurant.priceForTwo}</span>
                  <span className="dineout-card__dot" aria-hidden="true" />
                  <span className="dineout-card__location">
                    <MapPin size={12} strokeWidth={2.2} aria-hidden="true" />
                    {restaurant.location}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
