import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ShieldCheck,
  X,
} from 'lucide-react'
import Logo from './Logo.jsx'
import './AuthModal.css'

const DEMO_OTP = '1234'

export default function AuthModal({ open, onClose, onSuccess }) {
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const dialogRef = useRef(null)
  const phoneInputRef = useRef(null)
  const otpInputRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setStep('phone')
    setPhone('')
    setOtp('')
    setError('')
    setNotice('')

    const focusTimer = window.setTimeout(() => phoneInputRef.current?.focus(), 90)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), a[href]',
      )

      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    if (step === 'otp') {
      const timer = window.setTimeout(() => otpInputRef.current?.focus(), 80)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [step, open])

  if (!open) return null

  const handlePhoneChange = (event) => {
    setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))
    if (error) setError('')
  }

  const handlePhoneSubmit = (event) => {
    event.preventDefault()

    if (phone.length !== 10) {
      setError('Enter a valid 10-digit mobile number.')
      return
    }

    setError('')
    setNotice('')
    setStep('otp')
  }

  const handleOtpSubmit = (event) => {
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
    setStep('success')
    onSuccess(phone)
  }

  const resendOtp = () => {
    setOtp('')
    setError('')
    setNotice('A fresh OTP has been sent to your mobile number.')
    otpInputRef.current?.focus()
  }

  const editNumber = () => {
    setStep('phone')
    setOtp('')
    setError('')
    setNotice('')
    window.setTimeout(() => phoneInputRef.current?.focus(), 60)
  }

  return (
    <div
      className="auth-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="auth-modal__dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <button className="auth-modal__close" type="button" onClick={onClose} aria-label="Close">
          <X size={19} strokeWidth={2.3} aria-hidden="true" />
        </button>

        <div className="auth-modal__brand">
          <Logo clickable={false} />
        </div>

        {step === 'phone' && (
          <>
            <h2 className="auth-modal__title" id="auth-title">
              Log in to Foodie
            </h2>
            <p className="auth-modal__text">
              Enter your mobile number to continue. We&apos;ll send you a one-time
              password.
            </p>

            <form className="auth-modal__form" onSubmit={handlePhoneSubmit} noValidate>
              <label className="auth-modal__label" htmlFor="auth-phone">
                Mobile number
              </label>
              <div className={`auth-phone${error ? ' has-error' : ''}`}>
                <span className="auth-phone__prefix">+91</span>
                <input
                  id="auth-phone"
                  ref={phoneInputRef}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'auth-error' : undefined}
                />
              </div>

              {error && (
                <p className="auth-modal__error" id="auth-error" role="alert">
                  {error}
                </p>
              )}

              <button className="auth-modal__submit" type="submit">
                Continue
                <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
              </button>
            </form>

            <p className="auth-modal__privacy">
              <ShieldCheck size={15} strokeWidth={2.2} aria-hidden="true" />
              Your number stays private and is only used to secure your account.
            </p>
            <p className="auth-modal__terms">
              By continuing, you agree to Foodie&apos;s Terms &amp; Conditions and
              Privacy Policy.
            </p>
          </>
        )}

        {step === 'otp' && (
          <>
            <button className="auth-modal__back" type="button" onClick={editNumber}>
              <ChevronLeft size={16} strokeWidth={2.4} aria-hidden="true" />
              Back
            </button>

            <h2 className="auth-modal__title" id="auth-title">
              Verify your number
            </h2>
            <p className="auth-modal__text">
              We sent a 4-digit OTP to <strong>+91 {phone}</strong>.
            </p>

            <span className="auth-modal__demo">
              Demo OTP: <strong>1234</strong>
            </span>

            <form className="auth-modal__form" onSubmit={handleOtpSubmit} noValidate>
              <label className="auth-modal__label" htmlFor="auth-otp">
                Enter OTP
              </label>
              <input
                id="auth-otp"
                ref={otpInputRef}
                className={`auth-otp${error ? ' has-error' : ''}`}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="••••"
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value.replace(/\D/g, '').slice(0, 4))
                  if (error) setError('')
                }}
                maxLength={4}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'auth-error' : undefined}
              />

              {error && (
                <p className="auth-modal__error" id="auth-error" role="alert">
                  {error}
                </p>
              )}

              {notice && (
                <p className="auth-modal__notice" role="status">
                  {notice}
                </p>
              )}

              <button className="auth-modal__submit" type="submit">
                <Check size={17} strokeWidth={2.6} aria-hidden="true" />
                Verify &amp; continue
              </button>
            </form>

            <div className="auth-modal__links">
              <button type="button" onClick={editNumber}>
                Change number
              </button>
              <button type="button" onClick={resendOtp}>
                Resend OTP
              </button>
            </div>
          </>
        )}

        {step === 'success' && (
          <div className="auth-modal__success">
            <span className="auth-modal__success-icon" aria-hidden="true">
              <CheckCircle2 size={42} strokeWidth={1.8} />
            </span>
            <h2 className="auth-modal__title" id="auth-title">
              You&apos;re all set!
            </h2>
            <p className="auth-modal__text">
              Welcome to Foodie. Your number +91 {phone} is now verified.
            </p>
            <button className="auth-modal__submit" type="button" onClick={onClose}>
              Start ordering
              <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
