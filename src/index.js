import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css"
import "./Components/Header/Header.css";
import "./Components/Profile/Profile.css";
import "./Components/About/About.css";
import "./Components/Myservice/Myservice.css";
import "./Components/LatestWork/Latestwork.css";
import "./Components/LatesWor-Thumbnail/WorkThumbnail.css";
import "./Components/Contact/Contact.css";
import "./Components/Footer/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
