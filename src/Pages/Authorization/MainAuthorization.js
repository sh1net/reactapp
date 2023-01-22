import React from "react";

import "./MainAuthorizationStyle.css"
import logo from "../../img/logo.png"
import AuthorizeButton from "../AuthorizeButton/AuthorizeButton";
import {Link} from "react-router-dom"



function MainAuthorization(){
    
    return(
        <div className="background">
            <img className="img--logo" src={logo}/>
            <div className="logo--title">ARISHTEST</div>
            <div className="athorization--container">
            <div className="athorization--item">  <Link to="/authorization/login"><AuthorizeButton buttonText={"ВХОД"}/></Link></div> 
            <div className="athorization--item">  <Link to="/authorization/registration"><AuthorizeButton buttonText={"Регистрация"} /></Link></div>
            <Link to='/support'style={{alignSelf:"center"}} className="support"> <div>Связаться с нами</div></Link>
            </div>
        </div>
    )
}

export default MainAuthorization