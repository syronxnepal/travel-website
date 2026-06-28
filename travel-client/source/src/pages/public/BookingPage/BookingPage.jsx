import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import { bookingsApi, stripeApi, toursApi, treksApi, shortToursApi } from '../../../services/api'
import { formatCurrency, getImageUrl } from '../../../utils/helpers'
import { useToast } from '../../../context/ToastContext'
import './BookingPage.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '', phone: '',
  dateOfBirth: '', nationality: '',
  emergencyContact: '', emergencyPhone: '',
  specialRequests: '',
  travelDate: '', numberOfPersons: 1,
  travelInsurance: false, privateGuide: false, privateTransport: false, mealUpgrade: false,
  paymentMethod: 'cash-after-delivery',
}

// Inner form that has access to Stripe hooks
function BookingForm({ item, bookingType, itemId, prefillDate, prefillPersons }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    travelDate: prefillDate || '',
    numberOfPersons: prefillPersons || 1,
  })
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const toast = useToast()
  const navigate = useNavigate()

  const basePrice = parseFloat(item?.price) || 0
  const addons =
    (form.travelInsurance ? 50 : 0) +
    (form.privateGuide ? 100 : 0) +
    (form.privateTransport ? 80 : 0) +
    (form.mealUpgrade ? 30 : 0)
  const totalPrice = (basePrice + addons) * form.numberOfPersons

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  }

  function nextStep(e) {
    e.preventDefault()
    setStep((s) => s + 1)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    const bookingPayload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      dateOfBirth: form.dateOfBirth || undefined,
      nationality: form.nationality || undefined,
      emergencyContact: form.emergencyContact || undefined,
      emergencyPhone: form.emergencyPhone || undefined,
      specialRequests: form.specialRequests || undefined,
      bookingType,
      itemId: Number(itemId),
      itemTitle: item?.title || '',
      itemLocation: item?.location || undefined,
      category: item?.category || undefined,
      travelDate: form.travelDate,
      numberOfPersons: Number(form.numberOfPersons),
      basePrice,
      totalPrice,
      paymentMethod: form.paymentMethod,
      travelInsurance: form.travelInsurance,
      privateGuide: form.privateGuide,
      privateTransport: form.privateTransport,
      mealUpgrade: form.mealUpgrade,
    }

    try {
      if (form.paymentMethod === 'stripe') {
        // 1. Create payment intent
        const intentRes = await stripeApi.createPaymentIntent({ amount: totalPrice, currency: 'usd' })
        const { clientSecret, paymentIntentId } = intentRes?.data || intentRes

        // 2. Confirm card payment
        if (!stripe || !elements) throw new Error('Stripe not loaded')
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: elements.getElement(CardElement) },
        })
        if (error) throw new Error(error.message)
        if (paymentIntent.status !== 'succeeded') throw new Error('Payment was not successful')

        // 3. Save booking with stripe payment intent ID
        await bookingsApi.create({ ...bookingPayload, stripePaymentIntentId: paymentIntentId })
        toast?.success?.('Payment successful! Booking confirmed.')
      } else {
        // Cash on delivery — just save the booking
        await bookingsApi.create(bookingPayload)
        toast?.success?.('Booking submitted! Our team will contact you to arrange payment.')
      }

      setConfirmed(true)
    } catch (err) {
      toast?.error?.(err.message || 'Booking failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmed) {
    return (
      <div className="booking-page__confirmed">
        <div className="booking-page__confirmed-inner">
          <i className="fa-solid fa-circle-check"></i>
          <h2>{form.paymentMethod === 'stripe' ? 'Payment Successful!' : 'Booking Submitted!'}</h2>
          <p>
            Thank you, <strong>{form.firstName}</strong>! Your booking for <strong>{item?.title}</strong> has been received.
          </p>
          {form.paymentMethod === 'cash-after-delivery' && (
            <p style={{ color: '#666', fontSize: 14 }}>
              Our team will contact you at <strong>{form.email}</strong> within 24 hours to confirm and arrange payment.
            </p>
          )}
          {form.paymentMethod === 'stripe' && (
            <p style={{ color: '#666', fontSize: 14 }}>
              A confirmation receipt has been sent to <strong>{form.email}</strong>.
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
            <button className="btn btn--primary" onClick={() => navigate('/')}>Back to Home</button>
            <button className="btn btn--outline" onClick={() => { setConfirmed(false); setStep(1); setForm(INITIAL_FORM) }}>New Booking</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page__form-wrap">
      {/* Steps indicator */}
      <div className="booking-page__steps">
        {['Personal Info', 'Trip & Payment', 'Confirm'].map((s, i) => (
          <div key={s} className={`booking-page__step${step === i + 1 ? ' active' : step > i + 1 ? ' done' : ''}`}>
            <span className="booking-page__step-num">
              {step > i + 1 ? <i className="fa-solid fa-check"></i> : i + 1}
            </span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {/* Step 1 — Personal Info */}
      {step === 1 && (
        <form onSubmit={nextStep} className="booking-page__step-content">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-field"><label>First Name *</label><input type="text" value={form.firstName} onChange={set('firstName')} required /></div>
            <div className="form-field"><label>Last Name *</label><input type="text" value={form.lastName} onChange={set('lastName')} required /></div>
          </div>
          <div className="form-row">
            <div className="form-field"><label>Email *</label><input type="email" value={form.email} onChange={set('email')} required /></div>
            <div className="form-field"><label>Phone *</label><input type="tel" value={form.phone} onChange={set('phone')} required /></div>
          </div>
          <div className="form-row">
            <div className="form-field"><label>Date of Birth</label><input type="date" value={form.dateOfBirth} onChange={set('dateOfBirth')} /></div>
            <div className="form-field"><label>Nationality</label><input type="text" placeholder="e.g. Australian" value={form.nationality} onChange={set('nationality')} /></div>
          </div>
          <div className="form-row">
            <div className="form-field"><label>Emergency Contact Name</label><input type="text" value={form.emergencyContact} onChange={set('emergencyContact')} /></div>
            <div className="form-field"><label>Emergency Contact Phone</label><input type="tel" value={form.emergencyPhone} onChange={set('emergencyPhone')} /></div>
          </div>
          <div className="form-field">
            <label>Special Requests</label>
            <textarea rows={3} value={form.specialRequests} onChange={set('specialRequests')} placeholder="Dietary requirements, medical conditions, etc." />
          </div>
          <button type="submit" className="btn btn--primary">
            Next: Trip Details <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
      )}

      {/* Step 2 — Trip Details + Payment Method */}
      {step === 2 && (
        <form onSubmit={nextStep} className="booking-page__step-content">
          <h3>Trip Details</h3>
          <div className="form-row">
            <div className="form-field">
              <label>Travel Date *</label>
              <input type="date" value={form.travelDate} onChange={set('travelDate')} required min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-field">
              <label>Number of Persons *</label>
              <input type="number" min="1" max="50" value={form.numberOfPersons} onChange={set('numberOfPersons')} required />
            </div>
          </div>

          <h4 className="booking-page__sub-heading">Add-on Options</h4>
          <div className="booking-page__addons">
            {[
              { key: 'travelInsurance', label: 'Travel Insurance', price: 50, desc: 'Covers trip cancellation and medical emergencies' },
              { key: 'privateGuide', label: 'Private Guide', price: 100, desc: 'Dedicated personal guide throughout your trip' },
              { key: 'privateTransport', label: 'Private Transport', price: 80, desc: 'Private vehicle for all transfers' },
              { key: 'mealUpgrade', label: 'Meal Upgrade', price: 30, desc: 'Premium meals throughout the trip' },
            ].map(({ key, label, price, desc }) => (
              <label key={key} className={`booking-page__addon${form[key] ? ' selected' : ''}`}>
                <input type="checkbox" checked={form[key]} onChange={set(key)} />
                <div>
                  <strong>{label} <span className="booking-page__addon-price">+{formatCurrency(price)}/person</span></strong>
                  <span>{desc}</span>
                </div>
              </label>
            ))}
          </div>

          <h4 className="booking-page__sub-heading">Payment Method</h4>
          <div className="booking-page__payment-methods">
            <label className={`booking-page__payment-opt${form.paymentMethod === 'cash-after-delivery' ? ' selected' : ''}`}>
              <input type="radio" name="paymentMethod" value="cash-after-delivery" checked={form.paymentMethod === 'cash-after-delivery'} onChange={set('paymentMethod')} />
              <div className="booking-page__payment-opt-icon"><i className="fa-solid fa-hand-holding-dollar"></i></div>
              <div>
                <strong>Cash on Delivery</strong>
                <span>Pay when our team confirms your booking</span>
              </div>
            </label>
            <label className={`booking-page__payment-opt${form.paymentMethod === 'stripe' ? ' selected' : ''}`}>
              <input type="radio" name="paymentMethod" value="stripe" checked={form.paymentMethod === 'stripe'} onChange={set('paymentMethod')} />
              <div className="booking-page__payment-opt-icon"><i className="fa-brands fa-stripe"></i></div>
              <div>
                <strong>Pay by Card (Stripe)</strong>
                <span>Secure online payment — instant confirmation</span>
              </div>
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button type="button" className="btn btn--outline" onClick={() => setStep(1)}>
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
            <button type="submit" className="btn btn--primary">
              Review Booking <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      )}

      {/* Step 3 — Review + Confirm / Pay */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="booking-page__step-content">
          <h3>Review &amp; Confirm</h3>

          <div className="booking-page__summary">
            <div className="booking-page__summary-row"><span>Name</span><strong>{form.firstName} {form.lastName}</strong></div>
            <div className="booking-page__summary-row"><span>Email</span><strong>{form.email}</strong></div>
            <div className="booking-page__summary-row"><span>Phone</span><strong>{form.phone}</strong></div>
            {form.nationality && <div className="booking-page__summary-row"><span>Nationality</span><strong>{form.nationality}</strong></div>}
            <div className="booking-page__summary-row"><span>Travel Date</span><strong>{new Date(form.travelDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
            <div className="booking-page__summary-row"><span>Persons</span><strong>{form.numberOfPersons}</strong></div>
            <div className="booking-page__summary-row"><span>Base Price</span><strong>{formatCurrency(basePrice)}/person</strong></div>
            {addons > 0 && <div className="booking-page__summary-row"><span>Add-ons</span><strong>+{formatCurrency(addons)}/person</strong></div>}
            <div className="booking-page__summary-row booking-page__summary-row--total">
              <span>Total</span><strong>{formatCurrency(totalPrice)}</strong>
            </div>
          </div>

          {/* Stripe card element */}
          {form.paymentMethod === 'stripe' && (
            <div className="booking-page__stripe-card">
              <label>Card Details</label>
              <div className="booking-page__card-element">
                <CardElement options={{ style: { base: { fontSize: '15px', color: '#333', '::placeholder': { color: '#aaa' } } } }} />
              </div>
              <p className="booking-page__stripe-note">
                <i className="fa-solid fa-lock"></i> Secured by Stripe. Your card details are never stored on our servers.
              </p>
            </div>
          )}

          {form.paymentMethod === 'cash-after-delivery' && (
            <div className="booking-page__payment-note">
              <i className="fa-solid fa-circle-info"></i>
              <div>
                <strong>Pay on Confirmation</strong>
                <p>Our team will contact you within 24 hours to confirm your booking and arrange payment.</p>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button type="button" className="btn btn--outline" onClick={() => setStep(2)}>
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting || (form.paymentMethod === 'stripe' && !stripe)}>
              {submitting
                ? (form.paymentMethod === 'stripe' ? 'Processing payment...' : 'Submitting...')
                : form.paymentMethod === 'stripe'
                  ? <><i className="fa-solid fa-lock"></i> Pay {formatCurrency(totalPrice)}</>
                  : <><i className="fa-solid fa-check"></i> Confirm Booking</>
              }
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

function BookingPage() {
  const { bookingType, itemId } = useParams()
  const [searchParams] = useSearchParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  const prefillDate = searchParams.get('date') || ''
  const prefillPersons = parseInt(searchParams.get('persons')) || 1

  useEffect(() => {
    const api = bookingType === 'trek' ? treksApi : bookingType === 'short-tour' ? shortToursApi : toursApi
    api.getById(itemId)
      .then((res) => setItem(res?.data || res))
      .catch(() => setItem(null))
      .finally(() => setLoading(false))
  }, [bookingType, itemId])

  const basePrice = parseFloat(item?.price) || 0

  if (loading) return <><Header /><div className="loading-spinner" style={{ marginTop: 200 }} /><Footer /></>

  if (!item) return (
    <>
      <Header />
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Item not found</h2>
        <Link to="/" className="btn btn--primary" style={{ marginTop: 16 }}>Go Home</Link>
      </div>
      <Footer />
    </>
  )

  return (
    <div className="booking-page">
      <Header />

      <div className="booking-page__hero">
        <div className="container">
          <div className="booking-page__breadcrumb">
            <Link to="/">Home</Link> /{' '}
            <Link to={`/${bookingType === 'trek' ? 'trekking' : bookingType === 'short-tour' ? 'short-tours' : 'tours'}`}>
              {bookingType === 'trek' ? 'Trekking' : bookingType === 'short-tour' ? 'Short Tours' : 'Tours'}
            </Link> / <span>Book: {item.title}</span>
          </div>
          <h1>Book Your Adventure</h1>
        </div>
      </div>

      <div className="container">
        <div className="booking-page__layout">
          <div className="booking-page__main">
            <Elements stripe={stripePromise}>
              <BookingForm item={item} bookingType={bookingType} itemId={itemId} prefillDate={prefillDate} prefillPersons={prefillPersons} />
            </Elements>
          </div>

          <aside className="booking-page__sidebar">
            <div className="booking-page__item-card">
              {item.image && (
                <img src={getImageUrl(item.image)} alt={item.title} className="booking-page__item-img" />
              )}
              <div className="booking-page__item-body">
                <h3>{item.title}</h3>
                {item.location && <p><i className="fa-solid fa-location-dot"></i> {item.location}</p>}
                {item.duration && <p><i className="fa-regular fa-clock"></i> {item.duration}</p>}
                {item.difficulty && <p><i className="fa-solid fa-signal"></i> {item.difficulty}</p>}
                <div className="booking-page__price-row">
                  <span>From</span>
                  <strong>{formatCurrency(basePrice)}/person</strong>
                </div>
              </div>
            </div>

            <div className="booking-page__help-card">
              <h4>Need Help?</h4>
              <a href="tel:+61000000000"><i className="fa-solid fa-phone"></i> +61 2 0000 0000</a>
              <a href="mailto:sales@traveladventurenepal.com.au"><i className="fa-solid fa-envelope"></i> Email Us</a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BookingPage
