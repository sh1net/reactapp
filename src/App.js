import React from "react";
import {BrowserRouter} from "react-router-dom"
import { useState } from "react";
import { authContext } from "./Context/useContext";
import AppRouter from "./AppRouter/AppRouter";
function App(){
  const [isAuth, setIsAuth] = useState(false);
  
  

  return(
    <authContext.Provider value={{isAuth,setIsAuth}}>
        <BrowserRouter>
        <AppRouter/>
        </BrowserRouter>
    </authContext.Provider>
  )
}
export default App