import React from "react";
import "./MainAuthorizationStyle.css"
import logo from "../../img/logo.png"
import Glazik from "../../img/glazik.png"
import {Link} from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
function Login(){
    function Hidepass(){ 
        const password=document.getElementById('pass');
        if(password.type==='password') password.type='text';
        else password.type='password';
    };

    const [CorrectLogin,setCorrectLogin] = useState({
        placeholder:'Ваш логин',
        isCorrect:true
    });
    const [CorrectPassword, setCorrectPassword] = useState({
        placeholder:'Ваш пароль',
        isCorrect:true
    });
    useEffect(() => {
        if(
          CorrectLogin.isCorrect&&
          CorrectPassword.isCorrect
          
          ){ 
        }  
      }, [CorrectLogin,CorrectPassword])
    return(
        <div className="background">
            <img className="img--logo" src={logo}/>
            <div className="logo--title">ARISHTEST</div>
            <div className="login--container">
                <div className="item--reg">Вход</div>
                <input required type="Text" placeholder="Ваш логин" className="item--input"/>
                <div style={{alignSelf:"center"}}>
                    <input required type="password" placeholder="Ваш пароль" className="item--input" id="pass"/>
                    <button className="glazik" onClick={Hidepass}><img src={Glazik}></img></button>
                </div>
                <button className="item--reg_button">Войти</button>
                <div className="item--help">
                    <Link to="/authorization/registration" className="enter"><div >Нет аккаунта?</div></Link>
                    <Link to="/authorization/support" className="support"><div >Связаться с нами</div></Link>
                </div>
            </div>
        </div>
    )
}

export default Login