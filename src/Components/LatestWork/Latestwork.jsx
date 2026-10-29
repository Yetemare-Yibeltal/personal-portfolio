import React, { useState, useEffect, useRef } from 'react'
import WorkThumbnail from '../LatesWor-Thumbnail/WorkThumbnail'
import flower from '../../Images/flower.jpg'
import { Element } from 'react-scroll'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import './Latestwork.css'

/* ─────────────────────────────────────────────
   📦 PROJECT DATA — 13 builds with full metadata
───────────────────────────────────────────── */
const projectsData = [
  {
    title: 'Digital Equb Platform',
    tag: 'Full Stack',
    stats: { stars: '24', forks: '8', views: '3.4k' },
    github: 'https://github.com/Yetemare-Yibeltal/EQUB-PLATFORM-With-REACT.git',
    live: 'https://equb-platform-with-react-1.onrender.com'
  },
  {
    title: 'Github Profile Stastics Viewer',
    tag: 'Frontend',
    stats: { stars: '18', forks: '5', views: '2.7k' },
    github: 'https://github.com/Yetemare-Yibeltal/Profile-Statstics-.git',
    live: 'https://profile-stastics.vercel.app/'
  },
  {
    title: 'Year Counting App',
    tag: 'UI/UX',
    stats: { stars: '13', forks: '3', views: '132' },
    github: 'https://github.com/Yetemare-Yibeltal/Year-Counting-app.git',
    live: 'https://year-counting-app.vercel.app/'
  },
  {
    title: 'Clinic Management System',
    tag: 'Full Stack',
    stats: { stars: '21', forks: '12', views: '408' },
    github: 'https://github.com/Yetemare-Yibeltal/Clinic-Management-System.git',
    live: 'https://kidus-yared-healthcare-frontend.onrender.com'
  },
  {
    title: 'Netflix',
    tag: 'With React Technologies',
    stats: { stars: '15', forks: '6', views: '2.2k' },
    github: 'https://github.com/Yetemare-Yibeltal/Netflix-Clone.git',
    live: 'https://netflix-clone-mu-two-19.vercel.app/'
  },
  {
    title: 'Inventory Management System',
    tag: 'API Integration',
    stats: { stars: '9', forks: '2', views: '1.5k' },
    github: 'https://github.com/Yetemare-Yibeltal/Inventory-supply-chain.git'
  },
  {
    title: 'Scientific Calculator',
    tag: 'JavaScript',
    stats: { stars: '7', forks: '2', views: '1.1k' },
    github: 'https://github.com/Yetemare-Yibeltal',
    live: 'https://github.com/Yetemare-Yibeltal'
  },
  {
    title: 'Ecommerce Etcare Website',
    tag: 'Full Stack',
    stats: { stars: '22', forks: '9', views: '3.0k' },
    github: 'https://github.com/Yetemare-Yibeltal',
    live: 'https://github.com/Yetemare-Yibeltal'
  },
  {
    title: 'WhatsApp Clone',
    tag: 'Real-Time Web',
    stats: { stars: '28', forks: '11', views: '3.8k' },
    github: 'https://github.com/Yetemare-Yibeltal',
    live: 'https://github.com/Yetemare-Yibeltal'
  },
  {
    title: 'Injibara University Feature',
    tag: 'Security Architecture',
    stats: { stars: '14', forks: '4', views: '2.0k' },
    github: 'https://github.com/Yetemare-Yibeltal',
    live: 'https://github.com/Yetemare-Yibeltal'
  },
  {
    title: 'Food and Restaurant Portal',
    tag: 'Frontend',
    stats: { stars: '10', forks: '3', views: '1.6k' },
    github: 'https://github.com/Yetemare-Yibeltal',
    live: 'https://github.com/Yetemare-Yibeltal'
  },
  {
    title: 'Video Editing Website',
    tag: 'UI/UX Architecture',
    stats: { stars: '13', forks: '4', views: '1.8k' },
    github: 'https://github.com/Yetemare-Yibeltal',
    live: 'https://github.com/Yetemare-Yibeltal'
  },
  {
    title: 'Ethiopian Videos with API',
    tag: 'Backend Systems',
    stats: { stars: '19', forks: '7', views: '2.5k' },
    github: 'https://github.com/Yetemare-Yibeltal',
    live: 'https://github.com/Yetemare-Yibeltal'
  }
]

