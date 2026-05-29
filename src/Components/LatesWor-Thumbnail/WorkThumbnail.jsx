import React from "react";
import thumbnail from "../../Images/croped-bg.png";
import { Link } from "react-router-dom";
function WorkThumbnail({ WorkThumbnailImage, WorkThumbnailTitle }) {
  return (
    <div>
      <section className="work-thumbnail">
        <div className="image-with-title">
          <img src={WorkThumbnailImage} />
          <h2>
            <Link to="" className="text-clear">{WorkThumbnailTitle}</Link>
          </h2>
        </div>
      </section>
    </div>
  );
}

export default WorkThumbnail;
