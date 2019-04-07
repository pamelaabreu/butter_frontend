import React from 'react';
import AuthContext from '../../contexts/auth';
import { Redirect, Link } from 'react-router-dom';
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
        dimensions: {
            height: '200px'
        }
    }

    componentDidMount () {
        PostService.getPostInformation(this.props.match.params.id)
            .then(({postInfo, likesInfo, commentsInfo, userInfo, tagInfo}) => this.setState({postInfo, likesInfo, commentsInfo, userInfo, tagInfo}))
            .catch(err => this.setState({ error: 'Trouble getting post information. Please try again later!' }))
    }
    
    onImgLoad = ({target:img}) => {
        this.setState({ dimensions:{ height:img.offsetHeight } });
    }

    render(){
        const {postInfo, likesInfo, commentsInfo, userInfo, tagInfo, error} = this.state;
        const {content_url, caption, created_at, summary, title} = postInfo;
        const {username, profile_img} = userInfo;

        const displayError = error ? <h1>{error}</h1> : null;
        const displayPost = <>
            <div className='viewPostBox'>
                {displayError}
                <div className='viewPostImageContainer' style={{height: this.state.dimensions.height, backgroundImage:`url(` + content_url + ")"}}>
                    <img onLoad={this.onImgLoad} alt={title} src={content_url} />
                </div>
                <div className='viewPostInfoContainer'>
                    <Link to={'/user/'+username}>@{username}</Link>
                    <h2>{title}</h2>
                    <h3>{caption}</h3>
                    <h3>{created_at}</h3>
                    <p>{likesInfo.length} YAS!</p>
                    <p>{summary}</p>
                    <p>View all {commentsInfo.length} comments</p>
                </div>
                {
                    tagInfo ? <img src={tagInfo.image_url} /> : null
                }
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