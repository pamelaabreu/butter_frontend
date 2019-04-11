import React from 'react';
import AuthContext from '../../contexts/auth';
import LikeService from '../../services/like';


export default class LikeButton extends React.Component {
    static contextType = AuthContext;

    state = {
        likes : [],
        isLiked :  null,
        postId : null,
        userId : null,
        dbLikeId : null,
        error: null    
    }

    createLike = () => {
        LikeService.createLike(this.state.userId, this.state.postId)
        .then(({likeId}) => {
            this.state({ dbLikeId: likeId, isLiked: true })
        })
        .catch(err => this.setState({ error:true }))
    }

    deleteLike = () => {
        LikeService.deleteLike(this.state.dbLikeId)
        .then(data => {
            this.setState({ dbLikeId: null, isLiked: false })
        })
        .catch(err => this.setState({ error: true }))
    }

    componentDidMount () {
        const getLikes = LikeService.getAllLikes(this.props.postInfo.id)
        const getIsLike = LikeService.checkUserLike(this.props.postInfo.id, this.context.dbUid)

        Promise.all([getLikes, getIsLike]).then(allData => {
            const likes = allData[0];
            const likedInfo = allData[1];
            if(likedInfo){
                this.setState(
                    { 
                    likes, 
                    postId: this.props.postInfo.id,
                    userId: this.context.dbUid, 
                    isLiked: true, 
                    dbLikeId: likedInfo.id 
                })
            } else {
                this.setState(
                    { 
                    likes,
                    postId: this.props.postInfo.id,
                    userId: this.context.dbUid, 
                    isLiked: null, 
                    dbLikeId: null 
                })
            }
        })
        .catch(err => this.setState({ error: true }))

    }

    componentDidUpdate () {
        LikeService.getAllLikes(this.props.postInfo.id)
        .then(likes => this.setState({ likes }))
        .catch(err => this.setState({ error: true }))
    }

    render () {
        return (
            <div>
                {
                    this.state.isLiked ? 
                    <button onClick={this.deleteLike}>Unlike</button> 
                    : 
                    <button onClick={this.createLike}>Like</button>
                }
                <p>{this.state.likes.length} YAS!</p>
            </div>
        );
    }
}