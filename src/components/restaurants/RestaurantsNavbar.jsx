import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BadgePercent,
  Check,
  ChevronDown,
  Heart,
  HelpCircle,
  Home,
  MapPin,
  Menu,
  Search,
  UserRound,
  X,
} from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import { LOCATION_SUGGESTIONS } from '../../data/homeData.js'
import './RestaurantsNavbar.css'

export default function RestaurantsNavbar({
  location,
  onLocationChange,
  user,
  onSignIn,
  onSearchClick,
  onOffersClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const locationRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!locationOpen) return undefined

    const handlePointerDown = (event) => {
      if (!locationRef.current?.contains(event.target)) setLocationOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setLocationOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [locationOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1080) setMenuOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const selectLocation = (city) => {
    onLocationChange(city)
    setLocationOpen(false)
  }

  const handleSearch = () => {
    closeMenu()
    onSearchClick()
  }

  const handleOffers = () => {
    closeMenu()
    onOffersClick()
  }

  const handleSignIn = () => {
    closeMenu()
    onSignIn()
  }

  const city = location.split(',')[0]

  return (
    <>
      <a className="skip-link" href="#restaurants-main">
        Skip to content
      </a>

      <header className="rn-header">
        <div className="container rn-bar">
          <Logo />

          <nav className="rn-home-nav" aria-label="Home navigation">
            <Link className="rn-home-link" to="/">
              <Home size={16} strokeWidth={2.3} aria-hidden="true" />
              Home
            </Link>
          </nav>

          <div className="rn-location" ref={locationRef}>
            <button
              className="rn-location__button"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={locationOpen}
              onClick={() => setLocationOpen((open) => !open)}
            >
              <span className="rn-location__pin" aria-hidden="true">
                <MapPin size={17} strokeWidth={2.3} />
              </span>
              <span className="rn-location__copy">
                <small>Deliver to</small>
                <strong>{city}</strong>
              </span>
              <ChevronDown
                size={15}
                strokeWidth={2.4}
                aria-hidden="true"
                className={`rn-chevron${locationOpen ? ' is-open' : ''}`}
              />
            </button>

            {locationOpen && (
              <div className="rn-location__menu">
                <div className="rn-location__menu-head">
                  <span>Choose delivery location</span>
                  <button
                    type="button"
                    aria-label="Close location selector"
                    onClick={() => setLocationOpen(false)}
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>

                <ul role="listbox" aria-label="Delivery locations">
                  {LOCATION_SUGGESTIONS.map((cityName) => {
                    const selected = cityName === location
                    return (
                      <li key={cityName} role="option" aria-selected={selected}>
                        <button
                          type="button"
                          className={selected ? 'is-selected' : ''}
                          onClick={() => selectLocation(cityName)}
                        >
                          <MapPin size={14} aria-hidden="true" />
                          <span>{cityName}</span>
                          {selected && <Check size={15} aria-hidden="true" />}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>

          <nav className="rn-nav" aria-label="Restaurant page sections">
            <a className="rn-nav__link" href="#footer">
              Foodie Corporate
            </a>
            <button className="rn-nav__link" type="button" onClick={onSearchClick}>
              <Search size={16} strokeWidth={2.2} aria-hidden="true" />
              Search
            </button>
            <button className="rn-nav__link" type="button" onClick={onOffersClick}>
              <BadgePercent size={16} strokeWidth={2.2} aria-hidden="true" />
              Offers
            </button>
            <a className="rn-nav__link" href="#footer">
              Help
            </a>
          </nav>

          <div className="rn-actions">
            <button className="rn-profile" type="button" onClick={handleSignIn}>
              <span className="rn-profile__avatar" aria-hidden="true">
                <UserRound size={17} strokeWidth={2.2} />
              </span>
              <span className="rn-profile__text">{user ? 'Hi, Foodie' : 'Profile'}</span>
            </button>

            <button
              className="rn-menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="restaurant-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`rn-backdrop${menuOpen ? ' is-visible' : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div
          id="restaurant-mobile-menu"
          className={`rn-drawer${menuOpen ? ' is-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <div className="rn-drawer__location">
            <span className="rn-drawer__label">
              <MapPin size={14} aria-hidden="true" />
              Delivering to
            </span>
            <button
              type="button"
              onClick={() => {
                closeMenu()
                setLocationOpen(true)
              }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {location}
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>

          <nav className="rn-drawer__nav" aria-label="Mobile restaurant navigation">
            <Link to="/" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <Home size={18} aria-hidden="true" />
              Home
            </Link>
            <button type="button" onClick={handleSearch} tabIndex={menuOpen ? 0 : -1}>
              <Search size={18} aria-hidden="true" />
              Search restaurants
            </button>
            <button type="button" onClick={handleOffers} tabIndex={menuOpen ? 0 : -1}>
              <BadgePercent size={18} aria-hidden="true" />
              Offers
            </button>
            <a href="#footer" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <Heart size={18} aria-hidden="true" />
              Foodie Corporate
            </a>
            <a href="#footer" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <HelpCircle size={18} aria-hidden="true" />
              Help
            </a>
          </nav>

          <button
            className="rn-drawer__signin"
            type="button"
            onClick={handleSignIn}
            tabIndex={menuOpen ? 0 : -1}
          >
            <UserRound size={18} aria-hidden="true" />
            {user ? 'View profile' : 'Sign In'}
          </button>

          <p className="rn-drawer__note">Fresh food from 20+ restaurants near you.</p>
        </div>
      </header>
    </>
  )
}
