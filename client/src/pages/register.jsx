import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Interlink from "../assets/Interlink.png";
import { FaGoogle , FaFacebook , FaDiscord , FaTwitter } from "react-icons/fa";
import "../styles/register.css";

export default function register() {

  const {user} = useContext(AuthContext)

  const { registerInfo , updateRegisterInfo , registerUser , registerError , isRegisterLoading } = useContext(AuthContext);
  return (
    <>
      <div className="registerWrapper">
      <section className='secTion'>
    <div className="container">
      <div className="loginForm">
        <h1 style={{ color: "#ff00d7" }}>
          {" "}
          <span>Connecting </span>
          <span>Minds</span>, <span>Sharing</span> <span>Moments</span>.
        </h1>
        <h3>Welcome to Interlink</h3>
        <form action="" className="form1" onSubmit={registerUser}>
          <label htmlFor="">UserName : </label>
          <input type="text" placeholder='Name' onChange = {(e) => updateRegisterInfo({...registerInfo, name: e.target.value})
      }/>
          <label htmlFor="">Email : </label>
          <input type="email" placeholder="Enter your email" onChange = {(e) => updateRegisterInfo({...registerInfo, email: e.target.value})}/>
          <div className="passholder">
            <label htmlFor="">Password : </label>
            <p>forgot password?</p>
          </div>
          <input type="password" name="" id="" placeholder="Password" onChange={(e) => updateRegisterInfo({...registerInfo, password: e.target.value})
      }/>
          
        <button type='submit' onclick={register} style={{ cursor: "pointer" }}>
          {isRegisterLoading ? "Registering User" : "SIGN UP"} <i className="fa fa-angles-right" />
        </button>

        {registerError?.error && (
          <alert>
            <p>{registerError?.message}</p>
          </alert>
        )}
        </form>
        
        <p className="socialHeader">or register with</p>
        <div className="socialLogos">
          <FaGoogle />
          <FaFacebook />
          <FaTwitter />
          <FaDiscord />
        </div>
        <p className="signUpP">
          already have an account yet? <span><Link to={"/login"}>Login</Link> </span>
        </p>
      </div>
      <div className="sideContainer">
        <img src={Interlink} alt="" />
      </div>
    </div>
  </section>
      </div>

      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <label>Username:</label>
        <input type="text" name="username" onChange = {(e) => updateRegisterInfo({...registerInfo, name: e.target.value})
      } />

        <label>Email:</label>
        <input type="email" name="email" onChange = {(e) => updateRegisterInfo({...registerInfo, email: e.target.value})
      } />
        
        <label>Password:</label>
        <input type="password" name="password" onChange = {(e) => updateRegisterInfo({...registerInfo, password: e.target.value})
      } />

        <button type='submit'>{isRegisterLoading ? "Creating Your Account" : "register"}</button>

        {registerError?.error && (
          <alert>
            <p>{registerError?.message}</p>
          </alert>
        )}

      </form>
    </>
  )
}
