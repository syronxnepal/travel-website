import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { treksApi } from '../../../services/api'
import './Footer.css'

function Footer() {
  const [latestTreks, setLatestTreks] = useState([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    treksApi.getAll({ limit: 5 }).then((r) => setLatestTreks(r?.data || r || [])).catch(() => {})
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
          <div className="footer__newsletter-card">
            <div>
              <h3>Get Travel Updates</h3>
              <p>Sign up for our newsletter to receive the latest deals and travel stories.</p>
            </div>
            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn--primary">Subscribe</button>
            </form>
            {subscribed && <span className="footer__newsletter-thanks">Thanks for subscribing!</span>}
          </div>
        </div>
      </div>

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__col footer__col--brand">
              <p className="footer__brand-name">Travel Adventure Nepal</p>
              <p className="footer__brand-desc">Creating unforgettable Himalayan adventures with expert guides and personalised trip planning since day one.</p>
              <div className="footer__socials">
                <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://tripadvisor.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-tripadvisor"></i></a>
              </div>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Destinations</h4>
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
              <h4 className="footer__heading">Contact Info</h4>
              <ul className="footer__contact">
                <li><i className="fa-solid fa-location-dot"></i> Suite 502/155 Castlereagh Street, Sydney - Australia 2000</li>
                <li><i className="fa-solid fa-phone"></i> +61 2 0000 0000</li>
                <li><i className="fa-solid fa-envelope"></i> sales@traveladventurenepal.com.au</li>
                <li><i className="fa-solid fa-clock"></i> Mon - Fri: 9:00 AM - 6:00 PM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <div className="container footer__copyright-inner">
          <p>© 2026 Travel Adventure Nepal. All Rights Reserved.</p>
          <div className="footer__legal-links">
            <Link to="/about">Privacy Policy</Link>
            <Link to="/about">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
