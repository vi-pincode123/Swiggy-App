import { useState } from 'react'
import {
  ArrowDownWideNarrow,
  BadgePercent,
  Check,
  ChevronDown,
  Leaf,
  Search,
  SlidersHorizontal,
  Timer,
  X,
} from 'lucide-react'
import './FilterBar.css'

export default function FilterBar({
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
  resultCount,
  city,
}) {
  const [panelOpen, setPanelOpen] = useState(false)

  const activeOptions = [sortByRating, fastDelivery, pureVeg, offersOnly].filter(Boolean).length
  const filterCount = activeOptions + (category ? 1 : 0)
  const hasFilters = filterCount > 0

  const activeChips = []
  if (category) {
    activeChips.push({
      key: 'category',
      label: category,
      onRemove: onClearCategory,
    })
  }
  if (sortByRating) {
    activeChips.push({
      key: 'sort',
      label: 'Rating: high to low',
      onRemove: onToggleSort,
    })
  }
  if (fastDelivery) {
    activeChips.push({ key: 'fast', label: 'Fast delivery', onRemove: onToggleFast })
  }
  if (pureVeg) {
    activeChips.push({ key: 'veg', label: 'Pure veg', onRemove: onToggleVeg })
  }
  if (offersOnly) {
    activeChips.push({ key: 'offers', label: 'Offers', onRemove: onToggleOffers })
  }

  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        <div className="filter-bar__search">
          <Search size={17} strokeWidth={2.2} aria-hidden="true" />
          <input
            id="restaurant-search-input"
            ref={inputRef}
            type="search"
            value={search}
            placeholder="Search restaurants by name"
            aria-label="Search restaurants by name"
            autoComplete="off"
            onChange={(event) => onSearchChange(event.target.value)}
          />
          {search && (
            <button
              type="button"
              className="filter-bar__clear-search"
              aria-label="Clear restaurant search"
              onClick={() => onSearchChange('')}
            >
              <X size={15} aria-hidden="true" />
            </button>
          )}
        </div>

        <button
          className={`filter-bar__toggle${panelOpen ? ' is-open' : ''}`}
          type="button"
          aria-expanded={panelOpen}
          aria-controls="restaurant-filter-panel"
          onClick={() => setPanelOpen((open) => !open)}
        >
          <SlidersHorizontal size={16} strokeWidth={2.2} aria-hidden="true" />
          Filters
          {filterCount > 0 && (
            <span className="filter-bar__badge" aria-label={`${filterCount} active filters`}>
              {filterCount}
            </span>
          )}
          <ChevronDown
            size={15}
            strokeWidth={2.4}
            aria-hidden="true"
            className={`filter-bar__chevron${panelOpen ? ' is-open' : ''}`}
          />
        </button>
      </div>

      {panelOpen && (
        <div
          className="filter-panel"
          id="restaurant-filter-panel"
          role="group"
          aria-label="Restaurant filters"
        >
          <div className="filter-panel__head">
            <span>Refine your search</span>
            <button type="button" onClick={onClearAll} disabled={!hasFilters}>
              Clear all
            </button>
          </div>

          <div className="filter-panel__options">
            <button
              type="button"
              className={`filter-option${sortByRating ? ' is-active' : ''}`}
              aria-pressed={sortByRating}
              onClick={onToggleSort}
            >
              <span className="filter-option__icon" aria-hidden="true">
                <ArrowDownWideNarrow size={17} strokeWidth={2.2} />
              </span>
              <span className="filter-option__copy">
                <strong>Sort by rating</strong>
                <small>Highest rated first</small>
              </span>
              <span className="filter-option__check" aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </span>
            </button>

            <button
              type="button"
              className={`filter-option${fastDelivery ? ' is-active' : ''}`}
              aria-pressed={fastDelivery}
              onClick={onToggleFast}
            >
              <span className="filter-option__icon" aria-hidden="true">
                <Timer size={17} strokeWidth={2.2} />
              </span>
              <span className="filter-option__copy">
                <strong>Fast delivery</strong>
                <small>Under 30 minutes</small>
              </span>
              <span className="filter-option__check" aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </span>
            </button>

            <button
              type="button"
              className={`filter-option${pureVeg ? ' is-active' : ''}`}
              aria-pressed={pureVeg}
              onClick={onToggleVeg}
            >
              <span className="filter-option__icon" aria-hidden="true">
                <Leaf size={17} strokeWidth={2.2} />
              </span>
              <span className="filter-option__copy">
                <strong>Pure veg</strong>
                <small>100% vegetarian kitchens</small>
              </span>
              <span className="filter-option__check" aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </span>
            </button>

            <button
              type="button"
              className={`filter-option${offersOnly ? ' is-active' : ''}`}
              aria-pressed={offersOnly}
              onClick={onToggleOffers}
            >
              <span className="filter-option__icon" aria-hidden="true">
                <BadgePercent size={17} strokeWidth={2.2} />
              </span>
              <span className="filter-option__copy">
                <strong>Offers</strong>
                <small>Restaurants with deals</small>
              </span>
              <span className="filter-option__check" aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="filter-bar__summary">
        <p className="filter-bar__count" aria-live="polite">
          <strong>{resultCount}</strong> {resultCount === 1 ? 'restaurant' : 'restaurants'} found
          {city ? ` in ${city}` : ''}
        </p>

        {hasFilters && (
          <div className="filter-bar__active">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                className="filter-chip"
                onClick={chip.onRemove}
                aria-label={`Remove filter: ${chip.label}`}
              >
                {chip.label}
                <X size={12} strokeWidth={2.6} aria-hidden="true" />
              </button>
            ))}
            <button type="button" className="filter-bar__reset" onClick={onClearAll}>
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
