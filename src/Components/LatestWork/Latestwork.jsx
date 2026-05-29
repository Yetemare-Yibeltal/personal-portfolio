import React from "react";
import WorkThumbnail from "../LatesWor-Thumbnail/WorkThumbnail";
import flower from "../../Images/flower.jpg"
import { Element } from "react-scroll";
function Latestwork() {
  return (
    <div>
      <Element name="portfolio">
        <div className="latest-work-wrapper">
          <div className="latest-work-title">
            <h1> My Latest Work</h1>
          </div>
          <div className="latest-work-component-wrapper">
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Netflex app with react"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Youtube Clone"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Apple with Bootstrap"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Instagram App"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Zoom app"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Weather app"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Scientific Calculator"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Ecommerence Etcare Website"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="WhatstApp"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Injibara University Feature"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Food and Restaurant"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Video Editing Website"
            />
            <WorkThumbnail
              WorkThumbnailImage={flower}
              WorkThumbnailTitle="Ethiopian Videos with API"
            />
          </div>
          {/* Show more button Style */}
          <section className="button-wrapper">
            <span className="showmore-arrow"></span>
            <button className="showmore-btn">Show more</button>
          </section>
        </div>
      </Element>
    </div>
  );
}

export default Latestwork;
