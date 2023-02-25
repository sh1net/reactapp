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
 
  
    
  
    
   
   
  return (
   
    
    <div>
      <Header/>
        <Navbar/>
        <MainInformation/>
    </div>
  )
}

export default Main