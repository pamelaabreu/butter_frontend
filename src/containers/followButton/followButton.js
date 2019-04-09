import React from 'react';
import AuthContext from '../../contexts/auth';
import FollowService from '../../services/follow';

export default class FollowButton extends React.Component {
    static contextType = AuthContext;

    state = {
        following: null,
        userFollowerId: null,
        userFollowingId: null,
        dbFollowId: null,
        error: null
    }

    handleFollow = () => {
        const { userFollowerId,userFollowingId } = this.state;

        FollowService.createFollow(userFollowerId,userFollowingId)
        .then(dbFollowId => this.setState({ dbFollowId, following: true }))
        .catch(err => this.setState({ error: `Trouble following ${this.props.username}` }))
        
    }

    handleUnfollow = () => {
        FollowService.deleteFollow(this.state.dbFollowId)
        .then(data => this.setState({ following: false, dbFollowId: null }))
        .catch(err => this.setState({ error: `Trouble unfollowing ${this.props.username}` }))
    }

    componentDidMount () {
        FollowService.checkUserFollowing(this.context.dbUid, this.props.username)
        .then(({ userFollowerId, userFollowingId, dbFollowId, following }) => this.setState({ userFollowerId, userFollowingId, dbFollowId, following }))
    }

    render () {
        if(this.state.following){
            return <button onClick={this.handleUnfollow}>Unfollow</button>
        } else return <button onClick={this.handleFollow}>Follow</button>
          
    }
}