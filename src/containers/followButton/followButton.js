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
    }

    componentDidMount () {
        FollowService.checkUserFollowing(this.context.dbUid, this.props.username)
        .then(({ userFollowerId, userFollowingId, dbFollowId, following }) => this.setState({ userFollowerId, userFollowingId, dbFollowId, following }))
    }

    render () {
        // console.log(this.props.username)
        // console.log(this.context.dbUid)
        return (
            <button>Follow</button>
        );
    }
}