/* ─────────────────────────────────────────────
   🔢 ANIMATED COUNT-UP NUMBER
───────────────────────────────────────────── */
function CountUp ({ end, duration = 1800, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || started) return
    setStarted(true)
    const startTime = performance.now()
    const animate = now => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(end)
    }
    requestAnimationFrame(animate)
  }, [inView, started, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────
   🎬 FRAMER MOTION VARIANTS
───────────────────────────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: -28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
}

const statsVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
  }
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 90, damping: 16 }
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: 24,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
}

/* ─────────────────────────────────────────────
   🏗️ MAIN COMPONENT
───────────────────────────────────────────── */
function Latestwork () {
  const [isExpanded, setIsExpanded] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const visibleProjects = isExpanded ? projectsData : projectsData.slice(0, 6)

  /* Scroll to grid top on collapse */
  const handleToggle = () => {
    if (isExpanded && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => setIsExpanded(false), 300)
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <div className='latest-work-root'>
      {/* ── Ambient floating orbs ── */}
      <div className='orb orb-1' aria-hidden='true' />
      <div className='orb orb-2' aria-hidden='true' />
      <div className='orb orb-3' aria-hidden='true' />
      <div className='orb orb-4' aria-hidden='true' />

      <Element name='portfolio'>
        <section ref={sectionRef} className='latest-work-wrapper container'>
          {/* ── EYEBROW PILL ── */}
          <motion.div
            className='section-eyebrow'
            variants={headerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <span className='eyebrow-dot' aria-hidden='true' />
            Portfolio Showcase
          </motion.div>

          {/* ── TITLE ── */}
          <div className='latest-work-title'>
            <motion.h1
              variants={headerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              My Latest Work
            </motion.h1>

            <motion.div
              className='title-underline'
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ transformOrigin: 'left center' }}
            />

            <motion.p
              className='section-subtitle'
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              A curated collection of full-stack applications, UI experiments,
              and real-time systems built with passion and precision.
            </motion.p>
          </div>

          {/* ── STATS BAR ── */}
          <motion.div
            className='section-stats-bar'
            variants={statsVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <div className='stat-item'>
              <span className='stat-number'>
                <CountUp end={13} suffix='+' />
              </span>
              <span className='stat-label'>Projects</span>
            </div>

            <div className='stats-divider' aria-hidden='true' />

            <div className='stat-item'>
              <span className='stat-number'>
                <CountUp end={8} suffix='+' />
              </span>
              <span className='stat-label'>Technologies</span>
            </div>

            <div className='stats-divider' aria-hidden='true' />

            <div className='stat-item'>
              <span className='stat-number'>
                <CountUp end={3} suffix='yrs' />
              </span>
              <span className='stat-label'>Experience</span>
            </div>

            <div className='stats-divider' aria-hidden='true' />

            <div className='stat-item'>
              <span className='stat-number'>
                <CountUp end={100} suffix='%' />
              </span>
              <span className='stat-label'>Passion</span>
            </div>
          </motion.div>

          {/* ── PROJECT GRID ── */}
          <motion.div
            className='latest-work-component-wrapper'
            variants={gridVariants}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            style={{ perspective: '1400px' }}
          >
            <AnimatePresence mode='popLayout'>
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  layout
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <WorkThumbnail
                    WorkThumbnailImage={flower}
                    WorkThumbnailTitle={project.title}
                    WorkThumbnailTag={project.tag}
                    githubUrl={project.github}
                    liveUrl={project.live}
                    stats={project.stats}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {/* ── SHOW MORE / LESS BUTTON ── */}
          <div className='button-wrapper'>
            <motion.button
              className={`showmore-btn ${isExpanded ? 'btn-active' : ''}`}
              onClick={handleToggle}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
              <span className='btn-icon' aria-hidden='true'>
                <i className='fa-solid fa-chevron-down' />
              </span>
            </motion.button>
          </div>
        </section>
      </Element>
    </div>
  )
}

export default Latestwork
