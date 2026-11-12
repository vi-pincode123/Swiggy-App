import SectionHeader from '../ui/SectionHeader.jsx'
import ScrollRow from '../ui/ScrollRow.jsx'
import RestaurantCard from './RestaurantCard.jsx'
import { POPULAR_RESTAURANTS } from '../../data/restaurantData.js'
import './PopularRestaurants.css'

export default function PopularRestaurants() {
  return (
    <section className="popular-section" aria-labelledby="popular-title">
      <div className="container">
        <SectionHeader
          eyebrow="Most loved"
          title="Popular restaurants"
          subtitle="High ratings, great offers and the dishes foodies keep coming back for."
          titleId="popular-title"
          action={<a href="#restaurants-near-you">Browse all</a>}
        />

        <ScrollRow ariaLabel="Popular restaurants near you">
          {POPULAR_RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} variant="popular" />
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
