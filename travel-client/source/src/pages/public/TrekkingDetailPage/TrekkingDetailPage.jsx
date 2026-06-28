import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import { treksApi } from '../../../services/api'
import { formatCurrency, getImageUrl } from '../../../utils/helpers'
import { useWishlist } from '../../../context/WishlistContext'
import '../TourDetailPage/TourDetailPage.css'

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="detail-accordion">
      <button className="detail-accordion__header" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`}></i>
      </button>
      {open && <div className="detail-accordion__body">{children}</div>}
    </div>
  )
}

function TrekkingDetailPage() {
  const { trekId } = useParams()
  const [trek, setTrek] = useState(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [persons, setPersons] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const { isInWishlist, toggleWishlist } = useWishlist()
  const navigate = useNavigate()

  useEffect(() => {
    treksApi.getById(trekId)
      .then((res) => setTrek(res?.data || res))
      .catch(() => setTrek(null))
      .finally(() => setLoading(false))
  }, [trekId])

  if (loading) return <><Header /><div className="loading-spinner" style={{ marginTop: 200 }} /><Footer /></>
  if (!trek) return <><Header /><div style={{ textAlign: 'center', padding: 100 }}>Trek not found.</div><Footer /></>

  const itemId = trek._id || trek.id
  const isWishlisted = isInWishlist(itemId, 'trek')
  const price = parseFloat(trek.price) || 0
  const originalPrice = trek.originalPrice ? parseFloat(trek.originalPrice) : null
  const total = price * persons
  const images = [trek.image, ...(trek.images || [])].filter(Boolean)

  return (
    <div className="detail-page">
      <Header />

      <div className="detail-page__hero">
        <div className="container">
          <div className="detail-page__breadcrumb">
            <Link to="/">Home</Link> / <Link to="/trekking">Trekking</Link> / <span>{trek.title}</span>
          </div>
          {trek.category && (
            <div className="detail-page__hero-badges">
              <span className="detail-badge detail-badge--orange">{trek.category}</span>
            </div>
          )}
          <h1 className="detail-page__title">{trek.title}</h1>
          {trek.location && <p className="detail-page__location"><i className="fa-solid fa-location-dot"></i> {trek.location}</p>}
          <div className="detail-page__hero-meta">
            {trek.duration && <span><i className="fa-regular fa-clock"></i> {trek.duration}</span>}
            {trek.difficulty && <span><i className="fa-solid fa-signal"></i> {trek.difficulty}</span>}
            {trek.altitude && <span><i className="fa-solid fa-mountain"></i> {trek.altitude}</span>}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="detail-page__layout">
          <div className="detail-page__main">
            {images.length > 0 && (
              <div className="detail-gallery">
                <img src={getImageUrl(images[activeImg])} alt={trek.title} className="detail-gallery__main" />
                {images.length > 1 && (
                  <div className="detail-gallery__thumbs">
                    {images.map((img, i) => (
                      <img key={i} src={getImageUrl(img)} alt="" className={`detail-gallery__thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {(trek.overview || trek.description) && (
              <div className="detail-section">
                <h2>Overview</h2>
                <div dangerouslySetInnerHTML={{ __html: trek.overview || trek.description }} />
              </div>
            )}

            {trek.included?.length > 0 && (
              <Accordion title={<><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-primary)' }}></i> What's Included</>} defaultOpen>
                <ul className="detail-list detail-list--check">
                  {trek.included.map((item, i) => <li key={i}><i className="fa-solid fa-check"></i> {item}</li>)}
                </ul>
              </Accordion>
            )}

            {trek.excluded?.length > 0 && (
              <Accordion title={<><i className="fa-solid fa-circle-xmark" style={{ color: '#e63329' }}></i> What's Not Included</>}>
                <ul className="detail-list detail-list--x">
                  {trek.excluded.map((item, i) => <li key={i}><i className="fa-solid fa-xmark"></i> {item}</li>)}
                </ul>
              </Accordion>
            )}

            {trek.highlights?.length > 0 && (
              <div className="detail-section">
                <h2>Highlights</h2>
                <ul className="detail-highlights">
                  {trek.highlights.map((h, i) => <li key={i}><i className="fa-solid fa-check"></i> {h}</li>)}
                </ul>
              </div>
            )}

            <div className="detail-section">
              <div className="detail-info-cards">
                {trek.groupSize && <div className="detail-info-card"><i className="fa-solid fa-users"></i><span>Group Size</span><strong>{trek.groupSize}</strong></div>}
                {trek.difficulty && <div className="detail-info-card"><i className="fa-solid fa-signal"></i><span>Difficulty</span><strong>{trek.difficulty}</strong></div>}
                {trek.duration && <div className="detail-info-card"><i className="fa-regular fa-clock"></i><span>Duration</span><strong>{trek.duration}</strong></div>}
                {trek.altitude && <div className="detail-info-card"><i className="fa-solid fa-mountain"></i><span>Max Altitude</span><strong>{trek.altitude}</strong></div>}
              </div>
            </div>

            {trek.itinerary?.length > 0 && (
              <div className="detail-section">
                <h2>Trek Itinerary</h2>
                {trek.itinerary.map((day, i) => (
                  <Accordion key={i} title={<><span className="detail-day-num">Day {day.day || i + 1}</span> {day.title}</>}>
                    <p>{day.description}</p>
                  </Accordion>
                ))}
              </div>
            )}

            {trek.faqs?.length > 0 && (
              <div className="detail-section">
                <h2>Frequently Asked Questions</h2>
                {trek.faqs.map((item, i) => (
                  <Accordion key={i} title={item.question}>
                    <p>{item.answer}</p>
                  </Accordion>
                ))}
              </div>
            )}

            <div className="detail-contact-cta">
              <h3>Ready for the Adventure?</h3>
              <p>Contact us anytime for personalised trekking assistance</p>
              <div className="detail-contact-cta__btns">
                <a href="tel:+61000000000" className="btn btn--primary"><i className="fa-solid fa-phone"></i> Call Us</a>
                <a href="mailto:sales@traveladventurenepal.com.au" className="btn btn--nav"><i className="fa-solid fa-envelope"></i> Email Us</a>
              </div>
            </div>
          </div>

          <aside className="detail-page__sidebar">
            <div className="detail-booking-card">
              {originalPrice && (
                <p className="detail-price-original">{formatCurrency(originalPrice)}</p>
              )}
              <p className="detail-price-current">{formatCurrency(price)}</p>
              <div className="detail-booking-card__price-row">
                <span className="detail-booking-card__from">per person</span>
              </div>

              <div className="form-field">
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="form-field">
                <label>Number of Persons</label>
                <div className="detail-booking-card__counter">
                  <button onClick={() => setPersons(Math.max(1, persons - 1))}>-</button>
                  <span>{persons}</span>
                  <button onClick={() => setPersons(persons + 1)}>+</button>
                </div>
              </div>

              <div className="detail-booking-card__total">
                <span>Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>

              <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                onClick={() => navigate(`/booking/trek/${itemId}`)}>
                Book This Trek
              </button>

              <button
                className={`detail-booking-card__wishlist${isWishlisted ? ' active' : ''}`}
                onClick={() => toggleWishlist({ id: itemId, type: 'trek', title: trek.title, image: trek.image, price: trek.price })}
              >
                <i className={`fa-${isWishlisted ? 'solid' : 'regular'} fa-heart`}></i>
                {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TrekkingDetailPage
