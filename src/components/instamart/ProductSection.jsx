import { ArrowRight } from 'lucide-react'
import ScrollRow from '../ui/ScrollRow.jsx'
import ProductCard from './ProductCard.jsx'
import './ProductSection.css'

export default function ProductSection({
  section,
  products,
  cart,
  onAdd,
  onIncrement,
  onDecrement,
  onSeeAll,
}) {
  if (products.length === 0) return null

  return (
    <section className="im-psection" aria-labelledby={`im-${section.id}-title`}>
      <div className="container">
        <div className="im-psection__head">
          <div>
            <p className="im-eyebrow">{section.eyebrow}</p>
            <h2 className="im-psection__title" id={`im-${section.id}-title`}>
              {section.title}
            </h2>
            <p className="im-psection__subtitle">{section.subtitle}</p>
          </div>

          <button
            type="button"
            className="im-psection__see-all"
            onClick={() => onSeeAll(section.filterId)}
          >
            See all
            <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <ScrollRow ariaLabel={`${section.title} products`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onAdd={onAdd}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
