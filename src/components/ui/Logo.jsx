import { Link } from 'react-router-dom'
import { UtensilsCrossed } from 'lucide-react'
import './Logo.css'

export default function Logo({ theme = 'dark', clickable = true }) {
  const content = (
    <>
      <span className="logo__mark" aria-hidden="true">
        <UtensilsCrossed size={20} strokeWidth={2.4} />
      </span>
      <span className="logo__text">
        Foodie<span className="logo__dot">.</span>
      </span>
    </>
  )

  if (!clickable) {
    return <span className={`logo logo--${theme}`}>{content}</span>
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <Link
      className={`logo logo--${theme}`}
      to="/"
      aria-label="Foodie — go to homepage"
      onClick={scrollToTop}
    >
      {content}
    </Link>
  )
}
