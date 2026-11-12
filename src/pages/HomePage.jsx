import { useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/sections/Hero.jsx'
import ServiceCards from '../components/sections/ServiceCards.jsx'
import FoodCategories from '../components/sections/FoodCategories.jsx'
import GroceryCategories from '../components/sections/GroceryCategories.jsx'
import DineoutRestaurants from '../components/sections/DineoutRestaurants.jsx'
import Cities from '../components/sections/Cities.jsx'
import AuthModal from '../components/ui/AuthModal.jsx'

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [presetLocation, setPresetLocation] = useState('')

  return (
    <div className="app">
      <Navbar user={user} onSignIn={() => setAuthOpen(true)} />

      <main id="main-content">
        <Hero presetLocation={presetLocation} />
        <ServiceCards />
        <FoodCategories />
        <GroceryCategories />
        <DineoutRestaurants />
        <Cities onCitySelect={setPresetLocation} />
      </main>

      <Footer />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(phone) => setUser({ phone })}
      />
    </div>
  )
}
