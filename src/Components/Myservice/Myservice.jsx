import React from 'react'
import ServiceThumbnail from './Myservice-thumbnail/ServiceThumbnail'
import './Myservice-thumbnail/ServiceThumbnail.css'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'

function Myservice () {
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

  return (
    <div className='myservice-root-container'>
      <Element name='services'>
        <section className='myservice-wrapper container'>
          <div className='myservice-title'>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My Services
            </motion.h1>
          </div>

          {/* Staggered loading container for all 9 interactive thumbnail blocks */}
          <motion.div
            className='myservice-thumbnail'
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
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
                  thumbnailId={service.id}
                  thumbnailTitle={service.title}
                  thumbnailDesc={service.desc}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Element>
    </div>
  )
}

export default Myservice
