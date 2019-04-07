import React from 'react';
import AuthContext from '../../contexts/auth';
import { Redirect } from 'react-router-dom';
import PostService from '../../services/post';
import './viewPost.css';

export default class ViewPost extends React.Component {
    static contextType = AuthContext;

    state = {
        postInfo: {},
        commentsInfo: [],
        likesInfo: [],
        userInfo: {},
        tagInfo: {},
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
        const {content_url} = postInfo;

        const displayError = error ? <h1>{error}</h1> : null;
        const displayPost = <>
            <div className='viewPostBox'>
                {displayError}
                <div className='viewPostImageContainer' style={{height: this.state.dimensions.height, backgroundImage:`url(` + content_url + ")"}}>
                    <img onLoad={this.onImgLoad} src={content_url} />
                </div>
                <div className='viewPostInfoContainer'>
                    <h1>Content Goes Here</h1>
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