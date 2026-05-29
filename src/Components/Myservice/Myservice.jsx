import React from "react";
import ServiceThumbnail from "./Myservice-thumbnail/ServiceThumbnail";
import "./Myservice-thumbnail/ServiceThumbnail.css";
import { Element } from "react-scroll";
function Myservice() {
  return (
    <div className="myservice">
      <Element name="services">
        <section className="myservice-wrapper">
          <div className="myservice-title">
            <h1>My Service</h1>
          </div>
          <div className="myservice-thumnail">
            <ServiceThumbnail
              thumbnailId="I"
              thumbnailTitle="Optimized Workflow"
              thumbnailDesc="My development experience is powered by modern tooling—VS Code extensions like Emmet, IntelliCode, and Prettier keep my code clean, fast, and maintainable."
            />
            <ServiceThumbnail
              thumbnailId="II"
              thumbnailTitle=" Integrated Interfaces"
              thumbnailDesc=" I create seamless connections between user interfaces and backend systems, enabling smooth, secure data exchange.
            From dynamic form handling to API integration.
"
            />
            <ServiceThumbnail
              thumbnailId="III"
              thumbnailTitle="Client-Centric Delivery"
              thumbnailDesc="Every project is delivered with precision and purpose—on time, aligned with client goals, and built to leave a lasting impression."
            />
            <ServiceThumbnail
              thumbnailId="IV"
              thumbnailTitle="Developer-Centric"
              thumbnailDesc=" Built for uptime and impact: my backend services run on clean net code, with a focus on performance, reliability, and timely delivery that earns client confidence."
            />
            <ServiceThumbnail
              thumbnailId="V"
              thumbnailTitle="Real-Time Update "
              thumbnailDesc=" I deploy full stack applications with real-time updates, ensuring clients always experience the latest features without delay."
            />
            <ServiceThumbnail
              thumbnailId="VI"
              thumbnailTitle="24/7 Uptime Service "
              thumbnailDesc=" I deliver  continuous availability and real-time performance.
            and reliable access—anytime, anywhere, without disruption.
"
            />
            <ServiceThumbnail
              thumbnailId="VII"
              thumbnailTitle="Fully Responisve "
              thumbnailDesc="  Responsive codes across all devices using Bootstrap, CSS, and media queries.
.
"
            />
            <ServiceThumbnail
              thumbnailId="VIII"
              thumbnailTitle=" Creative UI/UX Design"
              thumbnailDesc=" I design intuitive interfaces with interactive gradients, custom icons, and SVG graphics that elevate user engagement and brand identity.
"
            />
          </div>
        </section>
      </Element>
    </div>
  );
}

export default Myservice;
