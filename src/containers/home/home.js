import React from 'react';
import AuthContext from '../../contexts/auth';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends React.Component {
  
  render() {
    const welcome = <>
      <div className='homeBackground'>
        <div className='welcomeBox'>
          <h1 className='welcomeTitle'>butter</h1>
          <div className='welcomeInfoBox'>
            <p>
              A place to safely share honest confessions about sex, shame, and insecurities.
            </p>
            <div className='homeSignUpButton'>
              <Link className='homeSignUpButtonText' to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
        <div className='homeLoginBox'>
          <p>Already a Member?</p>
          <Link className='signUpButtonText' to="/login">Login</Link>
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