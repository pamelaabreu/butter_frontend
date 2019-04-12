import React from 'react';
import { Link } from 'react-router-dom';
import LogoutService from '../../services/logout';
import './logout.css';

export default class Logout extends React.Component {

  componentDidMount() {
    LogoutService.logout()
  }

  render() {
    return (
      <div className='loginBackground' >
        <h1 className='logoutTitle'>You been logged out!</h1>
        <Link className='loginHomeButton' to='/'>Home</Link>  
      </div>
    );
  }
}