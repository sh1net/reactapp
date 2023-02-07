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
 const params=useParams();
 const navigate=useNavigate();
    const {user,users,setUser,setIsAuth}=useContext(authContext);
    const [fetchUserById,isLoading]=useFetching(async(id)=>{
    const fetchedUserById=await PostService.getUserById(id);
    setUser(fetchedUserById);
    })
  

    useEffect(() => {
      if(params.login!==localStorage.getItem('userLogin')){
        navigate('/main/'+localStorage.getItem('userLogin'))
      }
      setTimeout(() => {
        console.log(params.login)
        const id=(users.find((v)=>v.login==localStorage.getItem('userLogin'))).id
        fetchUserById(id);
      }, 1000);
    }, [])

  return (isLoading
    ?<Loader/>
    :
    <div>
      <Header/>
        <Navbar setIsAuth={setIsAuth} user={user}/>
        <MainInformation/>
    </div>
  )
}

export default Main