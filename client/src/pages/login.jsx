import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function login() {

  const { loginUser, loginInfo, isLoginLoading, loginError, updateLoginInfo } = useContext(AuthContext);

  return (
    <div>
      login

      <form onSubmit={loginUser}>
        <label>Email:</label>
        <input type="email" name="email" onChange={(e) => updateLoginInfo({...loginInfo , email : e.target.value})}/>
        
        <label>Password:</label>
        <input type="password" name="password" onChange={(e) => updateLoginInfo({...loginInfo , password : e.target.value})} />



        <button type='submit'>{isLoginLoading ? "Loggin In" : "Login"}</button>

        {loginError?.error && (
          <div style={{ color: 'red' }}>{loginError?.message}</div>
        )}
      </form>
      </div>
  )
}
