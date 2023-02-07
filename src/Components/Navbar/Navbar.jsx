import React from 'react'
import '../Navbar/NavbarStyles.css'
import { useContext } from 'react';
import { authContext } from '../../Context/useContext';
import exitIcon from '../../img/exitIcon.png'
import { useParams } from 'react-router-dom';
import { Link,NavLink } from 'react-router-dom';
function Navbar({setIsAuth,user}) {


 function exit(){
    setIsAuth(false);
    localStorage.removeItem('auth');
 }
  return (
    <div> 
    <div className='navbar'>
      <div className='navbar__left'>
    <NavLink className='nav__link' to={'/'}>Главная</NavLink>
    <NavLink className='nav__link' to='/'>Тесты</NavLink>
    <NavLink className='nav__link' to='/'>О нас</NavLink>
    <NavLink to ='/support' className='nav__link'>Связаться с нами</NavLink>
    </div>
    <div className="navbar__right">
      <div className='nav__user'>{user.login}</div>
      <div className='user__icon'></div>
   <img src={exitIcon} alt="" className="exit__icon" onClick={exit} />
   </div>
  </div> 
  </div>
  )
}

export default Navbar