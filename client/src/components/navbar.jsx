import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const { user , logoutUser } = useContext(AuthContext);
  return(
    <>
        <h2>
           <Link to={"/"}>Chat App</Link>
        </h2>
        <h4>Logged in as {user?.name}</h4>
        <ul>
            <li><Link to={"/"}>Home</Link></li>
            

            {!user && (
              <>
                <li><Link to={"/login"}>Login</Link></li>
                <li><Link to={"/register"}>Register</Link></li>
              </>
            )}

            {user && (<>
              <li onClick={() => logoutUser}><Link to={"/login"}>Login</Link></li>
            </>)}
        </ul>
    </>
  )
}

export default Navbar;
