import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { Element } from 'react-scroll'
import './Contact.css'

const Contact = forwardRef((props, ref) => {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [activeInput, setActiveInput] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [transmissionStatus, setTransmissionStatus] = useState('IDLE') // IDLE | SUCCESS

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, W, H, pts

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const init = () => {
      pts = Array.from({ length: 70 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.3,
        dx: (Math.random() - 0.5) * 0.38,
        dy: (Math.random() - 0.5) * 0.38,
        op: Math.random() * 0.45 + 0.1
      }))
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(4,234,222,${p.op})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > W) p.dx *= -1
        if (p.y < 0 || p.y > H) p.dy *= -1
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 90) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(4,234,222,${0.11 * (1 - d / 90)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(tick)
    }

    resize()
    init()
    tick()
    const onResize = () => {
      resize()
      init()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setTransmissionStatus('SUCCESS')
    setTimeout(() => {
      setTransmissionStatus('IDLE')
      setFormData({ name: '', email: '', message: '' })
    }, 3500)
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
    <section ref={ref} id='contact' className='ct-shell'>
      <Element name='contact'>
        <div className='ct-wrap' ref={wrapRef}>
          {/* Particle canvas */}
          <canvas ref={canvasRef} className='ct-canvas' aria-hidden='true' />

          {/* Ambient blobs */}
          <div className='ct-blob b1' aria-hidden='true' />
          <div className='ct-blob b2' aria-hidden='true' />
          <div className='ct-blob b3' aria-hidden='true' />

          {/* ── Header ── */}
          <div className='ct-head'>
            <div className='ct-eyebrow'>Get in touch</div>
            <h2 className='ct-title'>
              Let's build something
              <span className='ct-grad'> extraordinary</span>
            </h2>
            <p className='ct-sub'>
              Have a project in mind? I'd love to hear about it. Send me a
              message and let's make it happen.
            </p>
          </div>

          {/* ── Two-column grid ── */}
          <div className='ct-grid'>
            {/* Form card */}
            <div className='ct-card form-card'>
              <div className='card-glow' />

              {transmissionStatus === 'IDLE' ? (
                <form onSubmit={handleSubmit} className='ct-form'>
                  <div className='f-row'>
                    <div
                      className={`fg ${
                        activeInput === 'name' ? 'active' : ''
                      } ${formData.name ? 'filled' : ''}`}
                    >
                      <label>Full name</label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setActiveInput('name')}
                        onBlur={() => setActiveInput(null)}
                        autoComplete='name'
                        required
                      />
                      <div className='fline' />
                    </div>
                    <div
                      className={`fg ${
                        activeInput === 'email' ? 'active' : ''
                      } ${formData.email ? 'filled' : ''}`}
                    >
                      <label>Email address</label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setActiveInput('email')}
                        onBlur={() => setActiveInput(null)}
                        autoComplete='email'
                        required
                      />
                      <div className='fline' />
                    </div>
                  </div>

                  <div
                    className={`fg msg-fg ${
                      activeInput === 'message' ? 'active' : ''
                    } ${formData.message ? 'filled' : ''}`}
                  >
                    <label>Your message</label>
                    <textarea
                      name='message'
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput('message')}
                      onBlur={() => setActiveInput(null)}
                      required
                    />
                    <div className='fline' />
                  </div>

                  <button className='sbtn' type='submit'>
                    <span>Send message</span>
                    <i className='bi bi-send-fill' />
                  </button>
                </form>
              ) : (
                <div className='ct-success'>
                  <div className='s-icon'>
                    <i className='bi bi-check-circle-fill' />
                  </div>
                  <h3>Message sent!</h3>
                  <p>I'll get back to you within 24 hours.</p>
                </div>
              )}
            </div>

            {/* Info card */}
            <div className='ct-card info-card'>
              <div className='card-glow' />
              <p className='i-title'>Direct channels</p>

              <div className='i-item'>
                <div className='i-icon'>
                  <i className='bi bi-envelope-fill' />
                </div>
                <div>
                  <span className='i-lbl'>Email</span>
                  <a
                    href='mailto:metagesyibeltal540@gmail.com'
                    className='i-val'
                  >
                    metagesyibeltal540@gmail.com
                  </a>
                </div>
              </div>

              <div className='i-item'>
                <div className='i-icon'>
                  <i className='bi bi-telephone-fill' />
                </div>
                <div>
                  <span className='i-lbl'>Phone</span>
                  <a href='tel:+251923853252' className='i-val'>
                    +2519 -23 85 32 52
                  </a>
                </div>
              </div>

              <div className='i-item'>
                <div className='i-icon'>
                  <i className='bi bi-geo-alt-fill' />
                </div>
                <div>
                  <span className='i-lbl'>Location</span>
                  <span className='i-val'>Injibara, Ethiopia 🇪🇹</span>
                </div>
              </div>

              <div className='i-item'>
                <div className='i-icon'>
                  <i className='bi bi-clock-fill' />
                </div>
                <div>
                  <span className='i-lbl'>Response time</span>
                  <span className='i-val'>Within 24 hours</span>
                </div>
              </div>

              <div className='ct-avail'>
                <span className='pdot' />
                Available for freelance work
              </div>

              {/* 3D Cube */}
              <div className='cube-wrap' aria-hidden='true'>
                <div className='cube'>
                  <div className='cf f' />
                  <div className='cf bk' />
                  <div className='cf r' />
                  <div className='cf l' />
                  <div className='cf t' />
                  <div className='cf bo' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
    </section>
  )
})

export default Contact
