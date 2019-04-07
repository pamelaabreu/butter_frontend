import React from 'react';
import AuthContext from '../../contexts/auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PostService from '../../services/post';
import './viewPost.css';

export default class ViewPost extends React.Component {
    static contextType = AuthContext;

    state = {
        postInfo: null,
        commentsInfo: null,
        likesInfo: null,
        userInfo: null,
        tagInfo: null,
        error: null
    }

    componentDidMount () {

        PostService.getPostInformation(this.props.match.params.id)
        .then(({postInfo, likesInfo, commentsInfo, userInfo, tagInfo}) => this.setState({postInfo, likesInfo, commentsInfo, userInfo, tagInfo}))
        .catch(err => this.setState({ error: 'Trouble getting post information. Please try again later!' }))
    }

    render(){
        const {postInfo, likesInfo, commentsInfo, userInfo, tagInfo, error} = this.state;

        const displayError = error ? <h1>{error}</h1> : null;
        const displayPost = <>
            <div className='viewPostBox'>
                {displayError}
                <h1>Hellow View Post! </h1> 
            </div>
        </>

       return (
        <AuthContext.Consumer>
            {
                
                ({user}) => user ? displayPost : <Redirect to='/' />
                
            }
        </AuthContext.Consumer>
       ) 
    }
}