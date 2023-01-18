import React from "react";
import MainAuthorization from "./Аuthorization/MainAuthorization" 
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Registration from "./Аuthorization/Registration";
import Login from "./Аuthorization/Login";
function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<MainAuthorization/>}/>
      <Route exact path="/Registration" element={<Registration/>}/>
      <Route exact path="/Login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App