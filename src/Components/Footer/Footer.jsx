import React, { useEffect, useRef, useState } from 'react'
import DeveloperLogo from '../../Images/Developer-logo.jpg'
import './Footer.css'

function Footer () {
  const canvasRef = useRef(null)
  const footerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, w, h, pts

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    const init = () => {
      pts = Array.from({ length: 60 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        op: Math.random() * 0.45 + 0.1
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(4,234,222,${p.op})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 90) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(4,234,222,${0.1 * (1 - d / 90)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()
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

  /* ── Subtle 3D tilt on mouse move ── */
  const handleMouseMove = e => {
    if (!footerRef.current) return
    const rect = footerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5
    setMousePos({ x, y })
  }
  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 })

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
      onMouseLeave={handleMouseLeave}
      style={{ '--rx': `${mousePos.y}deg`, '--ry': `${mousePos.x}deg` }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className='footer-canvas' aria-hidden='true' />

      {/* Ambient blobs */}
      <div className='footer-blob blob-left' aria-hidden='true' />
      <div className='footer-blob blob-right' aria-hidden='true' />

      {/* ── GRADIENT DIVIDER ── */}
      <div className='footer-divider' aria-hidden='true'>
        <div className='divider-line' />
        <div className='divider-glow' />
      </div>

      {/* ── SOCIAL ICONS ── */}
      <div className='footer-socials'>
        <ul>
          {socials.map(({ icon, href, label, color }) => (
            <li key={icon}>
              <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='social-link'
                style={{ '--accent': color }}
              >
                <span className='social-bg-fill' aria-hidden='true' />
                <i className={`bi ${icon}`} aria-hidden='true' />
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
      <div className='footer-dev'>
        <div className='footer-dev-text'>
          <span className='dev-made'>Designed &amp; built by</span>
          <span className='dev-name'>Yibeltal Yitayew</span>
        </div>
        <div className='footer-logo-ring'>
          <img src={DeveloperLogo} alt='Yibeltal Yitayew developer logo' />
        </div>
      </div>
    </section>
  )
}

export default Footer
