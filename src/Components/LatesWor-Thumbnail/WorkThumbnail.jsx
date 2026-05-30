import React from 'react'
import './WorkThumbnail.css'

function WorkThumbnail ({
  WorkThumbnailImage,
  WorkThumbnailTitle,
  WorkThumbnailTag
}) {
  return (
    <div className='work-card-container'>
      <section className='work-thumbnail'>
        {/* Project Visual Container */}
        <div className='project-image-box'>
          <img
            src={WorkThumbnailImage}
            alt={WorkThumbnailTitle || 'Project Card'}
            loading='lazy'
          />
          <div className='project-gradient-shroud'></div>
        </div>

        {/* Dynamic Typography & Control Frame */}
        <div className='project-info-shield'>
          {/* Centered Top Text Container */}
          <div className='project-header-block'>
            <div className='project-meta-layer'>
              <span className='project-tag-pill'>
                <span className='slash-marker'>//</span>{' '}
                {WorkThumbnailTag || 'Full Stack'}
              </span>
            </div>

            <h2 className='project-main-heading'>{WorkThumbnailTitle}</h2>
          </div>

          {/* Action Dock with expanded spacing */}
          <div className='project-control-dock'>
            <a
              href='https://github.com/Yetemare-Yibeltal'
              target='_blank'
              rel='noreferrer'
              className='action-pill-btn github-btn'
            >
              <i className='fa-brands fa-github icon-marker'></i>
              <span className='sliding-text'>Code</span>
            </a>

            <a
              href='https://github.com/Yetemare-Yibeltal'
              target='_blank'
              rel='noreferrer'
              className='action-pill-btn live-btn'
            >
              <i className='fa-solid fa-arrow-up-right-from-square icon-marker'></i>
              <span className='sliding-text'>Live View</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorkThumbnail
