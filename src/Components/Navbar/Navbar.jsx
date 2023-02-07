import React from 'react'
import '../Navbar/NavbarStyles.css'
import { useContext } from 'react';
import { authContext } from '../../Context/useContext';
import exitIcon from '../../img/exitIcon.png'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Navbar({setIsAuth}) {
const user=useParams();

 function exit(){
    setIsAuth(false);
    localStorage.removeItem('auth');
 }
  return (
    <div> 
    <div className='navbar'>
      <div className='navbar__left'>
    <a className='nav__link' href="default.asp">Главная</a>
    <a className='nav__link' href="news.asp">Тесты</a>
    <Link to ='/about' className='nav__link'>О нас</Link>
    <Link to ='/support' className='nav__link'>Связаться с нами</Link>
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