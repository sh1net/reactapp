import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import './UserProfile.css'
import { useContext } from 'react';
import { authContext } from '../../Context/useContext';

function UserProfile() {
    const {user,setUser}=useContext(authContext);
    console.log(user);
  return (
    <div className="user__profile__main">
        <Header/>
        <Navbar/>
        <div className="user__profile__bg">
            <div className="user__profile__general">
                <div className="user__data__preview">
                    <div className="user__profile__icon"></div>
                    <div className="user__profile__data">
                        Имя<div className="user__about__data">{user.login}</div>
                        Почта<div className="user__about__data">{user.email}</div>
                        Пароль<div className="user__about__data">{user.password}</div>
                    </div>
                </div>
                <button className="user__photo__select">Выбрать фото</button>
                <textarea className="user__about__teaxtarea" placeholder="Напишите о себе"></textarea>
            </div>
        </div>
        
        
    </div>
  )
}

export default UserProfile