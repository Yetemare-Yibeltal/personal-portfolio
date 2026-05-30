import React from 'react'
import profileImage from '../../Images/profile.png'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import './Profile.css'

function Profile () {
  return (
    <Element name='profile'>
      <section className='profile-wrapper'>
        <div className='profile-container container'>
          {/* Left Column: Interactive 3D Animated Image Container */}
          <motion.div
            className='profile-img-side'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className='profile-img-glow-card'>
              <img
                src={profileImage}
                alt='Metages Yibeltal Profile'
                className='profile-avatar'
              />
            </div>
          </motion.div>

          {/* Right Column: Premium Interactive Typography Content */}
          <motion.div
            className='profile-text-side'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className='headline'>
              <h2 className='welcome-tag'>Welcome to my universe</h2>
              <h1>
                Hi, I'm <span className='name-gradient'>Metages Yibeltal</span>
              </h1>
              <h3 className='job-gradient'>Full Stack Web Developer</h3>
            </div>

            <div className='profile-bio'>
              <p>
                Passionate full stack developer who thrives on building seamless
                digital experiences from front to back. With a deep
                understanding of responsive design and scalable backend
                architecture, I create web platforms that are both visually
                striking and technically sound.
              </p>
              <p>
                My frontend work reflects precision and creativity, while my
                backend logic ensures performance, security, and
                maintainability. I specialize in crafting recruiter-ready
                layouts, integrating custom interactive mechanics, and solving
                complex architecture challenges.
              </p>
            </div>

            <div className='headline-btns'>
              <button className='head-btn btn-primary-glow'>
                <span>Contact Me</span>
              </button>
              <button className='head-btn btn-secondary-outline'>
                <span>My Resume</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Element>
  )
}

export default Profile
