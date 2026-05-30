import React from 'react'
import { Link } from 'react-router-dom'

function ServiceThumbnail ({ thumbnailId, thumbnailTitle, thumbnailDesc }) {
  return (
    <div className='service-container'>
      <div className='service-content-wrapper'>
        <section className='service-thum'>
          {/* Glowing corner pip — top right decorative dot */}
          <div className='corner-pip' />

          {/* Z+20: Roman numeral with animated gradient */}
          <div className='card-top-accent'>
            <span className='roman-numeral'>{thumbnailId}</span>
          </div>

          {/* Z+40: Title + Description content block */}
          <div className='card-content-block'>
            <h3 className='service-card-title'>{thumbnailTitle}</h3>
            <p className='service-card-desc'>{thumbnailDesc}</p>
          </div>

          {/* Z+65: Highest floating CTA button */}
          <Link className='read-more-btn' to='/contact'>
            <span>Read more</span>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default ServiceThumbnail
