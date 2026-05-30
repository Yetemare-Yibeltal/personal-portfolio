import React, { useRef, useEffect, useState, useCallback } from 'react'
import './WorkThumbnail.css'

/* ─────────────────────────────────────────────
   🌌 CUSTOM CIRCLE CURSOR (mounted once globally)
───────────────────────────────────────────── */
function useCursor () {
  useEffect(() => {
    let dot = document.querySelector('.cursor-dot')
    let ring = document.querySelector('.cursor-ring')

    if (!dot) {
      dot = document.createElement('div')
      ring = document.createElement('div')
      dot.className = 'cursor-dot'
      ring.className = 'cursor-ring'
      document.body.appendChild(dot)
      document.body.appendChild(ring)
    }

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0
    let raf

    const onMove = e => {
      mx = e.clientX
      my = e.clientY
    }

    const loop = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => {
      dot.classList.add('hovering')
      ring.classList.add('hovering')
    }
    const onLeave = () => {
      dot.classList.remove('hovering')
      ring.classList.remove('hovering')
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .work-thumbnail').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])
}

/* ─────────────────────────────────────────────
   ✨ SPARKLE CANVAS — floating particles on hover
───────────────────────────────────────────── */
function SparkleCanvas ({ active }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const colors = ['#06dce7', '#a855f7', '#f704ce', '#ed8003', '#22c322']

    const spawn = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particlesRef.current.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.2,
        vy: -Math.random() * 1.5 - 0.5,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008
      })
    }

    let spawnTimer = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (active) {
        spawnTimer++
        if (spawnTimer % 3 === 0) spawn()
      }

      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0)

      particlesRef.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        p.vy -= 0.02

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className='card-sparkle-canvas'
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit'
      }}
    />
  )
}

/* ─────────────────────────────────────────────
   🧲 MAGNETIC BUTTON — pulls toward cursor
───────────────────────────────────────────── */
function MagneticBtn ({ href, className, icon, label, children }) {
  const btnRef = useRef(null)

  const onMove = useCallback(e => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.35
    const dy = (e.clientY - cy) * 0.35
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`
  }, [])

  const onLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = ''
  }, [])

  return (
    <a
      ref={btnRef}
      href={href}
      target='_blank'
      rel='noreferrer'
      className={`action-pill-btn ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <i className={`${icon} icon-marker`}></i>
      <span className='sliding-text'>{label}</span>
    </a>
  )
}

/* ─────────────────────────────────────────────
   🃏 WORK THUMBNAIL — main card component
───────────────────────────────────────────── */
function WorkThumbnail ({
  WorkThumbnailImage,
  WorkThumbnailTitle,
  WorkThumbnailTag,
  githubUrl = 'https://github.com/Yetemare-Yibeltal',
  liveUrl = 'https://github.com/Yetemare-Yibeltal',
  stats = { stars: '12', forks: '4', views: '2.1k' }
}) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  useCursor()

  /* 3D tilt + spotlight glow on mouse move */
  const onMouseMove = useCallback(e => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    const tx = (py - 0.5) * -18 // tilt X axis
    const ty = (px - 0.5) * 18 // tilt Y axis

    setTilt({ x: tx, y: ty })
    setGlowPos({ x: px * 100, y: py * 100 })
  }, [])

  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
    setGlowPos({ x: 50, y: 50 })
  }, [])

  const cardStyle = {
    transform: hovered
      ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-12px) scale(1.025)`
      : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)',
    transition: hovered
      ? 'transform 0.1s ease'
      : 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s ease, border-color 0.4s ease'
  }

  /* Radial spotlight that follows cursor inside card */
  const spotlightStyle = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(6,220,231,0.08) 0%, transparent 65%)`,
    pointerEvents: 'none',
    zIndex: 1,
    opacity: hovered ? 1 : 0,
    transition: hovered ? 'opacity 0.3s ease' : 'opacity 0.5s ease'
  }

  return (
    <div className='work-card-container'>
      <section
        ref={cardRef}
        className='work-thumbnail'
        style={cardStyle}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Spotlight radial glow */}
        <div style={spotlightStyle} />

        {/* Sparkle particles */}
        <SparkleCanvas active={hovered} />

        {/* ── IMAGE BOX ── */}
        <div className='project-image-box'>
          <img
            src={WorkThumbnailImage}
            alt={WorkThumbnailTitle || 'Project preview'}
            loading='lazy'
          />
          <div className='project-gradient-shroud' />

          {/* Floating tag badge on image */}
          <div className='image-tech-badge'>
            {WorkThumbnailTag || 'Full Stack'}
          </div>
        </div>

        {/* ── INFO SECTION ── */}
        <div className='project-info-shield'>
          {/* Title block */}
          <div className='project-header-block'>
            <div className='project-meta-layer'>
              <span className='project-tag-pill'>
                <span className='slash-marker'>//</span>{' '}
                {WorkThumbnailTag || 'Full Stack'}
              </span>
            </div>

            <h2 className='project-main-heading'>{WorkThumbnailTitle}</h2>

            {/* Mini stats row */}
            <div className='project-stats-row'>
              <div className='stat-chip'>
                <i className='fa-regular fa-star' />
                <span>{stats.stars}</span>
              </div>
              <div className='stat-chip'>
                <i className='fa-solid fa-code-fork' />
                <span>{stats.forks}</span>
              </div>
              <div className='stat-chip'>
                <i className='fa-regular fa-eye' />
                <span>{stats.views}</span>
              </div>
            </div>
          </div>

          {/* ── ACTION DOCK ── */}
          <div className='project-control-dock'>
            <MagneticBtn
              href={githubUrl}
              className='github-btn'
              icon='fa-brands fa-github'
              label='Code'
            />
            <MagneticBtn
              href={liveUrl}
              className='live-btn'
              icon='fa-solid fa-arrow-up-right-from-square'
              label='Live View'
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorkThumbnail
