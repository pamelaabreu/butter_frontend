import React from 'react';
import AuthContext from '../contexts/auth';
import { Redirect, Link } from 'react-router-dom';

export default class Home extends React.Component {
  
  render() {
    const loggedOut = <>
        <li>
            <Link to="/signup">Sign Up</Link>
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
    </>

    return (
      <AuthContext.Consumer>
        {
          (user) => {
            if (user) {
              return <>
              <h2>Welcome back, {user.email}</h2>
              <h4>Your ID is:{user.uid} </h4>
            </>
            } else {
              return loggedOut
            }
          }
        }
      </AuthContext.Consumer>
      
    )
  }
}