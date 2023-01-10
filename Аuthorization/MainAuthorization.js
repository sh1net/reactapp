import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import "./MainAuthorizationStyle.css"
import logo from "./img/logo.png"
import AuthorizeButton from "./AuthorizeButton/AuthorizeButton";
import {BrowserRouter, Switch ,Routes,Route,Link} from "react-router-dom"
import ReactDOMClient from 'react-dom/client';
import App from "../App";
function MainAuthorization(){

    return(
        
        <div className="background">
            <img className="img--logo" src={logo}/>
            <div className="logo--title">ARISHTEST</div>
            <div className="athorization--container">
           
            <div className="athorization--item">  <Link to="/Login"><AuthorizeButton buttonText={"ВХОД"}/></Link></div> 
            <div className="athorization--item">  <Link to="/Registration"><AuthorizeButton buttonText={"Регистрация"} /></Link></div>
            <a  href="#" className="support">Связаться с нами</a>
            </div>
           
        </div>
    )
}

export default MainAuthorization