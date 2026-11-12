import { Clock3 } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader.jsx'
import ScrollRow from '../ui/ScrollRow.jsx'
import { GROCERY_CATEGORIES } from '../../data/homeData.js'
import './GroceryCategories.css'

export default function GroceryCategories() {
  return (
    <section className="section grocery-section" id="groceries" aria-labelledby="grocery-title">
      <div className="container">
        <SectionHeader
          eyebrow="Fresh in minutes"
          title="Shop groceries for your home"
          subtitle="Everyday essentials, fresh produce and pantry staples — delivered in 10 minutes."
          titleId="grocery-title"
        />

        <ScrollRow ariaLabel="Grocery categories">
          {GROCERY_CATEGORIES.map((category) => (
            <article className="grocery-card" key={category.id}>
              <div className="grocery-card__media">
                <img src={category.image} alt={category.name} loading="lazy" />
                <span className="grocery-card__time">
                  <Clock3 size={11} strokeWidth={2.6} aria-hidden="true" />
                  10 min
                </span>
              </div>
              <div className="grocery-card__body">
                <h3 className="grocery-card__name">{category.name}</h3>
                <p className="grocery-card__offer">{category.offer}</p>
              </div>
            </article>
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
