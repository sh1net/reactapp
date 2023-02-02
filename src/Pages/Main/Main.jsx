import React from 'react'
import { useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import { authContext } from '../../Context/useContext'
import Loader from '../../Components/Loader/Loader';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../../Api/PostService';
import { useFetching } from '../../hooks/useFething';

function Main() {
    const params=useParams();
    const {user,setUser,setIsAuth}=useContext(authContext);
    const [fetchUserById,error]=useFetching(async(id)=>{
    const fetchedUserById=await PostService.getUserById(id);
    })

    useEffect(() => {
     fetchUserById(params.id);
    }, [])
  return (
    <div>
        <Navbar setIsAuth={setIsAuth}/>
    </div>
  )
}

export default Main