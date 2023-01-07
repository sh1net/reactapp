import React from "react";
import "./AuthorizeButtonStyle.css"
function AuthorizeButton(props){
    return(
        <button  onClick className="button">{props.buttonText}</button>
    )
}

export default AuthorizeButton