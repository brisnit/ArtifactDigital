import { useState } from 'react'

const navLinks = ['Care & Services', 'Patients & Visitors', 'Connect & Learn', 'Careers', 'About']
const secondaryLinks = ['Find a Location', 'Find a Provider', 'Make an Appointment', 'MyChart', 'Give']

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="site-header">
      {/* Primary row: logo + main nav */}
      <div className="header-primary">
        <div className="header-logo-section">
          <a href="#" className="header-logo-link" aria-label="Baptist Health home">
            <img src="/BH Logo.png" alt="Baptist Health" className="header-logo-img" />
          </a>
        </div>
        <nav className="header-nav-section" aria-label="Primary navigation">
          <ul className="header-nav-list">
            {navLinks.map(link => (
              <li key={link} className="header-nav-item">
                <a
                  href="#"
                  className={`header-nav-link${link === 'Care & Services' ? ' header-nav-link--active' : ''}`}
                >
                  {link.toUpperCase()}
                </a>
              </li>
            ))}
            <li className="header-nav-item header-nav-search">
              <button className="header-search-btn" aria-label="Search">
                <SearchIcon />
              </button>
            </li>
          </ul>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </nav>
      </div>

      {/* Secondary row: location utility + secondary nav */}
      <div className="header-secondary">
        <div className="header-location-section">
          <a href="#" className="header-location-link">
            <LocationPinIcon />
            Set Your Location
          </a>
        </div>
        <nav className="header-secondary-nav" aria-label="Secondary navigation">
          <ul className="header-secondary-list">
            {secondaryLinks.map(link => (
              <li key={link}>
                <a href="#" className="header-secondary-link">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <a key={link} href="#" className="mobile-menu-link">
              {link}
            </a>
          ))}
          <div className="mobile-menu-divider" />
          {secondaryLinks.map(link => (
            <a key={link} href="#" className="mobile-menu-link mobile-menu-link--secondary">
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
