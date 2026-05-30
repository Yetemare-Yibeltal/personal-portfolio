// Header.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-scroll'
import { Element } from 'react-scroll'
import contact from '../../Images/contact.png'
import './Header.css'

/* ─────────────────────────────────────────────
   📊 SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function ScrollProgressBar () {
  const barRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const pct = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0
      if (barRef.current) barRef.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div className='scroll-progress-bar' ref={barRef} aria-hidden='true' />
}

/* ─────────────────────────────────────────────
   ✨ HEADER PARTICLE CANVAS
   Tiny glowing dots float inside the navbar
───────────────────────────────────────────── */
function HeaderParticles () {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const colors = ['#06dce7', '#a855f7', '#f704ce', '#ed8003']

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.025
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.save()
        ctx.globalAlpha = a
        ctx.fillStyle = p.color
        ctx.shadowBlur = 6
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='header-particle-canvas'
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden='true'
    />
  )
}

/* ─────────────────────────────────────────────
   🧲 MAGNETIC NAV LINK
   Subtly pulls toward cursor on hover
───────────────────────────────────────────── */
function MagneticNavLink ({ to, label, icon, isActive, onClick }) {
  const linkRef = useRef(null)

  const onMove = useCallback(e => {
    const el = linkRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.22
    const dy = (e.clientY - cy) * 0.22
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])

  const onLeave = useCallback(() => {
    if (linkRef.current) linkRef.current.style.transform = ''
  }, [])

  return (
    <li
      className={`nav-item-custom ${isActive ? 'active-link' : ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Link
        ref={linkRef}
        className='nav-link-custom hover-gradient-text'
        to={to}
        smooth={true}
        duration={500}
        offset={-80}
        onClick={onClick}
      >
        <i className={`${icon} nav-link-icon`} aria-hidden='true' />
        {label}
      </Link>
    </li>
  )
}

/* ─────────────────────────────────────────────
   🧲 MAGNETIC BUTTON wrapper
───────────────────────────────────────────── */
function MagneticBtn ({ onClick }) {
  const wrapRef = useRef(null)

  const onMove = useCallback(e => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.3
    const dy = (e.clientY - cy) * 0.3
    el.style.transform = `translate(${dx}px, ${dy}px) translateY(-4px) scale(1.04)`
  }, [])

  const onLeave = useCallback(() => {
    if (wrapRef.current) wrapRef.current.style.transform = ''
  }, [])

  return (
    <li className='nav-item-custom ms-md-2'>
      <button
        ref={wrapRef}
        className='connect-btn'
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        aria-label='Open contact form'
      >
        {/* Dashed rotating orbit ring */}
        <span className='btn-ring' aria-hidden='true' />

        <span className='connect-btn-inner'>
          <span className='btn-pulse-dot' aria-hidden='true' />
          <span>Let's Talk</span>
          <i className='fa-solid fa-arrow-right' aria-hidden='true' />
        </span>
      </button>
    </li>
  )
}

/* ─────────────────────────────────────────────
   🏗️ MAIN HEADER COMPONENT
───────────────────────────────────────────── */
const navItems = [
  { id: 'home', label: 'Home', target: 'profile', icon: 'fa-solid fa-house' },
  { id: 'about', label: 'About', target: 'about', icon: 'fa-solid fa-user' },
  {
    id: 'services',
    label: 'Services',
    target: 'services',
    icon: 'fa-solid fa-layer-group'
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    target: 'portfolio',
    icon: 'fa-solid fa-briefcase'
  },
  {
    id: 'contact',
    label: 'Contact',
    target: 'contact',
    icon: 'fa-solid fa-envelope'
  }
]

function Header ({ onConnectClick }) {
  const [activeMenu, setActiveMenu] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* IntersectionObserver — auto-highlight nav by visible section */
  useEffect(() => {
    const targets = navItems
      .map(
        n =>
          document.getElementById(n.target) ||
          document.querySelector(`[name="${n.target}"]`)
      )
      .filter(Boolean)
    if (!targets.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const match = navItems.find(
              n =>
                n.target === entry.target.getAttribute('name') ||
                n.target === entry.target.id
            )
            if (match) setActiveMenu(match.id)
          }
        })
      },
      { threshold: 0.4 }
    )
    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  /* Close mobile menu on link click */
  const handleNavClick = id => {
    setActiveMenu(id)
    setMenuOpen(false)
  }

  return (
    <>
      <ScrollProgressBar />

      <Element name='home'>
        <div className={`header-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
          {/* Floating particles inside navbar */}
          <HeaderParticles />

          <nav
            className='navbar navbar-expand-md navbar-dark'
            style={{ position: 'relative', zIndex: 2 }}
          >
            <div className='container'>
              {/* ── BRAND LOGO + NAME ── */}
              <a
                className='navbar-brand-custom d-flex align-items-center'
                href='#home'
              >
                <div className='brand-logo-wrapper'>
                  <img
                    src={contact}
                    alt='Yetemare Yibeltal logo'
                    className='brand-img'
                  />
                </div>
                <div className='brand-name-badge'>
                  <span className='brand-name-top'>Yetemare</span>
                  <span className='brand-name-sub'>Full Stack Developer</span>
                </div>
              </a>

              {/* ── MOBILE TOGGLER ── */}
              <button
                className='navbar-toggler custom-toggler'
                type='button'
                aria-controls='navbarNav'
                aria-expanded={menuOpen}
                aria-label='Toggle navigation'
                onClick={() => setMenuOpen(prev => !prev)}
              >
                {/* Animated hamburger → X */}
                <span
                  style={{
                    display: 'block',
                    width: 22,
                    height: 2,
                    background: '#fff',
                    borderRadius: 2,
                    margin: '4px 0',
                    transition: 'transform 0.35s ease, opacity 0.3s ease',
                    transform: menuOpen
                      ? 'translateY(6px) rotate(45deg)'
                      : 'none'
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: 22,
                    height: 2,
                    background: '#fff',
                    borderRadius: 2,
                    margin: '4px 0',
                    transition: 'opacity 0.3s ease',
                    opacity: menuOpen ? 0 : 1
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: 22,
                    height: 2,
                    background: '#fff',
                    borderRadius: 2,
                    margin: '4px 0',
                    transition: 'transform 0.35s ease, opacity 0.3s ease',
                    transform: menuOpen
                      ? 'translateY(-6px) rotate(-45deg)'
                      : 'none'
                  }}
                />
              </button>

              {/* ── NAV LINKS ── */}
              <div
                className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
                id='navbarNav'
              >
                <ul className='navbar-nav ms-auto align-items-center nav-gap'>
                  {navItems.map(item => (
                    <MagneticNavLink
                      key={item.id}
                      to={item.target}
                      label={item.label}
                      icon={item.icon}
                      isActive={activeMenu === item.id}
                      onClick={() => handleNavClick(item.id)}
                    />
                  ))}

                  {/* ── CTA BUTTON ── */}
                  <MagneticBtn onClick={onConnectClick} />
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </Element>
    </>
  )
}

export default Header
