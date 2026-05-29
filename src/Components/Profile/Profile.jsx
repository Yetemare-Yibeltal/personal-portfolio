import React from "react";
import profileImage from "../../Images/profile.png";
import { Element } from "react-scroll";
function Profile() {
  return (
    <div>
      <Element name="profile">
        <section className="profile-wrapper">
          <div className="profile-img ">
            <img src={profileImage} alt="profile image" className=" " />
          </div>
          <div className="headline">
            <h1>
              <span> My Name is Metages Yibeltal</span> <br />
            </h1>
            <h1>I'M A Full Stack Web Developer</h1>
            <section className="container">
              <p>
                Passionate full stack developer who thrives on building seamless
                digital experiences from front to back. With a deep
                understanding of responsive design and scalable backend
                architecture, I create web platforms that are both visually
                striking and technically sound.{" "}
                <p>
                  My frontend work reflects precision and creativity, while my
                  backend logic ensures performance, security, and
                  maintainability.
                </p>
                I specialize in crafting recruiter-ready layouts, integrating
                custom SVG graphics, and solving layout bugs with finesse. Every
                project is an opportunity to blend design clarity with
                engineering rigor. I’m driven by clean code, intuitive user
                flows, and the challenge of turning complex ideas into elegant
                solutions.
              </p>
              <p>
                Whether refining an About Me section or deploying a full stack
                app, I bring focus, resilience, and a commitment to excellence.
                My goal is to deliver work that not only functions flawlessly
                but leaves a lasting impression. Want to tailor this for a
                specific job or add a standout achievement? I can help you
                sharpen it even more.
              </p>
            </section>
          </div>
          <div className="headline-btns">
            <button className="head-btns">Contact Me</button>
            <button className="head-btns">My Resume</button>
          </div>
        </section>
      </Element>
    </div>
  );
}

export default Profile;
