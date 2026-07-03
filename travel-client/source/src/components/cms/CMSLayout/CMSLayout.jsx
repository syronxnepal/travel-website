import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import './CMSLayout.css'

const NAV = [
  {
    label: 'Dashboard', icon: 'fa-gauge', path: '/cms/dashboard',
  },
  {
    label: 'Home Page', icon: 'fa-globe', children: [
      { label: 'Hero Section', path: '/cms/home/hero-section', icon: 'fa-image' },
      { label: 'Top Trek Section', path: '/cms/home/top-trek-section', icon: 'fa-mountain' },
      { label: 'Top Tours Section', path: '/cms/home/top-tours-section', icon: 'fa-star' },
      { label: 'Testimonials Section', path: '/cms/home/testimonials-section', icon: 'fa-comments' },
      { label: 'Why Choose Us Section', path: '/cms/home/why-choose-us-section', icon: 'fa-award' },
      { label: 'Blog Section', path: '/cms/home/blog-section', icon: 'fa-newspaper' },
      { label: 'Gallery Section', path: '/cms/home/gallery-section', icon: 'fa-images' },
      { label: 'Reach Us Section', path: '/cms/home/reach-us-section', icon: 'fa-location-dot' },
    ],
  },
  {
    label: 'Our Story Page', icon: 'fa-book-open', children: [
      { label: 'Story & Mission', path: '/cms/about/intro-section', icon: 'fa-circle-info' },
      { label: 'Mission Pillars', path: '/cms/about/mission-items', icon: 'fa-flag' },
    ],
  },
  { label: 'Why Choose Us Page', icon: 'fa-check-circle', path: '/cms/about/why-choose-us' },
  { label: 'Contact Page', icon: 'fa-envelope', path: '/cms/contact/info' },
  {
    label: 'Treks', icon: 'fa-person-hiking', children: [
      { label: 'Manage Treks', path: '/cms/treks/manage', icon: 'fa-list' },
    ],
  },
  {
    label: 'Tours', icon: 'fa-route', children: [
      { label: 'Manage Tours', path: '/cms/tours/manage', icon: 'fa-list' },
      { label: 'Manage Short Tours', path: '/cms/tours/manage-short', icon: 'fa-map' },
    ],
  },
  {
    label: 'Blogs', icon: 'fa-blog', children: [
      { label: 'Manage Blogs', path: '/cms/blogs/manage', icon: 'fa-list' },
      { label: 'Categories', path: '/cms/blogs/categories', icon: 'fa-tags' },
    ],
  },
  {
    label: 'Gallery', icon: 'fa-images', children: [
      { label: 'Gallery Section', path: '/cms/gallery-section', icon: 'fa-image' },
      { label: 'Gallery Categories', path: '/cms/gallery/categories', icon: 'fa-tags' },
    ],
  },
  { label: 'Testimonials', icon: 'fa-star', path: '/cms/testimonials/manage' },
  { label: 'Bookings', icon: 'fa-calendar-check', path: '/cms/bookings/manage' },
  { label: 'Contacts', icon: 'fa-envelope-open-text', path: '/cms/contacts/manage' },
  {
    label: 'Pages', icon: 'fa-file', children: [
      { label: 'Manage Pages', path: '/cms/pages/manage', icon: 'fa-list' },
    ],
  },
  {
    label: 'Users', icon: 'fa-users', children: [
      { label: 'Manage Users', path: '/cms/users/manage', icon: 'fa-list' },
      { label: 'My Profile', path: '/cms/users/profile', icon: 'fa-user' },
    ],
  },
  { label: 'Gallery Section', icon: 'fa-photo-film', path: '/cms/gallery-section' },
]

