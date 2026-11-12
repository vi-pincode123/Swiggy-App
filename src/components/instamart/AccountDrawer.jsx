import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Clock3,
  LogOut,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'
import Drawer from './Drawer.jsx'
import './AccountDrawer.css'

const DEMO_OTP = '1234'

function maskPhone(phone) {
  if (!phone) return ''
  return `+91 ${phone.slice(0, 2)}••••${phone.slice(-4)}`
}

export default function AccountDrawer({ open, onClose, user, onLogin, onLogout }) {
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const phoneInputRef = useRef(null)
  const otpInputRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setStep('phone')
    setPhone('')
    setOtp('')
    setError('')
    setNotice('')
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    if (step === 'otp') {
      const timer = window.setTimeout(() => otpInputRef.current?.focus(), 80)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [step, open])

  const submitPhone = (event) => {
    event.preventDefault()
    if (phone.length !== 10) {
      setError('Enter a valid 10-digit mobile number.')
      return
    }
    setError('')
    setNotice('')
    setStep('otp')
  }

  const submitOtp = (event) => {
    event.preventDefault()
    if (otp.length !== 4) {
      setError('Enter the 4-digit OTP.')
      return
    }
    if (otp !== DEMO_OTP) {
      setError('That OTP does not match. Use the demo OTP 1234.')
      return
    }
    setError('')
    onLogin(phone)
  }

  const editNumber = () => {
    setStep('phone')
    setOtp('')
    setError('')
    setNotice('')
    window.setTimeout(() => phoneInputRef.current?.focus(), 60)
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="My Account"
      titleId="im-account-title"
    >
      {user ? (
        <div className="im-account">
          <div className="im-account__profile">
            <span className="im-account__avatar" aria-hidden="true">
              <UserRound size={28} strokeWidth={1.9} />
            </span>
            <div>
              <p className="im-account__greeting">Welcome back</p>
              <h3 className="im-account__name">Foodie shopper</h3>
              <p className="im-account__profile-phone">{maskPhone(user)}</p>
            </div>
          </div>

          <div className="im-account__card">
            <p className="im-account__card-title">Your Instamart account</p>
            <ul className="im-account__perks">
              <li>
                <Clock3 size={16} strokeWidth={2.1} aria-hidden="true" />
                <span>
                  <strong>7-minute delivery</strong>
                  Express slots across your saved addresses.
                </span>
              </li>
              <li>
                <MapPin size={16} strokeWidth={2.1} aria-hidden="true" />
                <span>
                  <strong>Save delivery addresses</strong>
                  Keep home, work and family addresses handy.
                </span>
              </li>
              <li>
                <Sparkles size={16} strokeWidth={2.1} aria-hidden="true" />
                <span>
                  <strong>Member-only offers</strong>
                  Early access to festive deals and Maxx Savings.
                </span>
              </li>
            </ul>
          </div>

          <p className="im-account__demo-note">
            <ShieldCheck size={14} strokeWidth={2.2} aria-hidden="true" />
            This is a demo account. No real messages or payments are sent.
          </p>

          <button type="button" className="im-account__logout" onClick={onLogout}>
            <LogOut size={16} strokeWidth={2.2} aria-hidden="true" />
            Sign out
          </button>
        </div>
      ) : step === 'phone' ? (
        <div className="im-account">
          <div className="im-account__hero">
            <span className="im-account__hero-icon" aria-hidden="true">
              <UserRound size={26} strokeWidth={1.9} />
            </span>
            <h3>Log in to Foodie Instamart</h3>
            <p>Enter your mobile number to see your orders, addresses and saved cart.</p>
          </div>

          <form className="im-account__form" onSubmit={submitPhone} noValidate>
            <label className="im-account__label" htmlFor="im-account-phone">
              Mobile number
            </label>
            <div className={`im-account__phone${error ? ' has-error' : ''}`}>
              <span className="im-account__prefix">+91</span>
              <input
                id="im-account-phone"
                data-autofocus
                ref={phoneInputRef}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))
                  if (error) setError('')
                }}
                maxLength={10}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'im-account-error' : undefined}
              />
            </div>

            {error && (
              <p className="im-account__error" id="im-account-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="im-account__submit">
              Continue
              <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </form>

          <p className="im-account__demo">
            Demo login · any 10-digit number · OTP <strong>1234</strong>
          </p>

          <p className="im-account__terms">
            By continuing, you agree to Foodie&apos;s Terms &amp; Conditions and Privacy
            Policy.
          </p>
        </div>
      ) : (
        <div className="im-account">
          <button type="button" className="im-account__back" onClick={editNumber}>
            <ChevronLeft size={16} strokeWidth={2.4} aria-hidden="true" />
            Back
          </button>

          <div className="im-account__hero">
            <span className="im-account__hero-icon" aria-hidden="true">
              <ShieldCheck size={26} strokeWidth={1.9} />
            </span>
            <h3>Verify your number</h3>
            <p>
              We sent a 4-digit OTP to <strong>+91 {phone}</strong>.
            </p>
          </div>

          <form className="im-account__form" onSubmit={submitOtp} noValidate>
            <label className="im-account__label" htmlFor="im-account-otp">
              Enter OTP
            </label>
            <input
              id="im-account-otp"
              ref={otpInputRef}
              className={`im-account__otp${error ? ' has-error' : ''}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="0000"
              value={otp}
              onChange={(event) => {
                setOtp(event.target.value.replace(/\D/g, '').slice(0, 4))
                if (error) setError('')
              }}
              maxLength={4}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'im-account-error' : undefined}
            />

            {error && (
              <p className="im-account__error" id="im-account-error" role="alert">
                {error}
              </p>
            )}

            {notice && (
              <p className="im-account__notice" role="status">
                {notice}
              </p>
            )}

            <button type="submit" className="im-account__submit">
              <Check size={17} strokeWidth={2.6} aria-hidden="true" />
              Verify &amp; continue
            </button>
          </form>

          <div className="im-account__links">
            <button type="button" onClick={editNumber}>
              Change number
            </button>
            <button
              type="button"
              onClick={() => {
                setOtp('')
                setError('')
                setNotice('A fresh OTP has been sent to your mobile number.')
                otpInputRef.current?.focus()
              }}
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </Drawer>
  )
}
