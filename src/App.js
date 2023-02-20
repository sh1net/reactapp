import React from "react";
import {BrowserRouter} from "react-router-dom"
import { useState } from "react";
import { authContext } from "./Context/useContext";
import AppRouter from "./AppRouter/AppRouter";
import { useEffect } from "react";
import PostService from "./Api/PostService";
import Loader from "./Components/Loader/Loader";
import { useFetching } from "./hooks/useFething";
import { testContext } from "./Context/useContext";
import { groupsContext } from "./Context/useContext";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";

import './main.css';
function App(){
  const [isAuth, setIsAuth] = useState(false);
  const [users, setUsers] = useState(null);
  const [userTests, setUserTests] = useState(null)
  const [groups,setGroups]=useState(null)
  
  const [fetchUsers,isLoading]=useFetching(async()=>{
   const fetchedUsers= await PostService.getUsers();
    setUsers(fetchedUsers);
  })

  const [user, setUser] = useState({
    login:'',
    password:'',
    email:'',
    id:0,
    pic:'',
  })



  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if(childSnapshot.key==='groups'){
          setGroups(childSnapshot.val())
        }
      });
    }, {
      onlyOnce: false
    }); 
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
      <groupsContext.Provider value={{groups,setGroups}}>
        <testContext.Provider value={{userTests,setUserTests}}>
        <BrowserRouter >
        <AppRouter/>
        </BrowserRouter>
        </testContext.Provider>
        </groupsContext.Provider>
      </authContext.Provider>
  )
}
export default App