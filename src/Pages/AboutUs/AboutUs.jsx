import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import AboutUsInformation from '../../Components/AboutUs/AboutUs';
import './AboutUs.css'
function AboutUs() {

  return (
    <div className="about__us__general">
      <Header/>
        <Navbar/>
        <AboutUsInformation/>
    </div>
  )
}

export default AboutUs