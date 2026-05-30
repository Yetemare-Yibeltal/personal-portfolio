import React, { useState } from 'react'
import aboutImage from '../../Images/About-image.png'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'

function About () {
  // Tracking mouse positions for 3D card perspective tilt
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = e => {
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2

    // Smooth angle limitation formulas
    setRotateX((y / (box.height / 2)) * -15)
    setRotateY((x / (box.width / 2)) * 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  // Unique tech stacks list with accurate metadata to fix your old duplicate items
  const skillsData = [
    {
      name: 'HTML',
      percent: '99%',
      color: 'linear-gradient(90deg, #ff4500, #ff8c00)'
    },
    {
      name: 'CSS',
      percent: '98%',
      color: 'linear-gradient(90deg, #2575fc, #6a11cb)'
    },
    {
      name: 'Bootstrap',
      percent: '92%',
      color: 'linear-gradient(90deg, #7952b3, #b57cff)'
    },
    {
      name: 'JavaScript',
      percent: '90%',
      color: 'linear-gradient(90deg, #f1c40f, #f39c12)'
    },
    {
      name: 'jQuery',
      percent: '88%',
      color: 'linear-gradient(90deg, #0769ad, #00a2ff)'
    },
    {
      name: 'React',
      percent: '95%',
      color: 'linear-gradient(90deg, #00d2ff, #0072ff)'
    },
    {
      name: 'Node.js',
      percent: '93%',
      color: 'linear-gradient(90deg, #11998e, #38ef7d)'
    },
    {
      name: 'MongoDB',
      percent: '91%',
      color: 'linear-gradient(90deg, #13bb41, #0a7e22)'
    },
    {
      name: 'MySQL',
      percent: '94%',
      color: 'linear-gradient(90deg, #e49316, #b86b00)'
    }
  ]

  return (
    <Element name='about'>
      <section className='about-wrapper'>
        {/* Animated About Card Core Block */}
        <motion.div
          className='about-container container'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className='about-title'>
            <h1>About Me</h1>
          </div>

          <div className='about-body'>
            {/* Interactive 3D Perspective Card Wrapper */}
            <div
              className='about-img-frame'
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div className='about-img-glare'>
                <img src={aboutImage} alt='Metages Portrait' />
              </div>
            </div>

            <div className='aboutmeDescANDSkill'>
              <div className='description'>
                <p>
                  I'm <span className='highlight-text'>Yibeltal Yitayew</span>, a
                  passionate Full Stack Developer with a flair for building
                  clean, responsive web experiences that blend design and
                  functionality. With a solid foundation in modern front-end
                  engineering and back-end architecture, I thrive on turning
                  complex ideas into user-friendly digital solutions.
                </p>
                <p>
                  I believe great code tells a story — one that’s readable,
                  maintainable, and built to last. I’m constantly exploring new
                  tools, frameworks, and web security architectures to deliver
                  solutions that are not just functional, but elegant.
                  Collaboration, deep problem-solving, and continuous structural
                  iteration are at the heart of my workflow.
                </p>
                <p>
                  On the backend, I engineer robust server-side logic using
                  Node.js and Express, design RESTful APIs, and manage complex
                  data structures with MongoDB and SQL configurations — ensuring
                  every web platform is blazing fast, safe, and built for global
                  scalability.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Highly Interactive Skill Matrix Section --- */}
        <div className='skills-section-container container'>
          <h2 className='skill-header'>Professional Skills</h2>

          <motion.ul
            className='skills-grid'
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {skillsData.map((skill, index) => (
              <motion.li
                key={index}
                className='skill-item-card'
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 100 }
                  }
                }}
              >
                <div className='skill-meta'>
                  <span className='skill-name'>{skill.name}</span>
                  <span className='skill-percent'>{skill.percent}</span>
                </div>

                <div className='skill-progress-track'>
                  <motion.div
                    className='skill-progress-bar'
                    initial={{ width: '0%' }}
                    whileInView={{ width: skill.percent }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                    style={{ background: skill.color }}
                  />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </Element>
  )
}

export default About
