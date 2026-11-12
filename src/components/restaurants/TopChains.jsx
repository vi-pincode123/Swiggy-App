import SectionHeader from '../ui/SectionHeader.jsx'
import ScrollRow from '../ui/ScrollRow.jsx'
import RestaurantCard from './RestaurantCard.jsx'
import { TOP_CHAINS } from '../../data/restaurantData.js'
import './TopChains.css'

export default function TopChains() {
  return (
    <section className="chain-section" aria-labelledby="chains-title">
      <div className="container">
        <SectionHeader
          eyebrow="Trusted favourites"
          title="Top restaurant chains near you"
          subtitle="The brands everyone is ordering from, all in one place."
          titleId="chains-title"
          action={<a href="#restaurants-near-you">See all restaurants</a>}
        />

        <ScrollRow ariaLabel="Top restaurant chains near you">
          {TOP_CHAINS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} variant="chain" />
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
