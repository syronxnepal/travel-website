import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MobileNavSlider.scss';

interface MobileNavSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavSlider: React.FC<MobileNavSliderProps> = ({
  isOpen,
  onClose
}) => {
  const [activeDropdowns, setActiveDropdowns] = useState<Set<string>>(new Set());

  const toggleDropdown = (dropdown: string, event?: React.MouseEvent) => {
    // Prevent any default behavior and stop propagation
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setActiveDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dropdown)) {
        // If closing, also close all child dropdowns
        newSet.delete(dropdown);
        // Remove child dropdowns (e.g., if closing 'trekking', also close 'everest', 'annapurna', etc.)
        if (dropdown === 'trekking') {
          newSet.delete('everest');
          newSet.delete('annapurna');
          newSet.delete('manaslu');
          newSet.delete('langtang');
        } else if (dropdown === 'tours') {
          newSet.delete('cultural');
          newSet.delete('adventure');
          newSet.delete('nature');
          newSet.delete('historical');
        } else if (dropdown === 'short-tours') {
          newSet.delete('day-trips');
          newSet.delete('weekend');
          newSet.delete('3-5-days');
        } else if (dropdown === 'more') {
          newSet.delete('custom-packages');
        }
      } else {
        newSet.add(dropdown);
      }
      return newSet;
    });
  };

  const isDropdownOpen = (dropdown: string): boolean => {
    return activeDropdowns.has(dropdown);
  };

  const handleLinkClick = () => {
    onClose();
    setActiveDropdowns(new Set());
  };

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
        className={`mobile-nav-slider__backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className={`mobile-nav-slider ${isOpen ? 'active' : ''}`}>
        <div className="mobile-nav-slider__header">
          <h3 className="mobile-nav-slider__title">
            <i className="fa-solid fa-bars"></i>
            Menu
          </h3>
          <button 
            className="mobile-nav-slider__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="mobile-nav-slider__content">
          <nav className="mobile-nav-slider__nav">
            <ul className="mobile-nav-slider__nav-list">
              <li>
                <Link to="/" className="mobile-nav-slider__nav-link" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              
              {/* About Dropdown */}
              <li className="mobile-nav-slider__nav-item">
                <button
                  className="mobile-nav-slider__nav-link mobile-nav-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('about', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('about')}
                >
                  About
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('about') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`mobile-nav-slider__dropdown ${isDropdownOpen('about') ? 'active' : ''}`}>
                  <li>
                    <Link to="/our-story" onClick={handleLinkClick}>Our Story</Link>
                  </li>
                  <li>
                    <Link to="/why-choose-us" onClick={handleLinkClick}>Why Choose Us</Link>
                  </li>
                </ul>
              </li>
              
              <li>
                <Link to="/contact" className="mobile-nav-slider__nav-link" onClick={handleLinkClick}>
                  Contact
                </Link>
              </li>
                
              {/* Trekking Dropdown */}
              <li className="mobile-nav-slider__nav-item">
                <button
                  className="mobile-nav-slider__nav-link mobile-nav-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('trekking', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('trekking')}
                >
                  Trekking
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('trekking') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`mobile-nav-slider__dropdown ${isDropdownOpen('trekking') ? 'active' : ''}`}>
                  <li>
                    <Link to="/trekking" onClick={handleLinkClick}>All Trekking</Link>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('everest', e)}
                      type="button"
                    >
                      Everest Base Camp
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('everest') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('everest') ? 'active' : ''}`}>
                      <li><Link to="/trekking#everest-classic" onClick={handleLinkClick}>Classic Route</Link></li>
                      <li><Link to="/trekking#everest-gokyo" onClick={handleLinkClick}>Gokyo Lakes</Link></li>
                      <li><Link to="/trekking#everest-three-passes" onClick={handleLinkClick}>Three Passes</Link></li>
                    </ul>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('annapurna', e)}
                      type="button"
                    >
                      Annapurna Circuit
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('annapurna') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('annapurna') ? 'active' : ''}`}>
                      <li><Link to="/trekking#annapurna-circuit" onClick={handleLinkClick}>Full Circuit</Link></li>
                      <li><Link to="/trekking#annapurna-santuary" onClick={handleLinkClick}>Sanctuary Trek</Link></li>
                      <li><Link to="/trekking#annapurna-poon-hill" onClick={handleLinkClick}>Poon Hill</Link></li>
                    </ul>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('manaslu', e)}
                      type="button"
                    >
                      Manaslu Trek
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('manaslu') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('manaslu') ? 'active' : ''}`}>
                      <li><Link to="/trekking#manaslu-circuit" onClick={handleLinkClick}>Manaslu Circuit</Link></li>
                      <li><Link to="/trekking#manaslu-tsum-valley" onClick={handleLinkClick}>Tsum Valley</Link></li>
                      <li><Link to="/trekking#manaslu-larkya" onClick={handleLinkClick}>Larkya Pass</Link></li>
                    </ul>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('langtang', e)}
                      type="button"
                    >
                      Langtang Valley
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('langtang') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('langtang') ? 'active' : ''}`}>
                      <li><Link to="/trekking#langtang-valley" onClick={handleLinkClick}>Valley Trek</Link></li>
                      <li><Link to="/trekking#langtang-gosainkunda" onClick={handleLinkClick}>Gosainkunda</Link></li>
                      <li><Link to="/trekking#langtang-helambu" onClick={handleLinkClick}>Helambu</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* Tours Dropdown */}
              <li className="mobile-nav-slider__nav-item">
                <button
                  className="mobile-nav-slider__nav-link mobile-nav-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('tours', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('tours')}
                >
                  Tours
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('tours') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`mobile-nav-slider__dropdown ${isDropdownOpen('tours') ? 'active' : ''}`}>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('cultural', e)}
                      type="button"
                    >
                      Cultural Tours
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('cultural') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('cultural') ? 'active' : ''}`}>
                      <li><Link to="/tours/cultural/heritage" onClick={handleLinkClick}>Heritage Sites</Link></li>
                      <li><Link to="/tours/cultural/temples" onClick={handleLinkClick}>Temple Tours</Link></li>
                      <li><Link to="/tours/cultural/villages" onClick={handleLinkClick}>Village Life</Link></li>
                    </ul>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('adventure', e)}
                      type="button"
                    >
                      Adventure Tours
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('adventure') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('adventure') ? 'active' : ''}`}>
                      <li><Link to="/tours/adventure/rafting" onClick={handleLinkClick}>White Water Rafting</Link></li>
                      <li><Link to="/tours/adventure/paragliding" onClick={handleLinkClick}>Paragliding</Link></li>
                      <li><Link to="/tours/adventure/bungee" onClick={handleLinkClick}>Bungee Jumping</Link></li>
                    </ul>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('nature', e)}
                      type="button"
                    >
                      Nature Tours
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('nature') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('nature') ? 'active' : ''}`}>
                      <li><Link to="/tours/nature/wildlife" onClick={handleLinkClick}>Wildlife Safari</Link></li>
                      <li><Link to="/tours/nature/bird-watching" onClick={handleLinkClick}>Bird Watching</Link></li>
                      <li><Link to="/tours/nature/national-parks" onClick={handleLinkClick}>National Parks</Link></li>
                    </ul>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('historical', e)}
                      type="button"
                    >
                      Historical Tours
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('historical') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('historical') ? 'active' : ''}`}>
                      <li><Link to="/tours/historical/palaces" onClick={handleLinkClick}>Royal Palaces</Link></li>
                      <li><Link to="/tours/historical/museums" onClick={handleLinkClick}>Museums</Link></li>
                      <li><Link to="/tours/historical/architecture" onClick={handleLinkClick}>Architecture</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* Short Tours Dropdown */}
              <li className="mobile-nav-slider__nav-item">
                <button
                  className="mobile-nav-slider__nav-link mobile-nav-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('short-tours', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('short-tours')}
                >
                  Short Tours
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('short-tours') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`mobile-nav-slider__dropdown ${isDropdownOpen('short-tours') ? 'active' : ''}`}>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('day-trips', e)}
                      type="button"
                    >
                      Day Trips
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('day-trips') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('day-trips') ? 'active' : ''}`}>
                      <li><Link to="/short-tours/day-trips/kathmandu" onClick={handleLinkClick}>Kathmandu Valley</Link></li>
                      <li><Link to="/short-tours/day-trips/pokhara" onClick={handleLinkClick}>Pokhara City</Link></li>
                      <li><Link to="/short-tours/day-trips/chitwan" onClick={handleLinkClick}>Chitwan Safari</Link></li>
                    </ul>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('weekend', e)}
                      type="button"
                    >
                      Weekend Getaways
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('weekend') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('weekend') ? 'active' : ''}`}>
                      <li><Link to="/short-tours/weekend/nagarkot" onClick={handleLinkClick}>Nagarkot Sunrise</Link></li>
                      <li><Link to="/short-tours/weekend/dhulikhel" onClick={handleLinkClick}>Dhulikhel Retreat</Link></li>
                      <li><Link to="/short-tours/weekend/bandipur" onClick={handleLinkClick}>Bandipur Heritage</Link></li>
                    </ul>
                  </li>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('3-5-days', e)}
                      type="button"
                    >
                      3-5 Days
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('3-5-days') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('3-5-days') ? 'active' : ''}`}>
                      <li><Link to="/short-tours/3-5-days/annapurna" onClick={handleLinkClick}>Annapurna Foothills</Link></li>
                      <li><Link to="/short-tours/3-5-days/langtang" onClick={handleLinkClick}>Langtang Valley</Link></li>
                      <li><Link to="/short-tours/3-5-days/everest" onClick={handleLinkClick}>Everest View</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* More Dropdown */}
              <li className="mobile-nav-slider__nav-item">
                <button
                  className="mobile-nav-slider__nav-link mobile-nav-slider__dropdown-toggle"
                  onClick={(e) => toggleDropdown('more', e)}
                  type="button"
                  aria-expanded={isDropdownOpen('more')}
                >
                  More
                  <i className={`fa-solid fa-chevron-${isDropdownOpen('more') ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`mobile-nav-slider__dropdown ${isDropdownOpen('more') ? 'active' : ''}`}>
                  <li className="mobile-nav-slider__nav-item--has-submenu">
                    <button
                      className="mobile-nav-slider__dropdown-link--parent"
                      onClick={(e) => toggleDropdown('custom-packages', e)}
                      type="button"
                    >
                      Custom Packages
                      <i className={`fa-solid fa-chevron-${isDropdownOpen('custom-packages') ? 'up' : 'down'}`}></i>
                    </button>
                    <ul className={`mobile-nav-slider__submenu ${isDropdownOpen('custom-packages') ? 'active' : ''}`}>
                      <li><Link to="/custom-packages/honeymoon" onClick={handleLinkClick}>Honeymoon Packages</Link></li>
                      <li><Link to="/custom-packages/family" onClick={handleLinkClick}>Family Packages</Link></li>
                      <li><Link to="/custom-packages/group" onClick={handleLinkClick}>Group Packages</Link></li>
                      <li><Link to="/custom-packages/luxury" onClick={handleLinkClick}>Luxury Packages</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/blogs" onClick={handleLinkClick}>Blogs</Link>
                  </li>
                  <li>
                    <Link to="/gallery" onClick={handleLinkClick}>Gallery</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileNavSlider;

