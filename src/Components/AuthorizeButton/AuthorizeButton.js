import React from "react";
import "./AuthorizeButtonStyle.css"
function AuthorizeButton({onClick,...props}){
    return(
        <button  onClick={onClick} className="button">{props.buttonText}</button>
    )
}

export default AuthorizeButton