import React from "react";
import { Link } from "react-router-dom";
function ServiceThumbnail({thumbnailId, thumbnailTitle, thumbnailDesc}) {
  return (
    <div>
      <section className="service-thum">
        <h2>{thumbnailId}</h2>
        <h1>{thumbnailTitle}</h1>
        <p>{thumbnailDesc}</p>
        <Link className="reade-more" to="">
          Read more
        </Link>
      </section>
    </div>
  );
}

export default ServiceThumbnail;
