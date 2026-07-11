import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { treksApi } from '../../../services/api'
import { useSocialLinks } from '../../../hooks/useSocialLinks'
import { useContactInfo } from '../../../hooks/useContactInfo'
import './Footer.css'

function Footer() {
  const [latestTreks, setLatestTreks] = useState([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const socialLinks = useSocialLinks()
  const contactInfo = useContactInfo()

  useEffect(() => {
    treksApi.getAll({ limit: 5 }).then((r) => setLatestTreks((r?.data || r || []).slice(0, 5))).catch(() => {})
  }, [])

  const companyLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Why Choose Us', path: '/why-choose-us' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blogs', path: '/blogs' },
  ]

  const supportLinks = [
    { label: 'Contact Us', path: '/contact' },
    { label: 'Custom Packages', path: '/custom-packages' },
    { label: 'Short Tours', path: '/short-tours' },
    { label: 'Sign In / Register', path: '/auth' },
  ]

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="footer__newsletter">
        <div className="container">
          <span className="footer__newsletter-label">NEWSLETTER</span>
          <h3>Receive Inspiration In Your Inbox</h3>
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe"><i className="fa-solid fa-paper-plane"></i></button>
          </form>
          {subscribed ? (
            <span className="footer__newsletter-thanks">Thanks for subscribing!</span>
          ) : (
            <div className="footer__rating">
              {[1,2,3,4,5].map((i) => <i key={i} className="fa-solid fa-star"></i>)}
              <span>Rated 4.9/5 based on 75,947 reviews</span>
            </div>
          )}
        </div>
      </div>

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__col">
              <h4 className="footer__heading">Destination</h4>
              <ul className="footer__links">
                {(latestTreks.length > 0 ? latestTreks : []).map((t) => (
                  <li key={t._id}><Link to={`/trekking/${t._id}`}>{t.title}</Link></li>
                ))}
                {latestTreks.length === 0 && (
                  <>
                    <li><Link to="/trekking">Everest Region</Link></li>
                    <li><Link to="/trekking">Annapurna Region</Link></li>
                    <li><Link to="/trekking">Langtang Region</Link></li>
                    <li><Link to="/tours">Kathmandu Valley</Link></li>
                    <li><Link to="/tours">Pokhara</Link></li>
                  </>
                )}
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Company</h4>
              <ul className="footer__links">
                {companyLinks.map((item) => (
                  <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Support</h4>
              <ul className="footer__links">
                {supportLinks.map((item) => (
                  <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Address</h4>
              <p className="footer__text">{contactInfo.address}</p>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Contact</h4>
              <p className="footer__text">{contactInfo.phone}<br />{contactInfo.email}</p>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Working Hours</h4>
              <p className="footer__text">{contactInfo.contactHours}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__brand-bar">
        <div className="container footer__brand-bar-inner">
          <div className="footer__socials">
            {socialLinks.map((link) => (
              <a key={link._id || link.id} href={link.url} target="_blank" rel="noreferrer"><i className={link.icon || 'fa-solid fa-link'}></i></a>
            ))}
          </div>
          <p className="footer__brand-name">Travel Adventure Nepal</p>
          <p className="footer__help">Need help? Call us <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}>{contactInfo.phone}</a></p>
        </div>
      </div>

      <div className="footer__copyright">
        <div className="container">
          <p>© 2026 Travel Adventure Nepal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
