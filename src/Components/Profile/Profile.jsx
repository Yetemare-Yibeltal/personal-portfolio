import React, { useState, useEffect, useRef } from 'react'
import profileImage from '../../Images/profile.png'
import { Element, Link as ScrollLink } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import './Profile.css'

/* ─────────────────────────────────────────────
   TYPING TEXT
───────────────────────────────────────────── */
const roles = [
  'Fullstack Developer',
  'Software Engineer',
  'Backend Developer',
  'Frontend Engineer',
  'MERN Stack Developer'
]

const TypingText = () => {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const full = roles[roleIdx]
    const speed = isDeleting ? 80 : 190
    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = full.substring(0, text.length + 1)
        setText(next)
        if (next === full) setTimeout(() => setIsDeleting(true), 2200)
      } else {
        const next = full.substring(0, text.length - 1)
        setText(next)
        if (next === '') {
          setIsDeleting(false)
          setRoleIdx(i => (i + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, roleIdx])

  return (
    <span className='typing-text-wrapper'>
      {text}
      <span className='typing-cursor'>|</span>
    </span>
  )
}

/* ─────────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────────── */
const ParticleField = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const N = 75
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.4 + 0.4
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,242,254,0.32)'
        ctx.fill()
      })
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(79,172,254,${0.11 * (1 - d / 110)})`
            ctx.lineWidth = 0.55
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
const CircleCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)

  useEffect(() => {
    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`
    }
    const onEnter = () => {
      hovering.current = true
    }
    const onLeave = () => {
      hovering.current = false
    }
    document
      .querySelectorAll('button,a,.head-btn,.profile-img-glow-card,.skill-pill')
      .forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    window.addEventListener('mousemove', onMove)
    let raf
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        const scale = hovering.current ? 2.2 : 1
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%) scale(${scale})`
        ringRef.current.style.borderColor = hovering.current
          ? '#ff277b'
          : '#00f2fe'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className='cursor-dot' />
      <div ref={ringRef} className='cursor-ring' />
    </>
  )
}

/* ─────────────────────────────────────────────
   3D TILT CARD
───────────────────────────────────────────── */
const TiltCard = ({ children }) => {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const onMove = e => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left,
      y = e.clientY - rect.top
    const cx = rect.width / 2,
      cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -17,
      rotY = ((x - cx) / cx) * 17
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.05,1.05,1.05)`
    if (glowRef.current)
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,242,254,0.26) 0%, transparent 65%)`
  }
  const onLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glowRef.current) glowRef.current.style.background = 'transparent'
  }
  return (
    <div
      ref={cardRef}
      className='tilt-card'
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={glowRef} className='tilt-glow' />
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────── */
const MagneticBtn = ({ children }) => {
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${
      (e.clientX - r.left - r.width / 2) * 0.35
    }px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }
  return (
    <div
      ref={ref}
      className='magnetic-wrap'
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────────── */
const StatCounter = ({ value, label, suffix = '+' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const step = Math.ceil(value / 55)
          const timer = setInterval(() => {
            start = Math.min(start + step, value)
            setCount(start)
            if (start >= value) clearInterval(timer)
          }, 28)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])
  return (
    <div ref={ref} className='stat-item'>
      <span className='stat-number'>
        {count}
        {suffix}
      </span>
      <span className='stat-label'>{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SKILL PILL
───────────────────────────────────────────── */
const SkillPill = ({ name, icon, delay }) => (
  <motion.div
    className='skill-pill'
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ y: -4, scale: 1.08 }}
  >
    <span className='skill-icon'>{icon}</span>
    <span>{name}</span>
  </motion.div>
)

const skills = [
  { name: 'React', icon: '⚛' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Express', icon: '🚂' },
  { name: 'Next.js', icon: '▲' },
  { name: 'GraphQL', icon: '🔺' },
  { name: 'Docker', icon: '🐳' }
]

/* ─────────────────────────────────────────────
   FLOATING ORB
───────────────────────────────────────────── */
const Orb = ({ style, delay = 0 }) => (
  <div className='orb' style={{ animationDelay: `${delay}s`, ...style }} />
)

/* ─────────────────────────────────────────────
   RESUME VIEWER MODAL
   Opens resume PDF inside the page in a modal
   with an iframe — no navigation away.
───────────────────────────────────────────── */
const ResumeModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // Path to resume — place resume.pdf in your /public folder
  const resumePath = `${process.env.PUBLIC_URL}/resume.pdf`

  return (
    <motion.div
      className='resume-overlay'
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className='resume-modal'
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
      >
        {/* Modal Header */}
        <div className='resume-modal-header'>
          <div className='resume-modal-title'>
            <span className='resume-title-icon'>📄</span>
            <div>
              <div className='resume-title-name'>Yibeltal Yitayew</div>
              <div className='resume-title-sub'>
                Full Stack Developer · Resume
              </div>
            </div>
          </div>
          <div className='resume-header-actions'>
            <a
              href={resumePath}
              download='Yibeltal_Yitayew_Resume.pdf'
              className='resume-download-btn'
              onClick={e => e.stopPropagation()}
            >
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                <polyline points='7 10 12 15 17 10' />
                <line x1='12' y1='15' x2='12' y2='3' />
              </svg>
              Download
            </a>
            <button
              className='resume-close-btn'
              onClick={onClose}
              aria-label='Close'
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className='resume-viewer'>
          <iframe
            src={`${resumePath}#view=FitH`}
            title='Resume'
            className='resume-iframe'
            onError={() => {}}
          />
          {/* Fallback shown via CSS if iframe fails */}
          <div className='resume-fallback'>
            <div className='resume-fallback-icon'>📄</div>
            <p className='resume-fallback-text'>
              Your browser couldn't display the PDF inline.
            </p>
            <a
              href={resumePath}
              download='Yibeltal_Yitayew_Resume.pdf'
              className='resume-fallback-btn'
            >
              Download Resume Instead
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAIN PROFILE COMPONENT
───────────────────────────────────────────── */
function Profile () {
  const [showResume, setShowResume] = useState(false)

  return (
    <>
      <CircleCursor />

      <Element name='profile'>
        <section className='profile-wrapper'>
          <ParticleField />

          {/* Ambient orbs */}
          <Orb
            style={{
              width: 500,
              height: 500,
              top: '-10%',
              left: '-8%',
              background:
                'radial-gradient(circle, rgba(79,172,254,0.15) 0%, transparent 70%)'
            }}
            delay={0}
          />
          <Orb
            style={{
              width: 400,
              height: 400,
              bottom: '5%',
              right: '-5%',
              background:
                'radial-gradient(circle, rgba(161,0,255,0.18) 0%, transparent 70%)'
            }}
            delay={2}
          />
          <Orb
            style={{
              width: 300,
              height: 300,
              top: '50%',
              left: '40%',
              background:
                'radial-gradient(circle, rgba(255,39,123,0.12) 0%, transparent 70%)'
            }}
            delay={4}
          />

          <div className='grid-overlay' />

          <div className='profile-container container'>
            {/* ── AVATAR COLUMN ── */}
            <motion.div
              className='profile-img-side'
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard>
                <div className='avatar-ring-1' />
                <div className='avatar-ring-2' />
                <div className='avatar-ring-3' />
                <div className='profile-img-glow-card'>
                  <div className='avatar-shimmer' />
                  <img
                    src={profileImage}
                    alt='Yibeltal Yitayew'
                    className='profile-avatar'
                  />
                </div>
                <motion.div
                  className='float-badge badge-tl'
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <span>💻</span> Open to Work
                </motion.div>
                <motion.div
                  className='float-badge badge-br'
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                >
                  <span>🌐</span> MERN Stack
                </motion.div>
                <motion.div
                  className='float-badge badge-tr'
                  animate={{ x: [0, 8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                  }}
                >
                  ⚡ Clean Code
                </motion.div>
              </TiltCard>
            </motion.div>

            {/* ── TEXT COLUMN ── */}
            <motion.div
              className='profile-text-side'
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {/* Welcome tag */}
              <motion.div
                className='welcome-tag'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className='tag-dot' />
                Welcome to my universe
                <span className='tag-dot' />
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Hi, I'm
                <br />
                <span
                  className='name-gradient glitch-text'
                  data-text='Yibeltal Yitayew'
                >
                  Yibeltal Yitayew
                </span>
              </motion.h1>

              {/* Typing role */}
              <motion.h3
                className='role-line'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className='role-prefix'>&lt;</span>
                <TypingText />
                <span className='role-prefix'>/&gt;</span>
              </motion.h3>

              {/* Bio */}
              <motion.div
                className='profile-bio'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p>
                  Passionate full stack developer who thrives on building{' '}
                  <span className='inline-hl'>
                    seamless digital experiences
                  </span>{' '}
                  from front to back. Deep expertise in responsive design and
                  scalable backend architecture.
                </p>
                <p>
                  Specializing in{' '}
                  <span className='inline-hl'>MERN stack solutions</span>,
                  custom interactive mechanics, and solving complex architecture
                  challenges with precision and creativity.
                </p>
              </motion.div>

              {/* Skill Pills */}
              <div className='skills-row'>
                {skills.map((s, i) => (
                  <SkillPill key={s.name} {...s} delay={0.7 + i * 0.07} />
                ))}
              </div>

              {/* Stats */}
              <motion.div
                className='stats-row'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                <StatCounter value={50} label='Projects Done' />
                <div className='stat-divider' />
                <StatCounter value={5} label='Yrs Experience' />
                <div className='stat-divider' />
                <StatCounter value={30} label='Happy Clients' />
                <div className='stat-divider' />
                <StatCounter value={20} label='APIs Built' suffix='+' />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className='headline-btns'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {/* Contact Me — scrolls to contact section */}
                <MagneticBtn>
                  <ScrollLink
                    to='contact'
                    smooth={true}
                    duration={600}
                    offset={-70}
                  >
                    <button className='head-btn btn-primary-glow'>
                      <span className='btn-inner'>
                        <svg
                          width='15'
                          height='15'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2.5'
                        >
                          <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
                        </svg>
                        Contact Me
                      </span>
                      <div className='btn-shine' />
                    </button>
                  </ScrollLink>
                </MagneticBtn>

                {/* My Resume — opens modal viewer */}
                <MagneticBtn>
                  <button
                    className='head-btn btn-secondary-outline'
                    onClick={() => setShowResume(true)}
                  >
                    <span className='btn-inner'>
                      <svg
                        width='15'
                        height='15'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.5'
                      >
                        <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                        <polyline points='14 2 14 8 20 8' />
                        <line x1='16' y1='13' x2='8' y2='13' />
                        <line x1='16' y1='17' x2='8' y2='17' />
                      </svg>
                      My Resume
                    </span>
                  </button>
                </MagneticBtn>
              </motion.div>

              {/* Social links — real SVG icons */}
              <motion.div
                className='social-links'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                {/* GitHub */}
                <a
                  href='https://github.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='social-link'
                  title='GitHub'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href='https://linkedin.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='social-link'
                  title='LinkedIn'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href='https://t.me/yibeltalyitayew2024'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='social-link'
                  title='Telegram'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href='https://twitter.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='social-link'
                  title='Twitter'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                  </svg>
                </a>
              </motion.div>

              {/* ── NEW: Availability + quick-nav pills ── */}
              <motion.div
                className='profile-quick-nav'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className='avail-badge'>
                  <span className='avail-pulse' />
                  Available for hire
                </span>
                <ScrollLink
                  to='portfolio'
                  smooth
                  duration={600}
                  offset={-70}
                  className='qnav-pill'
                >
                  Portfolio
                </ScrollLink>
                <ScrollLink
                  to='services'
                  smooth
                  duration={600}
                  offset={-70}
                  className='qnav-pill'
                >
                  Services
                </ScrollLink>
                <ScrollLink
                  to='contact'
                  smooth
                  duration={600}
                  offset={-70}
                  className='qnav-pill'
                >
                  Let's Talk
                </ScrollLink>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className='scroll-indicator'
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className='scroll-mouse'>
              <div className='scroll-wheel' />
            </div>
            <span>Scroll</span>
          </motion.div>
        </section>
      </Element>

      {/* ── RESUME MODAL ── */}
      <AnimatePresence>
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </AnimatePresence>
    </>
  )
}

export default Profile
