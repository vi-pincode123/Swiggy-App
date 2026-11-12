import {
  Download,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Play,
  Smartphone,
  Twitter,
  Youtube,
} from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import { FOOTER_COLUMNS } from '../../data/homeData.js'
import './Footer.css'

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/' },
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/' },
  { label: 'X (Twitter)', icon: Twitter, href: 'https://x.com/' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/' },
  { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/' },
]

const APP_LINKS = [
  {
    label: 'Google Play',
    caption: 'GET IT ON',
    icon: Play,
    href: 'https://play.google.com/store',
  },
  {
    label: 'App Store',
    caption: 'DOWNLOAD ON',
    icon: Smartphone,
    href: 'https://www.apple.com/app-store/',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" id="footer">
      <div className="footer__glow" aria-hidden="true" />

      <h2 className="sr-only">Foodie company information and links</h2>

      <div className="container footer__top">
        <div className="footer__brand">
          <Logo theme="light" />

          <p className="footer__tagline">
            Food, groceries and great restaurants — all in one place. Delivered with
            love across India.
          </p>

          <div className="footer__contact">
            <a href="mailto:hello@foodie.in">
              <Mail size={14} strokeWidth={2.2} aria-hidden="true" />
              hello@foodie.in
            </a>
            <span>
              <MapPin size={14} strokeWidth={2.2} aria-hidden="true" />
              Bengaluru, Karnataka
            </span>
          </div>

          <nav aria-label="Foodie on social media">
            <ul className="footer__social">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Foodie on ${social.label}`}
                    >
                      <Icon size={17} strokeWidth={2} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="footer__columns">
          {FOOTER_COLUMNS.map((column) => (
            <div className="footer__column" id={column.id} key={column.id}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__column footer__column--app" id="get-the-app">
            <h3>Get the App</h3>
            <p className="footer__app-note">Order on the go. Track in real time.</p>
            <div className="footer__app-links">
              {APP_LINKS.map((app) => {
                const Icon = app.icon
                return (
                  <a
                    className="footer__app-btn"
                    href={app.href}
                    target="_blank"
                    rel="noreferrer"
                    key={app.label}
                  >
                    <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                    <span>
                      <small>{app.caption}</small>
                      <strong>{app.label}</strong>
                    </span>
                  </a>
                )
              })}
            </div>
            <a
              className="footer__app-link"
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={13} strokeWidth={2.3} aria-hidden="true" />
              Download the Foodie app
            </a>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} Foodie Technologies Pvt. Ltd. All rights reserved.</p>

        <div className="footer__bottom-links">
          <a href="#legal">Terms &amp; Conditions</a>
          <a href="#legal">Privacy Policy</a>
          <a href="#legal">Cookies</a>
          <span className="footer__made">Made with care in India 🇮🇳</span>
        </div>
      </div>
    </footer>
  )
}
