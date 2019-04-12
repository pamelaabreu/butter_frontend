import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import UserService from '../../services/user';
import './userProfile.css';

import FollowButton from '../followButton/followButton';

export default class UserProfile extends React.Component {
    static contextType = AuthContext;

    state = {
        userInfo:{
            birthday:''
        },
        userFollowers: [],
        userFollowings: [],
        userPosts: [],
        error: null
    }

    componentDidMount () {
        UserService.getUsersInfo(this.props.match.params.id)
        .then(({userInfo, userFollowers, userFollowings, userPosts}) => this.setState({userInfo, userFollowers, userFollowings, userPosts}))
        .catch(err => this.setState({ userInfo:{}, userFollowers:{}, userFollowings:{}, userPosts:{}, error:`Trouble getting ${this.props.match.params.id}. Please try again later.` }))
    }

    render () {
        const {userInfo, userFollowers, userFollowings, userPosts} = this.state;
        const sign = UserService.getHoroscopeSign(userInfo.birthday);

        const displayPosts = userPosts.map((e, i) => {
            return <Link key={i} to={"/viewPost/" + e.id}>
                    <div className='userProfilePosts' style={{backgroundImage:"url(" + e.content_url + ")"}}></div>
                </Link>
        });

        const displayUserProfile = <div className='userProfileContainer'>
            <div className='userContainer'>
                <div className='userInfoContainer'>
                    <div className='userProfileImg' style={{backgroundImage:"url(" + userInfo.profile_img + ")"}}></div>
                    <h2 className='userInfoText'>{userInfo.username}</h2>
                    <h2 className='userInfoText'>{sign.toLowerCase()}</h2>
                    <h2 className='userInfoText'>{userFollowers.length} followers / {userFollowings.length} following</h2>
                </div>
                
                {userInfo.id === this.context.dbUid ? null : <FollowButton username={this.props.match.params.id}/>}
                {userInfo.id === this.context.dbUid ? <div className='userLogoutContainer'><Link className='userInfoText userLogout' to='/logout'>l</Link></div> : null}
                
            </div>
            {displayPosts}
        </div>

        return (
            <AuthContext.Consumer>
                {
                    ({user}) => user ? displayUserProfile : <Redirect to='/'/>
                }
            </AuthContext.Consumer>
        )
    }
}