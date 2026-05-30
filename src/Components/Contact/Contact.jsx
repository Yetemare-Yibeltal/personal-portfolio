import React, { useState, useRef, forwardRef } from 'react'
import locationIcon from '../../Images/location.png'
import phoneIcon from '../../Images/phone.png'
import messageIcon from '../../Images/messsage-icon.png'
import { Element } from 'react-scroll'
import './Contact.css'

const Contact = forwardRef((props, ref) => {
  const deckRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [activeInput, setActiveInput] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [transmissionStatus, setTransmissionStatus] = useState('IDLE') // IDLE -> PACKET_STREAM -> SUCCESS

  // Real-Time Mouse Tracking Parallax Formulas
  const handleMouseMove = e => {
    if (!deckRef.current) return
    const card = deckRef.current
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2

    setRotation({
      x: -(y / box.height) * 12, // Tilts on X-plane
      y: (x / box.width) * 12 // Tilts on Y-plane
    })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 }) // Restores flat alignment smoothly
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const triggerSecureTransmission = e => {
    e.preventDefault()
    setTransmissionStatus('PACKET_STREAM')

    // Simulates complex software handshake buffers
    setTimeout(() => {
      setTransmissionStatus('SUCCESS')
      setTimeout(() => {
        setTransmissionStatus('IDLE')
        setFormData({ name: '', email: '', message: '' })
      }, 4000)
    }, 2500)
  }

  return (
    <section ref={ref} id='contact' className='contact-perspective-shell'>
      <Element name='contact'>
        <div
          className='contact-wrapper'
          ref={deckRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          {/* Laser-cut border trim lines */}
          <div className='laser-trim-bar top-neon'></div>
          <div className='laser-trim-bar bottom-neon'></div>

          <div className='contact-header'>
            <h1 className='glitch-header' data-text='Talk To Me'>
              Talk To Me
            </h1>
          </div>

          <div className='contact-body-wrapper'>
            {/* ==========================================
               📡 LEFT PANEL: PLATFORM DATA NODES
               ========================================== */}
            <div className='nearSide-left'>
              <h1>Say Hello</h1>
              <p>
                If you come across a project requiring full-stack development
                services, feel free to connect through the contact details
                below.
              </p>
              <ul>
                <li className='info-node-row tg-glow'>
                  <div className='icon-shroud'>
                    <img src={messageIcon} alt='Email' className='email-icon' />
                  </div>
                  <div className='info-meta-strings'>
                    <span>Email :</span>
                    <p className='string-val'>metagesyibeltal540@gmail.com</p>
                  </div>
                </li>
                <li className='info-node-row orange-glow'>
                  <div className='icon-shroud'>
                    <img src={phoneIcon} alt='Phone' className='phone-icon' />
                  </div>
                  <div className='info-meta-strings'>
                    <span>Phone :</span>
                    <p className='string-val'>+2519 -23 85 32 52</p>
                  </div>
                </li>
                <li className='info-node-row green-glow'>
                  <div className='icon-shroud'>
                    <img
                      src={locationIcon}
                      alt='Location'
                      className='location-icon'
                    />
                  </div>
                  <div className='info-meta-strings'>
                    <span>Location :</span>
                    <p className='string-val'>Injibara, Ethiopia</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* ==========================================
               🖥️ RIGHT PANEL: HIGH-VISIBILITY FORM TERMINAL
               ========================================== */}
            <div className='nearSide-right'>
              {transmissionStatus === 'IDLE' && (
                <form
                  onSubmit={triggerSecureTransmission}
                  className='interactive-form-matrix'
                >
                  <div
                    className={`cyber-input-capsule ${
                      activeInput === 'name' || formData.name
                        ? 'capsule-focused'
                        : ''
                    }`}
                  >
                    <label>
                      <span className='decorator-id'>// 01.</span> Your Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      required
                      placeholder='Enter your name'
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput('name')}
                      onBlur={() => setActiveInput(null)}
                      autoComplete='off'
                    />
                    <div className='capsule-laser-line'></div>
                  </div>

                  <div
                    className={`cyber-input-capsule ${
                      activeInput === 'email' || formData.email
                        ? 'capsule-focused'
                        : ''
                    }`}
                  >
                    <label>
                      <span className='decorator-id'>// 02.</span> Your Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      required
                      placeholder='Enter your email'
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput('email')}
                      onBlur={() => setActiveInput(null)}
                      autoComplete='off'
                    />
                    <div className='capsule-laser-line'></div>
                  </div>

                  <div
                    className={`cyber-input-capsule textarea-capsule ${
                      activeInput === 'message' || formData.message
                        ? 'capsule-focused'
                        : ''
                    }`}
                  >
                    <label>
                      <span className='decorator-id'>// 03.</span> Write your
                      message below
                    </label>
                    <textarea
                      name='message'
                      required
                      placeholder='Type your message'
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput('message')}
                      onBlur={() => setActiveInput(null)}
                    ></textarea>
                    <div className='capsule-laser-line'></div>
                  </div>

                  <div className='submit-btn'>
                    <button type='submit'>
                      <span className='btn-vibe-overlay'></span>
                      <span className='btn-payload-text'>Send Message</span>
                    </button>
                  </div>
                </form>
              )}

              {/* LIVE PACKET STREAM SIMULATOR */}
              {transmissionStatus === 'PACKET_STREAM' && (
                <div className='terminal-packet-stream'>
                  <div className='cyber-loader-ring'></div>
                  <h3>COMPILING ENCRYPTED DATA STREAMS</h3>
                  <div className='waterfall-log-terminal'>
                    <p className='log-line text-cyan'>
                      [OK] Connected to port 443 via Injibara Node
                    </p>
                    <p className='log-line text-orange'>
                      [PROCESSING] Packing source keys for operator:{' '}
                      {formData.name}
                    </p>
                    <p className='log-line text-green'>
                      [SECURITY] Encryption verification engine active
                    </p>
                    <p className='log-line infinite-flash'>
                      // TRANSMITTING SOURCE METRICS SECURELY via AES_256...
                    </p>
                  </div>
                </div>
              )}

              {/* SUCCESS ENVELOPE TRANSMITTED */}
              {transmissionStatus === 'SUCCESS' && (
                <div className='hud-success-module'>
                  <div className='success-pulse-ring'>
                    <i className='fa-solid fa-circle-check'></i>
                  </div>
                  <h3>TRANSMISSION COMPLETED</h3>
                  <p>
                    Your architectural data payload has been parsed
                    successfully. Systems are tracking your ticket.
                  </p>
                  <div className='checksum-footer'>
                    STATUS: 200 OK // REQ_RESOLVED
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Element>
    </section>
  )
})

export default Contact
