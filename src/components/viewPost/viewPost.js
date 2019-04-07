import React from 'react';
import AuthContext from '../../contexts/auth';
import { Redirect } from 'react-router-dom';

export default class ViewPost extends React.Component {

    render(){
        console.log( this.props.match.params.id)
       return (
        <AuthContext.Consumer>
            {
                
                ({user}) => user ? <h1>Hellow View Post! </h1> : <Redirect to='/' />
                
            }
        </AuthContext.Consumer>
       ) 
    }
}