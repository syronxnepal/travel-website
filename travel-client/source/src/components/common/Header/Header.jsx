import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useWishlist } from '../../../context/WishlistContext'
import { useScrollPosition } from '../../../hooks/useScrollPosition'
import SearchOverlay from '../SearchOverlay/SearchOverlay'
import WishlistPanel from '../WishlistPanel/WishlistPanel'
import './Header.css'

const navItems = [
  { label: 'HOME', path: '/' },
  {
    label: 'ABOUT', path: '/about',
    dropdown: [
      { label: 'Our Story', path: '/our-story' },
      { label: 'Why Choose Us', path: '/why-choose-us' },
    ],
  },
  { label: 'CONTACT', path: '/contact' },
  {
    label: 'TREKKING', path: '/trekking',
    dropdown: [
      { label: 'All Treks', path: '/trekking' },
      { label: 'Everest Region', path: '/trekking' },
      { label: 'Annapurna Region', path: '/trekking' },
      { label: 'Langtang Region', path: '/trekking' },
    ],
  },
  {
    label: 'TOURS', path: '/tours',
    dropdown: [
      { label: 'All Tours', path: '/tours' },
      { label: 'Adventure Tours', path: '/tours/adventure' },
      { label: 'Cultural Tours', path: '/tours/cultural' },
      { label: 'Nature Tours', path: '/tours/nature' },
    ],
  },
  {
    label: 'SHORT TOURS', path: '/short-tours',
    dropdown: [
      { label: 'All Short Tours', path: '/short-tours' },
      { label: 'Day Trips', path: '/short-tours/day-trips' },
      { label: 'Weekend Getaways', path: '/short-tours/weekend' },
    ],
  },
  {
    label: 'MORE', path: '/custom-packages',
    dropdown: [
      { label: 'Gallery', path: '/gallery' },
      { label: 'Blogs', path: '/blogs' },
      { label: 'Custom Packages', path: '/custom-packages' },
    ],
  },
]

function DropdownItem({ item }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!item.dropdown) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) => 'nav__link' + (isActive ? ' nav__link--active' : '')}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div
      className={'nav__item nav__item--dropdown' + (open ? ' nav__item--open' : '')}
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={item.path}
        className={({ isActive }) => 'nav__link nav__link--has-dropdown' + (isActive ? ' nav__link--active' : '')}
        onClick={() => setOpen(false)}
      >
        {item.label} <i className="fa-solid fa-chevron-down nav__chevron"></i>
      </NavLink>
      {open && (
        <div className="nav__dropdown">
          {item.dropdown.map((d) => (
            <Link key={d.path + d.label} to={d.path} className="nav__dropdown-link" onClick={() => setOpen(false)}>
              {d.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const { wishlist } = useWishlist()
  const scrollY = useScrollPosition()
  const navigate = useNavigate()
  const topbarRef = useRef(null)
  const [topbarHeight, setTopbarHeight] = useState(90)

  // The nav only switches to its fixed "small header" state once the topbar
  // has fully scrolled out of view — never while it's still visible, so we
  // never yank the topbar out of flow (via display:none) mid-scroll, which
  // used to cause the whole page to jump by the topbar's height.
  useEffect(() => {
    if (!topbarRef.current) return
    const observer = new ResizeObserver(([entry]) => setTopbarHeight(entry.contentRect.height))
    observer.observe(topbarRef.current)
    return () => observer.disconnect()
  }, [])

  const isScrolled = scrollY > topbarHeight

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="header-wrap">
      {/* Top info bar */}
      <div className="header-topbar" ref={topbarRef}>
        <div className="container">
          <div className="header-topbar__inner">
            <Link to="/" className="header-topbar__logo">
              <img src="/Images/Brand/logo.png" alt="Travel Adventure Nepal" />
            </Link>

            <div className="header-topbar__info">
              <span className="header-topbar__info-item">
                <span className="header-topbar__info-icon"><i className="fa-solid fa-location-dot"></i></span>
                <span><strong>OUR LOCATION</strong><br />Suite 502/155 Castlereagh Street, Sydney - Australia 2000</span>
              </span>
              <span className="header-topbar__info-item">
                <span className="header-topbar__info-icon"><i className="fa-regular fa-envelope"></i></span>
                <span><strong>EMAIL US</strong><br />sales@traveladventurenepal.com.au</span>
              </span>
            </div>

            <div className="header-topbar__actions">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="header-topbar__social"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="header-topbar__social"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="header-topbar__social"><i className="fa-brands fa-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="header-topbar__social"><i className="fa-brands fa-linkedin-in"></i></a>
              <button className="header-topbar__icon" onClick={() => setSearchOpen(true)}><i className="fa-solid fa-magnifying-glass"></i></button>
              <button className="header-topbar__icon header-topbar__wishlist" onClick={() => setWishlistOpen(true)}>
                <i className="fa-regular fa-heart"></i>
                {wishlist.length > 0 && <span className="header-topbar__wishlist-count">{wishlist.length}</span>}
              </button>
              {isAuthenticated ? (
                <div className="header-topbar__user">
                  <span>{user?.name}</span>
                  <button onClick={handleLogout} className="btn btn--nav" style={{ padding: '8px 16px', fontSize: 13 }}>Sign Out</button>
                </div>
              ) : (
                <Link to="/auth" className="header-topbar__signin">Sign/Register <i className="fa-solid fa-arrow-right"></i></Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <nav className={'header-nav' + (isScrolled ? ' header-nav--sticky' : '')}>
        <div className="container header-nav__shape">
          <div className="header-nav__inner">
            {isScrolled && (
              <Link to="/" className="header-nav__sticky-logo">
                <img src="/Images/Brand/logo.png" alt="Travel Adventure Nepal" />
              </Link>
            )}
            <div className="header-nav__links">
              {navItems.map((item) => (
                <DropdownItem key={item.label} item={item} />
              ))}
            </div>
            <button className="header-nav__hamburger" onClick={() => setMobileOpen(true)}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {/* Wishlist panel */}
      {wishlistOpen && <WishlistPanel onClose={() => setWishlistOpen(false)} />}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-menu__panel">
            <button className="mobile-menu__close" onClick={() => setMobileOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <nav className="mobile-menu__nav">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link to={item.path} className="mobile-menu__link" onClick={() => setMobileOpen(false)}>{item.label}</Link>
                  {item.dropdown?.map((d) => (
                    <Link key={d.label} to={d.path} className="mobile-menu__sub-link" onClick={() => setMobileOpen(false)}>{d.label}</Link>
                  ))}
                </div>
              ))}
              {isAuthenticated ? (
                <button className="mobile-menu__link" onClick={() => { handleLogout(); setMobileOpen(false) }}>Sign Out</button>
              ) : (
                <Link to="/signin" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>Sign/Register</Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
