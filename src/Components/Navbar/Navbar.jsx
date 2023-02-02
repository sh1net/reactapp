import React from 'react'
import '../Navbar/NavbarStyles.css'
import { useContext } from 'react';
import { authContext } from '../../Context/useContext';

function Navbar({setIsAuth}) {

 function exit(){
    setIsAuth(false);
    localStorage.removeItem('auth');
 }
  return (
    <div> 
    <ul>
    <li><a href="default.asp">Home</a></li>
    <li><a href="news.asp">News</a></li>
    <li><a href="contact.asp">Contact</a></li>
    <li onClick={exit}>Выйти</li>
  </ul> 
  </div>
  )
}

export default Navbar