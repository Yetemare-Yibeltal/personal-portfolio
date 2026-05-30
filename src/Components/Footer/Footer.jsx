import React, { useEffect, useRef, useState } from 'react'
import DeveloperLogo from '../../Images/Developer-logo.jpg'
import './Footer.css'

function Footer () {
  const canvasRef = useRef(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const footerRef = useRef(null)

  /* ── Particle canvas background ── */
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let w, h, particles

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    const initParticles = () => {
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(4,234,222,${p.opacity})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1
      })

      /* connect close particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          )
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(4,234,222,${0.12 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()
    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── 3D tilt on mouse move ── */
  const handleMouseMove = e => {
    if (!footerRef.current) return
    const rect = footerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8
    setMousePos({ x, y })
  }

  const handleChange = e =>
    setFormState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormState({ name: '', email: '', message: '' })
  }

  const socials = [
    {
      icon: 'bi-linkedin',
      href: 'https://www.linkedin.com/in/yibeltal-yitayew-7604a4370/',
      label: 'LinkedIn',
      color: '#0a66c2'
    },
    {
      icon: 'bi-telegram',
      href: 'https://t.me/yibeltalyitayew2024',
      label: 'Telegram',
      color: '#229ed9'
    },
    {
      icon: 'bi-facebook',
      href: 'https://web.facebook.com/',
      label: 'Facebook',
      color: '#1877f2'
    },
    {
      icon: 'bi-youtube',
      href: 'https://www.youtube.com/@SelamYibeltal-b4f',
      label: 'YouTube',
      color: '#ff0000'
    }
  ]

  return (
    <section
      className='footer-wrapper'
      ref={footerRef}
      onMouseMove={handleMouseMove}
      style={{ '--rx': `${mousePos.y}deg`, '--ry': `${mousePos.x}deg` }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className='footer-canvas' aria-hidden='true' />

      {/* Mesh gradient blobs */}
      <div className='blob blob-1' aria-hidden='true' />
      <div className='blob blob-2' aria-hidden='true' />
      <div className='blob blob-3' aria-hidden='true' />

      {/* ── CONTACT SECTION ── */}
      <div className='contact-section'>
        <div className='contact-header'>
          <span className='contact-eyebrow'>Get in touch</span>
          <h2 className='contact-title'>
            Let's build something
            <span className='gradient-word'> extraordinary</span>
          </h2>
          <p className='contact-subtitle'>
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's make it happen.
          </p>
        </div>

        <div className='contact-grid'>
          {/* Form card */}
          <div className='contact-card form-card'>
            <div className='card-glow' aria-hidden='true' />
            {submitted ? (
              <div className='success-state'>
                <div className='success-icon'>
                  <i className='bi bi-check-circle-fill' />
                </div>
                <h3>Message sent!</h3>
                <p>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className='field-row'>
                  <div
                    className={`field-group ${
                      focused === 'name' ? 'focused' : ''
                    } ${formState.name ? 'filled' : ''}`}
                  >
                    <label htmlFor='contact-name'>Full name</label>
                    <input
                      id='contact-name'
                      name='name'
                      type='text'
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      autoComplete='name'
                    />
                    <div className='field-line' />
                  </div>
                  <div
                    className={`field-group ${
                      focused === 'email' ? 'focused' : ''
                    } ${formState.email ? 'filled' : ''}`}
                  >
                    <label htmlFor='contact-email'>Email address</label>
                    <input
                      id='contact-email'
                      name='email'
                      type='email'
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      autoComplete='email'
                    />
                    <div className='field-line' />
                  </div>
                </div>
                <div
                  className={`field-group full ${
                    focused === 'message' ? 'focused' : ''
                  } ${formState.message ? 'filled' : ''}`}
                >
                  <label htmlFor='contact-message'>Your message</label>
                  <textarea
                    id='contact-message'
                    name='message'
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                  <div className='field-line' />
                </div>
                <button type='submit' className='submit-btn'>
                  <span className='btn-text'>Send message</span>
                  <span className='btn-icon'>
                    <i className='bi bi-send-fill' />
                  </span>
                  <div className='btn-ripple' />
                </button>
              </form>
            )}
          </div>

          {/* Info card */}
          <div className='contact-card info-card'>
            <div className='card-glow' aria-hidden='true' />
            <h3 className='info-title'>Direct channels</h3>

            <div className='info-item'>
              <div className='info-icon-wrap'>
                <i className='bi bi-envelope-fill' />
              </div>
              <div>
                <span className='info-label'>Email</span>
                <a href='mailto:yibeltal@example.com' className='info-value'>
                  yibeltal@example.com
                </a>
              </div>
            </div>

            <div className='info-item'>
              <div className='info-icon-wrap'>
                <i className='bi bi-geo-alt-fill' />
              </div>
              <div>
                <span className='info-label'>Location</span>
                <span className='info-value'>Ethiopia 🇪🇹</span>
              </div>
            </div>

            <div className='info-item'>
              <div className='info-icon-wrap'>
                <i className='bi bi-clock-fill' />
              </div>
              <div>
                <span className='info-label'>Response time</span>
                <span className='info-value'>Within 24 hours</span>
              </div>
            </div>

            <div className='availability-badge'>
              <span className='pulse-dot' />
              Available for freelance work
            </div>

            {/* 3D floating cube decoration */}
            <div className='cube-3d' aria-hidden='true'>
              <div className='cube-face front' />
              <div className='cube-face back' />
              <div className='cube-face right' />
              <div className='cube-face left' />
              <div className='cube-face top' />
              <div className='cube-face bottom' />
            </div>
          </div>
        </div>
      </div>

      {/* ── GRADIENT DIVIDER ── */}
      <div className='divider-wrapper' aria-hidden='true'>
        <hr className='custom-hr' />
        <div className='hr-glow' />
      </div>

      {/* ── SOCIAL ICONS ── */}
      <div className='social-media-icons'>
        <ul>
          {socials.map(({ icon, href, label, color }) => (
            <li key={icon}>
              <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                style={{ '--accent': color }}
                className='social-link'
              >
                <span className='social-bg' aria-hidden='true' />
                <i
                  className={`bi ${icon}`}
                  style={{ fontSize: '22px' }}
                  aria-hidden='true'
                />
                <span className='social-label'>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── COPYRIGHT ── */}
      <div className='footer-copyright'>
        <small>&copy; 2026 Metages Yibeltal. All rights reserved.</small>
        <ul>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Accessibility</li>
        </ul>
      </div>

      {/* ── DEV LOGO ── */}
      <section className='dev-logo-container'>
        <div className='dev-logo-text'>
          <span className='dev-made'>Designed &amp; built by</span>
          <span className='dev-name'>Yibeltal Yitayew</span>
        </div>
        <div className='dev-logo-ring'>
          <img src={DeveloperLogo} alt='Yibeltal Yitayew – Developer logo' />
        </div>
      </section>
    </section>
  )
}

export default Footer
