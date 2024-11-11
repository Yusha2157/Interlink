import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import "../styles/login.css"
import Interlink from "../assets/Interlink.png";
import { FaGoogle , FaFacebook , FaDiscord , FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function login() {

  const { loginUser, loginInfo, isLoginLoading, loginError, updateLoginInfo } = useContext(AuthContext);

  return (
    <div className='loginWrapper'>
      <section className='secTion'>
    <div className="container">
      <div className="loginForm">
        <h1 style={{ color: "#ff00d7" }}>
          {" "}
          <span>Connecting </span>
          <span>Minds</span>, <span>Sharing</span> <span>Moments</span>.
        </h1>
        <h3>Welcome to Interlink</h3>
        <h1 className="loginHead">Log In</h1>
        <form action="" className="form1" onSubmit={loginUser}>
          <label htmlFor="">Email : </label>
          <input type="email" placeholder="Enter your email" onChange={(e) => updateLoginInfo({...loginInfo , email : e.target.value})}/>
          <div className="passholder">
            <label htmlFor="">Password : </label>
            <p>forgot password?</p>
          </div>
          <input type="password" name="" id="" placeholder="Password" onChange={(e) => updateLoginInfo({...loginInfo , password : e.target.value})}/>
          {loginError?.error && (
          <div style={{ color: 'red' }}>{loginError?.message}</div>
        )}
        <button type='submit' onclick={login} style={{ cursor: "pointer" }}>
          {isLoginLoading ? "Logging In" : "LOGIN"} <i className="fa fa-angles-right" />
        </button>
        </form>
        
        <p className="socialHeader">or continue with</p>
        <div className="socialLogos">
          <FaGoogle />
          <FaFacebook />
          <FaTwitter />
          <FaDiscord />
        </div>
        <p className="signUpP">
          dont have an account yet? <span><Link to={"/register"}>Sign Up</Link> </span>
        </p>
      </div>
      <div className="sideContainer">
        <img src={Interlink} alt="" />
      </div>
    </div>
  </section>
      
      </div>
  )
}
