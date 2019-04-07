import React from 'react';
import AuthContext from '../../contexts/auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class ViewPost extends React.Component {

    componentDidMount () {
        axios.get(`http://localhost:3000/post/${parseInt(this.props.match.params.id)}/`)
        .then(res => console.log(res.data))
    }

    render(){

       return (
        <AuthContext.Consumer>
            {
                
                ({user}) => user ? <h1>Hellow View Post! </h1> : <Redirect to='/' />
                
            }
        </AuthContext.Consumer>
       ) 
    }
}