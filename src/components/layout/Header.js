import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContactModal, AuthModal } from '../ui';
import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Add background when scrolled for better visibility
      setIsScrolled(currentScrollY > 50);
    };

    const handleOpenContactModal = () => setIsContactModalOpen(true);

    // Monitor authentication state
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Expose a global function as a fallback for components that cannot
    // reliably dispatch/listen to custom events in some environments.
    // Components can call `window.openContactModal()` directly.
    window.openContactModal = handleOpenContactModal;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('openContactModal', handleOpenContactModal);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('openContactModal', handleOpenContactModal);
      unsubscribeAuth();
      // Clean up the global function when header unmounts
      try { delete window.openContactModal; } catch (e) { window.openContactModal = undefined; }
    };
  }, []);

  // Lock scroll on mobile when nav is open
  useEffect(() => {
    if (isMenuOpen && window.innerWidth <= 768) {
      document.body.classList.add('nav-locked');
    } else {
      document.body.classList.remove('nav-locked');
    }
    return () => {
      document.body.classList.remove('nav-locked');
    };
  }, [isMenuOpen]);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="nav-brand">
          <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>ConPro<span className="logo-accent">.AI</span></Link>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="mobile-nav-header mobile-only" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            {/* Logo in mobile menu */}
            <div className="nav-brand mobile-only">
              <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>ConPro<span className="logo-accent">.AI</span></Link>
            </div>

            {/* Close button */}
            <button
              className="menu-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                color: 'white'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <ul className="nav-links">
            <li><Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/solutions" className={`nav-link ${isActive('/solutions') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Solutions</Link></li>
            <li
              className="nav-item-dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setIsProductsOpen(true)}
              onMouseLeave={() => window.innerWidth > 768 && setIsProductsOpen(false)}
            >
              <div className="nav-link-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Link
                  to="/products"
                  className={`nav-link ${isActive('/products') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <button
                  className="dropdown-toggle mobile-only"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsProductsOpen(!isProductsOpen);
                  }}
                  aria-label="Toggle Products menu"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.7)',
                    padding: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transform: isProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>

              <ul className={`dropdown-menu ${isProductsOpen ? 'open' : ''}`}>
                <li>
                  <Link
                    to="/agentic-ai-consulting"
                    className={`dropdown-link ${isActive('/agentic-ai-consulting') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agentic AI Consulting
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product-strategy"
                    className={`dropdown-link ${isActive('/product-strategy') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Product Strategy & Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product-development"
                    className={`dropdown-link ${isActive('/product-development') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Product Development
                  </Link>
                </li>
              </ul>
            </li>

            <li><Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link to="/case-studies" className={`nav-link ${isActive('/case-studies') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Case Studies</Link></li>
            <li><Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
            <li><Link to="/company" className={`nav-link ${isActive('/company') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Company</Link></li>
          </ul>
          <div className="nav-contact-btn-wrapper">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                requestAnimationFrame(() => {
                  setTimeout(() => setIsContactModalOpen(true), 80);
                });
              }}
              className="btn btn-primary contact-btn header-contact-btn contact-btn-white"
            >
              Contact US
            </button>
          </div>
        </nav>

        {/* Auth buttons or User Profile - Desktop only */}
        {!user ? (
          <div className="auth-buttons">
            <button 
              className="btn-login"
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
            >
              Login
            </button>
            <button 
              className="btn-signup"
              onClick={() => {
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="user-menu-container">
            <button 
              className="user-avatar-btn"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <div className="avatar-placeholder">
                {user.isAnonymous ? '👤' : (user.email?.[0]?.toUpperCase() || '👤')}
              </div>
            </button>
            
            {showUserDropdown && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-name">
                    {user.isAnonymous ? 'Guest User' : user.displayName || 'User'}
                  </div>
                  {!user.isAnonymous && user.email && (
                    <div className="user-email">{user.email}</div>
                  )}
                </div>
                <hr />
                <button 
                  className="signout-btn"
                  onClick={async () => {
                    try {
                      await signOut(auth);
                      setShowUserDropdown(false);
                    } catch (error) {
                      console.error('Sign out error:', error);
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
        />

        {/* Hamburger menu button */}
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
