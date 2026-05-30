import React, { useState, useEffect } from 'react'
import profileImage from '../../Images/profile.png'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import './Profile.css'

// --- Custom Component: Self-Writing/Typing Text Effect ---
const TypingText = () => {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const fullText = 'Full Stack Developer'
  const typingSpeed = 150 // Speed of typing out letters
  const deletingSpeed = 75 // Speed of deleting letters

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing out
        setText(fullText.substring(0, text.length + 1))

        // Pause at the end before deleting
        if (text === fullText) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Deleting back
        setText(fullText.substring(0, text.length - 1))

        // Pause at the start before typing again
        if (text === '') {
          setIsDeleting(false)
        }
      }
    }

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timer)
  }, [text, isDeleting])

  return (
    <span className='typing-text-wrapper'>
      {text}
      <span className='typing-cursor'>|</span>
    </span>
  )
}

// --- Main Hero Profile Component ---
function Profile () {
  return (
    <Element name='profile'>
      <section className='profile-wrapper'>
        <div className='profile-container container'>
          {/* Left/Right Balance: 3D Morphing Card */}
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

          {/* Typography Content Column */}
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
              <h3 className='job-gradient'>
                <TypingText />
              </h3>
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

           ;<div className='headline-btns'>
  {/* Contact Me Link pointing straight to your Telegram */}
  <a
    href='https://t.me/yibeltalyitayew2024'
    target='_blank'
    rel='noopener noreferrer'
    className='head-btn btn-primary-glow text-decoration-none'
  >
    <span>Contact Me</span>
  </a>

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
