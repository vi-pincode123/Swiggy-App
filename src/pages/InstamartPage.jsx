import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Leaf, RefreshCw, Tag, Timer } from 'lucide-react'
import InstamartNavbar from '../components/instamart/InstamartNavbar.jsx'
import PromoCarousel from '../components/instamart/PromoCarousel.jsx'
import CategoryRail from '../components/instamart/CategoryRail.jsx'
import ProductSection from '../components/instamart/ProductSection.jsx'
import GroceryCatalog from '../components/instamart/GroceryCatalog.jsx'
import CartDrawer from '../components/instamart/CartDrawer.jsx'
import AccountDrawer from '../components/instamart/AccountDrawer.jsx'
import Footer from '../components/layout/Footer.jsx'
import {
  GROCERY_PRODUCTS,
  PRODUCT_SECTIONS,
  PROMO_BANNERS,
  getProduct,
  matchesFilter,
  searchProducts,
  sortProducts,
} from '../data/groceryData.js'
import './InstamartPage.css'

const CART_KEY = 'foodie.instamart.cart'
const USER_KEY = 'foodie.instamart.user'
const LOCATION_KEY = 'foodie.instamart.location'
const MAX_QUANTITY = 20

const CURATED_SECTIONS = PRODUCT_SECTIONS.map((section) => ({
  section,
  products: section.productIds.map(getProduct).filter(Boolean),
}))

const PERKS = [
  {
    icon: Timer,
    title: '7-minute delivery',
    text: 'From a dark store near you',
  },
  {
    icon: Leaf,
    title: 'Farm-fresh quality',
    text: 'Produce packed the same day',
  },
  {
    icon: Tag,
    title: 'Best prices daily',
    text: 'Up to 60% off essentials',
  },
  {
    icon: RefreshCw,
    title: 'Easy replacements',
    text: 'No-fuss help on every order',
  },
]

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* Storage can be unavailable in private mode - the cart still works in memory. */
  }
}

function loadCart() {
  const stored = readStorage(CART_KEY, {})
  if (!stored || typeof stored !== 'object') return {}

  return Object.entries(stored).reduce((clean, [id, quantity]) => {
    if (getProduct(id) && Number.isInteger(quantity) && quantity > 0) {
      clean[id] = Math.min(quantity, MAX_QUANTITY)
    }
    return clean
  }, {})
}

export default function InstamartPage() {
  const [location, setLocation] = useState(() => {
    const stored = readStorage(LOCATION_KEY, null)
    return typeof stored === 'string' && stored ? stored : 'Kochi, Kerala'
  })
  const [user, setUser] = useState(() => {
    const stored = readStorage(USER_KEY, null)
    return typeof stored === 'string' && stored ? stored : null
  })
  const [cart, setCart] = useState(loadCart)
  const [query, setQuery] = useState('')
  const [filterId, setFilterId] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [cartOpen, setCartOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Instamart - Groceries delivered in 7 minutes | Foodie'
    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    writeStorage(CART_KEY, cart)
  }, [cart])

  useEffect(() => {
    writeStorage(USER_KEY, user)
  }, [user])

  useEffect(() => {
    writeStorage(LOCATION_KEY, location)
  }, [location])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => ({ product: getProduct(id), quantity }))
        .filter((item) => item.product),
    [cart],
  )

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const results = useMemo(() => {
    const inFilter = GROCERY_PRODUCTS.filter((product) => matchesFilter(product, filterId))
    return sortProducts(searchProducts(inFilter, query), sortBy)
  }, [filterId, query, sortBy])

  const hasActiveFilters = Boolean(query.trim() || filterId)

  const scrollTo = (id) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      })
    })
  }

  const addToCart = (id) => {
    const product = getProduct(id)
    if (!product) return

    setCart((current) => ({
      ...current,
      [id]: Math.min((current[id] || 0) + 1, MAX_QUANTITY),
    }))
    setToast(`${product.name} added to cart`)
  }

  const incrementItem = (id) => {
    if (!getProduct(id)) return
    setCart((current) => ({
      ...current,
      [id]: Math.min((current[id] || 0) + 1, MAX_QUANTITY),
    }))
  }

  const decrementItem = (id) => {
    setCart((current) => {
      const quantity = current[id] || 0
      if (quantity <= 0) return current

      const next = { ...current }
      if (quantity <= 1) delete next[id]
      else next[id] = quantity - 1
      return next
    })
  }

  const removeItem = (id) => {
    setCart((current) => {
      if (!current[id]) return current
      const next = { ...current }
      delete next[id]
      return next
    })
  }

  const selectCategory = (id) => {
    setFilterId((current) => (current === id ? '' : id))
    scrollTo('im-catalog')
  }

  const shopBanner = (id) => {
    setFilterId(id)
    scrollTo('im-catalog')
  }

  const clearFilters = () => {
    setQuery('')
    setFilterId('')
    setSortBy('popularity')
  }

  const openCart = () => {
    setAccountOpen(false)
    setCartOpen(true)
  }

  const openAccount = () => {
    setCartOpen(false)
    setAccountOpen(true)
  }

  const browseGroceries = () => {
    setCartOpen(false)
    scrollTo('im-catalog')
  }

  const handleLogin = (phone) => {
    setUser(phone)
    setToast(`Logged in as +91 ${phone}`)
  }

  const handleLogout = () => {
    setUser(null)
    setToast('You have been signed out')
  }

  return (
    <div className="im-page">
      <a className="im-skip-link" href="#im-main">
        Skip to groceries
      </a>

      <InstamartNavbar
        query={query}
        onQueryChange={setQuery}
        onSearchSubmit={() => scrollTo('im-catalog')}
        location={location}
        onLocationChange={setLocation}
        cartCount={cartCount}
        onCartOpen={openCart}
        onAccountOpen={openAccount}
        isLoggedIn={Boolean(user)}
      />

      <main id="im-main">
        <h1 className="sr-only">
          Foodie Instamart - groceries, fresh produce and daily essentials delivered in 7
          minutes
        </h1>

        <PromoCarousel
          banners={PROMO_BANNERS}
          onShop={shopBanner}
          onExplore={() => scrollTo('im-categories')}
        />

        <section className="im-perks" aria-label="Why shop with Foodie Instamart">
          <div className="container">
            <ul className="im-perks__grid">
              {PERKS.map((perk) => {
                const Icon = perk.icon
                return (
                  <li className="im-perk" key={perk.title}>
                    <span className="im-perk__icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={2.1} />
                    </span>
                    <div>
                      <p className="im-perk__title">{perk.title}</p>
                      <p className="im-perk__text">{perk.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <CategoryRail activeFilter={filterId} onSelect={selectCategory} />

        {!hasActiveFilters &&
          CURATED_SECTIONS.map(({ section, products }) => (
            <ProductSection
              key={section.id}
              section={section}
              products={products}
              cart={cart}
              onAdd={addToCart}
              onIncrement={incrementItem}
              onDecrement={decrementItem}
              onSeeAll={shopBanner}
            />
          ))}

        <GroceryCatalog
          products={results}
          query={query}
          filterId={filterId}
          sortBy={sortBy}
          cart={cart}
          onFilterChange={setFilterId}
          onSortChange={setSortBy}
          onClear={clearFilters}
          onClearQuery={() => setQuery('')}
          onAdd={addToCart}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
        />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        cartCount={cartCount}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
        onBrowse={browseGroceries}
      />

      <AccountDrawer
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {toast && (
        <div className="im-toast" role="status">
          <CheckCircle2 size={17} strokeWidth={2.4} aria-hidden="true" />
          {toast}
        </div>
      )}
    </div>
  )
}
