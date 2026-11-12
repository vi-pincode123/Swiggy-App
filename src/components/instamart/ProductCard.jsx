import { Plus, Timer } from 'lucide-react'
import QuantityStepper from './QuantityStepper.jsx'
import { formatINR, getDiscount } from '../../data/groceryData.js'
import './ProductCard.css'

export default function ProductCard({
  product,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement,
  variant = 'rail',
}) {
  const discount = getDiscount(product)
  const inCart = quantity > 0

  return (
    <article className={`im-pcard im-pcard--${variant}`}>
      <div className="im-pcard__media">
        <img
          className={`im-pcard__img im-pcard__img--${product.imageFit}`}
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
        />
        {discount > 0 && <span className="im-pcard__off">{discount}% OFF</span>}
        {product.badge && <span className="im-pcard__badge">{product.badge}</span>}
      </div>

      <div className="im-pcard__body">
        <span className="im-pcard__eta">
          <Timer size={12} strokeWidth={2.5} aria-hidden="true" />
          7 mins
        </span>

        <h3 className="im-pcard__name">{product.name}</h3>
        <p className="im-pcard__qty">{product.quantity}</p>

        <div className="im-pcard__footer">
          <div className="im-pcard__pricing">
            <span className="im-pcard__price">{formatINR(product.price)}</span>
            <s className="im-pcard__mrp">{formatINR(product.mrp)}</s>
          </div>

          {inCart ? (
            <QuantityStepper
              quantity={quantity}
              name={product.name}
              onIncrement={() => onIncrement(product.id)}
              onDecrement={() => onDecrement(product.id)}
            />
          ) : (
            <button
              type="button"
              className="im-pcard__add"
              onClick={() => onAdd(product.id)}
              aria-label={`Add ${product.name} to cart`}
            >
              Add
              <Plus size={13} strokeWidth={3} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
