import React from "react";
import aboutImage from "../../Images/About-image.jpg";
import { Element } from "react-scroll";

function About() {
  return (
    <div>
      <Element name="about" >
        <section className="about-wrapper">
          <div className="about-title">
            <h1>About Me</h1>
          </div>
          <div className="about-body">
            <div className="about-img">
              <img src={aboutImage} alt="" />
            </div>
            <div className="aboutmeDescANDSkill">
              <div className="description">
                <p>
                  I'M Metages, a passionate Full Stack Developer with a flair
                  for building clean, responsive web experiences that blend
                  design and functionality. With a solid foundation in HTML,
                  CSS, JavaScript, and the MERN stack, I thrive on turning
                  complex ideas into user-friendly digital solutions.
                </p>
                <p>
                  I believe great code tells a story — one that’s readable,
                  maintainable, and built to last. I’m constantly exploring new
                  tools, frameworks, and best practices to stay ahead of the
                  curve and deliver solutions that are not just functional, but
                  elegant. Collaboration, problem-solving, and continuous
                  learning are at the heart of my workflow
                </p>
                <p>
                  On the backend, I engineer robust server-side logic using
                  Node.js and Express, design RESTful APIs, and manage data flow
                  with MongoDB — ensuring every application is fast, secure, and
                  built for growth. I value clean architecture, modular code,
                  and performance-driven development.
                </p>
              </div>
            </div>
          </div>{" "}
          {/* SkiLL Section Style. */}
          <h1 className="skill-header">Professional Skills</h1>
        </section>
        <section className="skill-wrapper">
          <ul>
            <li className="skill-item">
              <span className="skill-name">HTML</span>
              <div className="skill-box">
                <span className="text-end d-block">99%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "99%" }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-name">CSS</span>
              <div className="skill-box">
                <span className="text-end d-block">98%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "98%" }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-name">Bootstrap</span>
              <div className="skill-box">
                <span className="text-end d-block">92%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-name">Javascript</span>
              <div className="skill-box">
                <span className="text-end d-block">90%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-name">JEQUERY</span>
              <div className="skill-box">
                <span className="text-end d-block">88%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "88%" }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-name">React</span>
              <div className="skill-box">
                <span className="text-end d-block">95%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-name">Nodejs</span>
              <div className="skill-box">
                <span className="text-end d-block">93%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "93%" }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-name">React</span>
              <div className="skill-box">
                <span className="text-end d-block">95%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="skill-item">
              <span className="skill-name">MYSQL</span>
              <div className="skill-box">
                <span className="text-end d-block">94%</span>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </Element>
    </div>
  );
  
}
export default About;