import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import WishlistSlider from '../WishlistSlider/WishlistSlider';
import MobileNavSlider from '../MobileNavSlider/MobileNavSlider';
import './Header.scss';

interface WishlistItem {
  id: string;
  title: string;
  location: string;
  price: string;
  originalPrice?: string;
  image: string;
  type: 'trek' | 'tour' | 'short-tour';
  duration: string;
  rating: number;
  reviewCount: number;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      title: 'Everest Base Camp Trek',
      location: 'Nepal',
      price: '$1,200',
      originalPrice: '$1,500',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
      type: 'trek',
      duration: '14 days',
      rating: 4.8,
      reviewCount: 245
    },
    {
      id: '2',
      title: 'Cultural Heritage Tour',
      location: 'Kathmandu Valley',
      price: '$350',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      type: 'tour',
      duration: '3 days',
      rating: 4.6,
      reviewCount: 128
    }
  ]);

  // Simple function to handle submenu hover (CSS handles positioning)
  const handleSubmenuHover = () => {
    // CSS handles all positioning, no JavaScript needed
  };
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };


  const openSearch = () => {
    setIsSearchOpen(true);
    // Focus the search input after animation
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const closeWishlist = () => {
    setIsWishlistOpen(false);
  };

  const removeWishlistItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isSearchOpen) {
          closeSearch();
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        } else {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen, isMenuOpen]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const wasScrolled = isScrolled;
      const nowScrolled = scrollTop > 50;
      
      // If scroll state changed, close all dropdowns
      if (wasScrolled !== nowScrolled) {
        setActiveDropdown(null);
      }
      
      setIsScrolled(nowScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <>
      {/* Compact Header - Shows when scrolled */}
      <header className={`header header--compact ${isScrolled ? 'active' : ''}`} ref={headerRef}>
        <div className="container">
          <div className="header__compact-content">
            {/* Mobile Menu Button */}
            <button 
              className={`header__menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Logo */}
            <Link to="/" className="header__logo header__logo--compact">
              <img src="/Images/Brand/logo.png" alt="Brand Logo" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Header - Slides up when scrolled */}
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} ref={headerRef}>
        {/* Top Tier - Logo and User Actions */}
        <div className="header__top">
      <div className="container">
            <div className="header__top-content">
          {/* Mobile Menu Button */}
          <button 
            className={`header__menu-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <Link to="/" className="header__logo">
           <img src="/Images/Brand/logo.png" alt="Brand Logo" />
          </Link>

              {/* Contact Information */}
              <div className="header__contact-info">
                <div className="header__contact-info-item">
                  <div className="header__contact-info-icon"><i className='fa-solid fa-location-dot'></i></div>
                  <div className="header__contact-info-text">
                    <div className="header__contact-info-label">OUR LOCATION</div>
                    <div className="header__contact-info-value">Kathmandu, Nepal</div>
                  </div>
                </div>
                <div className="header__contact-info-item">
                  <div className="header__contact-info-icon"><i className='fa-solid fa-envelope'></i></div>
                  <div className="header__contact-info-text">
                    <div className="header__contact-info-label">EMAIL US</div>
                    <div className="header__contact-info-value">info@traveladventures.com</div>
                  </div>
                </div>
              </div>

              {/* Top Right Actions */}
              <div className="header__top-actions">
                {/* Social Media */}
                <div className="header__social-media">
                  <a href="#" className="header__social-media-link" aria-label="Facebook">
                      <i className='fa-brands fa-facebook-f'></i>
                  </a>
                  <a href="#" className="header__social-media-link" aria-label="Twitter">
                    <i className='fa-brands fa-twitter'></i>
                  </a>
                  <a href="#" className="header__social-media-link" aria-label="Instagram">
                    <i className='fa-brands fa-instagram'></i>
                  </a>
                  <a href="#" className="header__social-media-link" aria-label="Pinterest">
                    <i className='fa-brands fa-youtube'></i>
                  </a>
                </div>
       {/* Search */}
       <button 
                  className="header__search-btn" 
                  onClick={openSearch}
                  aria-label="Open search"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>

                {/* Wishlist */}
                <button 
                  className="header__wishlist-btn" 
                  onClick={toggleWishlist}
                  aria-label="View wishlist"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span className="header__wishlist-count">{wishlistItems.length}</span>
                </button>

                {/* Auth Links */}
                <div className="header__auth-links">
                  <Link to="/signin" className="main-button">Sign/Register <span><i className='fa fa-arrow-right'> </i></span> </Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier - Main Navigation */}
        <div className="header__bottom">
          <div className="container">
          <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="header__nav-list">
              <li><Link to="/" className="header__nav-link">Home</Link></li>
              
              {/* About Dropdown */}
              <li className="header__nav-item">
                <div 
                  className="header__dropdown-container"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    to="/our-story" 
                    className="header__nav-link header__dropdown-toggle"
                    onMouseEnter={() => setActiveDropdown('about')}
                    onClick={() => toggleDropdown('about')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDropdown('about');
                      }
                    }}
                    aria-expanded={activeDropdown === 'about'}
                    aria-haspopup="true"
                  >
                    About
                    <svg className="header__dropdown-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <ul className={`header__dropdown ${activeDropdown === 'about' ? 'active' : ''}`}>
                    <li><Link to="/our-story" onClick={closeDropdown}>Our Story</Link></li>
                    <li><Link to="/why-choose-us" onClick={closeDropdown}>Why Choose Us</Link></li>
                  </ul>
                </div>
              </li>
              
              <li><Link to="/contact" className="header__nav-link">Contact</Link></li>
                
              {/* Trekking Dropdown */}
              <li className="header__nav-item">
                <div 
                  className="header__dropdown-container"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    to="/trekking" 
                      className="header__nav-link header__dropdown-toggle"
                    onMouseEnter={() => setActiveDropdown('trekking')}
                      onClick={() => toggleDropdown('trekking')}

                  >
                    Trekking
                  
                    <svg className="header__dropdown-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </Link>
                <ul className={`header__dropdown header__dropdown--multi-level ${activeDropdown === 'trekking' ? 'active' : ''}`}>
                  <li><Link to="/trekking" onClick={closeDropdown}>All Trekking</Link></li>
                  <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                    <Link to="/trekking#everest" className="header__dropdown-link--parent">
                      Everest Base Camp
                      <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                    <ul className="header__dropdown--submenu">
                      <li><Link to="/trekking#everest-classic" onClick={closeDropdown}>Classic Route</Link></li>
                      <li><Link to="/trekking#everest-gokyo" onClick={closeDropdown}>Gokyo Lakes</Link></li>
                      <li><Link to="/trekking#everest-three-passes" onClick={closeDropdown}>Three Passes</Link></li>
                    </ul>
                  </li>
                  <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                    <Link to="/trekking#annapurna" className="header__dropdown-link--parent">
                      Annapurna Circuit
                      <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                    <ul className="header__dropdown--submenu">
                      <li><Link to="/trekking#annapurna-circuit" onClick={closeDropdown}>Full Circuit</Link></li>
                      <li><Link to="/trekking#annapurna-santuary" onClick={closeDropdown}>Sanctuary Trek</Link></li>
                      <li><Link to="/trekking#annapurna-poon-hill" onClick={closeDropdown}>Poon Hill</Link></li>
                    </ul>
                  </li>
                  <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                    <Link to="/trekking#manaslu" className="header__dropdown-link--parent">
                      Manaslu Trek
                      <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                    <ul className="header__dropdown--submenu">
                      <li><Link to="/trekking#manaslu-circuit" onClick={closeDropdown}>Manaslu Circuit</Link></li>
                      <li><Link to="/trekking#manaslu-tsum-valley" onClick={closeDropdown}>Tsum Valley</Link></li>
                      <li><Link to="/trekking#manaslu-larkya" onClick={closeDropdown}>Larkya Pass</Link></li>
                    </ul>
                  </li>
                  <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                    <Link to="/trekking#langtang" className="header__dropdown-link--parent">
                      Langtang Valley
                      <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                    <ul className="header__dropdown--submenu">
                      <li><Link to="/trekking#langtang-valley" onClick={closeDropdown}>Valley Trek</Link></li>
                      <li><Link to="/trekking#langtang-gosainkunda" onClick={closeDropdown}>Gosainkunda</Link></li>
                      <li><Link to="/trekking#langtang-helambu" onClick={closeDropdown}>Helambu</Link></li>
                    </ul>
                  </li>
                </ul>
                </div>
              </li>

                {/* Tours Dropdown */}
                <li className="header__nav-item">
                  <div 
                    className="header__dropdown-container"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                  <Link 
                    to="/tours" 
                    className="header__nav-link header__dropdown-toggle"
                    onMouseEnter={() => setActiveDropdown('tours')}
                    onClick={() => toggleDropdown('tours')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDropdown('tours');
                      }
                    }}
                    aria-expanded={activeDropdown === 'tours'}
                    aria-haspopup="true"
                  >
                    Tours
                    <svg className="header__dropdown-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <ul className={`header__dropdown header__dropdown--multi-level ${activeDropdown === 'tours' ? 'active' : ''}`}>
                    <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                      <Link to="/tours/cultural" className="header__dropdown-link--parent">
                        Cultural Tours
                        <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <ul className="header__dropdown--submenu">
                        <li><Link to="/tours/cultural/heritage" onClick={closeDropdown}>Heritage Sites</Link></li>
                        <li><Link to="/tours/cultural/temples" onClick={closeDropdown}>Temple Tours</Link></li>
                        <li><Link to="/tours/cultural/villages" onClick={closeDropdown}>Village Life</Link></li>
                      </ul>
                    </li>
                    <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                      <Link to="/tours/adventure" className="header__dropdown-link--parent">
                        Adventure Tours
                        <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <ul className="header__dropdown--submenu">
                        <li><Link to="/tours/adventure/rafting" onClick={closeDropdown}>White Water Rafting</Link></li>
                        <li><Link to="/tours/adventure/paragliding" onClick={closeDropdown}>Paragliding</Link></li>
                        <li><Link to="/tours/adventure/bungee" onClick={closeDropdown}>Bungee Jumping</Link></li>
                      </ul>
                    </li>
                    <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                      <Link to="/tours/nature" className="header__dropdown-link--parent">
                        Nature Tours
                        <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <ul className="header__dropdown--submenu">
                        <li><Link to="/tours/nature/wildlife" onClick={closeDropdown}>Wildlife Safari</Link></li>
                        <li><Link to="/tours/nature/bird-watching" onClick={closeDropdown}>Bird Watching</Link></li>
                        <li><Link to="/tours/nature/national-parks" onClick={closeDropdown}>National Parks</Link></li>
                      </ul>
                    </li>
                    <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                      <Link to="/tours/historical" className="header__dropdown-link--parent">
                        Historical Tours
                        <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <ul className="header__dropdown--submenu">
                        <li><Link to="/tours/historical/palaces" onClick={closeDropdown}>Royal Palaces</Link></li>
                        <li><Link to="/tours/historical/museums" onClick={closeDropdown}>Museums</Link></li>
                        <li><Link to="/tours/historical/architecture" onClick={closeDropdown}>Architecture</Link></li>
                      </ul>
                    </li>
                  </ul>
                  </div>
                </li>

                {/* Short Tours Dropdown */}
                <li className="header__nav-item">
                  <div 
                    className="header__dropdown-container"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                  <Link 
                    to="/short-tours" 
                    className="header__nav-link header__dropdown-toggle"
                    onMouseEnter={() => setActiveDropdown('short-tours')}
                    onClick={() => toggleDropdown('short-tours')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDropdown('short-tours');
                      }
                    }}
                    aria-expanded={activeDropdown === 'short-tours'}
                    aria-haspopup="true"
                  >
                    Short Tours
                    <svg className="header__dropdown-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <ul className={`header__dropdown header__dropdown--multi-level ${activeDropdown === 'short-tours' ? 'active' : ''}`}>
                    <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                      <Link to="/short-tours/day-trips" className="header__dropdown-link--parent">
                        Day Trips
                        <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <ul className="header__dropdown--submenu">
                        <li><Link to="/short-tours/day-trips/kathmandu" onClick={closeDropdown}>Kathmandu Valley</Link></li>
                        <li><Link to="/short-tours/day-trips/pokhara" onClick={closeDropdown}>Pokhara City</Link></li>
                        <li><Link to="/short-tours/day-trips/chitwan" onClick={closeDropdown}>Chitwan Safari</Link></li>
                      </ul>
                    </li>
                    <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                      <Link to="/short-tours/weekend" className="header__dropdown-link--parent">
                        Weekend Getaways
                        <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <ul className="header__dropdown--submenu">
                        <li><Link to="/short-tours/weekend/nagarkot" onClick={closeDropdown}>Nagarkot Sunrise</Link></li>
                        <li><Link to="/short-tours/weekend/dhulikhel" onClick={closeDropdown}>Dhulikhel Retreat</Link></li>
                        <li><Link to="/short-tours/weekend/bandipur" onClick={closeDropdown}>Bandipur Heritage</Link></li>
                      </ul>
                    </li>
                    <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                      <Link to="/short-tours/3-5-days" className="header__dropdown-link--parent">
                        3-5 Days
                        <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <ul className="header__dropdown--submenu">
                        <li><Link to="/short-tours/3-5-days/annapurna" onClick={closeDropdown}>Annapurna Foothills</Link></li>
                        <li><Link to="/short-tours/3-5-days/langtang" onClick={closeDropdown}>Langtang Valley</Link></li>
                        <li><Link to="/short-tours/3-5-days/everest" onClick={closeDropdown}>Everest View</Link></li>
                      </ul>
                    </li>
                  </ul>
                  </div>
                </li>

                {/* More Dropdown */}
                <li className="header__nav-item">
                  <div 
                    className="header__dropdown-container"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                  <Link 
                    to="/more" 
                    className="header__nav-link header__dropdown-toggle"
                    onMouseEnter={() => setActiveDropdown('more')}
                    onClick={() => toggleDropdown('more')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDropdown('more');
                      }
                    }}
                    aria-expanded={activeDropdown === 'more'}
                    aria-haspopup="true"
                  >
                    More
                    <svg className="header__dropdown-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <ul className={`header__dropdown header__dropdown--multi-level ${activeDropdown === 'more' ? 'active' : ''}`}>
                    <li className="header__dropdown-item--has-submenu" onMouseEnter={handleSubmenuHover}>
                      <Link to="/custom-packages" className="header__dropdown-link--parent">
                        Custom Packages
                        <svg className="header__dropdown-arrow--right" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <ul className="header__dropdown--submenu">
                    <li><Link to="/custom-packages/honeymoon" onClick={closeDropdown}>Honeymoon Packages</Link></li>
                    <li><Link to="/custom-packages/family" onClick={closeDropdown}>Family Packages</Link></li>
                    <li><Link to="/custom-packages/group" onClick={closeDropdown}>Group Packages</Link></li>
                    <li><Link to="/custom-packages/luxury" onClick={closeDropdown}>Luxury Packages</Link></li>
                      </ul>
                    </li>
                    <li><Link to="/blogs" onClick={closeDropdown}>Blogs</Link></li>
                    <li><Link to="/gallery" onClick={closeDropdown}>Gallery</Link></li>
                  </ul>
                  </div>
                </li>
            </ul>
          </nav>

            {/* Angled bottom element */}
            <div className="header__nav-bottom"></div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <div className={`search-overlay ${isSearchOpen ? 'active' : ''}`}>
        <div className="search-overlay__backdrop" onClick={closeSearch}></div>
        <div className="search-overlay__content">
          <div className="search-overlay__header">
            <h2>Search</h2>
            <button 
              className="search-overlay__close" 
              onClick={closeSearch}
              aria-label="Close search"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="search-overlay__input-container">
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search destinations, tours, activities..." 
              className="search-overlay__input"
            />
            <button className="search-overlay__search-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="search-overlay__suggestions">
            <h3>Popular Searches</h3>
            <div className="search-overlay__tags">
              <button className="search-overlay__tag">Everest Trek</button>
              <button className="search-overlay__tag">Kathmandu</button>
              <button className="search-overlay__tag">Adventure Tours</button>
              <button className="search-overlay__tag">Cultural Experience</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Slider */}
      <MobileNavSlider
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Wishlist Slider */}
      <WishlistSlider
        isOpen={isWishlistOpen}
        onClose={closeWishlist}
        wishlistItems={wishlistItems}
        onRemoveItem={removeWishlistItem}
      />
    </>
  );
};

export default Header;
