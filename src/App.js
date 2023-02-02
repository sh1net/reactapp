import React from "react";
import {BrowserRouter} from "react-router-dom"
import { useState } from "react";
import { authContext } from "./Context/useContext";
import AppRouter from "./AppRouter/AppRouter";
import { useEffect } from "react";
import PostService from "./Api/PostService";
import Loader from "./Components/Loader/Loader";
import { useFetching } from "./hooks/useFething";
function App(){
  const [isAuth, setIsAuth] = useState(false);
  const [users, setUsers] = useState(null);

  const [fetchUsers,isLoading,setIsLoading]=useFetching(async()=>{
   const fetchedUsers= await PostService.getUsers();
    setUsers(fetchedUsers);
  })
  const [user, setUser] = useState({
    login:'',
    password:'',
    email:'',
    id:0
  })

 

  useEffect(() => {
    fetchUsers();
  }, [])


  useEffect(() => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
  }, [])

  return(isLoading
    ?
  <Loader/>
  :
    <authContext.Provider value={{isAuth,setIsAuth,users,setUsers,user,setUser}}>
        <BrowserRouter>
        <AppRouter/>
        </BrowserRouter>
    </authContext.Provider>
  )
}
export default App