import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import { groupsContext } from '../../Context/useContext'
import { testContext } from '../../Context/useContext'
import { useContext } from 'react'
import { useFetching } from '../../hooks/useFething'
import PostService from '../../Api/PostService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { useState } from 'react'

function TestPassing(){

    
    return(
        <div>
            <div className="test__passing__bg">
                <div className="test__passing__container">
                <div className="group__tests__item"></div>
                </div>
            </div>
        </div>
    )
}
export default TestPassing