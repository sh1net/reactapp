import React from 'react'
import { useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import { authContext } from '../../Context/useContext'
import Loader from '../../Components/Loader/Loader';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../../Api/PostService';
import { useFetching } from '../../hooks/useFething';
import Header from '../../Components/Header/Header';
import MainInformation from '../../Components/MainInformation/MainInformation';
function Main() {
    const params=useParams();
    const {user,setUser,setIsAuth}=useContext(authContext);
    const [fetchUserById,isLoading]=useFetching(async(login)=>{
    const fetchedUserById=await PostService.getUserById(login);
    })

    useEffect(() => {
      setTimeout(() => {
        fetchUserById(params.login);

      }, 1000);
    }, [])

  return (isLoading
    ?<Loader/>
    :
    <div>
      <Header/>
        <Navbar setIsAuth={setIsAuth}/>
        <MainInformation/>
    </div>
  )
}

export default Main