function NavItem({ item, currentPath, depth = 0 }) {
  const hasChildren = item.children && item.children.length > 0
  const isChildActive = hasChildren && item.children.some((c) => currentPath.startsWith(c.path))
  const [open, setOpen] = useState(isChildActive)

  if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) => `cms-nav__link${isActive ? ' active' : ''}${depth > 0 ? ' cms-nav__link--child' : ''}`}
      >
        <i className={`fa-solid ${item.icon}`}></i>
        <span>{item.label}</span>
      </NavLink>
    )
  }

  return (
    <div className={`cms-nav__group${open ? ' open' : ''}`}>
      <button
        className={`cms-nav__group-header${isChildActive ? ' active' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <div className="cms-nav__group-left">
          <i className={`fa-solid ${item.icon}`}></i>
          <span>{item.label}</span>
        </div>
        <i className={`fa-solid fa-chevron-${open ? 'down' : 'right'} cms-nav__chevron`}></i>
      </button>
      {open && (
        <div className="cms-nav__children">
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) => `cms-nav__link cms-nav__link--child${isActive ? ' active' : ''}`}
            >
              <i className={`fa-solid ${child.icon}`}></i>
              <span>{child.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

function CMSLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const pageTitle = (() => {
    const path = location.pathname
    if (path === '/cms' || path === '/cms/dashboard') return { title: 'Dashboard', sub: 'Overview of your travel business' }
    if (path.includes('hero')) return { title: 'Hero Section', sub: 'Manage hero slider content' }
    if (path.includes('top-trek')) return { title: 'Top Trek Section', sub: 'Configure the top trek section on the homepage' }
    if (path.includes('top-tours')) return { title: 'Top Tours Section', sub: 'Configure the tours section on the homepage' }
    if (path.includes('why-choose-us-section')) return { title: 'Why Choose Us Section', sub: 'Configure the Why Choose Us section on the homepage, including the Adventure With Us section' }
    if (path.includes('blog-section')) return { title: 'Blog Section', sub: 'Configure the blog section' }
    if (path.includes('gallery-section')) return { title: 'Gallery Section', sub: 'Manage photo gallery and featured images for your homepage.' }
    if (path.includes('testimonials-section')) return { title: 'Testimonials Section', sub: 'Configure testimonials on the homepage' }
    if (path.includes('reach-us')) return { title: 'Reach Us Section', sub: 'Configure contact info on the homepage' }
    if (path.includes('about/intro')) return { title: 'Story & Mission', sub: 'Configure the Our Story page\'s intro and mission text' }
    if (path.includes('about/mission')) return { title: 'Mission Pillars', sub: 'Manage the mission pillar cards on the Our Story page' }
    if (path.includes('about/why')) return { title: 'Why Choose Us Page', sub: 'Configure the section heading and reasons shown on the Why Choose Us and About pages' }
    if (path.includes('treks/manage')) return { title: 'Trek Management', sub: 'Manage all trekking packages with full control over details' }
    if (path.includes('treks/form')) return { title: location.search.includes('id') ? 'Edit Trek' : 'Add New Trek', sub: 'Create a new trek with all necessary information' }
    if (path.includes('tours/manage-short')) return { title: 'Short Tour Management', sub: 'Manage all short tours' }
    if (path.includes('tours/manage') || path.includes('/cms/tours')) return { title: 'Tour Management', sub: 'Manage all tours with full control over details, pricing, and featured status' }
    if (path.includes('tours/form')) return { title: 'Add New Tour', sub: 'Create a new tour' }
    if (path.includes('blogs/manage')) return { title: 'Blog Management', sub: 'Manage all blog posts' }
    if (path.includes('blogs/categories')) return { title: 'Blog Categories', sub: 'Manage blog categories' }
    if (path.includes('gallery/categories')) return { title: 'Gallery Categories', sub: 'Manage gallery categories' }
    if (path.includes('gallery-section')) return { title: 'Gallery Section Management', sub: 'Manage photo gallery and featured images for your homepage.' }
    if (path.includes('testimonials')) return { title: 'Testimonials', sub: 'Manage customer testimonials' }
    if (path.includes('bookings')) return { title: 'Booking Management', sub: 'View and manage all bookings' }
    if (path.includes('contacts/manage')) return { title: 'Contact Messages', sub: 'View and manage contact form submissions' }
    if (path.includes('contact/info')) return { title: 'Contact Information', sub: 'Manage your contact details' }
    if (path.includes('pages')) return { title: 'Pages Management', sub: 'Manage custom pages' }
    if (path.includes('users/manage')) return { title: 'User Management', sub: 'Manage admin users and roles' }
    if (path.includes('users/profile')) return { title: 'My Profile', sub: 'Manage your account settings' }
    return { title: 'Content Management System', sub: 'Manage your homepage content and sections' }
  })()

  return (
    <div className="cms-layout">
      {/* Sidebar */}
      <aside className={`cms-layout__sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="cms-layout__brand">
          <img src="/Images/Brand/logo.svg" alt="Adventure Nepal" />
          <div>
            <div className="cms-layout__brand-name">Content Management</div>
            <div className="cms-layout__brand-sub">System</div>
          </div>
        </div>

        <nav className="cms-nav">
          {NAV.map((item, i) => (
            <NavItem key={i} item={item} currentPath={location.pathname} />
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="cms-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main area */}
      <div className="cms-layout__main">
        {/* Header */}
        <header className="cms-layout__header">
          <button className="cms-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="cms-layout__header-title">
            <strong>Content Management System</strong>
            <span>Manage your homepage content and sections</span>
          </div>

          <div className="cms-layout__header-actions">
            <Link to="/" className="cms-back-btn">
              <i className="fa-solid fa-arrow-left"></i> Back to Website
            </Link>

            <div className="cms-user" onClick={() => setDropdownOpen(!dropdownOpen)} tabIndex={0} onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}>
              <div className="cms-user__avatar">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <span className="cms-user__name">{user?.name || 'Admin User'}</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 11 }}></i>

              {dropdownOpen && (
                <div className="cms-user__dropdown">
                  <div className="cms-user__dropdown-head">
                    <div className="cms-user__avatar cms-user__avatar--lg">
                      {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div>
                      <strong>{user?.name || 'Admin User'}</strong>
                      <span>{user?.email || ''}</span>
                      <em className="cms-role-badge">{user?.role || 'Admin'}</em>
                    </div>
                  </div>
                  <div className="cms-user__dropdown-body">
                    <NavLink to="/cms/users/profile"><i className="fa-solid fa-user"></i> Profile</NavLink>
                    <NavLink to="/cms/users/manage"><i className="fa-solid fa-users"></i> User Management</NavLink>
                    <button onClick={handleLogout} className="cms-logout-btn">
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="cms-layout__content">
          <div className="cms-page-header">
            <h1>{pageTitle.title}</h1>
            <p>{pageTitle.sub}</p>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default CMSLayout
