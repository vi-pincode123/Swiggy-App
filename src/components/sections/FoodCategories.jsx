import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader.jsx'
import ScrollRow from '../ui/ScrollRow.jsx'
import { FOOD_CATEGORIES } from '../../data/homeData.js'
import './FoodCategories.css'

export default function FoodCategories() {
  return (
    <section className="section food-section" id="food-categories" aria-labelledby="food-title">
      <div className="container">
        <SectionHeader
          eyebrow="Cravings, sorted"
          title="Order our best food options"
          subtitle="Handpicked cuisines and dishes, loved by foodies around you."
          titleId="food-title"
        />

        <ScrollRow ariaLabel="Food categories">
          {FOOD_CATEGORIES.map((category) => (
            <article className="food-card" key={category.id}>
              <div className="food-card__image">
                <img src={category.image} alt={category.name} loading="lazy" />
                <span className="food-card__hover-icon" aria-hidden="true">
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </span>
              </div>
              <h3 className="food-card__name">{category.name}</h3>
              <p className="food-card__offer">{category.offer}</p>
            </article>
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
