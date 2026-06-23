import React, { useState, useRef, useEffect } from 'react'
import ServiceThumbnail from './Myservice-thumbnail/ServiceThumbnail'
import './Myservice-thumbnail/ServiceThumbnail.css'
import './Myservice.css'
import { Element, Link as ScrollLink } from 'react-scroll'
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence
} from 'framer-motion'

/* ── Magnetic ── */
function Magnetic ({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })
  return (
    <motion.div
      ref={ref}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

/* ── ProcessStep ── */
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

/* ── ToolBadge ── */
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

/* ── FaqItem ── */
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

/* ── PricingCard ── */
function PricingCard ({
  plan,
  priceLabel,
  priceNote,
  features,
  color,
  popular,
  delay
}) {
  return (
    <motion.div
      className={`pricing-card ${popular ? 'pricing-popular' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -10, boxShadow: `0 30px 70px ${color}22` }}
      style={{ '--price-color': color }}
    >
      {popular && <div className='pricing-badge'>⭐ Most Popular</div>}
      <div className='pricing-plan'>{plan}</div>
      <div className='pricing-price-label'>{priceLabel}</div>
      <div className='pricing-price-note'>{priceNote}</div>
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

/* ── WhyCard ── */
function WhyCard ({ icon, title, desc, color, delay }) {
  return (
    <motion.div
      className='why-card'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8 }}
      style={{ '--wc': color }}
    >
      <div className='why-icon'>{icon}</div>
      <h4 className='why-title'>{title}</h4>
      <p className='why-desc'>{desc}</p>
      <div className='why-line' />
    </motion.div>
  )
}

/* ── GuaranteeCard ── */
function GuaranteeCard ({ icon, title, desc, color, delay }) {
  return (
    <motion.div
      className='guarantee-card'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 90 }}
      whileHover={{ y: -6 }}
      style={{ '--gc': color }}
    >
      <div className='guarantee-icon-wrap'>
        <span>{icon}</span>
      </div>
      <h4 className='guarantee-title'>{title}</h4>
      <p className='guarantee-desc'>{desc}</p>
    </motion.div>
  )
}

/* ── ReadMoreModal ── */
function ReadMoreModal ({ service, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <motion.div
      className='rm-overlay'
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className='rm-box'
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        style={{ '--mc': service.color }}
      >
        <button className='rm-close' onClick={onClose}>
          ✕
        </button>

        <div className='rm-header'>
          <span className='rm-numeral'>{service.id}</span>
          <div>
            <span className='rm-category'>{service.category}</span>
            <h2 className='rm-title'>{service.title}</h2>
          </div>
        </div>

        <div className='rm-divider' />
        <p className='rm-full-desc'>{service.fullDesc}</p>

        <p className='rm-section-label'>✦ What's Included</p>
        <ul className='rm-included-list'>
          {service.included.map((item, i) => (
            <motion.li
              key={i}
              className='rm-included-item'
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <span className='rm-check'>✓</span>
              {item}
            </motion.li>
          ))}
        </ul>

        <p className='rm-section-label'>🛠 Technologies</p>
        <div className='rm-tech-row'>
          {service.tech.map((t, i) => (
            <span key={i} className='rm-tech-pill'>
              {t}
            </span>
          ))}
        </div>

        <p className='rm-section-label'>⚙️ My Approach</p>
        <div className='rm-steps'>
          {service.steps.map((s, i) => (
            <motion.div
              key={i}
              className='rm-step'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 * i }}
            >
              <div className='rm-step-num'>{i + 1}</div>
              <div>
                <div className='rm-step-title'>{s.title}</div>
                <div className='rm-step-desc'>{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='rm-cta-row'>
          <Magnetic>
            <ScrollLink
              to='contact'
              smooth={true}
              duration={600}
              offset={-70}
              className='rm-cta-btn'
              onClick={onClose}
            >
              Start This Project →
            </ScrollLink>
          </Magnetic>
          <span className='rm-avail'>
            <span className='avail-dot' /> Available now
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function Myservice () {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedService, setSelectedService] = useState(null)

  const servicesData = [
    {
      id: 'I',
      category: 'DevOps',
      color: '#00f2fe',
      title: 'Optimized Workflow',
      desc: 'My development experience is powered by modern tooling—VS Code extensions like Emmet, IntelliCode, and Prettier keep my code clean, fast, and maintainable.',
      fullDesc:
        'I engineer development pipelines that eliminate friction and maximize velocity. From editor configuration to CI/CD automation, every layer of my workflow is fine-tuned for clarity, consistency, and long-term maintainability. Your codebase will be structured for teams, not just individuals — readable, scalable, and built to last through every phase of growth.',
      included: [
        'VS Code workspace configuration',
        'ESLint + Prettier setup',
        'Husky pre-commit hooks',
        'CI/CD pipeline configuration',
        'Code review checklist & standards',
        'Git branching strategy documentation'
      ],
      tech: [
        'VS Code',
        'ESLint',
        'Prettier',
        'Husky',
        'GitHub Actions',
        'Docker'
      ],
      steps: [
        {
          title: 'Audit',
          desc: 'Review existing tooling and identify bottlenecks'
        },
        {
          title: 'Configure',
          desc: 'Set up linting, formatting, and automation rules'
        },
        {
          title: 'Integrate',
          desc: 'Wire everything into a cohesive pipeline'
        },
        {
          title: 'Document',
          desc: 'Write team onboarding and usage guidelines'
        }
      ]
    },
    {
      id: 'II',
      category: 'Full Stack',
      color: '#a100ff',
      title: 'Integrated Interfaces',
      desc: 'I create seamless connections between user interfaces and backend systems, enabling smooth, secure data exchange from dynamic form handling to custom API paths.',
      fullDesc:
        'Frontend and backend living in perfect harmony. I architect full-stack solutions where the UI layer communicates seamlessly with your server — RESTful APIs, real-time sockets, and secure authentication all wired into a single cohesive product. Every data flow is optimized, every edge case handled, and every interaction designed for speed and reliability.',
      included: [
        'React frontend with reusable components',
        'RESTful API design & implementation',
        'JWT authentication system',
        'Form validation (client + server)',
        'Error handling & loading states',
        'API documentation (Swagger/Postman)'
      ],
      tech: ['React', 'Node.js', 'Express', 'REST API', 'JWT', 'Axios'],
      steps: [
        {
          title: 'Design API contract',
          desc: 'Define endpoints, payloads, and auth strategy'
        },
        {
          title: 'Build backend',
          desc: 'Implement routes, middleware, and database models'
        },
        {
          title: 'Build frontend',
          desc: 'Create UI components connected to live API'
        },
        {
          title: 'Test & secure',
          desc: 'End-to-end testing, security audit, and deployment'
        }
      ]
    },
    {
      id: 'III',
      category: 'Delivery',
      color: '#ff277b',
      title: 'Client-Centric Delivery',
      desc: 'Every project is delivered with precision and purpose—on time, completely aligned with your targets, and built to leave a lasting modern impression.',
      fullDesc:
        'I treat every deadline as a commitment, not a suggestion. My delivery process is built around you — milestone check-ins, staging previews, and iterative feedback loops ensure you are never left wondering. You see real progress at every stage and receive exactly what was promised: a polished, production-ready product that reflects your vision.',
      included: [
        'Weekly progress reports',
        'Staging environment for review',
        'Milestone-based delivery',
        'UAT support period',
        'Post-launch monitoring',
        'Full handoff documentation'
      ],
      tech: ['Vercel', 'Netlify', 'GitHub', 'Notion', 'Loom', 'Slack'],
      steps: [
        {
          title: 'Scope agreement',
          desc: 'Detailed spec signed off before development begins'
        },
        {
          title: 'Milestone delivery',
          desc: 'Phased delivery with client review at each stage'
        },
        {
          title: 'UAT period',
          desc: 'Client testing window with rapid fix turnaround'
        },
        {
          title: 'Launch & handoff',
          desc: 'Production deployment with full knowledge transfer'
        }
      ]
    },
    {
      id: 'IV',
      category: 'Backend',
      color: '#4facfe',
      title: 'Developer-Centric',
      desc: 'Built for uptime and impact: backend systems running on structured net code with an emphasis on rock-solid reliability that builds user confidence.',
      fullDesc:
        'I architect backend systems that scale gracefully under load and survive the unexpected. Every route is secured, every edge case handled, and every service layer is modular and testable. Whether you need a REST API, a database-heavy application, or a microservices backbone, I build it with reliability that earns user trust.',
      included: [
        'Node.js / Express server setup',
        'Database schema design',
        'Authentication & authorization',
        'Rate limiting & security headers',
        'Error logging (Winston/Morgan)',
        'Unit & integration tests'
      ],
      tech: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Jest', 'Winston'],
      steps: [
        {
          title: 'Architecture design',
          desc: 'Plan data models, service layers, and API structure'
        },
        {
          title: 'Implementation',
          desc: 'Build routes, controllers, services, and middleware'
        },
        {
          title: 'Security hardening',
          desc: 'Add rate limiting, input validation, and auth guards'
        },
        {
          title: 'Testing',
          desc: 'Write unit/integration tests and perform load testing'
        }
      ]
    },
    {
      id: 'V',
      category: 'Full Stack',
      color: '#38ef7d',
      title: 'Real-Time Updates',
      desc: 'I deploy full-stack applications with real-time updates and low latency metrics, ensuring users instantly experience data changes without reload delays.',
      fullDesc:
        'Real-time features transform static apps into living products. I implement WebSocket connections, Socket.io integrations, and live data pipelines from the ground up — from instant chat systems and live dashboards to collaborative tools. Every user interaction reflects data changes in milliseconds, not seconds.',
      included: [
        'WebSocket / Socket.io setup',
        'Live dashboard components',
        'Real-time notifications',
        'Presence indicators (online/offline)',
        'Event-driven architecture',
        'Connection resilience & reconnect logic'
      ],
      tech: ['Socket.io', 'WebSockets', 'Redis', 'React', 'Node.js', 'MongoDB'],
      steps: [
        {
          title: 'Event mapping',
          desc: 'Define all real-time events and data payloads'
        },
        {
          title: 'Socket layer',
          desc: 'Build server-side socket handlers and rooms'
        },
        {
          title: 'UI integration',
          desc: 'Connect frontend components to live socket events'
        },
        {
          title: 'Resilience testing',
          desc: 'Test reconnection, race conditions, and scaling'
        }
      ]
    },
    {
      id: 'VI',
      category: 'DevOps',
      color: '#00f2fe',
      title: '24/7 Uptime Layouts',
      desc: 'I deliver applications optimized for continuous availability, high performance, and reliable server-side asset rendering under heavy networking traffic.',
      fullDesc:
        'Downtime costs money, credibility, and users. I build and deploy applications with redundancy, health monitoring, and automated recovery at every layer. From load-balanced servers and CDN-optimized asset delivery to real-time uptime alerts, your application will stay available when it matters most.',
      included: [
        'Load balancer configuration',
        'Health check endpoints',
        'PM2 / Docker deployment',
        'CDN asset optimization',
        'Uptime monitoring alerts',
        'Auto-restart on failure'
      ],
      tech: [
        'Docker',
        'PM2',
        'Nginx',
        'Cloudflare',
        'AWS / DigitalOcean',
        'UptimeRobot'
      ],
      steps: [
        {
          title: 'Infrastructure review',
          desc: 'Audit current hosting and identify failure points'
        },
        {
          title: 'Redundancy setup',
          desc: 'Configure load balancing and failover systems'
        },
        {
          title: 'Monitoring',
          desc: 'Set up alerts, logs, and uptime dashboards'
        },
        {
          title: 'Stress test',
          desc: 'Simulate traffic spikes and validate recovery'
        }
      ]
    },
    {
      id: 'VII',
      category: 'Frontend',
      color: '#f1c40f',
      title: 'Fully Responsive',
      desc: 'Fluid layouts built cleanly to scale elegantly across smartphone screens, tablets, and wide high-definition monitors using pure modern CSS logic.',
      fullDesc:
        'Every screen size is a first-class citizen. I build layouts with CSS Grid, Flexbox, and fluid typography that adapt beautifully from 320px mobile to 4K monitors — no breakpoint hacks, no overflow bugs. Your users get a premium, consistent experience on every device they hold.',
      included: [
        'Mobile-first CSS architecture',
        'CSS Grid + Flexbox layouts',
        'Fluid typography (clamp)',
        'Touch-friendly interactive elements',
        'Cross-browser testing',
        'Accessibility (WCAG AA) compliance'
      ],
      tech: ['CSS3', 'CSS Grid', 'Flexbox', 'React', 'Figma', 'BrowserStack'],
      steps: [
        {
          title: 'Mobile-first base',
          desc: 'Start with smallest viewport, build upward'
        },
        {
          title: 'Layout systems',
          desc: 'Implement Grid/Flexbox with fluid containers'
        },
        {
          title: 'Typography & spacing',
          desc: 'Apply clamp() for smooth scale across breakpoints'
        },
        {
          title: 'QA across devices',
          desc: 'Test on real devices and browsers'
        }
      ]
    },
    {
      id: 'VIII',
      category: 'UI/UX',
      color: '#ff277b',
      title: 'Creative UI/UX Design',
      desc: 'I design intuitive interfaces with custom gradients, interactive layers, and light-weight vector graphics that elevate user engagement and brand presence.',
      fullDesc:
        'Great design is invisible — users simply feel it. I craft interface experiences that guide attention naturally, reduce friction at every touchpoint, and reinforce your brand identity with precision. From low-fidelity wireframes to high-fidelity Figma prototypes and pixel-perfect implementation, every visual decision is intentional.',
      included: [
        'User flow mapping',
        'Wireframes (low + high fidelity)',
        'Figma prototype',
        'Design system / component library',
        'Micro-interaction design',
        'Handoff to development'
      ],
      tech: [
        'Figma',
        'Adobe Illustrator',
        'CSS Animations',
        'Framer Motion',
        'Lottie',
        'React'
      ],
      steps: [
        {
          title: 'Research & mood board',
          desc: 'Gather inspiration and define visual direction'
        },
        { title: 'Wireframes', desc: 'Map user flows and layout structure' },
        {
          title: 'High-fidelity design',
          desc: 'Build polished screens with full visual treatment'
        },
        {
          title: 'Prototype & test',
          desc: 'Interactive prototype with usability validation'
        }
      ]
    },
    {
      id: 'IX',
      category: 'Full Stack',
      color: '#a100ff',
      title: 'Full-Stack Integration',
      desc: 'Connecting secure databases, robust server layers, and interactive front-ends into one unified application package designed for high-velocity user scaling.',
      fullDesc:
        'The complete picture — frontend, backend, database, and deployment — as one unified production-ready system. No integration gaps, no hidden technical debt. You get a single point of accountability and a product that works seamlessly end-to-end, from the first pixel on screen to the deepest database query.',
      included: [
        'React frontend',
        'Node.js + Express backend',
        'MongoDB or MySQL database',
        'REST API + JWT auth',
        'Admin dashboard',
        'Full deployment pipeline'
      ],
      tech: [
        'React',
        'Node.js',
        'MongoDB',
        'MySQL',
        'Express',
        'Docker',
        'Vercel'
      ],
      steps: [
        {
          title: 'System architecture',
          desc: 'Design the full data and service architecture'
        },
        {
          title: 'Backend development',
          desc: 'Build APIs, auth, and database models'
        },
        {
          title: 'Frontend development',
          desc: 'Build UI connected to live backend'
        },
        {
          title: 'Integration & deploy',
          desc: 'Connect all layers and ship to production'
        }
      ]
    }
  ]

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Full Stack',
    'UI/UX',
    'DevOps',
    'Delivery'
  ]
  const filtered =
    activeFilter === 'All'
      ? servicesData
      : servicesData.filter(s => s.category === activeFilter)

  /* ── 6-step process ── */
  const process = [
    {
      number: '01',
      title: 'Discovery',
      color: '#00f2fe',
      delay: 0,
      desc: 'Deep-dive into your goals, audience, and technical requirements to shape the perfect scope. Every decision starts here.'
    },
    {
      number: '02',
      title: 'Planning',
      color: '#38ef7d',
      delay: 0.08,
      desc: 'Architecture decisions, tech stack selection, milestone timelines, and a written spec signed off before any code is written.'
    },
    {
      number: '03',
      title: 'Design',
      color: '#a100ff',
      delay: 0.16,
      desc: 'Wireframes, prototypes, and high-fidelity UI mockups crafted with pixel-precision and your brand voice in mind.'
    },
    {
      number: '04',
      title: 'Development',
      color: '#ff277b',
      delay: 0.24,
      desc: 'Clean, modular code written with modern stacks — React, Node, MongoDB — reviewed, tested, and iterated at every step.'
    },
    {
      number: '05',
      title: 'Testing',
      color: '#f1c40f',
      delay: 0.32,
      desc: 'End-to-end QA, cross-browser checks, performance audits, security scans, and UAT with your team before going live.'
    },
    {
      number: '06',
      title: 'Launch',
      color: '#4facfe',
      delay: 0.4,
      desc: 'Production deployment, performance tuning, SEO optimization, and a full handoff with documentation and ongoing support.'
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

  const whyCards = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      color: '#00f2fe',
      delay: 0,
      desc: 'Performance-first development. Every project is optimized for Core Web Vitals, minimal bundle size, and sub-second load times from day one.'
    },
    {
      icon: '🔒',
      title: 'Security First',
      color: '#a100ff',
      delay: 0.1,
      desc: 'JWT auth, input sanitization, rate limiting, CORS hardening — security is baked into every layer of the stack, never bolted on at the end.'
    },
    {
      icon: '📐',
      title: 'Clean Architecture',
      color: '#ff277b',
      delay: 0.2,
      desc: 'Modular, documented, readable code. Built for teams, not just demos. Your future developers will thank you for choosing maintainable structure.'
    },
    {
      icon: '🤝',
      title: 'Transparent Process',
      color: '#38ef7d',
      delay: 0.3,
      desc: 'Weekly updates, staging previews, and open communication throughout. You are never left wondering what is happening with your project.'
    },
    {
      icon: '🚀',
      title: 'On-Time Delivery',
      color: '#f1c40f',
      delay: 0.4,
      desc: 'Deadlines are commitments. Milestone-based delivery keeps projects on track — if something changes, you are the first to know.'
    },
    {
      icon: '♾️',
      title: 'Long-Term Support',
      color: '#4facfe',
      delay: 0.5,
      desc: 'Post-launch support available for every project. Bug fixes, feature additions, and performance audits — I am here long after go-live.'
    }
  ]

  const guarantees = [
    {
      icon: '🛡️',
      title: 'Satisfaction Guaranteed',
      color: '#00f2fe',
      delay: 0,
      desc: 'If the delivered work does not match the agreed scope and quality, I will revise it at no extra cost until it genuinely meets your expectations.'
    },
    {
      icon: '📅',
      title: 'Deadline Commitment',
      color: '#a100ff',
      delay: 0.1,
      desc: 'Every project comes with a clear written timeline agreed upon before a single line of code is written. I honour every deadline.'
    },
    {
      icon: '🔁',
      title: 'Continuous Revisions',
      color: '#ff277b',
      delay: 0.2,
      desc: 'Within the agreed project scope, revisions are a natural part of the process, not an extra charge. I iterate with you until every detail matches your vision.'
    },
    {
      icon: '🔐',
      title: 'Your Code, Your Property',
      color: '#38ef7d',
      delay: 0.3,
      desc: 'Full intellectual property ownership transfers to you upon project completion — no strings attached, no licensing traps, no vendor lock-in.'
    },
    {
      icon: '📞',
      title: 'Always Reachable',
      color: '#f1c40f',
      delay: 0.4,
      desc: 'Questions are answered promptly and progress is communicated every week. No radio silence, no vague updates, ever.'
    },
    {
      icon: '🚀',
      title: 'Ongoing Post-Launch Care',
      color: '#4facfe',
      delay: 0.5,
      desc: 'Every project includes a dedicated post-launch period where I actively monitor performance and make quick adjustments to keep everything running smoothly.'
    }
  ]

  const pricing = [
    {
      plan: 'Starter',
      priceLabel: 'Light Investment',
      priceNote:
        'Ideal for individuals and small businesses who need a clean, professional online presence without a large upfront commitment.',
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
        { label: 'Ongoing Support Period', included: true }
      ]
    },
    {
      plan: 'Professional',
      priceLabel: 'Moderate Investment',
      priceNote:
        'Best for growing businesses that need a full-stack product with secure authentication, a database, and a polished admin interface.',
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
        { label: 'Extended Support Period', included: true }
      ]
    },
    {
      plan: 'Enterprise',
      priceLabel: 'Premium Investment',
      priceNote:
        'For organisations requiring a complete, scalable, enterprise-grade system with real-time features, CI/CD, security auditing, and long-term dedicated support.',
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
        { label: 'Long-Term Dedicated Support', included: true }
      ]
    }
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
      a: 'Absolutely. I offer ongoing support covering bug fixes, feature additions, performance monitoring, and security patches — available on a continuous basis after every launch.'
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
    },
    {
      q: 'Do you sign NDAs or contracts?',
      delay: 0.5,
      a: 'Yes. Every project starts with a formal agreement covering scope, timeline, payment terms, and IP ownership. NDAs are available on request for sensitive projects.'
    }
  ]

  return (
    <div className='myservice-root-container'>
      <Element name='services'>
        {/* ── HERO ── */}
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

            {/* Value strip — no stats (those live in About Me) */}
            <motion.div
              className='ms-value-strip'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className='ms-value-item'>
                <span className='ms-value-icon'>⚡</span>
                <span className='ms-value-text'>Fast Delivery</span>
              </div>
              <span className='ms-value-divider' />
              <div className='ms-value-item'>
                <span className='ms-value-icon'>🔒</span>
                <span className='ms-value-text'>Secure by Default</span>
              </div>
              <span className='ms-value-divider' />
              <div className='ms-value-item'>
                <span className='ms-value-icon'>📐</span>
                <span className='ms-value-text'>Clean Architecture</span>
              </div>
              <span className='ms-value-divider' />
              <div className='ms-value-item'>
                <span className='ms-value-icon'>🤝</span>
                <span className='ms-value-text'>Full Ownership Transfer</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WHY CHOOSE ME ── */}
        <section className='ms-section ms-why-section'>
          <div className='ms-inner container'>
            <motion.div
              className='ms-section-header'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className='ms-badge'>🏆 Why Choose Me</div>
              <h2 className='ms-section-title'>
                Built Different.{' '}
                <span className='ms-grad-text'>Delivered Better.</span>
              </h2>
              <p className='ms-section-sub'>
                Six commitments I bring to every single project — no exceptions,
                no excuses.
              </p>
            </motion.div>
            <div className='why-grid'>
              {whyCards.map((w, i) => (
                <WhyCard key={i} {...w} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES ── */}
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
                Nine pillars of excellence. Click any card to explore full
                details.
              </p>
            </motion.div>

            <div className='ms-filter-row'>
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  className={`ms-filter-btn${
                    activeFilter === cat ? ' ms-filter-active' : ''
                  }`}
                  onClick={() => setActiveFilter(cat)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <div className='myservice-thumbnail'>
              {filtered.map(s => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceThumbnail
                    thumbnailId={s.id}
                    thumbnailTitle={s.title}
                    thumbnailDesc={s.desc}
                    onReadMore={() => setSelectedService(s)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS (6 steps) ── */}
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
                A proven six-phase workflow that transforms your idea into a
                polished digital product.
              </p>
            </motion.div>
            <div className='process-grid'>
              {process.map((p, i) => (
                <ProcessStep key={i} {...p} />
              ))}
            </div>
            <div className='process-line-track'>
              <motion.div
                className='process-line-fill'
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
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

        {/* ── GUARANTEE ── */}
        <section className='ms-section ms-guarantee-section'>
          <div className='ms-orb ms-orb-1' />
          <div className='ms-inner container'>
            <motion.div
              className='ms-section-header'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className='ms-badge'>🛡️ My Guarantees</div>
              <h2 className='ms-section-title'>
                What You Can <span className='ms-grad-text'>Always Expect</span>
              </h2>
              <p className='ms-section-sub'>
                Every project I take on comes with these non-negotiable
                commitments — backed by action, not just words.
              </p>
            </motion.div>
            <div className='guarantee-grid'>
              {guarantees.map((g, i) => (
                <GuaranteeCard key={i} {...g} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
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
                No hidden fees. Investment scales with scope and complexity.
                Reach out for a tailored quote.
              </p>
            </motion.div>
            <div className='pricing-grid'>
              {pricing.map((p, i) => (
                <PricingCard key={i} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
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
                  <ScrollLink
                    to='contact'
                    smooth={true}
                    duration={600}
                    offset={-70}
                    className='faq-cta-btn'
                  >
                    Ask Me Anything →
                  </ScrollLink>
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

        {/* ── CTA ── */}
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
                experience. Currently available for new projects.
              </p>
              <div className='ms-cta-btns'>
                <Magnetic>
                  <ScrollLink
                    to='contact'
                    smooth={true}
                    duration={600}
                    offset={-70}
                    className='cta-btn-primary'
                  >
                    Start a Project →
                  </ScrollLink>
                </Magnetic>
                <Magnetic>
                  <ScrollLink
                    to='portfolio'
                    smooth={true}
                    duration={600}
                    offset={-70}
                    className='cta-btn-outline'
                  >
                    View My Work
                  </ScrollLink>
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

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedService && (
          <ReadMoreModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
