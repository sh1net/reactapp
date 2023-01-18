import React from "react";
import "./MainAuthorizationStyle.css"
import logo from "./img/logo.png"
import Glazik from "./img/glazik.png"
import AuthorizeButton from "./AuthorizeButton/AuthorizeButton";
import {BrowserRouter, Switch ,Routes,Route,Link} from "react-router-dom"
import ReactDOMClient from 'react-dom/client';
import Registration from "./Registration";
import App from "../App";

function Login(){
    function Hidepass(){ 
        const password=document.getElementById('pass');
        if(password.type==='password') password.type='text';
        else password.type='password';
    };
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
                    <Link to="/Registration"><a  href="#" className="enter">Нет аккаунта?</a></Link>
                    <a  href="#" className="support">Связаться с нами</a>
                </div>
            </div>
        </div>
    )
}

export default Login