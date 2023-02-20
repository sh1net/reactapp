import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import './UserProfile.css'
import { useContext } from 'react';
import { authContext } from '../../Context/useContext';
import PostService from '../../Api/PostService'




function UserProfile() {
    const {user,setUser}=useContext(authContext);
    console.log(user);
    function uploadImg(e){
        const file=e.target.files[0];
        PostService.uploadUserImg(file,user)
        setTimeout(() => {
          PostService.getUserImg(file,setUser,user);
        }, 2000);
      }
    function UserImgSelect(){
        document.getElementById("file__input").click();
    }
  return (
    <div >
        <Header/>
        <Navbar/>
        <div className="user__profile__bg">
            <div className="user__profile__general">
                <div className="user__data__preview">
                    <img className="user__profile__icon" alt="" src={user.pic}></img>
                    <div className="user__profile__data">
                        Имя<div className="user__about__data">{user.login}</div>
                        Почта<div className="user__about__data">{user.email}</div>
                        Пароль<div className="user__about__data">{user.password}</div>
                    </div>
                </div>
                <button onClick={()=>UserImgSelect()} className="file__upload__button">Выбрать фото</button>
                <input id="file__input" className="file__upload__input" type="file" name="f" accept='image/png, image/jpeg' onChange={(e)=>{uploadImg(e,user.id)}}/>
                <textarea className="user__about__teaxtarea" placeholder="Напишите о себе"></textarea>
            </div>
            <hr style={{width:'100%',height:'1px',margin:'50px 0',backgroundColor:'#000'}}/>
            <div className='user__statistic'></div>
        </div>
        
        
    </div>
  )
}

export default UserProfile