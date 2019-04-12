/*   REACT   */
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = (props) => {
    return <>
    <div className='homeBackground'>
      <div className='welcomeBox'>
        <h1 className='welcomeTitle'>butter</h1>
        <div className='welcomeInfoBox'>
          <p>
            You're not perfect. That's ok. This website isn't either.
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
};

export default Welcome;