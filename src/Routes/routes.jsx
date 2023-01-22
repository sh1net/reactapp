
import Registration from "../Pages/Authorization/Registration";
import MainAuthorization from "../Pages/Authorization/MainAuthorization";
import Login from "../Pages/Authorization/Login";
import { Navigate } from "react-router-dom";
export const privateRoutes=[
    
]

export const publicRoutes=[
    {path:"/authorization/login",element:<Login/>,exact:true},
    {path:"/authorization/registration",element:<Registration/>,exact:true},
    {path:"/authorization",element:<MainAuthorization/>,exact:true},
    {path:"/",element:<Navigate replace to="/authorization"/>,exact:true},
    {path:"*",element:<Navigate replace to="/authorization"/>,exact:true}

    //{path:"/support",element:<Support/>,exact: true}
]
    