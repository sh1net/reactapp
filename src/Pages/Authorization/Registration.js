import React from "react";
import "./MainAuthorizationStyle.css";
import logo from "../../img/logo.png"
import Glazik from "../../img/glazik.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
function Registration() {

    
    
    function Hidepass() {
    const password = document.getElementById("pass");
    if (password.type === "password") password.type = "text";
    else password.type = "password";
  }

    const [user, setUser] = useState({
      login:'',
      password:'',
      email:'',
      id:0
    })

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


  useEffect(() => {
    if(CorrectEmail.isCorrect&&
      CorrectLogin.isCorrect&&
      CorrectPassword.isCorrect&&
      user.email&&
      user.login&&
      user.password
      ){ 
    }  
  }, [CorrectEmail,CorrectLogin,CorrectPassword])
  

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
    if(!user.email.includes('@')||!user.email.includes('.')||user.email.length<8){
      tempUser.email='';
        setCorrectEmail({placeholder:"Почта введена неправильно",isCorrect:false})
    }
    else{
      tempUser.email=user.email;
      setCorrectEmail({placeholder:"Ваша электронная почта",isCorrect:true})

    }
    setUser({...tempUser,id:Date.now().toString()});
  }
  return (
    <div className="background">
      <img className="img--logo" src={logo} />
      <div className="logo--title">ARISHTEST</div>
      
        <form className="registration--container" onSubmit={RegIn} >
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
          <button className="glazik" onClick={Hidepass}>
            <img src={Glazik}></img>
          </button>
        </div>
        <input
          type="email"
          placeholder={CorrectEmail.placeholder}
          className={CorrectEmail.isCorrect?"item--input":"item--input item--input--uncorrect"}
          value={user.email}
          onChange={(e)=>{setUser({...user,email:e.target.value})}}
        />
        <button className="item--reg_button">
          Зарегистрироваться
        </button>
        <div className="item--help">
          <Link to="/authorization/login"  className="enter">
            <div >
              Уже есть аккаунт?
            </div>
          </Link>
          <Link to={"/support"} className="support">
          <div >
            Связаться с нами
          </div>
          </Link>
        </div>
        </form>
      </div>
  );
}
export default Registration;
