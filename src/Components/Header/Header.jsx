import React from 'react'
import "../Header/headerStyles.css"
import headerLogo from '../../img/headerLogo.png'
function Header() {
  return (
    <div className='header'>
        <img className='header__logo' src={headerLogo} alt="" />
        <div className='header__title'>ArishTest</div>
    </div>
  )
}

export default Header