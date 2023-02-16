import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import './UserProfile.css'

function UserProfile() {
  return (
    <div >
        <Header/>
        <Navbar/>
        <div className="user__profile__bg">
            <div className="user__profile__general">
                <div className="user__data__preview">
                    <div className="user__profile__icon"></div>
                    <div className="user__profile__data">
                        Имя<div className="user__about__data"></div>
                        Почта<div className="user__about__data"></div>
                        Пороль<div className="user__about__data"></div>
                    </div>
                </div>

                <button className="user__photo__select">Выбрать фото</button>
                <textarea className="user__about__teaxtarea" placeholder="Напишите о себе"></textarea>
            </div>
            <hr style={{width:'100%',height:'1px',margin:'50px 0',backgroundColor:'#000'}}/>
            <div className='user__statistic'></div>
        </div>
        
        
    </div>
  )
}

export default UserProfile