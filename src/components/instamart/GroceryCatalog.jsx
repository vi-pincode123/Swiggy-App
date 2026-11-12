import { ChevronDown, SearchX, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from './ProductCard.jsx'
import {
  CATEGORY_OPTIONS,
  SORT_OPTIONS,
  getFilterLabel,
} from '../../data/groceryData.js'
import './GroceryCatalog.css'

export default function GroceryCatalog({
  products,
  query,
  filterId,
  sortBy,
  cart,
  onFilterChange,
  onSortChange,
  onClear,
  onClearQuery,
  onAdd,
  onIncrement,
  onDecrement,
}) {
  const hasFilters = Boolean(query.trim() || filterId)
  const filterKnown = CATEGORY_OPTIONS.some((option) => option.value === filterId)

  const heading = query.trim()
    ? `Search results for “${query.trim()}”`
    : filterId
      ? getFilterLabel(filterId)
      : 'Shop all groceries'

  return (
    <section className="im-catalog" id="im-catalog" aria-labelledby="im-catalog-title">
      <div className="container">
        <div className="im-catalog__panel">
          <div className="im-catalog__head">
            <div className="im-catalog__intro">
              <p className="im-eyebrow">
                <SlidersHorizontal size={13} strokeWidth={2.4} aria-hidden="true" />
                {hasFilters ? 'Filtered for you' : 'Everyday essentials'}
              </p>
              <h2 className="im-catalog__title" id="im-catalog-title">
                {heading}
              </h2>
              <p className="im-catalog__meta" role="status">
                {products.length} product{products.length === 1 ? '' : 's'} available
                {filterId && !query.trim() ? ` in ${getFilterLabel(filterId)}` : ''}
              </p>
            </div>

            <div className="im-toolbar">
              <label className="im-field" htmlFor="im-department">
                <span className="im-field__label">Department</span>
                <span className="im-field__control">
                  <select
                    id="im-department"
                    value={filterId}
                    onChange={(event) => onFilterChange(event.target.value)}
                  >
                    <option value="">All groceries</option>
                    {CATEGORY_OPTIONS.filter((option) => option.value).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    {filterId && !filterKnown && (
                      <option value={filterId}>{getFilterLabel(filterId)}</option>
                    )}
                  </select>
                  <ChevronDown size={15} strokeWidth={2.3} aria-hidden="true" />
                </span>
              </label>

              <label className="im-field" htmlFor="im-sort">
                <span className="im-field__label">Sort by</span>
                <span className="im-field__control">
                  <select
                    id="im-sort"
                    value={sortBy}
                    onChange={(event) => onSortChange(event.target.value)}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} strokeWidth={2.3} aria-hidden="true" />
                </span>
              </label>

              {hasFilters && (
                <button type="button" className="im-clear-btn" onClick={onClear}>
                  <X size={14} strokeWidth={2.6} aria-hidden="true" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {hasFilters && (
            <div className="im-catalog__chips">
              <span className="im-catalog__chips-label">Active:</span>
              {filterId && (
                <button
                  type="button"
                  className="im-chip"
                  onClick={() => onFilterChange('')}
                  aria-label={`Remove ${getFilterLabel(filterId)} filter`}
                >
                  {getFilterLabel(filterId)}
                  <X size={12} strokeWidth={2.8} aria-hidden="true" />
                </button>
              )}
              {query.trim() && (
                <button
                  type="button"
                  className="im-chip"
                  onClick={onClearQuery}
                  aria-label="Remove search term"
                >
                  “{query.trim()}”
                  <X size={12} strokeWidth={2.8} aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {products.length > 0 ? (
            <div className="im-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] || 0}
                  onAdd={onAdd}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  variant="grid"
                />
              ))}
            </div>
          ) : (
            <div className="im-empty">
              <span className="im-empty__icon" aria-hidden="true">
                <SearchX size={30} strokeWidth={1.8} />
              </span>
              <h3>No groceries match that search</h3>
              <p>Try a different product name, or clear the filters to browse the full store.</p>
              <button type="button" className="im-empty__btn" onClick={onClear}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
