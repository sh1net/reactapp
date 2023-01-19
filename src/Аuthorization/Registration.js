import React from "react";
import "./MainAuthorizationStyle.css"
import logo from "./img/logo.png"
import Glazik from "./img/glazik.png"
import AuthorizeButton from "./AuthorizeButton/AuthorizeButton";
import {BrowserRouter, Switch ,Routes,Route,Link} from "react-router-dom"
import ReactDOMClient from 'react-dom/client';
import App from "../App";

function Registration(){
    function Hidepass(){ 
            const password=document.getElementById('pass');
            if(password.type==='password') password.type='text';
            else password.type='password';
        };
        function Detected(){
            const name=document.getElementById('name');
            const mail=document.getElementById('mail');
            const pass=document.getElementById('pass');
            const reg=document.getElementById('reg-but');
            var sum=0;
            for(var i=0;i<pass.textContent.length;i++)
            {
                sum+=1;
            }
            if(name.value==""||mail.value==""||pass.value==""){
                alert("Введите данные полей");
            }
            
            /*if(sum<8){
                alert("Ваш пороль слишком короткий")
            }
            if(mail.textContent.type!='mail'){
                alert("Не правильно указана почта")
            }*/
            else{
                reg=document.location='/Login';
            }
            
        }
    return(        
        <div className="background">  
            <img className="img--logo" src={logo}/>
            <div className="logo--title">ARISHTEST</div>
            <div className="registration--container">
                <div className="item--reg">Регистрация</div>
                <input required type="Text" id="name" placeholder="Ваш логин" className="item--input"/>
                <div style={{alignSelf:"center"}}>
                    <input required type="password" placeholder="Ваш пароль" className="item--input" id="pass"/>
                    <button className="glazik" onClick={Hidepass}><img src={Glazik}></img></button>
                </div>
                <input required type="email" id="mail" placeholder="Ваша электронная почта" className="item--input"/>
                <button className="item--reg_button" onClick={Detected} id="reg-but">Зарегистрироваться</button>
                <div className="item--help">
                <Link to="/Login"><a  href="#" className="enter">Уже есть аккаунт?</a></Link>
                    <a  href="#" className="support">Связаться с нами</a>
                </div> 
            </div>
        </div>
    )
}
export default Registration