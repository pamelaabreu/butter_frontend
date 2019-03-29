import React from 'react';
import AuthContext from '../../contexts/auth';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends React.Component {
  
  render() {
    const welcome = <>
      <div className='homeBackground'>
        <div>
          <h1>butter</h1>
          <div>
            <p>
              A place to safely share open and honest confessions.
              Sign up if you want to hear and speak about sex, shame, and insecurities.
            </p>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
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
              return welcome
            }
          }
        }
      </AuthContext.Consumer>
      
    )
  }
}