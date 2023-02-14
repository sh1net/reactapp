import React from 'react'
import '../Navbar/NavbarStyles.css'
import { useContext } from 'react';
import { authContext } from '../../Context/useContext';
import exitIcon from '../../img/exitIcon.png'
import { useEffect } from 'react';
import { NavLink,Link } from 'react-router-dom';
import PostService from '../../Api/PostService';
import { useFetching } from '../../hooks/useFething';
function Navbar() {
  const {setIsAuth,user,setUser,users}=useContext(authContext);
  const [fetchUserById]=useFetching(async(login)=>{
    const fetchedUserById=await PostService.getUserById(login);
    setUser(fetchedUserById);
    })

  useEffect(() => {
    if(!user.login){
      const id=(users.find((v)=>v.login==localStorage.getItem('userLogin'))).id
        fetchUserById(id);
    }

    
  
    
  }, [])
  
    
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
  
    <NavLink className='nav__link' to='/about'>О нас</NavLink>
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