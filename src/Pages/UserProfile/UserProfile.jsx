import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import './UserProfile.css'
import { useContext } from 'react';
import { authContext } from '../../Context/useContext';
import PostService from '../../Api/PostService'
import { useNavigate } from 'react-router-dom';




function UserProfile() {
    const {user,setUser}=useContext(authContext);
    const navigate=useNavigate();
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
    <div className="user__profile__container">
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
            <hr style={{width:'1px',height:'100%',backgroundColor:'#000'}}/>

            <div className='user__statistic'>
            <div className='my__results'>Мои результаты</div>
             {user.myResults!==undefined
             ? 
              user.myResults.map(myResult=> <div key={myResult.passedTest.id} className="main__results">
                <div className='test__names'>Тест:<p className="main__stats__style">{myResult.passedTest.title}</p></div>
                <div className='test__names'>Группа:<p className="main__stats__style">{myResult.group}</p></div>

                <div className='test__names'>Мои баллы: <p className="main__stats__style">{myResult.myMark}</p>из<p className="main__stats__style">{myResult.passedTest.questions.reduce((sum,question)=>sum+=Number(question.mark),0)}</p></div>
                <button className="user__stats__check" onClick={()=>navigate('/yourResult/'+myResult.group+'/'+myResult.passedTest.id)}>Подробнее</button>
              </div>
              )
              
            
             : <div>Вы пока что не прошли не одного теста</div>
             }
            </div>
           
          
        </div>
        
    </div>
  )
}

export default UserProfile