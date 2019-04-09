import React from 'react';
import AuthContext from '../../contexts/auth';
import { Link } from 'react-router-dom';
import './home.css';

import Welcome from '../../components/welcome';

export default class Home extends React.Component {

  componentDidMount () {

  }
  
  render() {

    return (
      <AuthContext.Consumer>
        {
          ({user}) => {
            if (user) {
              return <>
              <h2>Welcome back, {user.email}</h2>
              <h4>Your ID is:{user.uid} </h4>
            </>
            } else {
              return <Welcome />
            }
          }
        }
      </AuthContext.Consumer>
      
    )
  }
}