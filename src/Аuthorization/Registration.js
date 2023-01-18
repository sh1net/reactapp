import React from "react";
import "./MainAuthorizationStyle.css"
import logo from "./img/logo.png"
import Glazik from "./img/glazik.png"
import AuthorizeButton from "./AuthorizeButton/AuthorizeButton";
import {BrowserRouter, Switch ,Routes,Route,Link} from "react-router-dom"
import ReactDOMClient from 'react-dom/client';
import App from "../App";

function Registration(){
    function Hidepass(e){ 
            const password=document.getElementById('pass');
            if(password.type==='password') password.type='text';
            else password.type='password';
        };
    return(
        <div className="background">
            
            <img className="img--logo" src={logo}/>
            <div className="logo--title">ARISHTEST</div>
            <div className="registration--container">
                <div className="item--reg">Регистрация</div>
                <input required type="Text" placeholder="Ваш логин" className="item--input"/>
                <div style={{alignSelf:"center"}}>
                    <input required type="password" placeholder="Ваш пароль" className="item--input" id="pass"/>
                    <button className="glazik" onClick={Hidepass}><img src={Glazik}></img></button>
                </div>
                <input required type="email" placeholder="Ваша электронная почта" className="item--input" id="pass"/>
                <button className="item--reg_button">Зарегистрироваться</button>
                <div className="item--help">
                    <a  href="#" className="enter">Уже есть аккаунт?</a>
                    <a  href="#" className="support">Связаться с нами</a>
                </div>
                
            </div>
        </div>

    )
}

export default Registration