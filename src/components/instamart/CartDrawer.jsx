import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBasket,
  Timer,
  Trash2,
} from 'lucide-react'
import Drawer from './Drawer.jsx'
import QuantityStepper from './QuantityStepper.jsx'
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  formatINR,
} from '../../data/groceryData.js'
import './CartDrawer.css'

export default function CartDrawer({
  open,
  onClose,
  items,
  cartCount,
  onIncrement,
  onDecrement,
  onRemove,
  onBrowse,
}) {
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!open) setNotice('')
  }, [open])

  const mrpTotal = items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const savings = mrpTotal - subtotal
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100))

  const footer =
    items.length > 0 ? (
      <>
        <div className="im-cart__total-row">
          <div>
            <span className="im-cart__total-label">To pay</span>
            <span className="im-cart__total-value">{formatINR(total)}</span>
          </div>
          <span className="im-cart__save-pill">Saved {formatINR(savings)}</span>
        </div>

        {notice && (
          <p className="im-cart__notice" role="status">
            {notice}
          </p>
        )}

        <button
          type="button"
          className="im-cart__checkout"
          onClick={() => setNotice('This is a demo store — checkout and payments are not connected.')}
        >
          Proceed to pay
          <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </>
    ) : null

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`My Cart (${cartCount})`}
      titleId="im-cart-title"
      footer={footer}
    >
      {items.length === 0 ? (
        <div className="im-cart__empty">
          <span className="im-cart__empty-icon" aria-hidden="true">
            <ShoppingBasket size={32} strokeWidth={1.7} />
          </span>
          <h3>Your cart is empty</h3>
          <p>Fresh produce, daily essentials and snacks are just a few taps away.</p>
          <button type="button" className="im-cart__browse" onClick={onBrowse}>
            Browse groceries
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <>
          <div className="im-cart__delivery">
            <span>
              <Timer size={15} strokeWidth={2.5} aria-hidden="true" />
              Delivery in 7 minutes
            </span>
            <span className="im-cart__delivery-tag">Express</span>
          </div>

          {remaining > 0 ? (
            <div className="im-cart__progress-wrap">
              <p>
                Add <strong>{formatINR(remaining)}</strong> more for free delivery
              </p>
              <span className="im-cart__progress" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </span>
            </div>
          ) : (
            <p className="im-cart__free-delivery">
              <ShieldCheck size={15} strokeWidth={2.3} aria-hidden="true" />
              You&apos;ve unlocked free delivery on this order.
            </p>
          )}

          <ul className="im-cart__list">
            {items.map(({ product, quantity }) => (
              <li className="im-cart-item" key={product.id}>
                <img
                  className="im-cart-item__img"
                  src={product.image}
                  alt={product.imageAlt}
                  loading="lazy"
                />

                <div className="im-cart-item__info">
                  <h3 className="im-cart-item__name">{product.name}</h3>
                  <p className="im-cart-item__qty">{product.quantity}</p>
                  <p className="im-cart-item__price">
                    {formatINR(product.price * quantity)}
                    <s>{formatINR(product.mrp * quantity)}</s>
                  </p>
                </div>

                <div className="im-cart-item__actions">
                  <button
                    type="button"
                    className="im-cart-item__remove"
                    onClick={() => onRemove(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <Trash2 size={15} strokeWidth={2.1} aria-hidden="true" />
                  </button>

                  <QuantityStepper
                    quantity={quantity}
                    name={product.name}
                    onIncrement={() => onIncrement(product.id)}
                    onDecrement={() => onDecrement(product.id)}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="im-cart__bill">
            <h3>Bill details</h3>
            <dl>
              <div>
                <dt>Item total (MRP)</dt>
                <dd>{formatINR(mrpTotal)}</dd>
              </div>
              <div className="is-saving">
                <dt>Product discount</dt>
                <dd>− {formatINR(savings)}</dd>
              </div>
              <div>
                <dt>Subtotal</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div>
                <dt>
                  Delivery fee
                  <span className="im-cart__bill-tag">7 mins</span>
                </dt>
                <dd>{deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}</dd>
              </div>
              <div className="im-cart__bill-total">
                <dt>To pay</dt>
                <dd>{formatINR(total)}</dd>
              </div>
            </dl>
          </div>

          <p className="im-cart__secure">
            <ShieldCheck size={14} strokeWidth={2.3} aria-hidden="true" />
            No-contact delivery · Easy replacement on damaged items
          </p>
        </>
      )}
    </Drawer>
  )
}
