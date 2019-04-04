import React from 'react';
import firebase from '../../firebase';
import axios from 'axios';
import AuthContext from '../../contexts/auth';
import { Redirect } from 'react-router-dom';
import './createPost.css';

export default class CreatePost extends React.Component {

    state = {
        content_url:{},
        title:'',
        tags:[],
        tag_id: '',
        error: ''
    }

    handleFileInput = e => this.setState({ [e.target.name]: e.target.files[0] })

    handleChange = e => this.setState({ [e.target.name]: e.target.value.trim() })

    componentDidMount () {
        axios.get('')
    }

    render () {
        const displayProfileImgInput = <div className='createPostFlex'>
            <label className='createPostInputTitle'>Post Image</label>
            <input className='createPostInput createPostInputFile' type='file' name='content_url' onChange={this.handleFileInput} />
        </div>
        const displayTitleInput = <div className='createPostFlex'>
            <label className='createPostInputTitle'>Title</label>
            <input className='createPostInput createPostInputFile' type='text' name='title' onChange={this.handleChange} />
        </div>
        const displayForm = <div className='createPostBox'>
            {displayProfileImgInput}
            {displayTitleInput}
            <div>
                <h2>Tags</h2>
            </div>
        </div>

        return(
            <AuthContext.Consumer>
                {
                    ({user}) => {
                        if(user){
                            return displayForm;
                        } else {
                            return <Redirect to='/' />
                        }
                    }
                }
            </AuthContext.Consumer>
        );   
    }
}