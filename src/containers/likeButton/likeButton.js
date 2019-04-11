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
        dbLikeId : null    
    }

    createLike = () => {
        console.log("Here")
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

    }

    render () {
        return (
            <div>
                {
                    this.state.isLiked ? 
                    <button >Unlike</button> 
                    : 
                    <button onClick={this.createLike}>Like</button>
                }
                <p>{this.state.likes.length} YAS!</p>
            </div>
        );
    }
}