
import Registration from "../Pages/Authorization/Registration";
import MainAuthorization from "../Pages/Authorization/MainAuthorization";
import Login from "../Pages/Authorization/Login";
import Main from "../Pages/Main/Main";
import { Navigate } from "react-router-dom";
import Support from "../Pages/Support/Support";
import AboutUs from "../Pages/AboutUs/AboutUs"
export const privateRoutes=[
    {path:"/main/:login",element:<Main/>,exact:true},
    {path:"/support",element:<Support/>,exact: true},
    {path:"/about",element:<AboutUs/>,exact:true}
]

export const publicRoutes=[
    {path:"/authorization/login",element:<Login/>,exact:true},
    {path:"/authorization/registration",element:<Registration/>,exact:true},
    {path:"/authorization",element:<MainAuthorization/>,exact:true},
    {path:"/",element:<Navigate replace to="/authorization"/>,exact:true},
    {path:"*",element:<Navigate replace to="/authorization"/>,exact:true},
    {path:"/support",element:<Support/>,exact: true}
]
    