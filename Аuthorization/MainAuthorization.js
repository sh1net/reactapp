import React from "react";
import "./MainAuthorizationStyle.css"
import logo from "./img/logo.png"
import AuthorizeButton from "./AuthorizeButton/AuthorizeButton";

function MainAuthorization(){
    return(
        <div className="background">
            <img className="img--logo" src={logo}/>
            <div className="logo--title">ARISHTEST</div>
            <div className="athorization--container">
            <div className="athorization--item">  <AuthorizeButton buttonText={"ВХОД"}/></div> 
            <div className="athorization--item">  <AuthorizeButton buttonText={"Регистрация"}/></div> 
            <a  href="#" className="support">Связаться с нами</a>
            </div>
        </div>
    )
}

export default MainAuthorization