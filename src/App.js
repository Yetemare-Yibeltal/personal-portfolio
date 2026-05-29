import React, { useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import About from "./Components/About/About";
import Myservice from "./Components/Myservice/Myservice";
import Latestwork from "./Components/LatestWork/Latestwork";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";

function App() {
  const contactRef = useRef(null);
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header onConnectClick={scrollToContact} />
        <Profile></Profile>
        <About></About>
        <Myservice></Myservice>
        <Latestwork></Latestwork>
        <Contact ref={contactRef} />

        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
