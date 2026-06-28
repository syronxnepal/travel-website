import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { treksApi, toursApi, blogsApi } from '../../../services/api'
import './Footer.css'

function Footer() {
  const [latestTreks, setLatestTreks] = useState([])
  const [tours, setTours] = useState([])
  const [latestBlogs, setLatestBlogs] = useState([])

  useEffect(() => {
    treksApi.getAll({ limit: 5 }).then((r) => setLatestTreks(r?.data || r || [])).catch(() => {})
    toursApi.getAll({ limit: 2 }).then((r) => setTours(r?.data || r || [])).catch(() => {})
    blogsApi.getAll({ limit: 2 }).then((r) => setLatestBlogs(r?.data || r || [])).catch(() => {})
  }, [])

  const quickMenu = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Treks', path: '/trekking' },
    { label: 'Tours', path: '/tours' },
    { label: 'Short Tours', path: '/short-tours' },
    { label: 'Custom Packages', path: '/custom-packages' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__col">
              <h4 className="footer__heading">Latest Treks</h4>
              <ul className="footer__links">
                {latestTreks.map((t) => (
                  <li key={t._id}><Link to={`/trekking/${t._id}`}>{t.title}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Tours</h4>
              <ul className="footer__links">
                {tours.map((t) => (
                  <li key={t._id}><Link to={`/tour/${t._id}`}>{t.title}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Quick Menu</h4>
              <ul className="footer__links">
                {quickMenu.map((item) => (
                  <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__heading">Latest Blogs</h4>
              <ul className="footer__links">
                {latestBlogs.map((b) => (
                  <li key={b._id}><Link to={`/blog/${b._id}`}>{b.title}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom-bar">
        <div className="container">
          <div className="footer__bottom-grid">
            <div>
              <p className="footer__bottom-label">Address</p>
              <p>Suite 502/155 Castlereagh Street, Sydney - Australia 2000</p>
            </div>
            <div>
              <p className="footer__bottom-label">Contact</p>
              <p>sales@traveladventurenepal.com.au</p>
            </div>
            <div>
              <p className="footer__bottom-label">Working Hours</p>
              <p>Monday - Friday: 9:00 AM - 6:00 PMs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__brand-bar">
        <div className="container">
          <div className="footer__brand-inner">
            <div className="footer__socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
              <a href="https://tripadvisor.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-tripadvisor"></i></a>
            </div>
            <p className="footer__brand-name">Travel Adventure Nepal</p>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <div className="container">
          <p>© 2025 Adventure Nepal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
