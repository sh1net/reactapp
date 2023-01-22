import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { authContext } from '../Context/useContext'
import { publicRoutes } from '../Routes/routes'
import { privateRoutes } from '../Routes/routes'
import { useContext } from 'react'


function AppRouter() {
    const{isAuth}= useContext(authContext)
   
  return (
    
    <Routes>
      {isAuth
      ?privateRoutes.map(route=>
        <Route key={route.path} exact={route.exact} path={route.path}  element={route.element}/>
        )
      : publicRoutes.map(route=>
        <Route key={route.path} exact={route.exact} path={route.path} element={route.element}/>
        )
      }
    </Routes>
    
  )
}

export default AppRouter