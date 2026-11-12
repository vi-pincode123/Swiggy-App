import { Link } from 'react-router-dom'
import {
  ChevronDown,
  MapPin,
  Search,
  ShoppingBag,
  ShoppingBasket,
  Timer,
  User,
  X,
} from 'lucide-react'
import { LOCATION_SUGGESTIONS } from '../../data/homeData.js'
import { DELIVERY_MINUTES } from '../../data/groceryData.js'
import './InstamartNavbar.css'

export default function InstamartNavbar({
  query,
  onQueryChange,
  onSearchSubmit,
  location,
  onLocationChange,
  cartCount,
  onCartOpen,
  onAccountOpen,
  isLoggedIn,
}) {
  return (
    <header className="im-navbar">
      <div className="im-navbar__inner container">
        <Link className="im-logo" to="/" aria-label="Foodie Instamart - go to homepage">
          <span className="im-logo__mark" aria-hidden="true">
            <ShoppingBasket size={22} strokeWidth={2.4} />
          </span>
          <span className="im-logo__text">
            Foodie <span className="im-logo__brand">Instamart</span>
          </span>
        </Link>

        <div className="im-navbar__main">
          <div className="im-delivery">
            <span className="im-delivery__time">
              <Timer size={15} strokeWidth={2.5} aria-hidden="true" />
              {DELIVERY_MINUTES} mins
            </span>
            <span className="im-delivery__label">delivery to</span>

            <div className="im-loc">
              <MapPin size={14} strokeWidth={2.3} aria-hidden="true" />
              <select
                className="im-loc__select"
                aria-label="Choose delivery location"
                value={location}
                onChange={(event) => onLocationChange(event.target.value)}
              >
                {LOCATION_SUGGESTIONS.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} strokeWidth={2.4} aria-hidden="true" className="im-loc__chevron" />
            </div>
          </div>

          <form
            className="im-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              onSearchSubmit()
            }}
          >
            <Search size={19} strokeWidth={2.2} aria-hidden="true" className="im-search__icon" />
            <label className="sr-only" htmlFor="im-search-input">
              Search groceries
            </label>
            <input
              id="im-search-input"
              className="im-search__input"
              type="search"
              placeholder="Search for milk, bread, fruits and more"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="im-search__clear"
                onClick={() => onQueryChange('')}
                aria-label="Clear grocery search"
              >
                <X size={16} strokeWidth={2.4} aria-hidden="true" />
              </button>
            )}
            <button type="submit" className="im-search__submit">
              Search
            </button>
          </form>
        </div>

        <div className="im-navbar__actions">
          <button
            type="button"
            className="im-account-btn"
            onClick={onAccountOpen}
            aria-haspopup="dialog"
          >
            <User size={19} strokeWidth={2.2} aria-hidden="true" />
            <span className="im-account-btn__label">My Account</span>
            {isLoggedIn && <span className="im-account-btn__dot" aria-hidden="true" />}
          </button>

          <button
            type="button"
            className="im-cart-btn"
            onClick={onCartOpen}
            aria-haspopup="dialog"
            aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
          >
            <ShoppingBag size={19} strokeWidth={2.2} aria-hidden="true" />
            <span className="im-cart-btn__label">My Cart</span>
            <span className="im-cart-btn__count" aria-hidden="true">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
