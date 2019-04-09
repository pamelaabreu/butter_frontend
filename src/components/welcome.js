import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return <>
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
}