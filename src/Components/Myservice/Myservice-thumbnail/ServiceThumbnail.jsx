import React from 'react'
import { Link } from 'react-router-dom'

function ServiceThumbnail ({ thumbnailId, thumbnailTitle, thumbnailDesc }) {
  return (
    <section className='service-thum'>
      <div className='card-top-accent'>
        <span className='roman-numeral'>{thumbnailId}</span>
      </div>

      <div className='card-content-block'>
        <h3 className='service-card-title'>{thumbnailTitle}</h3>
        <p className='service-card-desc'>{thumbnailDesc}</p>
      </div>

      <Link className='read-more-btn' to='/contact'>
        <span>Read more</span>
      </Link>
    </section>
  )
}

export default ServiceThumbnail
