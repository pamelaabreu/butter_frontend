import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth';

export default (props) => {
    const loggedIn = <>
        <li>
        {/* <Link to="/logout">Logout</Link> */}
        </li>
    </>
  
    const loggedOut = <>
        <li>
            {/* <Link to="/signup">Sign Up</Link> */}
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
    </>

  return (
    <nav>
      <Link to="/">Authentication</Link>
      <ul >
        <li >
          <Link to="/">Home</Link>
        </li>
        <AuthContext.Consumer>
            {
                (user) => {
                    if (user) {
                    return loggedIn
                    } else {
                    return loggedOut
                    }
                }
            }
        </AuthContext.Consumer>
      </ul>
    </nav>
  )
}