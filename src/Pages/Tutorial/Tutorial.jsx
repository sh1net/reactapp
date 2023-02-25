import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import TutorialInformation from '../../Components/TutorialInformation/TutorialInformation';
import './Tutorial.css'
function Tutorial() {

  return (
    <div className="tutorial__general">
      <Header/>
        <Navbar/>
        <TutorialInformation/>
    </div>
  )
}

export default Tutorial