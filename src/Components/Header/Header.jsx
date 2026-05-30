// Header.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { Element } from 'react-scroll'
import contact from '../../Images/contact.png'
import './Header.css'

function Header ({ onConnectClick }) {
  const [headerMenu, setHeaderMenu] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll to make the navbar glass effect shift dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home', target: 'profile' },
    { id: 'about', label: 'About', target: 'about' },
    { id: 'services', label: 'Services', target: 'services' },
    { id: 'portfolio', label: 'Portfolio', target: 'portfolio' },
    { id: 'contact', label: 'Contact', target: 'contact' }
  ]

  return (
    <Element name='home'>
      <div className={`header-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
        <nav className='navbar navbar-expand-md navbar-dark custom-nav'>
          <div className='container'>
            <a className='navbar-brand-custom' href='#home'>
              <div className='brand-logo-wrapper'>
                <img src={contact} alt='Logo' className='brand-img' />
              </div>
            </a>

            <button
              className='navbar-toggler custom-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav ms-auto align-items-center nav-gap cursor-change'>
                {navItems.map(item => (
                  <li
                    key={item.id}
                    className={`nav-item-custom ${
                      headerMenu === item.id ? 'active-link' : ''
                    }`}
                  >
                    <Link
                      className='nav-link-custom hover-gradient-text'
                      to={item.target}
                      smooth={true}
                      duration={400}
                      offset={-80}
                      onClick={() => setHeaderMenu(item.id)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className='nav-item-custom ms-md-3'>
                  <button
                    className='connect-btn hover-3d'
                    onClick={onConnectClick}
                  >
                    <span>Let's Talk</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </Element>
  )
}

export default Header
