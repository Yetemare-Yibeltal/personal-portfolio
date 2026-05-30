import React, { useState, useRef, useEffect } from 'react'
import ServiceThumbnail from './Myservice-thumbnail/ServiceThumbnail'
import './Myservice-thumbnail/ServiceThumbnail.css'
import './Myservice.css'
import { Element } from 'react-scroll'
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence
} from 'framer-motion'

/* ─── Animated Number Counter ─── */
function Counter ({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered) setTriggered(true)
      },
      { threshold: 0.6 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered) return
    let start = 0
    const duration = 1600
    const step = (ts, t0) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(t => step(t, t0))
      else setCount(target)
    }
    requestAnimationFrame(t => step(t, null))
  }, [triggered])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

/* ─── Magnetic Wrapper ─── */
function Magnetic ({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Process Step Card ─── */
function ProcessStep ({ number, title, desc, color, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      className='process-step'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -8 }}
      style={{ '--step-color': color }}
    >
      <motion.div
        className='process-number'
        animate={hov ? { scale: 1.12, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {number}
      </motion.div>
      <div className='process-connector' />
      <h4 className='process-title'>{title}</h4>
      <p className='process-desc'>{desc}</p>
      <motion.div
        className='process-bar'
        animate={{ width: hov ? '100%' : '30%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

/* ─── Tool Badge ─── */
function ToolBadge ({ name, icon, color, delay }) {
  return (
    <motion.div
      className='tool-badge'
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 150 }}
      whileHover={{ y: -6, boxShadow: `0 16px 36px ${color}33` }}
      style={{ '--tool-color': color }}
    >
      <span className='tool-badge-icon'>{icon}</span>
      <span className='tool-badge-name'>{name}</span>
    </motion.div>
  )
}

/* ─── FAQ Accordion ─── */
function FaqItem ({ q, a, delay }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className={`faq-item ${open ? 'faq-open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <button className='faq-q' onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <motion.span
          className='faq-icon'
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className='faq-a'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Pricing Card ─── */
function PricingCard ({ plan, price, features, color, popular, delay }) {
  return (
    <motion.div
      className={`pricing-card ${popular ? 'pricing-popular' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -12, boxShadow: `0 30px 70px ${color}22` }}
      style={{ '--price-color': color }}
    >
      {popular && <div className='pricing-badge'>⭐ Most Popular</div>}
      <div className='pricing-plan'>{plan}</div>
      <div className='pricing-price'>
        <span className='pricing-currency'>$</span>
        {price}
        <span className='pricing-period'>/project</span>
      </div>
      <ul className='pricing-features'>
        {features.map((f, i) => (
          <li key={i} className={f.included ? '' : 'pricing-excluded'}>
            <span className='pricing-check'>{f.included ? '✓' : '✗'}</span>
            {f.label}
          </li>
        ))}
      </ul>
      <Magnetic>
        <button className='pricing-btn'>Get Started →</button>
      </Magnetic>
    </motion.div>
  )
}

/* ════════════ MAIN COMPONENT ════════════ */
export default function Myservice () {
  const servicesData = [
    {
      id: 'I',
      title: 'Optimized Workflow',
      desc: 'My development experience is powered by modern tooling—VS Code extensions like Emmet, IntelliCode, and Prettier keep my code clean, fast, and maintainable.'
    },
    {
      id: 'II',
      title: 'Integrated Interfaces',
      desc: 'I create seamless connections between user interfaces and backend systems, enabling smooth, secure data exchange from dynamic form handling to custom API paths.'
    },
    {
      id: 'III',
      title: 'Client-Centric Delivery',
      desc: 'Every project is delivered with precision and purpose—on time, completely aligned with your targets, and built to leave a lasting modern impression.'
    },
    {
      id: 'IV',
      title: 'Developer-Centric',
      desc: 'Built for uptime and impact: backend systems running on structured net code with an emphasis on rock-solid reliability that builds user confidence.'
    },
    {
      id: 'V',
      title: 'Real-Time Updates',
      desc: 'I deploy full-stack applications with real-time updates and low latency metrics, ensuring users instantly experience data changes without reload delays.'
    },
    {
      id: 'VI',
      title: '24/7 Uptime Layouts',
      desc: 'I deliver applications optimized for continuous availability, high performance, and reliable server-side asset rendering under heavy networking traffic.'
    },
    {
      id: 'VII',
      title: 'Fully Responsive',
      desc: 'Fluid layouts built cleanly to scale elegantly across smartphone screens, tablets, and wide high-definition monitors using pure modern CSS logic.'
    },
    {
      id: 'VIII',
      title: 'Creative UI/UX Design',
      desc: 'I design intuitive interfaces with custom gradients, interactive layers, and light-weight vector graphics that elevate user engagement and brand presence.'
    },
    {
      id: 'IX',
      title: 'Full-Stack Integration',
      desc: 'Connecting secure databases, robust server layers, and interactive front-ends into one unified application package designed for high-velocity user scaling.'
    }
  ]

  const stats = [
    {
      val: 50,
      suf: '+',
      label: 'Projects Delivered',
      icon: '🚀',
      color: '#00f2fe'
    },
    { val: 30, suf: '+', label: 'Happy Clients', icon: '🤝', color: '#a100ff' },
    {
      val: 5,
      suf: '+',
      label: 'Years Experience',
      icon: '⚡',
      color: '#ff277b'
    },
    {
      val: 99,
      suf: '%',
      label: 'Client Satisfaction',
      icon: '💎',
      color: '#4facfe'
    }
  ]

  const process = [
    {
      number: '01',
      title: 'Discovery',
      color: '#00f2fe',
      delay: 0,
      desc: 'We start with a deep-dive into your goals, audience, and technical requirements to shape the perfect scope.'
    },
    {
      number: '02',
      title: 'Design',
      color: '#a100ff',
      delay: 0.1,
      desc: 'Wireframes, prototypes, and UI mockups crafted with pixel-precision and your brand voice in mind.'
    },
    {
      number: '03',
      title: 'Development',
      color: '#ff277b',
      delay: 0.2,
      desc: 'Clean, modular code written with modern stacks — React, Node, MongoDB — tested at every step.'
    },
    {
      number: '04',
      title: 'Launch',
      color: '#4facfe',
      delay: 0.3,
      desc: 'Deployment, performance tuning, SEO optimization, and a full handoff with documentation.'
    }
  ]

  const tools = [
    { name: 'React', icon: '⚛️', color: '#00d2ff', delay: 0 },
    { name: 'Node.js', icon: '🟢', color: '#38ef7d', delay: 0.05 },
    { name: 'MongoDB', icon: '🍃', color: '#13bb41', delay: 0.1 },
    { name: 'MySQL', icon: '🗄️', color: '#e49316', delay: 0.15 },
    { name: 'Express', icon: '⚙️', color: '#a100ff', delay: 0.2 },
    { name: 'JavaScript', icon: '⚡', color: '#f1c40f', delay: 0.25 },
    { name: 'CSS3', icon: '🎨', color: '#2575fc', delay: 0.3 },
    { name: 'Git', icon: '📦', color: '#f05033', delay: 0.35 },
    { name: 'Figma', icon: '🖼️', color: '#ff277b', delay: 0.4 },
    { name: 'REST API', icon: '🔗', color: '#00f2fe', delay: 0.45 },
    { name: 'JWT', icon: '🔐', color: '#4facfe', delay: 0.5 },
    { name: 'Bootstrap', icon: '🅱️', color: '#7952b3', delay: 0.55 }
  ]

  const faqs = [
    {
      q: 'What is your typical project timeline?',
      delay: 0,
      a: 'Timelines vary by complexity. A basic landing page takes 3–5 days. A full-stack web app typically takes 2–6 weeks. I always provide a detailed timeline in the discovery phase before we begin.'
    },
    {
      q: 'Do you offer post-launch maintenance?',
      delay: 0.1,
      a: 'Absolutely. I offer ongoing support packages covering bug fixes, feature additions, performance monitoring, and security patches — billed monthly or per-incident.'
    },
    {
      q: 'Can you work with an existing codebase?',
      delay: 0.2,
      a: 'Yes. I frequently join projects mid-stream. I start with a code audit, then refactor, extend, or optimize based on your current architecture and tech stack.'
    },
    {
      q: 'What technologies do you specialize in?',
      delay: 0.3,
      a: 'My core stack is React, Node.js, Express, MongoDB, and MySQL. I also work with REST APIs, JWT authentication, CSS animations, and modern deployment pipelines.'
    },
    {
      q: 'How do you handle revisions and feedback?',
      delay: 0.4,
      a: 'Revisions are built into every phase. I use iterative delivery — you see working prototypes early and often — so feedback is applied continuously, not just at the end.'
    }
  ]

  const pricing = [
    {
      plan: 'Starter',
      price: '499',
      color: '#00f2fe',
      popular: false,
      delay: 0,
      features: [
        { label: 'Responsive Landing Page', included: true },
        { label: 'UI/UX Design', included: true },
        { label: 'Contact Form', included: true },
        { label: 'Backend API', included: false },
        { label: 'Database Integration', included: false },
        { label: 'Auth System', included: false },
        { label: '1 Month Support', included: true }
      ]
    },
    {
      plan: 'Professional',
      price: '1,299',
      color: '#a100ff',
      popular: true,
      delay: 0.15,
      features: [
        { label: 'Full React Frontend', included: true },
        { label: 'Node.js Backend + API', included: true },
        { label: 'MongoDB / MySQL DB', included: true },
        { label: 'Auth + JWT Security', included: true },
        { label: 'Admin Dashboard', included: true },
        { label: 'Real-Time Features', included: false },
        { label: '3 Months Support', included: true }
      ]
    },
    {
      plan: 'Enterprise',
      price: '2,999',
      color: '#ff277b',
      popular: false,
      delay: 0.3,
      features: [
        { label: 'Full-Stack Architecture', included: true },
        { label: 'Real-Time + WebSockets', included: true },
        { label: 'Custom CMS / Dashboard', included: true },
        { label: 'Performance Optimization', included: true },
        { label: 'CI/CD Pipeline Setup', included: true },
        { label: 'Security Audit', included: true },
        { label: '6 Months Support', included: true }
      ]
    }
  ]

  return (
    <div className='myservice-root-container'>
      <Element name='services'>
        {/* ══════ HERO TITLE BLOCK ══════ */}
        <section className='ms-section ms-hero'>
          <div className='ms-grid-bg' />
          <div className='ms-orb ms-orb-1' />
          <div className='ms-orb ms-orb-2' />
          <div className='ms-orb ms-orb-3' />

          <div className='ms-inner container'>
            <motion.div
              className='ms-badge'
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              ✦ What I Offer
            </motion.div>

            <motion.h1
              className='ms-main-title'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              My <span className='ms-grad-text'>Services</span>
            </motion.h1>

            <motion.p
              className='ms-subtitle'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              End-to-end digital solutions engineered with precision,
              creativity, and relentless attention to performance.
            </motion.p>

            {/* ── STATS ROW ── */}
            <div className='ms-stats-row'>
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className='ms-stat-card'
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ y: -8, boxShadow: `0 20px 50px ${s.color}33` }}
                  style={{ '--sc': s.color }}
                >
                  <div className='ms-stat-icon'>{s.icon}</div>
                  <div className='ms-stat-val'>
                    <Counter target={s.val} suffix={s.suf} />
                  </div>
                  <div className='ms-stat-label'>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ SERVICE CARDS GRID ══════ */}
        <section className='ms-section ms-cards-section'>
          <div className='ms-inner container'>
            <motion.div
              className='ms-section-header'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className='ms-section-title'>
                Core <span className='ms-grad-text'>Capabilities</span>
              </h2>
              <p className='ms-section-sub'>
                Nine pillars of excellence driving every project I build.
              </p>
            </motion.div>

            <motion.div
              className='myservice-thumbnail'
              initial='hidden'
              whileInView='show'
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.07 } }
              }}
            >
              {servicesData.map((s, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { type: 'spring', stiffness: 80 }
                    }
                  }}
                >
                  <ServiceThumbnail
                    thumbnailId={s.id}
                    thumbnailTitle={s.title}
                    thumbnailDesc={s.desc}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════ PROCESS SECTION ══════ */}
        <section className='ms-section ms-process-section'>
          <div className='ms-process-bg' />
          <div className='ms-inner container'>
            <motion.div
              className='ms-section-header'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className='ms-badge'>⚙️ How I Work</div>
              <h2 className='ms-section-title'>
                My <span className='ms-grad-text'>Process</span>
              </h2>
              <p className='ms-section-sub'>
                A proven four-phase workflow that transforms your idea into a
                polished digital product.
              </p>
            </motion.div>

            <div className='process-grid'>
              {process.map((p, i) => (
                <ProcessStep key={i} {...p} />
              ))}
            </div>

            {/* Horizontal connecting line behind steps */}
            <div className='process-line-track'>
              <motion.div
                className='process-line-fill'
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </section>

        {/* ══════ TOOLS / TECH STACK ══════ */}
        <section className='ms-section ms-tools-section'>
          <div className='ms-inner container'>
            <motion.div
              className='ms-section-header'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className='ms-badge'>🛠 Tech Arsenal</div>
              <h2 className='ms-section-title'>
                Tools & <span className='ms-grad-text'>Technologies</span>
              </h2>
              <p className='ms-section-sub'>
                The battle-tested stack I rely on to build fast, secure, and
                scalable applications.
              </p>
            </motion.div>

            <div className='tools-grid'>
              {tools.map((t, i) => (
                <ToolBadge key={i} {...t} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════ PRICING SECTION ══════ */}
        <section className='ms-section ms-pricing-section'>
          <div className='ms-orb ms-orb-4' />
          <div className='ms-inner container'>
            <motion.div
              className='ms-section-header'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className='ms-badge'>💎 Investment</div>
              <h2 className='ms-section-title'>
                Transparent <span className='ms-grad-text'>Pricing</span>
              </h2>
              <p className='ms-section-sub'>
                No hidden fees. No surprises. Choose the plan that fits your
                vision and budget.
              </p>
            </motion.div>

            <div className='pricing-grid'>
              {pricing.map((p, i) => (
                <PricingCard key={i} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════ FAQ SECTION ══════ */}
        <section className='ms-section ms-faq-section'>
          <div className='ms-inner container'>
            <div className='faq-layout'>
              <motion.div
                className='faq-left'
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className='ms-badge'>❓ FAQs</div>
                <h2 className='ms-section-title'>
                  Common <span className='ms-grad-text'>Questions</span>
                </h2>
                <p className='ms-section-sub' style={{ marginBottom: 32 }}>
                  Everything you need to know before we start building together.
                </p>
                <Magnetic>
                  <a href='#contact' className='faq-cta-btn'>
                    Ask Me Anything →
                  </a>
                </Magnetic>
              </motion.div>

              <div className='faq-right'>
                {faqs.map((f, i) => (
                  <FaqItem key={i} {...f} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════ CTA BANNER ══════ */}
        <section className='ms-section ms-cta-section'>
          <motion.div
            className='ms-cta-card container'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='ms-cta-orb-l' />
            <div className='ms-cta-orb-r' />
            <div className='ms-cta-inner'>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className='ms-cta-badge-icon'
              >
                ✦
              </motion.div>
              <h2 className='ms-cta-title'>
                Ready to Build Something{' '}
                <span className='ms-grad-text'>Extraordinary?</span>
              </h2>
              <p className='ms-cta-sub'>
                Let's turn your vision into a high-performance digital
                experience. I'm currently available for new projects.
              </p>
              <div className='ms-cta-btns'>
                <Magnetic>
                  <a href='#contact' className='cta-btn-primary'>
                    Start a Project →
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href='#portfolio' className='cta-btn-outline'>
                    View My Work
                  </a>
                </Magnetic>
              </div>
              <div className='ms-cta-avail'>
                <span className='avail-dot' /> Available for freelance —
                Response within 24h
              </div>
            </div>
          </motion.div>
        </section>
      </Element>
    </div>
  )
}
