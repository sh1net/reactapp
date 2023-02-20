import React from "react";
import "./MainAuthorizationStyle.css";
import logo from "../../img/logo.png";
import Glazik from "../../img/glazik.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import PostService from "../../Api/PostService";
import { authContext } from "../../Context/useContext";
import { useContext } from "react";
import Loader from "../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useFetching } from "../../hooks/useFething";
function Login() {

  const { users, user, setUser,setIsAuth } = useContext(authContext);
  const [loginUser, setLoginUser] = useState({
    login: "",
    password: "",
    id:user.id??''
  });


  const [fetchUsers,isLoading]=useFetching(async()=>{
    const fetchedUsers=await PostService.getUsers();

    if(fetchedUsers.length<users.length){
      PostService.setUsers(users);
        setLoginUser({
          login: user.login,
          password: user.password,
          id:''
        });
        
    }
    setUser({
    login: "",
    password: "",
    email:"",
    id:0,
    pic:''
  }
    )
})

  const navigate=useNavigate();


  useEffect(() => {
    setTimeout(() => {
      fetchUsers();
    }, 1000);
},[]);

  function Hidepass() {
    const password = document.getElementById("pass");
    if (password.type === "password") password.type = "text";
    else password.type = "password";
  }
  
  const [CorrectLogin, setCorrectLogin] = useState({
    placeholder: "Ваш логин",
    isCorrect: true,
  });
  const [CorrectPassword, setCorrectPassword] = useState({
    placeholder: "Ваш пароль",
    isCorrect: true,
  });
  
  useEffect(() => {
    if (CorrectLogin.isCorrect &&
         CorrectPassword.isCorrect&&
         loginUser
         ) {
            if(loginUser.login&&loginUser.password){
               const login=users.find((val)=>val.login===loginUser.login).login
              localStorage.setItem('userLogin',login);
               setIsAuth(true)
              localStorage.setItem('auth','true');
              navigate('/main');
            }
            
    }
  }, [CorrectLogin, CorrectPassword]);



  function checkLogin(){
    for (let i = 0; i < users.length; i++) {
        if(loginUser.login===users[i].login) return true;
    }
    return false;
  }

  function checkPasswrod(){
    for (let i = 0; i < users.length; i++) {
        if(loginUser.password===users[i].password) return true;
    }
    return false;
  }
  function logIn(e) {
    e.preventDefault();
    const tempUser={}
    if(!checkLogin()||!checkPasswrod()){
      tempUser.login='';
      tempUser.password='';
    setCorrectLogin({placeholder:"Неверный логин",isCorrect:false})
    setCorrectPassword({placeholder:"Неверный пароль",isCorrect:false})
    }
    else{
      tempUser.login=loginUser.login
      tempUser.password=loginUser.password;
      setCorrectLogin({placeholder:"Ваш логин",isCorrect:true})
      setCorrectPassword({placeholder:"Ваш пароль",isCorrect:true})
    }
    setLoginUser({...tempUser,id:loginUser.id});
  }
  
  return isLoading&&loginUser.id!==''?<Loader/>
  :
   (
    <div className="background">
      <img className="img--logo" src={logo} />
      <div className="logo--title">ARISHTEST</div>
      <form className="login--container" onSubmit={logIn}>
        <div className="item--reg">Вход</div>
        <input
          required
          type="Text"
          placeholder={CorrectLogin.placeholder}
          value={loginUser.login}
          onChange={(e) => {
            setLoginUser({ ...loginUser, login: e.target.value });
          }}
          className={
            CorrectLogin.isCorrect
              ? "item--input"
              : "item--input item--input--uncorrect"
          }
        />
        <div style={{ alignSelf: "center" }}>
          <input
            type="password"
            placeholder={CorrectPassword.placeholder}
            className={
              CorrectPassword.isCorrect
                ? "item--input"
                : "item--input item--input--uncorrect"
            }
            id="pass"
            value={loginUser.password}
            onChange={(e) => {
              setLoginUser({ ...loginUser, password: e.target.value });
            }}
          />
          <img className="glazik" onClick={Hidepass} src={Glazik}></img>
        </div>
        <button className="item--reg_button">Войти</button>
        <div className="item--help">
          <Link to="/authorization/registration" className="enter">
            <div>Нет аккаунта?</div>
          </Link>
          <Link to="/support" className="support">
            <div>Связаться с нами</div>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
