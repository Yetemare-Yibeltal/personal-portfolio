import React, { useState } from 'react'
import WorkThumbnail from '../LatesWor-Thumbnail/WorkThumbnail'
import flower from '../../Images/flower.jpg'
import { Element } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'

function Latestwork () {
  // Array holding all your 13 development builds
  const projectsData = [
    { title: 'Netflix App with React', tag: 'Full Stack' },
    { title: 'YouTube Clone', tag: 'Frontend' },
    { title: 'Apple with Bootstrap', tag: 'UI/UX' },
    { title: 'Instagram App', tag: 'Full Stack' },
    { title: 'Zoom App', tag: 'WebRTC' },
    { title: 'Weather App', tag: 'API Integration' },
    { title: 'Scientific Calculator', tag: 'JavaScript' },
    { title: 'Ecommerce Etcare Website', tag: 'Full Stack' },
    { title: 'WhatsApp Clone', tag: 'Real-Time Web' },
    { title: 'Injibara University Feature', tag: 'Security Architecture' },
    { title: 'Food and Restaurant Portal', tag: 'Frontend' },
    { title: 'Video Editing Website', tag: 'UI/UX Architecture' },
    { title: 'Ethiopian Videos with API', tag: 'Backend Systems' }
  ]

  // State flag tracking whether grid has been expanded
  const [isExpanded, setIsExpanded] = useState(false)

  // Evaluates exactly how many items should pass to the active layout grid
  const visibleProjects = isExpanded ? projectsData : projectsData.slice(0, 6)

  return (
    <div className='latest-work-root'>
      <Element name='portfolio'>
        <section className='latest-work-wrapper container'>
          <div className='latest-work-title'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              My Latest Work
            </motion.h1>
          </div>

          {/* Precision 3D Project Matrix Grid Container */}
          <div className='latest-work-component-wrapper'>
            <AnimatePresence mode='popLayout'>
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.03
                  }}
                >
                  <WorkThumbnail
                    WorkThumbnailImage={flower}
                    WorkThumbnailTitle={project.title}
                    WorkThumbnailTag={project.tag} // Passing custom categorization flags
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Interactive Pagination Controller Section */}
          <div className='button-wrapper'>
            <button
              className={`showmore-btn ${isExpanded ? 'btn-active' : ''}`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
            </button>
          </div>
        </section>
      </Element>
    </div>
  )
}

export default Latestwork
