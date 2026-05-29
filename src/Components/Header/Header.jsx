import React, { useState } from "react";
import { Link } from "react-scroll";
import contact from "../../Images/contact.png";
import { Element } from "react-scroll";
import "./Header.css";
function Header({
  // this props is used to scroll to contact section when the button is clicked;
  onConnectClick,
}) {
  // underline state in header lists menu items.
  const [headerMenu, setHeaderMenu] = useState("home");
  return (
    // the Element component is used to make the scroll effect work properly;
    <Element name="home">
      <div className="header-wrapper container-fluid">
        <div>
          <nav className="navbar navbar-expand-md navbar-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <div className="header-img ms-3 mt-3">
                  <img src={contact} className="" />
                </div>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse  d-md-flex  
             "
                id="navbarNav"
              >
                <ul className="navbar-nav   ms-3 d-md-flex text-color-light justify-content-end  align-items-start w-100 list-unstyled  UL-GAP">
                  <li
                    className={`nav-item ${
                      headerMenu === "home" ? "underline" : ""
                    }`}
                    onClick={() => setHeaderMenu("home")}
                  >
                    <Link
                      className="nav-link"
                      to="profile"
                      smooth={true}
                      duration={250}
                      // Adjust navbar height
                      offset={-100}
                      onClick={() => setHeaderMenu("home")}
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      headerMenu === "about" ? "underline" : ""
                    }`}
                    onClick={() => setHeaderMenu("about")}
                  >
                    <Link
                      className="nav-link"
                      to="about"
                      smooth={true}
                      duration={250}
                      // Adjust navbar height
                      offset={-100}
                      onClick={() => setHeaderMenu("about")}
                    >
                      About
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      headerMenu === "services" ? "underline" : ""
                    }`}
                    onClick={() => setHeaderMenu("services")}
                  >
                    {/*when we click the button it scrolls smothly in the in each section; */}
                    <Link
                      className="nav-link"
                      to="services"
                      smooth={true}
                      duration={250}
                      // Adjust navbar height
                      offset={-100}
                      onClick={() => setHeaderMenu("services")}
                    >
                      Services
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      headerMenu === "portfolio" ? "underline" : ""
                    }`}
                    onClick={() => setHeaderMenu("portfolio")}
                  >
                    <Link
                      className="nav-link"
                      to="portfolio"
                      smooth={true}
                      duration={250}
                      // Adjust navbar height
                      offset={-100}
                      onClick={() => setHeaderMenu("portfolio")}
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      headerMenu === "contact" ? "underline" : ""
                    }`}
                    onClick={() => setHeaderMenu("contact")}
                  >
                    <Link
                      className="nav-link"
                      to="contact"
                      smooth={true}
                      duration={250}
                      // Adjust navbar height
                      offset={-100}
                      onClick={() => setHeaderMenu("contact")}
                    >
                      Contact
                    </Link>
                  </li>
                  <div className="header-btn">
                    <button
                      className="d-none d-md-block"
                      // this function is passed as a prop from the app.js file; it used to scroll to the contact section when the button is clicked;
                      onClick={onConnectClick}
                    >
                      Whatsapp
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Element>
  );
}

export default Header;
