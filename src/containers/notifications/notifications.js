import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth';

export default class Notifications extends React.Component {
    render () {
        return (
            <AuthContext.Consumer>
        {
          ({user}) => {
            if (user) {
              return <>
              <h1>Hello Notifications</h1>
            </>
            } else {
              return <Redirect  to='/'/>
            }
          }
        }
      </AuthContext.Consumer>
        );
    }
}