import { Check } from 'lucide-react'
import ScrollRow from '../ui/ScrollRow.jsx'
import { GROCERY_CATEGORIES } from '../../data/groceryData.js'
import './CategoryRail.css'

export default function CategoryRail({ activeFilter, onSelect }) {
  return (
    <section className="im-cats" id="im-categories" aria-labelledby="im-cats-title">
      <div className="container">
        <div className="im-cats__head">
          <div>
            <p className="im-eyebrow">Shop by category</p>
            <h2 className="im-cats__title" id="im-cats-title">
              Groceries for every corner of your home
            </h2>
          </div>
          <p className="im-cats__hint">Tap a category to jump straight to the aisle.</p>
        </div>

        <ScrollRow ariaLabel="Grocery categories">
          {GROCERY_CATEGORIES.map((category) => {
            const isActive = activeFilter === category.id
            return (
              <button
                key={category.id}
                type="button"
                className={`im-cat${isActive ? ' is-active' : ''}`}
                onClick={() => onSelect(category.id)}
                aria-pressed={isActive}
              >
                <span
                  className="im-cat__media"
                  style={{ backgroundColor: category.tint }}
                >
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    className={`im-cat__img im-cat__img--${category.imageFit}`}
                  />
                  {isActive && (
                    <span className="im-cat__check" aria-hidden="true">
                      <Check size={13} strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className="im-cat__name">{category.name}</span>
                <span className="im-cat__offer">{category.offer}</span>
              </button>
            )
          })}
        </ScrollRow>
      </div>
    </section>
  )
}
