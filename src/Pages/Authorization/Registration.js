import React, { useContext } from "react";
import "./MainAuthorizationStyle.css";
import logo from "../../img/logo.png"
import Glazik from "../../img/glazik.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import PostService from "../../Api/PostService";
import { db } from "../../firebase";
import { ref, set } from "firebase/database";
import { authContext } from "../../Context/useContext";
import swal from "sweetalert";


function Registration() {
  const{users,setUsers,user,setUser}=useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
      setUser({login:'',email:'',password:'',pic:'',id:0})
  }, [])
  
  
  
    function Hidepass() {
    const password = document.getElementById("pass");
    if (password.type === "password") password.type = "text";
    else password.type = "password";
  }

    const [CorrectLogin,setCorrectLogin] = useState({
        placeholder:'Ваш логин',
        isCorrect:true
    });
    const [CorrectPassword, setCorrectPassword] = useState({
        placeholder:'Ваш пароль',
        isCorrect:true
    });
    const [CorrectEmail, setCorrectEmail] = useState({
        placeholder:'Ваша электронная почта',
        isCorrect:true
    });

    function SameUser(user,users){
      for (let i = 0; i < users.length; i++) {
   
        if(user.login===users[i].login) return true;
      }
      return false;
    }
    
  useEffect(() => {
  
    if(user.login.length>5){
      
    setCorrectLogin({placeholder:"Ваш логин",isCorrect:true})
    }
   
    if(user.password.length>8){
      
       setCorrectPassword({placeholder:"Ваш пароль",isCorrect:true})
    }
   
    if(user.email.includes('@')&&user.email.length>8&&(user.email.endsWith('.com')||user.email.endsWith('.ru'))){
      
        setCorrectEmail({placeholder:"Ваша электронная почта",isCorrect:true})
    }
    
    
    
  }, [user.login,user.email,user.password])



 
  
  function RegIn(e) {
    e.preventDefault();
    const tempUser={}
    if(user.login.length<5){
      tempUser.login='';
    setCorrectLogin({placeholder:"Логин введен неправильно",isCorrect:false})
    }
    else{
      tempUser.login=user.login
      setCorrectLogin({placeholder:"Ваш логин",isCorrect:true})

    }
    if(user.password.length<8){
      tempUser.password='';
       setCorrectPassword({placeholder:"Пароль введен неправильно",isCorrect:false})
    }
    else{
      tempUser.password=user.password;
      setCorrectPassword({placeholder:"Ваш пароль",isCorrect:true})

    }
    if(!user.email.includes('@')||!user.email.includes('.')||user.email.length<8&&(!user.email.endsWith('.com')||!user.email.endsWith('.ru'))){
      tempUser.email='';
        setCorrectEmail({placeholder:"Почта введена неправильно",isCorrect:false})
    }
    else{
      tempUser.email=user.email;
      setCorrectEmail({placeholder:"Ваша электронная почта",isCorrect:true})

    }
    tempUser.id=users.length;
    tempUser.pic='';

    

    if(CorrectEmail.isCorrect&&
      CorrectLogin.isCorrect&&
      CorrectPassword.isCorrect&&
      user.email&&
      user.login&&
      user.password
      ){
        if(users.length!==0){
          if(!SameUser(tempUser,users)){
           PostService.setUsers([...users,tempUser])
           setUser(tempUser)
            navigate('/authorization/login')
          }
          else swal({
            title:"Ошибка",
            text:"Пользователь с ником "+tempUser.login +" уже существует",
            icon:"error"
          });
        }
        else {
          setUsers([tempUser]);
        }
       
    }
  }
 
  return (
    <div className="background">
      <img className="img--logo" src={logo} />
      <div className="logo--title">ARISHTEST</div>
      
        <form className="registration--container"  onSubmit={RegIn} >
        <div className="item--reg">Регистрация</div>
        <input
        type="Text"
        id="login"
          placeholder={CorrectLogin.placeholder}
          className={CorrectLogin.isCorrect?"item--input":"item--input item--input--uncorrect"}
          value={user.login}
          onChange={(e)=>{setUser({...user,login:e.target.value})}}
        />
        <div style={{ alignSelf: "center" }}>
          <input
            type="password"
            placeholder={CorrectPassword.placeholder}
            className={CorrectPassword.isCorrect?"item--input":"item--input item--input--uncorrect"}
            id="pass"
            value={user.password}
          onChange={(e)=>{setUser({...user,password:e.target.value})}}
          />
            <img className="glazik" onClick={Hidepass} src={Glazik}></img>
        </div>
        <input
          type="email"
          placeholder={CorrectEmail.placeholder}
          className={CorrectEmail.isCorrect?"item--input":"item--input item--input--uncorrect"}
          value={user.email}
          autoComplete="off"
          onChange={(e)=>{setUser({...user,email:e.target.value})}}
        />
        <button id='reg' className="item--reg_button">
          Зарегистрироваться
        </button>
        <div className="item--help">
          <Link to="/authorization/login"  className="enter">
            <div onClick={()=>setUser({...user,id:0})}>
              Уже есть аккаунт?
            </div>
          </Link>
          <Link to="/support" className="support">
          <div>
            Связаться с нами
          </div>
          </Link>
        </div>
        </form>
      </div>
  );
}
export default Registration;
