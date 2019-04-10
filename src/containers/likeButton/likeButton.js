import React from 'react';
import LikeService from '../../services/like';

export default class LikeButton extends React.Component {
    state = {
        likes : [],
        isLiked :  null,
        postId : null,
        userId : null,
        dbLikeId : null    
    }

    componentDidMount () {
        LikeService.getAllLikes(this.props.postInfo.id)
        .then(likes => this.setState({ likes }))
    }

    render () {
        return (
            <div>
                <button>Like</button>
                <p>{this.state.likes.length} YAS!</p>
            </div>
        );
    }
}