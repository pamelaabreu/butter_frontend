import React from 'react';
import AuthContext from '../../contexts/auth';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import PostService from '../../services/post';
import './viewPost.css';

export default class ViewPost extends React.Component {
    static contextType = AuthContext;

    state = {
        postInfo: {},
        commentsInfo: [],
        likesInfo: [],
        userInfo: {},
        tagInfo: null,
        error: null,
    }

    componentDidMount () {
        PostService.getPostInformation(this.props.match.params.id)
            .then(({postInfo, likesInfo, commentsInfo, userInfo, tagInfo}) => this.setState({postInfo, likesInfo, commentsInfo, userInfo, tagInfo}))
            .catch(err => this.setState({ error: 'Trouble getting post information. Please try again later!' }))
    }
 
    render(){
        const {postInfo, likesInfo, commentsInfo, userInfo, tagInfo, error} = this.state;
        const {content_url, caption, created_at, summary, title} = postInfo;
        const {username, profile_img} = userInfo;

        const displayError = error ? <h1>{error}</h1> : null;
        const displayPost = <>
            <div className='viewPostBox'>
                {displayError}
                <div className='viewPostImageContainer'>
                    <img className='img-fluid' alt={title} src={content_url} />
                    {
                        tagInfo ? <img className='viewPostTagContainer' alt={tagInfo.topic_name} src={tagInfo.image_url} /> : null
                    }
                </div>
                <div className='viewPostInfoContainer'>
                    <div className='viewPostUsername'>
                        <Link className='viewPostUsername' to={'/user/'+username}>@{username}</Link>
                    </div>
                    <h2 className='viewPostTitle'>{title}</h2>
                    <h3 className='viewPostCaption'>{caption}</h3>
                    <p>{likesInfo.length} YAS!</p>
                    <p>{summary}</p>
                    <h3>{moment(created_at).format('LL')}</h3>
                    <h3>{moment(created_at).format('LT')}</h3>
                    <p>View all {commentsInfo.length} comments</p>
                </div>
                
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