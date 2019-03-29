import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';

export default class UserProfile extends React.Component {
    render () {
        return (
            <AuthContext.Consumer>
                {
                    user => user ? <>
                        <div style={{marginTop:'100px'}}>
                            <h2>Hello, {user.email}</h2>
                            <h4>With ID:{user.uid} </h4>
                            <Link style={{border:'2px solid rebeccapurple', padding:'20px'}} to='/logout'>Logout</Link> 
                        </div>
                    </>
                    : 
                    <Redirect to='/'/>
                }
            </AuthContext.Consumer>
        )
    }
}