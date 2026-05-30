import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Element } from 'react-scroll'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'framer-motion'
import aboutImage from '../../Images/About-image.png'

/* ─── Custom Circle Cursor ─── */
function CircleCursor () {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const move = e => {
      const { clientX: x, clientY: y } = e
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x - 8}px, ${y - 8}px)`
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${x - 20}px, ${
          y - 20
        }px)`
      }
    }
    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)
    const over = e => {
      if (
        e.target.closest(
          'a,button,.skill-item-card,.about-img-frame,.stat-card'
        )
      )
        setHovered(true)
    }
    const out = () => setHovered(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#00f2fe',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition:
            'transform 0.05s linear, width 0.2s, height 0.2s, background 0.2s',
          willChange: 'transform',
          transform: clicked ? 'scale(0.7)' : 'scale(1)'
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `2px solid ${hovered ? '#a100ff' : '#00f2fe'}`,
          pointerEvents: 'none',
          zIndex: 99998,
          transition:
            'transform 0.12s ease-out, border-color 0.3s, width 0.3s, height 0.3s, opacity 0.3s',
          willChange: 'transform',
          opacity: hovered ? 0.8 : 0.5,
          width: hovered ? 60 : 40,
          height: hovered ? 60 : 40
        }}
      />
    </>
  )
}

/* ─── Particle Canvas Background ─── */
function ParticleBackground () {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId,
      particles = [],
      W,
      H

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = 80
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        hue: Math.random() * 60 + 180
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.7)`
        ctx.fill()
      })
      // Connect nearby
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,242,254,${(1 - dist / 110) * 0.15})`
            ctx.lineWidth = 0.5
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
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}

/* ─── Animated Gradient Text ─── */
function GradientText ({ children, style = {} }) {
  return (
    <span
      style={{
        background:
          'linear-gradient(270deg, #00f2fe, #a100ff, #ff277b, #4facfe, #00f2fe)',
        backgroundSize: '400% 400%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: 'gradientFlow 5s ease infinite',
        display: 'inline-block',
        ...style
      }}
    >
      {children}
    </span>
  )
}

/* ─── Floating 3D Orbs ─── */
function FloatingOrb ({ style, delay = 0, color = '#00f2fe' }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        ...style
      }}
      animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

/* ─── Magnetic Button ─── */
function MagneticBtn ({ children, onClick, style = {} }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const onMove = e => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.4)
    y.set((e.clientY - cy) * 0.4)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy, ...style }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

/* ─── Stats Counter Card ─── */
function StatCard ({ number, label, icon, color, delay }) {
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true)
      },
      { threshold: 0.5 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let start = 0
    const target = parseInt(number)
    const duration = 1800
    const step = (timestamp, startTime) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(ts => step(ts, startTime))
      else setCount(target)
    }
    setTimeout(() => requestAnimationFrame(ts => step(ts, null)), delay * 1000)
  }, [inView])

  return (
    <motion.div
      ref={ref}
      className='stat-card'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, boxShadow: `0 20px 40px ${color}33` }}
      style={{
        background: 'linear-gradient(135deg, #11111a, #1a1a2e)',
        border: `1px solid ${color}33`,
        borderRadius: 16,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        cursor: 'default',
        transition: 'box-shadow 0.3s'
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
      <div
        style={{
          fontSize: '2.2rem',
          fontWeight: 900,
          letterSpacing: -1,
          background: `linear-gradient(135deg, #fff, ${color})`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        {count}
        {number.includes('+') ? '+' : ''}
      </div>
      <div
        style={{
          fontSize: '0.85rem',
          color: '#b4b4c0',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 1
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}

/* ─── Tilt Image Card ─── */
function TiltImageCard ({ src }) {
  const ref = useRef(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 100, damping: 20 })
  const sRotY = useSpring(rotY, { stiffness: 100, damping: 20 })

  const onMove = e => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    rotX.set((y / (rect.height / 2)) * -18)
    rotY.set((x / (rect.width / 2)) * 18)
  }
  const onLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className='about-img-frame'
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        width: '100%',
        maxWidth: 340,
        height: 440,
        flexShrink: 0
      }}
    >
      <motion.div
        style={{
          rotateX: sRotX,
          rotateY: sRotY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          borderRadius: 24,
          background: 'linear-gradient(135deg, #00f2fe, #a100ff)',
          padding: 3,
          boxShadow: '0 25px 60px rgba(0,242,254,0.2)'
        }}
        whileHover={{ boxShadow: '0 40px 80px rgba(0,242,254,0.4)' }}
      >
        {/* Shine overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 22,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
            zIndex: 2,
            pointerEvents: 'none',
            rotateX: useTransform(sRotX, v => v * -0.5),
            rotateY: useTransform(sRotY, v => v * -0.5)
          }}
        />
        <img
          src={src}
          alt='Yibeltal Yitayew'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 20,
            display: 'block'
          }}
        />
        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: -18,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #00f2fe22, #a100ff22)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0,242,254,0.3)',
            borderRadius: 50,
            padding: '10px 22px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
            zIndex: 10,
            boxShadow: '0 8px 32px rgba(0,242,254,0.2)'
          }}
        >
          ✦ Full Stack Developer
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Timeline Item ─── */
function TimelineItem ({ year, title, place, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ x: 8 }}
      style={{
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
        padding: '16px 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        cursor: 'default'
      }}
    >
      <div
        style={{
          minWidth: 48,
          height: 48,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${color}33, ${color}11)`,
          border: `1px solid ${color}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.72rem',
          fontWeight: 800,
          color,
          letterSpacing: 0.5
        }}
      >
        {year}
      </div>
      <div>
        <div
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
            marginBottom: 2
          }}
        >
          {title}
        </div>
        <div style={{ color: '#7878a0', fontSize: '0.85rem' }}>{place}</div>
      </div>
    </motion.div>
  )
}

