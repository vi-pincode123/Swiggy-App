import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BadgePercent,
  ChevronRight,
  Clock3,
  Home,
  MapPin,
  Star,
  UtensilsCrossed,
} from 'lucide-react'
import Logo from '../components/ui/Logo.jsx'
import { RESTAURANTS } from '../data/restaurantData.js'
import './RestaurantDetailPage.css'

export default function RestaurantDetailPage() {
  const { restaurantId } = useParams()
  const restaurant = RESTAURANTS.find((item) => item.id === restaurantId)

  useEffect(() => {
    const previousTitle = document.title
    document.title = restaurant ? `${restaurant.name} | Foodie` : 'Restaurant not found | Foodie'
    return () => {
      document.title = previousTitle
    }
  }, [restaurant])

  return (
    <div className="restaurant-detail">
      <header className="detail-header">
        <div className="container detail-header__bar">
          <Logo />
          <nav className="detail-header__nav" aria-label="Restaurant quick links">
            <Link to="/restaurants">
              <ArrowLeft size={15} strokeWidth={2.3} aria-hidden="true" />
              All restaurants
            </Link>
            <Link to="/">
              <Home size={15} strokeWidth={2.3} aria-hidden="true" />
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="container detail-main">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={12} strokeWidth={2.4} aria-hidden="true" />
          <Link to="/restaurants">Restaurants</Link>
          <ChevronRight size={12} strokeWidth={2.4} aria-hidden="true" />
          <span aria-current="page">{restaurant ? restaurant.name : 'Not found'}</span>
        </nav>

        {restaurant ? (
          <div className="detail-hero">
            <figure className="detail-hero__media">
              <img src={restaurant.image} alt={restaurant.imageAlt} />
            </figure>

            <div className="detail-hero__info">
              <span className="detail-badge">
                <UtensilsCrossed size={13} strokeWidth={2.3} aria-hidden="true" />
                Restaurant details
              </span>

              <h1>{restaurant.name}</h1>

              <div className="detail-meta">
                <span className="detail-rating">
                  <Star size={12} fill="currentColor" aria-hidden="true" />
                  {restaurant.rating.toFixed(1)}
                </span>
                <span className="detail-meta__item">
                  <Clock3 size={13} strokeWidth={2.2} aria-hidden="true" />
                  {restaurant.deliveryMinutes} min delivery
                </span>
                <span className="detail-meta__item">₹{restaurant.priceForTwo} for two</span>
              </div>

              <p className="detail-cuisines">{restaurant.cuisines.join(' • ')}</p>

              <p className="detail-location">
                <MapPin size={14} strokeWidth={2.2} aria-hidden="true" />
                {restaurant.location}
              </p>

              {restaurant.offer && (
                <p className="detail-offer">
                  <BadgePercent size={14} strokeWidth={2.3} aria-hidden="true" />
                  {restaurant.offer}
                </p>
              )}

              <p className="detail-note">
                The full menu, dish customisation and online ordering for this restaurant will
                be added in the next phase. This page is a placeholder.
              </p>

              <div className="detail-actions">
                <Link className="btn btn--orange" to="/restaurants">
                  <ArrowLeft size={16} strokeWidth={2.3} aria-hidden="true" />
                  Back to restaurants
                </Link>
                <Link className="btn btn--ghost" to="/">
                  <Home size={16} strokeWidth={2.3} aria-hidden="true" />
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-missing">
            <h1>Restaurant not found</h1>
            <p>
              This restaurant may have moved or the link is incorrect. Explore the restaurants
              available near you instead.
            </p>
            <div className="detail-actions">
              <Link className="btn btn--orange" to="/restaurants">
                <ArrowLeft size={16} strokeWidth={2.3} aria-hidden="true" />
                Back to restaurants
              </Link>
              <Link className="btn btn--ghost" to="/">
                <Home size={16} strokeWidth={2.3} aria-hidden="true" />
                Back to home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
