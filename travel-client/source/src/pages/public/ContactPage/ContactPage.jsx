import { useState } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import { contactsApi } from '../../../services/api'
import { usePageHero } from '../../../hooks/usePageHero'
import { useSocialLinks } from '../../../hooks/useSocialLinks'
import { useContactInfo } from '../../../hooks/useContactInfo'
import './ContactPage.css'

const DEFAULT_HERO = { title: 'Contact Us', subtitle: '', backgroundImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=400&fit=crop' }

function ContactPage() {
  const hero = usePageHero('contact', DEFAULT_HERO)
  const socialLinks = useSocialLinks()
  const contactInfo = useContactInfo()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    contactsApi.submit(form)
      .then(() => { setSent(true); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) })
      .catch(() => setError('Something went wrong. Please try again.'))
      .finally(() => setSending(false))
  }

  return (
    <div className="contact-page">
      <Header />
      <PageHero title={hero.title} subtitle={hero.subtitle} breadcrumb="Home / Contact" backgroundImage={hero.backgroundImage} />

      <div className="container">
        <div className="contact-page__grid">
          {/* Left: Info */}
          <div className="contact-page__info">
            <span className="contact-page__badge">CONTACT USS</span>
            <h2>Get In Touch With Us</h2>
            <p>Have a question or want to plan your dream adventure? Reach out to us and our team will get back to you as soon as possible.</p>

            <div className="contact-page__info-items">
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <strong>Address</strong>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <strong>Phone</strong>
                  <p>{contactInfo.phone}</p>
                </div>
              </div>
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <strong>Email</strong>
                  <p>{contactInfo.email}</p>
                </div>
              </div>
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon"><i className="fa-solid fa-clock"></i></div>
                <div>
                  <strong>Working Hours</strong>
                  <p>{contactInfo.contactHours}</p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="contact-page__follow">
              <h4>Follow Us</h4>
              <div className="contact-page__socials">
                {socialLinks.map((link) => (
                  <a key={link._id || link.id} href={link.url} target="_blank" rel="noreferrer" className="contact-social"><i className={link.icon || 'fa-solid fa-link'}></i></a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-page__form-wrap">
            <span className="contact-page__badge">SEND A MESSAGE</span>
            <h2>We'd Love To Hear From You</h2>

            {sent ? (
              <div className="contact-page__success">
                <i className="fa-solid fa-circle-check"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn btn--primary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-page__form">
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input type="text" placeholder="John Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-field">
                    <label>Email Address *</label>
                    <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Phone</label>
                    <input type="tel" placeholder="+61 2 0000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="form-field">
                    <label>Subject *</label>
                    <input type="text" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                </div>
                <div className="form-field">
                  <label>Message *</label>
                  <textarea rows={5} placeholder="Tell us more..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn btn--primary" disabled={sending}>
                  {sending ? 'Sending...' : <><i className="fa-solid fa-paper-plane"></i> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="contact-page__map">
        <iframe
          title="Google Map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
