import React from 'react'
import '../Navbar/NavbarStyles.css'
import { useContext } from 'react';
import { authContext, groupsContext } from '../../Context/useContext';
import exitIcon from '../../img/exitIcon.png'
import { useEffect } from 'react';
import { NavLink,Link } from 'react-router-dom';
import PostService from '../../Api/PostService';
import { useFetching } from '../../hooks/useFething';


function Navbar() {
  const {setIsAuth,user}=useContext(authContext);
 
 
 function exit(){
    setIsAuth(false);
    localStorage.removeItem('auth');
 }

  return (
    <div> 
    <div className='navbar'>
      <div className='navbar__left'>
    <NavLink className='nav__link' to={'/'}>Главная</NavLink>
    <div className='nav__link dropdown' to='/'>Тесты
    <div className="dropdown-content">
      <Link  to ='/myTests' className='drop__link'>Мои тесты</Link>
      <Link to ='/testCreater'  className='drop__link'>Создать тест</Link>
      <Link to ='/passTests'  className='drop__link'>Пройти тест</Link>
    </div>
    </div>
    <div className='nav__link dropdown' to='/'>Группы
    <div className="dropdown-content">
      <Link  to ='/myGroups' className='drop__link'>Мои группы</Link>
      <Link to ='/searchGroups'  className='drop__link'>Поиск группы</Link>
    </div>
    </div>
    <NavLink className='nav__link' to='/about'>О нас</NavLink>
    <NavLink to ='/support' className='nav__link'>Связаться с нами</NavLink>
    <NavLink to ='/tutorial' className='nav__link'>Обучение</NavLink>
    </div>
    <div className="navbar__right">
      <NavLink to ='/myProfile' className="nav__user__profile">
          <div className='nav__user'>{user.login}</div>
          {user.pic!==''
          ?<img className='user__icon' src={user.pic}/>
          : <div className="user__icon"></div>
          }
          
      </NavLink>
   <img src={exitIcon} alt="" className="exit__icon" onClick={exit} />
   </div>
  </div> 
  </div>
  )
}

export default Navbar