import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  ShoppingBasket,
  Tag,
  Timer,
} from 'lucide-react'
import './ServiceCards.css'

const SERVICES = [
  {
    id: 'food-delivery',
    tone: 'orange',
    icon: Bike,
    eyebrow: 'Hungry?',
    title: 'Food Delivery',
    description:
      'From local favourites to late-night cravings, order from 10,000+ restaurants near you.',
    features: ['30 min average delivery', 'Live order tracking'],
    offer: 'FLAT ₹125 OFF',
    time: '30 min',
    cta: 'Order food',
    href: '/restaurants',
    image: '/images/hero-main.jpg',
    imageAlt: 'A spread of freshly prepared dishes from Foodie restaurants',
  },
  {
    id: 'instant-grocery',
    tone: 'green',
    icon: ShoppingBasket,
    eyebrow: 'Running low?',
    title: 'Instant Grocery',
    description:
      'Fresh produce, dairy, snacks and everyday essentials delivered in minutes, not hours.',
    features: ['Delivery in 10 minutes', 'Freshness guaranteed'],
    offer: 'FREE DELIVERY',
    time: '10 min',
    cta: 'Shop groceries',
    href: '/instamart',
    image: '/images/hero-grocery.jpg',
    imageAlt: 'Fresh vegetables and groceries ready for delivery',
  },
]

export default function ServiceCards() {
  return (
    <section className="section service-section" aria-labelledby="services-title">
      <h2 className="sr-only" id="services-title">
        What would you like to order today?
      </h2>

      <div className="container service-grid">
        {SERVICES.map((service) => {
          const Icon = service.icon
          const isRoute = service.href.startsWith('/')
          const Card = isRoute ? Link : 'article'
          const cardProps = isRoute
            ? { to: service.href, 'aria-label': `${service.title} — ${service.cta}` }
            : {}

          return (
            <Card
              className={`service-card service-card--${service.tone}`}
              key={service.id}
              {...cardProps}
            >
              <div className="service-card__content">
                <div className="service-card__topline">
                  <span className="service-card__eyebrow">
                    <Icon size={14} strokeWidth={2.4} aria-hidden="true" />
                    {service.eyebrow}
                  </span>
                  <span className="service-card__offer">
                    <Tag size={12} strokeWidth={2.4} aria-hidden="true" />
                    {service.offer}
                  </span>
                </div>

                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>

                <ul className="service-card__features">
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={15} strokeWidth={2.4} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isRoute ? (
                  <span className="service-card__cta">
                    {service.cta}
                    <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                  </span>
                ) : (
                  <a className="service-card__cta" href={service.href}>
                    {service.cta}
                    <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                  </a>
                )}
              </div>

              <figure className="service-card__media">
                <img src={service.image} alt={service.imageAlt} loading="lazy" />
                <figcaption className="service-card__time">
                  <Timer size={13} strokeWidth={2.4} aria-hidden="true" />
                  {service.time}
                </figcaption>
              </figure>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
