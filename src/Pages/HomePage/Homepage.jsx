import React from "react";
import Carousel from "./Carousel";
import NavBar from "../../components/Navbar/Navbar";
import About from "./About";
import GuideLines from "./GuideLines";
import Marquee from "../../components/Marquee/Marquee";
import Notice from "./Notice";
import { Captcha } from "../../components/CAPTACH/Captcha";
import Octagon from "../../components/Octagon/Octagon";

function HomePage() {
  return (
    <>
      <NavBar />
      <div>
        <Carousel></Carousel>

      </div>
      <Marquee/>
      <Notice/>
      <About />
      <GuideLines />
      {/* <Octagon/> */}
     
    </>
  );
}

export default HomePage;
