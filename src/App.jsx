import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ui/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import RestaurantsPage from './pages/RestaurantsPage.jsx'
import RestaurantDetailPage from './pages/RestaurantDetailPage.jsx'
import InstamartPage from './pages/InstamartPage.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantDetailPage />} />
        <Route path="/instamart" element={<InstamartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
