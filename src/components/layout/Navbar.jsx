import { useEffect, useState } from 'react'
import { LogIn, Menu, UserRound, X } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import { NAV_LINKS } from '../../data/homeData.js'
import './Navbar.css'

export default function Navbar({ user, onSignIn }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleSignIn = () => {
    closeMenu()
    onSignIn()
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header" id="top">
        <div className="container navbar">
          <Logo />

          <nav className="navbar__links" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.label} className="navbar__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            {user ? (
              <button className="user-chip" type="button" onClick={handleSignIn}>
                <span className="user-chip__avatar" aria-hidden="true">
                  <UserRound size={16} strokeWidth={2.2} />
                </span>
                <span>
                  Hi, Foodie
                  <small>+91 ••••• {user.phone.slice(-4)}</small>
                </span>
              </button>
            ) : (
              <button className="sign-in-btn" type="button" onClick={onSignIn}>
                <LogIn size={17} strokeWidth={2.2} aria-hidden="true" />
                Sign In
              </button>
            )}
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`navbar__backdrop${menuOpen ? ' is-visible' : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div
          id="mobile-menu"
          className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                className="mobile-menu__link"
                href={link.href}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="mobile-menu__signin"
            type="button"
            onClick={handleSignIn}
            tabIndex={menuOpen ? 0 : -1}
          >
            <LogIn size={18} aria-hidden="true" />
            {user ? 'View account' : 'Sign In'}
          </button>

          <p className="mobile-menu__note">Food delivery from 10,000+ restaurants.</p>
        </div>
      </header>
    </>
  )
}
