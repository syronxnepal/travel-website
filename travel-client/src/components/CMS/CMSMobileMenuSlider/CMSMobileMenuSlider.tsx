import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import './CMSMobileMenuSlider.scss';

interface CMSMobileMenuSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HomePageSubItem {
  id: string;
  name: string;
  path: string;
  icon: string;
}

interface CMSSection {
  id: string;
  name: string;
  path: string;
  icon: string;
}

const CMSMobileMenuSlider: React.FC<CMSMobileMenuSliderProps> = ({
  isOpen,
  onClose
}) => {
  const location = useLocation();
  const { user } = useAuth();
  const [activeDropdowns, setActiveDropdowns] = useState<Set<string>>(new Set());

  // Initialize dropdown states based on current path
  useEffect(() => {
    const newSet = new Set<string>();
    if (location.pathname.includes('/cms/home/')) newSet.add('home');
    if (location.pathname.includes('/cms/about/')) newSet.add('about');
    if (location.pathname.includes('/cms/contact/')) newSet.add('contact');
    if (location.pathname.includes('/cms/treks/')) newSet.add('treks');
    if (location.pathname.includes('/cms/tours/')) newSet.add('tours');
    if (location.pathname.includes('/cms/pages/')) newSet.add('pages');
    setActiveDropdowns(newSet);
  }, [location.pathname]);

  const toggleDropdown = (dropdown: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setActiveDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dropdown)) {
        newSet.delete(dropdown);
      } else {
        newSet.add(dropdown);
      }
      return newSet;
    });
  };

  const isDropdownOpen = (dropdown: string): boolean => {
    return activeDropdowns.has(dropdown);
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    onClose();
  };

  const homePageSubItems: HomePageSubItem[] = [
    { id: 'hero-section', name: 'Hero Section', path: '/cms/home/hero-section', icon: 'fa-home' },
    { id: 'top-trek-section', name: 'Top Trek Section', path: '/cms/home/top-trek-section', icon: 'fa-mountain' },
    { id: 'top-tours-section', name: 'Top Tours Section', path: '/cms/home/top-tours-section', icon: 'fa-plane' },
    { id: 'testimonials-section', name: 'Testimonials Section', path: '/cms/home/testimonials-section', icon: 'fa-quote-left' },
    { id: 'why-choose-us-section', name: 'Why Choose Us Section', path: '/cms/home/why-choose-us-section', icon: 'fa-star' },
    { id: 'blog-section', name: 'Blog Section', path: '/cms/home/blog-section', icon: 'fa-blog' }
  ];

  const aboutPageSubItems: HomePageSubItem[] = [
    { id: 'about-intro-section', name: 'About Intro', path: '/cms/about/intro-section', icon: 'fa-info-circle' },
    { id: 'about-why-choose-us', name: 'Why Choose Us', path: '/cms/about/why-choose-us', icon: 'fa-star' }
  ];

  const contactPageSubItems: HomePageSubItem[] = [
    { id: 'contact-info', name: 'Contact Information', path: '/cms/contact/info', icon: 'fa-info-circle' }
  ];

  const trekMenuItems: HomePageSubItem[] = [
    { id: 'manage-treks', name: 'Manage Treks', path: '/cms/treks/manage', icon: 'fa-list' }
  ];

  const tourMenuItems: HomePageSubItem[] = [
    { id: 'manage-tours', name: 'Manage Tours', path: '/cms/tours/manage', icon: 'fa-list' },
    { id: 'manage-short-tours', name: 'Manage Short Tours', path: '/cms/tours/manage-short', icon: 'fa-clock' }
  ];

  const pagesMenuItems: HomePageSubItem[] = [
    { id: 'manage-pages', name: 'Manage Pages', path: '/cms/pages/manage', icon: 'fa-list' }
  ];

  const blogMenuItems: HomePageSubItem[] = [
    { id: 'manage-blogs', name: 'Manage Blogs', path: '/cms/blogs/manage', icon: 'fa-list' },
    { id: 'blog-categories', name: 'Blog Categories', path: '/cms/blogs/categories', icon: 'fa-tags' }
  ];

  const galleryMenuItems: HomePageSubItem[] = [
    { id: 'gallery-section', name: 'Gallery Section', path: '/cms/gallery-section', icon: 'fa-images' },
    { id: 'gallery-categories', name: 'Gallery Categories', path: '/cms/gallery/categories', icon: 'fa-tags' }
  ];

  const userMenuItems: HomePageSubItem[] = [
    { id: 'manage-users', name: 'Manage Users', path: '/cms/users/manage', icon: 'fa-users' },
    { id: 'manage-roles', name: 'Roles', path: '/cms/users/roles', icon: 'fa-user-shield' }
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`cms-mobile-menu-slider__backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className={`cms-mobile-menu-slider ${isOpen ? 'active' : ''}`}>
        <div className="cms-mobile-menu-slider__header">
          <h3 className="cms-mobile-menu-slider__title">
            <i className="fa-solid fa-bars"></i>
            CMS Menu
          </h3>
          <button 
            className="cms-mobile-menu-slider__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="cms-mobile-menu-slider__content">
          <nav className="cms-mobile-menu-slider__nav">
            <ul className="cms-mobile-menu-slider__nav-list">
              {/* Dashboard */}
              <li>
                <Link 
                  to="/cms/dashboard" 
                  className={`cms-mobile-menu-slider__nav-link ${isActive('/cms/dashboard') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <i className="fa-solid fa-gauge"></i>
                  Dashboard
                </Link>
              </li>

              {/* Home Page Menu */}
              <li className="cms-mobile-menu-slider__nav-item">
                <button
                  className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('home', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('home')}
                >
                  <i className="fa-solid fa-globe"></i>
                  Home Page
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('home') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('home') ? 'active' : ''}`}>
                  {homePageSubItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path} 
                        className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* About Page Menu */}
              <li className="cms-mobile-menu-slider__nav-item">
                <button
                  className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('about', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('about')}
                >
                  <i className="fa-solid fa-info-circle"></i>
                  About Page
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('about') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('about') ? 'active' : ''}`}>
                  {aboutPageSubItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path} 
                        className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Contact Page Menu */}
              <li className="cms-mobile-menu-slider__nav-item">
                <button
                  className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('contact', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('contact')}
                >
                  <i className="fa-solid fa-envelope"></i>
                  Contact Page
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('contact') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('contact') ? 'active' : ''}`}>
                  {contactPageSubItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path} 
                        className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Treks Menu */}
              <li className="cms-mobile-menu-slider__nav-item">
                <button
                  className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('treks', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('treks')}
                >
                  <i className="fa-solid fa-mountain"></i>
                  Treks
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('treks') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('treks') ? 'active' : ''}`}>
                  {trekMenuItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path} 
                        className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Tours Menu */}
              <li className="cms-mobile-menu-slider__nav-item">
                <button
                  className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('tours', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('tours')}
                >
                  <i className="fa-solid fa-route"></i>
                  Tours
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('tours') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('tours') ? 'active' : ''}`}>
                  {tourMenuItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path} 
                        className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Blogs Menu */}
              <li className="cms-mobile-menu-slider__nav-item">
                <button
                  className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('blogs', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('blogs')}
                >
                  <i className="fa-solid fa-blog"></i>
                  Blogs
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('blogs') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('blogs') ? 'active' : ''}`}>
                  {blogMenuItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path} 
                        className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Gallery Menu */}
              <li className="cms-mobile-menu-slider__nav-item">
                <button
                  className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('gallery', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('gallery')}
                >
                  <i className="fa-solid fa-images"></i>
                  Gallery
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('gallery') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('gallery') ? 'active' : ''}`}>
                  {galleryMenuItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path} 
                        className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Testimonials */}
              <li>
                <Link 
                  to="/cms/testimonials/manage" 
                  className={`cms-mobile-menu-slider__nav-link ${isActive('/cms/testimonials/manage') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <i className="fa-solid fa-quote-left"></i>
                  Testimonials
                </Link>
              </li>

              {/* Bookings */}
              <li>
                <Link 
                  to="/cms/bookings/manage" 
                  className={`cms-mobile-menu-slider__nav-link ${isActive('/cms/bookings/manage') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  Bookings
                </Link>
              </li>

              {/* Contacts */}
              <li>
                <Link 
                  to="/cms/contacts/manage" 
                  className={`cms-mobile-menu-slider__nav-link ${isActive('/cms/contacts/manage') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <i className="fa-solid fa-address-book"></i>
                  Contacts
                </Link>
              </li>

              {/* Pages Menu */}
              <li className="cms-mobile-menu-slider__nav-item">
                <button
                  className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('pages', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('pages')}
                >
                  <i className="fa-solid fa-file"></i>
                  Pages
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('pages') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('pages') ? 'active' : ''}`}>
                  {pagesMenuItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.path} 
                        className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <i className={`fa-solid ${item.icon}`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* User Management - Admin Only */}
              {user?.role === 'admin' && (
                <li className="cms-mobile-menu-slider__nav-item">
                  <button
                    className="cms-mobile-menu-slider__nav-link cms-mobile-menu-slider__dropdown-toggle"
                    onClick={(e) => toggleDropdown('users', e)}
                    type="button"
                    aria-expanded={isDropdownOpen('users')}
                  >
                    <i className="fa-solid fa-user-gear"></i>
                    Users
                    <i className={`fa-solid fa-chevron-${isDropdownOpen('users') ? 'up' : 'down'}`}></i>
                  </button>
                  <ul className={`cms-mobile-menu-slider__dropdown ${isDropdownOpen('users') ? 'active' : ''}`}>
                    {userMenuItems.map((item) => (
                      <li key={item.id}>
                        <Link 
                          to={item.path} 
                          className={`cms-mobile-menu-slider__dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                          onClick={handleLinkClick}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}

            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default CMSMobileMenuSlider;
