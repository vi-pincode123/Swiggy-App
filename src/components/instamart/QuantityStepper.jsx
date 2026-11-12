import { Minus, Plus } from 'lucide-react'
import './QuantityStepper.css'

export default function QuantityStepper({ quantity, onIncrement, onDecrement, name }) {
  return (
    <div className="im-stepper">
      <button
        type="button"
        className="im-stepper__btn"
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${name}`}
      >
        <Minus size={14} strokeWidth={2.8} aria-hidden="true" />
      </button>
      <span className="im-stepper__value" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className="im-stepper__btn"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${name}`}
      >
        <Plus size={14} strokeWidth={2.8} aria-hidden="true" />
      </button>
    </div>
  )
}
