import React from "react";
import "./AuthorizeButtonStyle.css"
import {BrowserRouter, Switch ,Routes,Route,Link} from "react-router-dom"

function AuthorizeButton({onClick,...props}){
    return(
        <button  onClick={onClick} className="button">{props.buttonText}</button>
    )
}

export default AuthorizeButton