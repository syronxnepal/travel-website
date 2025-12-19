import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import CMSMobileMenuSlider from '../CMSMobileMenuSlider/CMSMobileMenuSlider';
import 'src/components/CMS/CMSLayout/CMSLayout.scss';

interface CMSLayoutProps {
  children: React.ReactNode;
}

interface CMSSection {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: string;
}

interface HomePageSubItem {
  id: string;
  name: string;
  path: string;
  icon: string;
}

const CMSLayout: React.FC<CMSLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize state based on current path
  const [isHomePageOpen, setIsHomePageOpen] = useState(() => {
    return location.pathname.includes('/cms/home/');
  });
  const [isAboutPageOpen, setIsAboutPageOpen] = useState(() => {
    return location.pathname.includes('/cms/about/');
  });
  const [isContactPageOpen, setIsContactPageOpen] = useState(() => {
    return location.pathname.includes('/cms/contact/');
  });
  const [isTrekMenuOpen, setIsTrekMenuOpen] = useState(() => {
    return location.pathname.includes('/cms/treks/');
  });
  const [isTourMenuOpen, setIsTourMenuOpen] = useState(() => {
    return location.pathname.includes('/cms/tours/');
  });
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(() => {
    return location.pathname.includes('/cms/blogs/');
  });
  const [isGalleryMenuOpen, setIsGalleryMenuOpen] = useState(() => {
    return location.pathname.includes('/cms/gallery');
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(() => {
    return location.pathname.includes('/cms/users/');
  });

  // Update state when location changes
  useEffect(() => {
    setIsHomePageOpen(location.pathname.includes('/cms/home/'));
    setIsAboutPageOpen(location.pathname.includes('/cms/about/'));
    setIsContactPageOpen(location.pathname.includes('/cms/contact/'));
    setIsTrekMenuOpen(location.pathname.includes('/cms/treks/'));
    setIsTourMenuOpen(location.pathname.includes('/cms/tours/'));
    setIsBlogMenuOpen(location.pathname.includes('/cms/blogs/'));
    setIsGalleryMenuOpen(location.pathname.includes('/cms/gallery'));
    setIsUserMenuOpen(location.pathname.includes('/cms/users/'));
  }, [location.pathname]);

  const homePageSubItems: HomePageSubItem[] = [
    {
      id: 'hero-section',
      name: 'Hero Section',
      path: '/cms/home/hero-section',
      icon: 'fa-home'
    },
    {
      id: 'top-trek-section',
      name: 'Top Trek Section',
      path: '/cms/home/top-trek-section',
      icon: 'fa-mountain'
    },
    {
      id: 'top-tours-section',
      name: 'Top Tours Section',
      path: '/cms/home/top-tours-section',
      icon: 'fa-plane'
    },
    {
      id: 'testimonials-section',
      name: 'Testimonials Section',
      path: '/cms/home/testimonials-section',
      icon: 'fa-quote-left'
    },
    {
      id: 'why-choose-us-section',
      name: 'Why Choose Us Section',
      path: '/cms/home/why-choose-us-section',
      icon: 'fa-star'
    },
    {
      id: 'blog-section',
      name: 'Blog Section',
      path: '/cms/home/blog-section',
      icon: 'fa-blog'
    }
  ];

  const aboutPageSubItems: HomePageSubItem[] = [
    {
      id: 'about-intro-section',
      name: 'About Intro',
      path: '/cms/about/intro-section',
      icon: 'fa-info-circle'
    },
    {
      id: 'about-why-choose-us',
      name: 'Why Choose Us',
      path: '/cms/about/why-choose-us',
      icon: 'fa-star'
    }
  ];

  const contactPageSubItems: HomePageSubItem[] = [
    {
      id: 'contact-info',
      name: 'Contact Information',
      path: '/cms/contact/info',
      icon: 'fa-info-circle'
    }
  ];

  const trekMenuItems: HomePageSubItem[] = [
    {
      id: 'manage-treks',
      name: 'Manage Treks',
      path: '/cms/treks/manage',
      icon: 'fa-list'
    }
  ];

  const tourMenuItems: HomePageSubItem[] = [
    {
      id: 'manage-tours',
      name: 'Manage Tours',
      path: '/cms/tours/manage',
      icon: 'fa-list'
    },
    {
      id: 'manage-short-tours',
      name: 'Manage Short Tours',
      path: '/cms/tours/manage-short',
      icon: 'fa-clock'
    }
  ];

  const blogMenuItems: HomePageSubItem[] = [
    {
      id: 'manage-blogs',
      name: 'Manage Blogs',
      path: '/cms/blogs/manage',
      icon: 'fa-list'
    },
    {
      id: 'blog-categories',
      name: 'Blog Categories',
      path: '/cms/blogs/categories',
      icon: 'fa-tags'
    }
  ];

  const galleryMenuItems: HomePageSubItem[] = [
    {
      id: 'gallery-section',
      name: 'Gallery Section',
      path: '/cms/gallery-section',
      icon: 'fa-images'
    },
    {
      id: 'gallery-categories',
      name: 'Gallery Categories',
      path: '/cms/gallery/categories',
      icon: 'fa-tags'
    }
  ];

  const testimonialMenuItems: HomePageSubItem[] = [
    {
      id: 'manage-testimonials',
      name: 'Manage Testimonials',
      path: '/cms/testimonials/manage',
      icon: 'fa-list'
    }
  ];

  const bookingMenuItems: HomePageSubItem[] = [
    {
      id: 'manage-bookings',
      name: 'Manage Bookings',
      path: '/cms/bookings/manage',
      icon: 'fa-list'
    }
  ];

  const contactMenuItems: HomePageSubItem[] = [
    {
      id: 'manage-contacts',
      name: 'Manage Contacts',
      path: '/cms/contacts/manage',
      icon: 'fa-list'
    }
  ];

  const pagesMenuItems: HomePageSubItem[] = [
    {
      id: 'manage-pages',
      name: 'Manage Pages',
      path: '/cms/pages/manage',
      icon: 'fa-list'
    }
  ];

  const userMenuItems: HomePageSubItem[] = [
    {
      id: 'manage-users',
      name: 'Manage Users',
      path: '/cms/users/manage',
      icon: 'fa-users'
    },
    {
      id: 'manage-roles',
      name: 'Roles',
      path: '/cms/users/roles',
      icon: 'fa-user-shield'
    }
  ];

  const sections: CMSSection[] = [
    {
      id: 'gallery-section',
      name: 'Gallery Section',
      path: '/cms/gallery-section',
      description: 'Manage photo gallery and featured images',
      icon: 'fa-images'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const isHomePageSubItemActive = () => {
    return homePageSubItems.some(item => location.pathname === item.path);
  };

  const isAboutPageSubItemActive = () => {
    return aboutPageSubItems.some(item => location.pathname === item.path);
  };

  const isContactPageSubItemActive = () => {
    return contactPageSubItems.some(item => location.pathname === item.path);
  };

  const isTrekMenuSubItemActive = () => {
    return trekMenuItems.some(item => location.pathname === item.path);
  };

  const isTourMenuSubItemActive = () => {
    return tourMenuItems.some(item => location.pathname === item.path);
  };

  const isBlogMenuSubItemActive = () => {
    return blogMenuItems.some(item => location.pathname === item.path);
  };

  const isGalleryMenuSubItemActive = () => {
    return galleryMenuItems.some(item => location.pathname === item.path);
  };

  const isPagesMenuSubItemActive = () => {
    return pagesMenuItems.some(item => location.pathname === item.path);
  };

  const isUserMenuSubItemActive = () => {
    return userMenuItems.some(item => location.pathname === item.path);
  };

  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(() => {
    return location.pathname.includes('/cms/pages/');
  });

  useEffect(() => {
    setIsPagesMenuOpen(location.pathname.includes('/cms/pages/'));
  }, [location.pathname]);

  return (
    <div className="cms-layout">
      <div className="cms-layout__header">
        <div className="cms-layout__header-content">
          <div className="cms-layout__header-left">
            <button 
              className="cms-layout__menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <h1 className="cms-layout__title">
              <i className="fa-solid fa-cogs"></i>
              Content Management System
            </h1>
            <p className="cms-layout__subtitle">Manage your homepage content and sections</p>
          </div>
          <div className="cms-layout__header-right">
            <Link to="/" className="cms-layout__back-btn">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Website
            </Link>
            
            <div className="cms-layout__user-menu">
              <div 
                className="cms-layout__user-trigger"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt={typeof user?.name === 'string' ? user.name : 'User'} className="cms-layout__user-avatar" />
                <span className="cms-layout__user-name">{typeof user?.name === 'string' ? user.name : 'User'}</span>
                <i className={`fa-solid fa-chevron-${isProfileDropdownOpen ? 'up' : 'down'} cms-layout__user-chevron`}></i>
              </div>
              
              {isProfileDropdownOpen && (
                <div className="cms-layout__user-dropdown">
                  <div className="cms-layout__user-info">
                    <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt={typeof user?.name === 'string' ? user.name : 'User'} />
                    <div>
                      <strong>{typeof user?.name === 'string' ? user.name : 'User'}</strong>
                      <span>{typeof user?.email === 'string' ? user.email : ''}</span>
                      <span className={`cms-layout__user-role cms-layout__user-role--${typeof user?.role === 'string' ? user.role : 'viewer'}`}>
                        {typeof user?.role === 'string' ? user.role : 'viewer'}
                      </span>
                    </div>
                  </div>
                  <div className="cms-layout__user-actions">
                    <button 
                      className="cms-layout__user-action-btn"
                      onClick={() => {
                        navigate('/cms/users/profile');
                        setIsProfileDropdownOpen(false);
                      }}
                    >
                      <i className="fa-solid fa-user"></i>
                      Profile
                    </button>
                    <button 
                      className="cms-layout__user-action-btn"
                      onClick={() => {
                        navigate('/cms/dashboard');
                        setIsProfileDropdownOpen(false);
                      }}
                    >
                      <i className="fa-solid fa-cog"></i>
                      Settings
                    </button>
                    {typeof user?.role === 'string' && user.role === 'admin' && (
                      <button 
                        className="cms-layout__user-action-btn"
                        onClick={() => {
                          navigate('/cms/users/manage');
                          setIsProfileDropdownOpen(false);
                        }}
                      >
                        <i className="fa-solid fa-users"></i>
                        User Management
                      </button>
                    )}
                    <button 
                      className="cms-layout__user-action-btn cms-layout__user-action-btn--logout"
                      onClick={logout}
                    >
                      <i className="fa-solid fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="cms-layout__body">
        <div className="cms-layout__sidebar cms-layout__sidebar--desktop">
          <nav className="cms-layout__nav">
            <ul className="cms-layout__nav-list">
              {/* Dashboard */}
              <li className="cms-layout__nav-item">
                <Link
                  to="/cms/dashboard"
                  className={`cms-layout__nav-btn ${isActive('/cms/dashboard') ? 'active' : ''}`}
                >
                  <i className="fa-solid fa-gauge"></i>
                  <span className="cms-layout__nav-text">Dashboard</span>
                </Link>
              </li>

              {/* Home Page Menu with Sub-items */}
              <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                <div
                  className={`cms-layout__nav-btn ${isHomePageSubItemActive() ? 'active' : ''}`}
                  onClick={() => setIsHomePageOpen(!isHomePageOpen)}
                >
                  <i className="fa-solid fa-globe"></i>
                  <span className="cms-layout__nav-text">Home Page</span>
                  <i className={`fa-solid fa-chevron-${isHomePageOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                </div>
                {isHomePageOpen && (
                  <ul className="cms-layout__nav-sublist">
                    {homePageSubItems.map((item) => (
                      <li key={item.id} className="cms-layout__nav-item">
                        <Link
                          to={item.path}
                          className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          <span className="cms-layout__nav-text">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* About Page Menu with Sub-items */}
              <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                <div
                  className={`cms-layout__nav-btn ${isAboutPageSubItemActive() ? 'active' : ''}`}
                  onClick={() => setIsAboutPageOpen(!isAboutPageOpen)}
                >
                  <i className="fa-solid fa-info-circle"></i>
                  <span className="cms-layout__nav-text">About Page</span>
                  <i className={`fa-solid fa-chevron-${isAboutPageOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                </div>
                {isAboutPageOpen && (
                  <ul className="cms-layout__nav-sublist">
                    {aboutPageSubItems.map((item) => (
                      <li key={item.id} className="cms-layout__nav-item">
                        <Link
                          to={item.path}
                          className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          <span className="cms-layout__nav-text">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Contact Page Menu with Sub-items */}
              <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                <div
                  className={`cms-layout__nav-btn ${isContactPageSubItemActive() ? 'active' : ''}`}
                  onClick={() => setIsContactPageOpen(!isContactPageOpen)}
                >
                  <i className="fa-solid fa-envelope"></i>
                  <span className="cms-layout__nav-text">Contact Page</span>
                  <i className={`fa-solid fa-chevron-${isContactPageOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                </div>
                {isContactPageOpen && (
                  <ul className="cms-layout__nav-sublist">
                    {contactPageSubItems.map((item) => (
                      <li key={item.id} className="cms-layout__nav-item">
                        <Link
                          to={item.path}
                          className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          <span className="cms-layout__nav-text">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Trek Menu with Sub-items */}
              <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                <div
                  className={`cms-layout__nav-btn ${isTrekMenuSubItemActive() ? 'active' : ''}`}
                  onClick={() => setIsTrekMenuOpen(!isTrekMenuOpen)}
                >
                  <i className="fa-solid fa-mountain"></i>
                  <span className="cms-layout__nav-text">Treks</span>
                  <i className={`fa-solid fa-chevron-${isTrekMenuOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                </div>
                {isTrekMenuOpen && (
                  <ul className="cms-layout__nav-sublist">
                    {trekMenuItems.map((item) => (
                      <li key={item.id} className="cms-layout__nav-item">
                        <Link
                          to={item.path}
                          className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          <span className="cms-layout__nav-text">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Tour Menu with Sub-items */}
              <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                <div
                  className={`cms-layout__nav-btn ${isTourMenuSubItemActive() ? 'active' : ''}`}
                  onClick={() => setIsTourMenuOpen(!isTourMenuOpen)}
                >
                  <i className="fa-solid fa-route"></i>
                  <span className="cms-layout__nav-text">Tours</span>
                  <i className={`fa-solid fa-chevron-${isTourMenuOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                </div>
                {isTourMenuOpen && (
                  <ul className="cms-layout__nav-sublist">
                    {tourMenuItems.map((item) => (
                      <li key={item.id} className="cms-layout__nav-item">
                        <Link
                          to={item.path}
                          className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          <span className="cms-layout__nav-text">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Blog Menu with Sub-items */}
              <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                <div
                  className={`cms-layout__nav-btn ${isBlogMenuSubItemActive() ? 'active' : ''}`}
                  onClick={() => setIsBlogMenuOpen(!isBlogMenuOpen)}
                >
                  <i className="fa-solid fa-blog"></i>
                  <span className="cms-layout__nav-text">Blogs</span>
                  <i className={`fa-solid fa-chevron-${isBlogMenuOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                </div>
                {isBlogMenuOpen && (
                  <ul className="cms-layout__nav-sublist">
                    {blogMenuItems.map((item) => (
                      <li key={item.id} className="cms-layout__nav-item">
                        <Link
                          to={item.path}
                          className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          <span className="cms-layout__nav-text">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Gallery Menu with Sub-items */}
              <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                <div
                  className={`cms-layout__nav-btn ${isGalleryMenuSubItemActive() ? 'active' : ''}`}
                  onClick={() => setIsGalleryMenuOpen(!isGalleryMenuOpen)}
                >
                  <i className="fa-solid fa-images"></i>
                  <span className="cms-layout__nav-text">Gallery</span>
                  <i className={`fa-solid fa-chevron-${isGalleryMenuOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                </div>
                {isGalleryMenuOpen && (
                  <ul className="cms-layout__nav-sublist">
                    {galleryMenuItems.map((item) => (
                      <li key={item.id} className="cms-layout__nav-item">
                        <Link
                          to={item.path}
                          className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          <span className="cms-layout__nav-text">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Testimonial Menu */}
              <li className="cms-layout__nav-item">
                <Link
                  to="/cms/testimonials/manage"
                  className={`cms-layout__nav-btn ${isActive('/cms/testimonials/manage') ? 'active' : ''}`}
                >
                  <i className="fa-solid fa-quote-left"></i>
                  <span className="cms-layout__nav-text">Testimonials</span>
                </Link>
              </li>

              {/* Booking Menu */}
              <li className="cms-layout__nav-item">
                <Link
                  to="/cms/bookings/manage"
                  className={`cms-layout__nav-btn ${isActive('/cms/bookings/manage') ? 'active' : ''}`}
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  <span className="cms-layout__nav-text">Bookings</span>
                </Link>
              </li>

              {/* Contact Menu */}
              <li className="cms-layout__nav-item">
                <Link
                  to="/cms/contacts/manage"
                  className={`cms-layout__nav-btn ${isActive('/cms/contacts/manage') ? 'active' : ''}`}
                >
                  <i className="fa-solid fa-address-book"></i>
                  <span className="cms-layout__nav-text">Contacts</span>
                </Link>
              </li>

              {/* Pages Menu */}
              <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                <div
                  className={`cms-layout__nav-btn ${isPagesMenuSubItemActive() ? 'active' : ''}`}
                  onClick={() => setIsPagesMenuOpen(!isPagesMenuOpen)}
                >
                  <i className="fa-solid fa-file"></i>
                  <span className="cms-layout__nav-text">Pages</span>
                  <i className={`fa-solid fa-chevron-${isPagesMenuOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                </div>
                {isPagesMenuOpen && (
                  <ul className="cms-layout__nav-sublist">
                    {pagesMenuItems.map((item) => (
                      <li key={item.id} className="cms-layout__nav-item">
                        <Link
                          to={item.path}
                          className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                          <span className="cms-layout__nav-text">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* User Management - Admin Only */}
              {user?.role === 'admin' && (
                <li className="cms-layout__nav-item cms-layout__nav-item--parent">
                  <div
                    className={`cms-layout__nav-btn ${isUserMenuSubItemActive() ? 'active' : ''}`}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <i className="fa-solid fa-user-gear"></i>
                    <span className="cms-layout__nav-text">Users</span>
                    <i className={`fa-solid fa-chevron-${isUserMenuOpen ? 'down' : 'right'} cms-layout__chevron`}></i>
                  </div>
                  {isUserMenuOpen && (
                    <ul className="cms-layout__nav-sublist">
                      {userMenuItems.map((item) => (
                        <li key={item.id} className="cms-layout__nav-item">
                          <Link
                            to={item.path}
                            className={`cms-layout__nav-btn cms-layout__nav-btn--sub ${isActive(item.path) ? 'active' : ''}`}
                          >
                            <i className={`fa-solid ${item.icon}`}></i>
                            <span className="cms-layout__nav-text">{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}

              {/* Other Sections */}
              {sections.map((section) => (
                <li key={section.id} className="cms-layout__nav-item">
                  <Link
                    to={section.path}
                    className={`cms-layout__nav-btn ${isActive(section.path) ? 'active' : ''}`}
                  >
                    <i className={`fa-solid ${section.icon}`}></i>
                    <span className="cms-layout__nav-text">{section.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="cms-layout__main">
          <div className="cms-layout__content">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Menu Slider */}
      <CMSMobileMenuSlider
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default CMSLayout;
