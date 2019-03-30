import React from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import './logout.css';

export default class Logout extends React.Component {

  componentDidMount() {
    firebase.auth().signOut()
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