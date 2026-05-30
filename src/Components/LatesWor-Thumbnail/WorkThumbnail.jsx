import React from 'react'

function WorkThumbnail ({
  WorkThumbnailImage,
  WorkThumbnailTitle,
  WorkThumbnailTag
}) {
  return (
    <div className='work-card-container'>
      <section className='work-thumbnail'>
        {/* Media Frame Section */}
        <div className='project-image-box'>
          <img
            src={WorkThumbnailImage}
            alt={WorkThumbnailTitle}
            loading='lazy'
          />
          <div className='project-gradient-shroud'></div>
        </div>

        {/* Text and Button Control Frame */}
        <div className='project-info-shield'>
          <div className='project-header-block'>
            <div className='project-meta-layer'>
              <span className='project-tag-pill'>
                <span className='slash-marker'>//</span>{' '}
                {WorkThumbnailTag || 'Full Stack Dev'}
              </span>
            </div>

            <h2 className='project-main-heading'>{WorkThumbnailTitle}</h2>
          </div>

          {/* 🕹️ CENTERED ACTIONS ON AN ISOLATED CONTROL DECK BACKGROUND */}
          <div className='project-control-dock'>
            {/* GitHub Code Repo Pill */}
            <a
              href='https://github.com/Yetemare-Yibeltal'
              target='_blank'
              rel='noreferrer'
              className='action-pill-btn github-btn'
            >
              <i className='fa-brands fa-github icon-marker'></i>
              <span className='sliding-text'>Code</span>
            </a>

            {/* Live Web Application View Pill */}
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
