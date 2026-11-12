import { useEffect, useMemo, useRef, useState } from 'react'
import RestaurantsNavbar from '../components/restaurants/RestaurantsNavbar.jsx'
import ListingHero from '../components/restaurants/ListingHero.jsx'
import CategoryCarousel from '../components/restaurants/CategoryCarousel.jsx'
import TopChains from '../components/restaurants/TopChains.jsx'
import RestaurantDirectory from '../components/restaurants/RestaurantDirectory.jsx'
import PopularRestaurants from '../components/restaurants/PopularRestaurants.jsx'
import Footer from '../components/layout/Footer.jsx'
import AuthModal from '../components/ui/AuthModal.jsx'
import { FAST_DELIVERY_LIMIT, RESTAURANTS } from '../data/restaurantData.js'
import './RestaurantsPage.css'

export default function RestaurantsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(null)
  const [sortByRating, setSortByRating] = useState(false)
  const [fastDelivery, setFastDelivery] = useState(false)
  const [pureVeg, setPureVeg] = useState(false)
  const [offersOnly, setOffersOnly] = useState(false)
  const [location, setLocation] = useState('Kochi, Kerala')
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Restaurants near you | Foodie'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const filteredRestaurants = useMemo(() => {
    const query = search.trim().toLowerCase()

    const matches = RESTAURANTS.filter((restaurant) => {
      if (category && !restaurant.categories.includes(category)) return false

      if (query) {
        const haystack = `${restaurant.name} ${restaurant.cuisines.join(' ')}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }

      if (fastDelivery && restaurant.deliveryMinutes > FAST_DELIVERY_LIMIT) return false
      if (pureVeg && !restaurant.isVeg) return false
      if (offersOnly && !restaurant.offer) return false

      return true
    })

    if (sortByRating) {
      return [...matches].sort((a, b) => b.rating - a.rating)
    }

    return matches
  }, [category, fastDelivery, offersOnly, pureVeg, search, sortByRating])

  const hasFilters = Boolean(category || sortByRating || fastDelivery || pureVeg || offersOnly)
  const city = location.split(',')[0]

  const scrollToDirectory = () => {
    requestAnimationFrame(() => {
      document
        .getElementById('restaurants-near-you')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleCategorySelect = (name) => {
    setCategory((current) => (name === null || current === name ? null : name))
    scrollToDirectory()
  }

  const handleSearchClick = () => {
    searchInputRef.current?.focus({ preventScroll: true })
    scrollToDirectory()
  }

  const handleOffersClick = () => {
    setOffersOnly(true)
    scrollToDirectory()
  }

  const clearAllFilters = () => {
    setSearch('')
    setCategory(null)
    setSortByRating(false)
    setFastDelivery(false)
    setPureVeg(false)
    setOffersOnly(false)
  }

  return (
    <div className="restaurants-page">
      <RestaurantsNavbar
        location={location}
        onLocationChange={setLocation}
        user={user}
        onSignIn={() => setAuthOpen(true)}
        onSearchClick={handleSearchClick}
        onOffersClick={handleOffersClick}
      />

      <main id="restaurants-main">
        <ListingHero location={location} restaurantCount={RESTAURANTS.length} />

        <CategoryCarousel activeCategory={category} onSelect={handleCategorySelect} />

        <TopChains />

        <RestaurantDirectory
          restaurants={filteredRestaurants}
          totalCount={RESTAURANTS.length}
          city={city}
          search={search}
          onSearchChange={setSearch}
          inputRef={searchInputRef}
          category={category}
          onClearCategory={() => setCategory(null)}
          sortByRating={sortByRating}
          onToggleSort={() => setSortByRating((value) => !value)}
          fastDelivery={fastDelivery}
          onToggleFast={() => setFastDelivery((value) => !value)}
          pureVeg={pureVeg}
          onToggleVeg={() => setPureVeg((value) => !value)}
          offersOnly={offersOnly}
          onToggleOffers={() => setOffersOnly((value) => !value)}
          onClearAll={clearAllFilters}
          hasFilters={hasFilters}
        />

        <PopularRestaurants />
      </main>

      <Footer />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(phone) => setUser({ phone })}
      />
    </div>
  )
}
