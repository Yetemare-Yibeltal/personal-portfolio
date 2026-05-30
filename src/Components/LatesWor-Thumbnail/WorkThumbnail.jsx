import React from 'react'
import { Link } from 'react-router-dom'

function WorkThumbnail ({
  WorkThumbnailImage,
  WorkThumbnailTitle,
  WorkThumbnailTag
}) {
  return (
    <div className='work-card-container'>
      <section className='work-thumbnail'>
        {/* Cinematic Media Capture Box */}
        <div className='project-image-box'>
          <img
            src={WorkThumbnailImage}
            alt={WorkThumbnailTitle}
            loading='lazy'
          />
          <div className='project-gradient-shroud'></div>
        </div>

        {/* 3D Layer Exploded Text Floating Content Shield */}
        <div className='project-info-shield'>
          <div className='project-meta-layer'>
            <span className='project-tag-pill'>
              {WorkThumbnailTag || 'Web Application'}
            </span>
          </div>

          <h2 className='project-main-heading'>
            <Link to='/portfolio' className='text-clear'>
              {WorkThumbnailTitle}
            </Link>
          </h2>

          <div className='project-action-link'>
            <span>View Case Study</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorkThumbnail
