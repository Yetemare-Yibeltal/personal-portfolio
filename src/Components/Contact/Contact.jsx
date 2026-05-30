import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { Element } from 'react-scroll'
import './Contact.css'

const Contact = forwardRef((props, ref) => {
  const cardRef = useRef(null)
  const canvasRef = useRef(null)
  const glowRef = useRef(null)
  const rafRef = useRef(null)

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [activeField, setActiveField] = useState(null)
  const [status, setStatus] = useState('IDLE') // IDLE | LOADING | SUCCESS

  /* ── PARTICLE CANVAS ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W,
      H,
      particles = [],
      animId

    const COLORS = [
      'rgba(124,58,237,',
      'rgba(37,99,235,',
      'rgba(6,182,212,',
      'rgba(167,139,250,'
    ]

    function resize () {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor (init = false) {
        this.reset(init)
      }
      reset (init) {
        this.x = Math.random() * W
        this.y = init ? Math.random() * H : H + 10
        this.r = Math.random() * 1.5 + 0.5
        this.speed = Math.random() * 0.4 + 0.1
        this.alpha = Math.random() * 0.5 + 0.1
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.dx = (Math.random() - 0.5) * 0.3
        this.twinkle = Math.random() * Math.PI * 2
        this.twinkleSpeed = Math.random() * 0.02 + 0.005
      }
      update () {
        this.y -= this.speed
        this.x += this.dx
        this.twinkle += this.twinkleSpeed
        if (this.y < -10) this.reset(false)
      }
      draw () {
        const a = this.alpha * (0.7 + 0.3 * Math.sin(this.twinkle))
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.color + a + ')'
        ctx.fill()
      }
    }

    for (let i = 0; i < 130; i++) particles.push(new Particle(true))

    function drawGrid () {
      ctx.clearRect(0, 0, W, H)
      ctx.strokeStyle = 'rgba(124,58,237,0.04)'
      ctx.lineWidth = 1
      const sz = 60
      for (let x = 0; x < W; x += sz) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let y = 0; y < H; y += sz) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }
    }

    function animate () {
      animId = requestAnimationFrame(animate)
      drawGrid()
      particles.forEach(p => {
        p.update()
        p.draw()
      })
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── 3D CARD TILT ── */
  const handleMouseMove = e => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current
      const glow = glowRef.current
      if (!card) return
      const r = card.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const cx = r.width / 2
      const cy = r.height / 2
      const rx = -((y - cy) / cy) * 10
      const ry = ((x - cx) / cx) * 10
      card.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`
      if (glow) {
        glow.style.setProperty('--mx', (x / r.width) * 100 + '%')
        glow.style.setProperty('--my', (y / r.height) * 100 + '%')
      }
    })
  }

  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        'perspective(1400px) rotateX(0deg) rotateY(0deg)'
  }

  /* ── INFO CARD MAGNETIC HOVER ── */
  const handleInfoMove = (e, el) => {
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left - r.width / 2) / r.width) * 12
    const y = ((e.clientY - r.top - r.height / 2) / r.height) * 8
    el.style.transform = `translateZ(20px) translateX(${
      6 + x
    }px) translateY(${y}px)`
  }
  const handleInfoLeave = el => {
    el.style.transform = ''
  }

  /* ── FORM ── */
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('LOADING')
    setTimeout(() => {
      setStatus('SUCCESS')
      setTimeout(() => {
        setStatus('IDLE')
        setFormData({ name: '', email: '', message: '' })
      }, 4500)
    }, 2800)
  }

  const charMax = { name: 60, email: 60, message: 500 }

  return (
    <section ref={ref} id='contact' className='contact-section'>
      {/* Particle canvas */}
      <canvas ref={canvasRef} className='contact-bg-canvas' />

      {/* Floating orbs */}
      <div className='orb orb-1' />
      <div className='orb orb-2' />
      <div className='orb orb-3' />
      <div className='orb orb-4' />

      <Element name='contact'>
        <div className='eyebrow'>// 04. Contact</div>
        <h1 className='section-title'>Talk To Me</h1>
        <p className='section-sub'>
          Got a project in mind? Let's build something extraordinary together.
        </p>

        {/* Main 3D Card */}
        <div
          className='contact-card'
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className='card-glow' ref={glowRef} />

          <div className='contact-grid'>
            {/* ── LEFT PANEL ── */}
            <div className='left-panel'>
              <div className='availability'>
                <span className='avail-dot' />
                Available for projects
              </div>

              <h2>Say Hello</h2>
              <p>
                If you come across a project requiring fullstack development
                services, feel free to connect through the contact details
                below.
              </p>

              <div className='info-cards'>
                <a
                  href='mailto:metagesyibeltal540@gmail.com'
                  className='info-card email'
                  onMouseMove={e => handleInfoMove(e, e.currentTarget)}
                  onMouseLeave={e => handleInfoLeave(e.currentTarget)}
                >
                  <div className='info-icon'>✉</div>
                  <div className='info-text'>
                    <div className='info-label'>Email</div>
                    <div className='info-value'>
                      metagesyibeltal540@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href='tel:+251923853252'
                  className='info-card phone'
                  onMouseMove={e => handleInfoMove(e, e.currentTarget)}
                  onMouseLeave={e => handleInfoLeave(e.currentTarget)}
                >
                  <div className='info-icon'>📞</div>
                  <div className='info-text'>
                    <div className='info-label'>Phone</div>
                    <div className='info-value'>+251 923 853 252</div>
                  </div>
                </a>

                <div
                  className='info-card location'
                  onMouseMove={e => handleInfoMove(e, e.currentTarget)}
                  onMouseLeave={e => handleInfoLeave(e.currentTarget)}
                >
                  <div className='info-icon'>📍</div>
                  <div className='info-text'>
                    <div className='info-label'>Location</div>
                    <div className='info-value'>Injibara, Ethiopia</div>
                  </div>
                </div>
              </div>

              <div className='divider' />

              <div className='social-row'>
                <a
                  href='https://github.com'
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn'
                >
                  ⌥ GitHub
                </a>
                <a
                  href='https://linkedin.com'
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn'
                >
                  in LinkedIn
                </a>
                <a
                  href='https://twitter.com'
                  target='_blank'
                  rel='noreferrer'
                  className='social-btn'
                >
                  𝕏 Twitter
                </a>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className='right-panel'>
              {/* IDLE — Form */}
              {status === 'IDLE' && (
                <form className='form-group' onSubmit={handleSubmit}>
                  {['name', 'email', 'message'].map((field, i) => (
                    <div
                      key={field}
                      className={`field ${
                        activeField === field ? 'active' : ''
                      } ${formData[field] ? 'filled' : ''}`}
                      style={
                        field === 'message' ? { paddingBottom: '28px' } : {}
                      }
                    >
                      <div className='field-label'>
                        <span className='field-num'>0{i + 1}.</span>
                        {field === 'name' && 'Your Name'}
                        {field === 'email' && 'Your Email'}
                        {field === 'message' && 'Your Message'}
                      </div>

                      {field === 'message' ? (
                        <textarea
                          name='message'
                          rows={4}
                          placeholder='Describe your project or just say hello...'
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setActiveField('message')}
                          onBlur={() => setActiveField(null)}
                          required
                        />
                      ) : (
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          name={field}
                          placeholder={
                            field === 'name'
                              ? 'Enter your name'
                              : 'Enter your email'
                          }
                          value={formData[field]}
                          onChange={handleChange}
                          onFocus={() => setActiveField(field)}
                          onBlur={() => setActiveField(null)}
                          autoComplete='off'
                          required
                        />
                      )}

                      <span className='field-meta'>
                        {formData[field].length} / {charMax[field]}
                      </span>
                    </div>
                  ))}

                  <div className='submit-wrap'>
                    <button type='submit' className='submit-btn'>
                      <span className='btn-inner'>
                        Send Message <span className='btn-arrow'>→</span>
                      </span>
                    </button>
                  </div>
                </form>
              )}

              {/* LOADING — Terminal */}
              {status === 'LOADING' && (
                <div className='loading-state'>
                  <div className='spinner-ring' />
                  <div className='loading-title'>
                    COMPILING ENCRYPTED DATA STREAMS
                  </div>
                  <div className='log-terminal'>
                    <div className='log-entry cyan'>
                      <span className='log-dot' />
                      <span>[OK] Connected to port 443 via Injibara Node</span>
                    </div>
                    <div className='log-entry purple'>
                      <span className='log-dot' />
                      <span>
                        [PROCESSING] Packing source keys for: {formData.name}
                      </span>
                    </div>
                    <div className='log-entry blue'>
                      <span className='log-dot' />
                      <span>[SECURITY] Encryption verification active</span>
                    </div>
                    <div className='log-entry blink'>
                      <span className='log-dot' />
                      <span>// TRANSMITTING via AES_256...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUCCESS */}
              {status === 'SUCCESS' && (
                <div className='success-state'>
                  <div className='success-icon'>✓</div>
                  <div className='success-title'>Transmission Completed</div>
                  <p className='success-sub'>
                    Your message has been received. Systems are tracking your
                    ticket and I'll respond shortly.
                  </p>
                  <div className='success-badge'>
                    STATUS: 200 OK // REQ_RESOLVED
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Element>
    </section>
  )
})

export default Contact
 