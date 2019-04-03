import React from 'react';
import firebase from '../../firebase';
import axios from 'axios';
import AuthContext from '../../contexts/auth';

export default class createPost extends React.Component {
    render () {
        <AuthContext.Consumer>
            {
                ({user}) => {
                    if(user){
                        return <h1>Create Post</h1>
                    } else {
                        return <Redirect to='/' />
                    }
                }
            }
        </AuthContext.Consumer>
    }
}