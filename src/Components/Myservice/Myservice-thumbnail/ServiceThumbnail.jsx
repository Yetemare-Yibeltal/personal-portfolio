import React from 'react'
import './ServiceThumbnail.css'

function ServiceThumbnail ({
  thumbnailId,
  thumbnailTitle,
  thumbnailDesc,
  onReadMore
}) {
  return (
    <div className='service-container'>
      <div className='service-content-wrapper'>
        <section className='service-thum'>
          <div className='corner-pip' />
          <div className='card-top-accent'>
            <span className='roman-numeral'>{thumbnailId}</span>
          </div>
          <div className='card-content-block'>
            <h3 className='service-card-title'>{thumbnailTitle}</h3>
            <p className='service-card-desc'>{thumbnailDesc}</p>
          </div>
          <button
            className='read-more-btn'
            onClick={e => {
              e.stopPropagation()
              onReadMore && onReadMore()
            }}
          >
            <span>Read more</span>
          </button>
        </section>
      </div>
    </div>
  )
}

export default ServiceThumbnail
