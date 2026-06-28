import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import { shortToursApi } from '../../../services/api'
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

function ShortTourDetailPage() {
  const { shortTourId, tourId } = useParams()
  const resolvedId = shortTourId || tourId
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [persons, setPersons] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const { isInWishlist, toggleWishlist } = useWishlist()
  const navigate = useNavigate()

  useEffect(() => {
    shortToursApi.getById(resolvedId)
      .then((res) => setTour(res?.data || res))
      .catch(() => setTour(null))
      .finally(() => setLoading(false))
  }, [shortTourId])

  if (loading) return <><Header /><div className="loading-spinner" style={{ marginTop: 200 }} /><Footer /></>
  if (!tour) return <><Header /><div style={{ textAlign: 'center', padding: 100 }}>Short tour not found.</div><Footer /></>

  const itemId = tour._id || tour.id
  const isWishlisted = isInWishlist(itemId, 'short-tour')
  const price = parseFloat(tour.price) || 0
  const total = price * persons
  const images = [tour.image, ...(tour.images || [])].filter(Boolean)

  return (
    <div className="detail-page">
      <Header />

      <div className="detail-page__hero">
        <div className="container">
          <div className="detail-page__breadcrumb">
            <Link to="/">Home</Link> / <Link to="/short-tours">Short Tours</Link> / <span>{tour.title}</span>
          </div>
          {tour.category && (
            <div className="detail-page__hero-badges">
              <span className="detail-badge detail-badge--orange">{tour.category}</span>
            </div>
          )}
          <h1 className="detail-page__title">{tour.title}</h1>
          {tour.location && <p className="detail-page__location"><i className="fa-solid fa-location-dot"></i> {tour.location}</p>}
          <div className="detail-page__hero-meta">
            {tour.duration && <span><i className="fa-regular fa-clock"></i> {tour.duration}</span>}
            {tour.difficulty && <span><i className="fa-solid fa-signal"></i> {tour.difficulty}</span>}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="detail-page__layout">
          <div className="detail-page__main">
            {images.length > 0 && (
              <div className="detail-gallery">
                <img src={getImageUrl(images[activeImg])} alt={tour.title} className="detail-gallery__main" />
                {images.length > 1 && (
                  <div className="detail-gallery__thumbs">
                    {images.map((img, i) => (
                      <img key={i} src={getImageUrl(img)} alt="" className={`detail-gallery__thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {(tour.overview || tour.description) && (
              <div className="detail-section">
                <h2>Overview</h2>
                <div dangerouslySetInnerHTML={{ __html: tour.overview || tour.description }} />
              </div>
            )}

            {tour.included?.length > 0 && (
              <Accordion title={<><i className="fa-solid fa-circle-check" style={{ color: 'var(--color-primary)' }}></i> What's Included</>} defaultOpen>
                <ul className="detail-list detail-list--check">
                  {tour.included.map((item, i) => <li key={i}><i className="fa-solid fa-check"></i> {item}</li>)}
                </ul>
              </Accordion>
            )}

            {tour.excluded?.length > 0 && (
              <Accordion title={<><i className="fa-solid fa-circle-xmark" style={{ color: '#e63329' }}></i> What's Not Included</>}>
                <ul className="detail-list detail-list--x">
                  {tour.excluded.map((item, i) => <li key={i}><i className="fa-solid fa-xmark"></i> {item}</li>)}
                </ul>
              </Accordion>
            )}

            {tour.highlights?.length > 0 && (
              <div className="detail-section">
                <h2>Highlights</h2>
                <ul className="detail-highlights">
                  {tour.highlights.map((h, i) => <li key={i}><i className="fa-solid fa-check"></i> {h}</li>)}
                </ul>
              </div>
            )}

            <div className="detail-section">
              <div className="detail-info-cards">
                {tour.groupSize && <div className="detail-info-card"><i className="fa-solid fa-users"></i><span>Group Size</span><strong>{tour.groupSize}</strong></div>}
                {tour.difficulty && <div className="detail-info-card"><i className="fa-solid fa-signal"></i><span>Difficulty</span><strong>{tour.difficulty}</strong></div>}
                {tour.duration && <div className="detail-info-card"><i className="fa-regular fa-clock"></i><span>Duration</span><strong>{tour.duration}</strong></div>}
                {tour.bestSeason && <div className="detail-info-card"><i className="fa-solid fa-sun"></i><span>Best Time</span><strong>{tour.bestSeason}</strong></div>}
              </div>
            </div>

            {tour.itinerary?.length > 0 && (
              <div className="detail-section">
                <h2>Tour Schedule</h2>
                {tour.itinerary.map((day, i) => (
                  <Accordion key={i} title={<><span className="detail-day-num">Day {day.day || i + 1}</span> {day.title}</>}>
                    <p>{day.description}</p>
                  </Accordion>
                ))}
              </div>
            )}

            {tour.faqs?.length > 0 && (
              <div className="detail-section">
                <h2>Frequently Asked Questions</h2>
                {tour.faqs.map((item, i) => (
                  <Accordion key={i} title={item.question}>
                    <p>{item.answer}</p>
                  </Accordion>
                ))}
              </div>
            )}

            <div className="detail-contact-cta">
              <h3>Book Your Quick Escape</h3>
              <p>Contact us for personalised short tour recommendations</p>
              <div className="detail-contact-cta__btns">
                <a href="tel:+61000000000" className="btn btn--primary"><i className="fa-solid fa-phone"></i> Call Us</a>
                <a href="mailto:sales@traveladventurenepal.com.au" className="btn btn--nav"><i className="fa-solid fa-envelope"></i> Email Us</a>
              </div>
            </div>
          </div>

          <aside className="detail-page__sidebar">
            <div className="detail-booking-card">
              <div className="detail-booking-card__price-row">
                <span className="detail-booking-card__from">From</span>
                <span className="detail-booking-card__per">per person</span>
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
                onClick={() => navigate(`/booking/short-tour/${itemId}`)}>
                Book Quick Escape
              </button>

              <button
                className={`detail-booking-card__wishlist${isWishlisted ? ' active' : ''}`}
                onClick={() => toggleWishlist({ id: itemId, type: 'short-tour', title: tour.title, image: tour.image, price: tour.price })}
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

export default ShortTourDetailPage