/* ─── Service Card ─── */
function ServiceCard ({ icon, title, desc, color, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -10, boxShadow: `0 30px 60px ${color}22` }}
      style={{
        background: hov
          ? `linear-gradient(135deg, #11111a, ${color}11)`
          : '#11111a',
        border: `1px solid ${hov ? color + '44' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 20,
        padding: '32px 28px',
        transition: 'background 0.4s, border-color 0.3s',
        cursor: 'default'
      }}
    >
      <motion.div
        animate={
          hov
            ? { rotate: [0, -10, 10, 0], scale: 1.15 }
            : { rotate: 0, scale: 1 }
        }
        style={{ fontSize: 40, marginBottom: 16, display: 'inline-block' }}
      >
        {icon}
      </motion.div>
      <div
        style={{
          color: '#fff',
          fontWeight: 800,
          fontSize: '1.15rem',
          marginBottom: 10
        }}
      >
        {title}
      </div>
      <div style={{ color: '#7878a0', fontSize: '0.92rem', lineHeight: 1.7 }}>
        {desc}
      </div>
      <motion.div
        animate={{ width: hov ? '100%' : '0%' }}
        style={{
          height: 2,
          background: `linear-gradient(90deg, ${color}, transparent)`,
          marginTop: 20,
          borderRadius: 2
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   MAIN ABOUT COMPONENT
═══════════════════════════════════════════ */
export default function About () {
  const skillsData = [
    {
      name: 'HTML5',
      percent: 99,
      color: 'linear-gradient(90deg,#ff4500,#ff8c00)',
      icon: '🔥'
    },
    {
      name: 'CSS3 / SASS',
      percent: 98,
      color: 'linear-gradient(90deg,#2575fc,#6a11cb)',
      icon: '🎨'
    },
    {
      name: 'JavaScript',
      percent: 90,
      color: 'linear-gradient(90deg,#f1c40f,#f39c12)',
      icon: '⚡'
    },
    {
      name: 'React.js',
      percent: 95,
      color: 'linear-gradient(90deg,#00d2ff,#0072ff)',
      icon: '⚛️'
    },
    {
      name: 'Node.js',
      percent: 93,
      color: 'linear-gradient(90deg,#11998e,#38ef7d)',
      icon: '🟢'
    },
    {
      name: 'MongoDB',
      percent: 91,
      color: 'linear-gradient(90deg,#13bb41,#0a7e22)',
      icon: '🍃'
    },
    {
      name: 'MySQL',
      percent: 94,
      color: 'linear-gradient(90deg,#e49316,#b86b00)',
      icon: '🗄️'
    },
    {
      name: 'Bootstrap',
      percent: 92,
      color: 'linear-gradient(90deg,#7952b3,#b57cff)',
      icon: '🅱️'
    },
    {
      name: 'Git / GitHub',
      percent: 88,
      color: 'linear-gradient(90deg,#f05033,#b04030)',
      icon: '📦'
    }
  ]

  const stats = [
    {
      number: '50+',
      label: 'Projects Done',
      icon: '🚀',
      color: '#00f2fe',
      delay: 0
    },
    {
      number: '30+',
      label: 'Happy Clients',
      icon: '😊',
      color: '#a100ff',
      delay: 0.15
    },
    {
      number: '5+',
      label: 'Years Exp',
      icon: '⚡',
      color: '#ff277b',
      delay: 0.3
    },
    {
      number: '12+',
      label: 'Tech Skills',
      icon: '🛠',
      color: '#4facfe',
      delay: 0.45
    }
  ]

  const timeline = [
    {
      year: '2024',
      title: 'Senior Full Stack Developer',
      place: 'Freelance / Remote',
      color: '#00f2fe',
      delay: 0
    },
    {
      year: '2022',
      title: 'MERN Stack Developer',
      place: 'Tech Startup, Addis Ababa',
      color: '#a100ff',
      delay: 0.1
    },
    {
      year: '2020',
      title: 'Frontend Developer',
      place: 'Digital Agency',
      color: '#ff277b',
      delay: 0.2
    },
    {
      year: '2018',
      title: 'BSc Computer Science',
      place: 'University of Gondar',
      color: '#4facfe',
      delay: 0.3
    }
  ]

  const services = [
    {
      icon: '🖥️',
      title: 'Frontend Engineering',
      color: '#00f2fe',
      delay: 0,
      desc: 'Pixel-perfect, blazing fast UIs built with React, animations, and modern CSS architectures.'
    },
    {
      icon: '⚙️',
      title: 'Backend Architecture',
      color: '#a100ff',
      delay: 0.1,
      desc: 'Scalable Node.js APIs, RESTful services, and complex server-side business logic that performs.'
    },
    {
      icon: '🗄️',
      title: 'Database Design',
      color: '#ff277b',
      delay: 0.2,
      desc: 'Efficient MongoDB collections and MySQL schemas optimized for speed and global scale.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      color: '#4facfe',
      delay: 0.3,
      desc: 'From wireframe to polished interface — I craft experiences that users love to interact with.'
    },
    {
      icon: '🔐',
      title: 'Web Security',
      color: '#38ef7d',
      delay: 0.4,
      desc: 'JWT auth, OAuth, input sanitization, and secure API design for production-grade safety.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      color: '#f1c40f',
      delay: 0.5,
      desc: 'Mobile-first, cross-browser layouts that look perfect on every screen size and device.'
    }
  ]

  const [activeTab, setActiveTab] = useState('skills')
  const tabs = ['skills', 'experience', 'services']

  /* ─── inject global keyframes ─── */
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes gradientFlow {
        0%,100%{background-position:0% 50%}
        50%{background-position:100% 50%}
      }
      @keyframes rotate3d {
        0%{transform:rotateY(0deg)}
        100%{transform:rotateY(360deg)}
      }
      @keyframes pulseRing {
        0%{transform:scale(1);opacity:0.6}
        100%{transform:scale(1.5);opacity:0}
      }
      * { cursor: none !important; }
      .about-section-root { font-family: 'Segoe UI', system-ui, sans-serif; }
      .tab-btn {
        background: none; border: 1px solid rgba(255,255,255,0.08);
        color: #7878a0; font-size: 0.9rem; font-weight: 700;
        padding: 10px 28px; border-radius: 50px; cursor: none;
        letter-spacing: 1px; text-transform: uppercase;
        transition: all 0.3s; position: relative; overflow: hidden;
      }
      .tab-btn.active {
        background: linear-gradient(135deg, #00f2fe22, #a100ff22);
        border-color: #00f2fe66; color: #00f2fe;
        box-shadow: 0 0 20px rgba(0,242,254,0.15);
      }
      .tab-btn:hover:not(.active) {
        border-color: rgba(255,255,255,0.2); color: #fff;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <Element name='about'>
      <CircleCursor />

      <section
        className='about-section-root'
        style={{
          background: '#0a0a10',
          padding: '100px 20px 120px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh'
        }}
      >
        {/* ── Animated BG ── */}
        <ParticleBackground />
        <FloatingOrb
          style={{ width: 500, height: 500, top: -100, left: -150 }}
          color='#00f2fe'
          delay={0}
        />
        <FloatingOrb
          style={{ width: 400, height: 400, bottom: 100, right: -100 }}
          color='#a100ff'
          delay={2}
        />
        <FloatingOrb
          style={{ width: 300, height: 300, top: '40%', left: '40%' }}
          color='#ff277b'
          delay={4}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            backgroundImage:
              'linear-gradient(rgba(0,242,254,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,254,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        {/* ══════ HERO TITLE ══════ */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            marginBottom: 80
          }}
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#00f2fe',
              letterSpacing: 4,
              textTransform: 'uppercase',
              border: '1px solid #00f2fe33',
              borderRadius: 50,
              padding: '6px 20px',
              marginBottom: 20,
              background: 'rgba(0,242,254,0.05)'
            }}
          >
            ✦ Portfolio 2025
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: -2,
              margin: 0
            }}
          >
            <GradientText>About Me</GradientText>
          </h1>
          <p
            style={{
              color: '#7878a0',
              fontSize: '1.1rem',
              marginTop: 16,
              maxWidth: 500,
              margin: '16px auto 0'
            }}
          >
            Crafting the web with passion, precision, and a relentless pursuit
            of excellence.
          </p>
        </motion.div>

        {/* ══════ MAIN CARD: PHOTO + BIO ══════ */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1200,
            margin: '0 auto 80px',
            background: 'linear-gradient(135deg, #11111acc, #0d0d1acc)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 32,
            padding: 'clamp(24px,4vw,50px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 50,
            alignItems: 'center',
            boxShadow:
              '0 40px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Photo with floating rings */}
          <div
            style={{ position: 'relative', flexShrink: 0, margin: '0 auto' }}
          >
            {/* Animated rings */}
            {[1, 1.3, 1.6].map((scale, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  inset: -20 * (i + 1),
                  borderRadius: '50%',
                  border: `1px solid rgba(0,242,254,${0.15 - i * 0.04})`
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{
                  duration: 12 + i * 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background:
                      i === 0 ? '#00f2fe' : i === 1 ? '#a100ff' : '#ff277b',
                    boxShadow: `0 0 10px ${
                      i === 0 ? '#00f2fe' : i === 1 ? '#a100ff' : '#ff277b'
                    }`
                  }}
                />
              </motion.div>
            ))}
            <TiltImageCard src={aboutImage} />
          </div>

          {/* Bio text */}
          <div style={{ flex: '1 1 380px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 6
                }}
              >
                Yibeltal Yitayew
              </h2>
              <p
                style={{
                  color: '#00f2fe',
                  fontWeight: 700,
                  marginBottom: 24,
                  fontSize: '1rem',
                  letterSpacing: 1
                }}
              >
                Full Stack Developer & UI/UX Enthusiast
              </p>

              {[
                `I'm a passionate <strong style="color:#00f2fe">Full Stack Developer</strong> with a flair for building clean, responsive web experiences that blend design and functionality. With a solid foundation in modern front-end engineering and back-end architecture, I thrive on turning complex ideas into user-friendly digital solutions.`,
                `I believe great code tells a story — one that's readable, maintainable, and built to last. I'm constantly exploring new tools, frameworks, and <strong style="color:#a100ff">web security architectures</strong> to deliver solutions that are not just functional, but elegant.`,
                `On the backend, I engineer robust server-side logic using <strong style="color:#ff277b">Node.js & Express</strong>, design RESTful APIs, and manage complex data with MongoDB and SQL — ensuring every platform is blazing fast and built for global scalability.`
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  dangerouslySetInnerHTML={{ __html: text }}
                  style={{
                    color: '#9898b0',
                    lineHeight: 1.85,
                    marginBottom: 16,
                    fontSize: '0.98rem'
                  }}
                />
              ))}

              {/* CTA Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  flexWrap: 'wrap',
                  marginTop: 28
                }}
              >
                <MagneticBtn
                  style={{
                    padding: '14px 36px',
                    borderRadius: 50,
                    border: 'none',
                    background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
                    color: '#000',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: 0.5,
                    boxShadow: '0 10px 30px rgba(0,242,254,0.3)'
                  }}
                >
                  Download CV ↓
                </MagneticBtn>
                <MagneticBtn
                  style={{
                    padding: '14px 36px',
                    borderRadius: 50,
                    background: 'transparent',
                    border: '1px solid rgba(0,242,254,0.4)',
                    color: '#00f2fe',
                    fontWeight: 800,
                    fontSize: '0.95rem'
                  }}
                >
                  View Projects →
                </MagneticBtn>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ══════ STATS ROW ══════ */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1200,
            margin: '0 auto 80px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 20
          }}
        >
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        {/* ══════ TABBED SECTION ══════ */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1200,
            margin: '0 auto'
          }}
        >
          {/* Tab buttons */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 50,
              flexWrap: 'wrap'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 900,
                letterSpacing: -1,
                marginBottom: 24
              }}
            >
              <GradientText>My Professional Profile</GradientText>
            </h2>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'skills'
                  ? '⚡ Skills'
                  : tab === 'experience'
                  ? '📅 Experience'
                  : '🛠 Services'}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode='wait'>
            {activeTab === 'skills' && (
              <motion.div
                key='skills'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 16
                  }}
                >
                  {skillsData.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.06,
                        type: 'spring',
                        stiffness: 100
                      }}
                      whileHover={{ y: -4, borderColor: 'rgba(0,242,254,0.3)' }}
                      style={{
                        background: '#11111a',
                        border: '1px solid rgba(255,255,255,0.04)',
                        borderRadius: 16,
                        padding: '22px 24px',
                        transition: 'border-color 0.3s'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 14
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10
                          }}
                        >
                          <span style={{ fontSize: 22 }}>{skill.icon}</span>
                          <span
                            style={{
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: '1rem'
                            }}
                          >
                            {skill.name}
                          </span>
                        </div>
                        <span
                          style={{
                            color: '#00f2fe',
                            fontWeight: 800,
                            fontSize: '1rem'
                          }}
                        >
                          {skill.percent}%
                        </span>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: 8,
                          height: 8,
                          overflow: 'hidden'
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percent}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: i * 0.06 + 0.2,
                            ease: 'easeOut'
                          }}
                          style={{
                            height: '100%',
                            borderRadius: 8,
                            background: skill.color
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                key='experience'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: '#11111a',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 24,
                  padding: '32px 40px',
                  maxWidth: 700,
                  margin: '0 auto'
                }}
              >
                <h3
                  style={{
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.3rem',
                    marginBottom: 8
                  }}
                >
                  Career Timeline
                </h3>
                <p
                  style={{
                    color: '#7878a0',
                    marginBottom: 28,
                    fontSize: '0.9rem'
                  }}
                >
                  My journey through the world of software development
                </p>
                {timeline.map((item, i) => (
                  <TimelineItem key={i} {...item} />
                ))}
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key='services'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 20
                }}
              >
                {services.map((s, i) => (
                  <ServiceCard key={i} {...s} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ══════ TECH STACK TICKER ══════ */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 80,
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '20px 0'
          }}
        >
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              display: 'flex',
              gap: 60,
              whiteSpace: 'nowrap',
              width: 'max-content'
            }}
          >
            {[...Array(2)].flatMap(() =>
              [
                'React',
                'Node.js',
                'MongoDB',
                'JavaScript',
                'MySQL',
                'CSS3',
                'HTML5',
                'Express',
                'Git',
                'Bootstrap',
                'REST API',
                'JWT Auth'
              ].map((t, i) => (
                <span
                  key={i + t}
                  style={{
                    color: '#444',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <span style={{ color: '#00f2fe', fontSize: 8 }}>✦</span>
                  {t}
                </span>
              ))
            )}
          </motion.div>
        </div>
      </section>
    </Element>
  )
}
