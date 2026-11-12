import { Check } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader.jsx'
import ScrollRow from '../ui/ScrollRow.jsx'
import { RESTAURANT_CATEGORIES } from '../../data/restaurantData.js'
import './CategoryCarousel.css'

export default function CategoryCarousel({ activeCategory, onSelect }) {
  return (
    <section className="craving-section" aria-labelledby="craving-title">
      <div className="container">
        <SectionHeader
          eyebrow="Cravings, sorted"
          title="What are you craving today?"
          subtitle="Pick a category to instantly filter the restaurants near you."
          titleId="craving-title"
          action={
            activeCategory ? (
              <button className="craving-clear" type="button" onClick={() => onSelect(null)}>
                Showing {activeCategory}
                <span aria-hidden="true">×</span>
              </button>
            ) : null
          }
        />

        <ScrollRow ariaLabel="Food categories available near you">
          {RESTAURANT_CATEGORIES.map((category) => {
            const active = activeCategory === category.name

            return (
              <button
                key={category.id}
                type="button"
                className={`craving-card${active ? ' is-active' : ''}`}
                aria-pressed={active}
                aria-label={`${category.name} restaurants`}
                onClick={() => onSelect(category.name)}
              >
                <span className="craving-card__image">
                  <img src={category.image} alt={`${category.name} dishes`} />
                  <span className="craving-card__check" aria-hidden="true">
                    <Check size={12} strokeWidth={3} />
                  </span>
                </span>
                <span className="craving-card__name">{category.name}</span>
              </button>
            )
          })}
        </ScrollRow>
      </div>
    </section>
  )
}
