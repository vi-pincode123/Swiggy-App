import { MapPin, SearchX } from 'lucide-react'
import FilterBar from './FilterBar.jsx'
import RestaurantCard from './RestaurantCard.jsx'
import './RestaurantDirectory.css'

export default function RestaurantDirectory({
  restaurants,
  totalCount,
  city,
  search,
  onSearchChange,
  inputRef,
  category,
  onClearCategory,
  sortByRating,
  onToggleSort,
  fastDelivery,
  onToggleFast,
  pureVeg,
  onToggleVeg,
  offersOnly,
  onToggleOffers,
  onClearAll,
  hasFilters,
}) {
  return (
    <section
      className="restaurant-directory"
      id="restaurants-near-you"
      aria-labelledby="nearby-title"
    >
      <div className="container">
        <div className="directory-head">
          <div className="directory-head__copy">
            <span className="directory-eyebrow">
              <MapPin size={13} strokeWidth={2.4} aria-hidden="true" />
              Around you
            </span>
            <h2 id="nearby-title">Restaurants near you</h2>
            <p>
              {totalCount} handpicked places delivering to your doorstep. Use the filters to
              find your next favourite.
            </p>
          </div>
        </div>

        <FilterBar
          search={search}
          onSearchChange={onSearchChange}
          inputRef={inputRef}
          category={category}
          onClearCategory={onClearCategory}
          sortByRating={sortByRating}
          onToggleSort={onToggleSort}
          fastDelivery={fastDelivery}
          onToggleFast={onToggleFast}
          pureVeg={pureVeg}
          onToggleVeg={onToggleVeg}
          offersOnly={offersOnly}
          onToggleOffers={onToggleOffers}
          onClearAll={onClearAll}
          resultCount={restaurants.length}
          city={city}
        />

        {restaurants.length > 0 ? (
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="restaurant-empty" role="status">
            <span className="restaurant-empty__icon" aria-hidden="true">
              <SearchX size={26} strokeWidth={2} />
            </span>
            <h3>No restaurants match your filters</h3>
            <p>
              {hasFilters
                ? 'Try removing a filter or searching for a different restaurant.'
                : 'We could not find any restaurants right now. Please try again.'}
            </p>
            <button type="button" className="btn btn--orange" onClick={onClearAll}>
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
