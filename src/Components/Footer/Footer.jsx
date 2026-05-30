import React from 'react'
import DeveloperLogo from '../../Images/Developer-logo.jpg'
import './Footer.css'

function Footer () {
  return (
    <section className='footer-wrapper'>
      <div className='social-media-icons'>
        <ul>
          <li>
            <a
              href='https://www.linkedin.com/in/yibeltal-yitayew-7604a4370/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-linkedin' style={{ fontSize: '24px' }}></i>
            </a>
          </li>
          <li>
            <a
              href='https://t.me/yibeltalyitayew2024'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-telegram' style={{ fontSize: '24px' }}></i>
            </a>
          </li>
          <li>
            <a
              href='https://web.facebook.com/?ref=homescreenpwa&_rdc=1&_rdr#'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-facebook' style={{ fontSize: '24px' }}></i>
            </a>
          </li>
          <li>
            <a
              href='https://www.youtube.com/@SelamYibeltal-b4f'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-youtube' style={{ fontSize: '28px' }}></i>
            </a>
          </li>
        </ul>
      </div>

      <hr className='custom-hr' />

      <div className='footer-copyright'>
        <small>&copy; 2026 Metages Yibeltal. All rights reserved.</small>
        <ul>
          <li>Terms Of Services</li>
          <li>Privacy Policy</li>
          <li>Accessibility Statement</li>
        </ul>
      </div>

      <section className='dev-logo-container'>
        <p>Designed by Metages Yibeltal</p>
        <img src={DeveloperLogo} alt='Developer logo' />
      </section>
    </section>
  )
}

export default Footer
