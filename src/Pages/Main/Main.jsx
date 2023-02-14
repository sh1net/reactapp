import React from 'react'
import { useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import { authContext } from '../../Context/useContext'
import Loader from '../../Components/Loader/Loader';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../Api/PostService';
import { useFetching } from '../../hooks/useFething';
import Header from '../../Components/Header/Header';
import MainInformation from '../../Components/MainInformation/MainInformation';

function Main() {
 
  
    const {user,users,setUser}=useContext(authContext);
    const [fetchUserById,isLoading]=useFetching(async(login)=>{
    const fetchedUserById=await PostService.getUserById(login);
    setUser(fetchedUserById);
    })
  

    useEffect(() => {
     
      setTimeout(() => {
        const id=(users.find((v)=>v.login==localStorage.getItem('userLogin'))).id
        fetchUserById(id);
      }, 1000);
    }, [])
   
  return (///isLoading&&!user.login
    ///?<Loader/>
    ///:
    <div>
      <Header/>
        <Navbar/>
        <MainInformation/>
    </div>
  )
}

export default Main