import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth';

export default class UserProfile extends React.Component {
    render () {
        return (
            <h1>Hello User Page!</h1>
        )
    }
}