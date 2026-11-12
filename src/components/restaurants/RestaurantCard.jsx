import { Link } from 'react-router-dom'
import { BadgePercent, Clock3, Star } from 'lucide-react'
import './RestaurantCard.css'

export default function RestaurantCard({ restaurant, variant = 'grid' }) {
  const {
    id,
    name,
    image,
    imageAlt,
    rating,
    ratingCount,
    deliveryMinutes,
    cuisines,
    location,
    priceForTwo,
    offer,
    offerBadge,
    isVeg,
  } = restaurant

  return (
    <Link
      to={`/restaurants/${id}`}
      className={`restaurant-card restaurant-card--${variant}`}
      aria-label={`${name}, rated ${rating} out of 5, ${deliveryMinutes} minutes delivery, ${priceForTwo} rupees for two`}
    >
      <div className="restaurant-card__media">
        <img src={image} alt={imageAlt} loading="lazy" />

        {offerBadge && (
          <span className="restaurant-card__offer">
            <BadgePercent size={13} strokeWidth={2.5} aria-hidden="true" />
            {offerBadge}
          </span>
        )}

        {variant === 'chain' && <span className="restaurant-card__tag">Top chain</span>}

        {variant === 'popular' && (
          <span className="restaurant-card__rating-pill">
            <Star size={11} fill="currentColor" aria-hidden="true" />
            {rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="restaurant-card__body">
        <div className="restaurant-card__name-row">
          <span
            className={`veg-mark ${isVeg ? 'is-veg' : 'is-nonveg'}`}
            role="img"
            aria-label={isVeg ? 'Pure vegetarian' : 'Serves non-vegetarian'}
          >
            <span />
          </span>
          <h3>{name}</h3>
        </div>

        <div className="restaurant-card__meta">
          <span className="restaurant-card__rating">
            <Star size={11} fill="currentColor" aria-hidden="true" />
            {rating.toFixed(1)}
          </span>
          <span className="restaurant-card__count">({ratingCount})</span>
          <span className="restaurant-card__sep" aria-hidden="true">
            •
          </span>
          <span className="restaurant-card__time">
            <Clock3 size={12} strokeWidth={2.2} aria-hidden="true" />
            {deliveryMinutes} min
          </span>
        </div>

        <p className="restaurant-card__cuisines">{cuisines.join(' • ')}</p>
        <p className="restaurant-card__location">{location}</p>

        <div className="restaurant-card__footer">
          <span className="restaurant-card__price">₹{priceForTwo} for two</span>
          {variant === 'popular' && offer && (
            <span className="restaurant-card__offer-text">{offer}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
