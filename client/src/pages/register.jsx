import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function register() {

  const {user} = useContext(AuthContext)

  const { registerInfo , updateRegisterInfo , registerUser , registerError , isRegisterLoading } = useContext(AuthContext);
  return (
    <>
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
