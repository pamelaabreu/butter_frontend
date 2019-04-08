import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import UserService from '../../services/user';

export default class UserProfile extends React.Component {
    static contextType = AuthContext;

    state = {
        userInfo:{},
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

    getHoroscopeSign = (birthday) => {
        const dates = birthday.split('-')
    }

    render () {
        const {userInfo, userFollowers, userFollowings, userPosts} = this.state;

        const displayUserProfile = <div>
            <div className='userInfoContainer'>
                <div>
                    <div style={{width:'60px', height:'60px', backgroundSize:'cover', backgroundPosition:'center', backgroundImage:"url(" + userInfo.profile_img + ")"}}></div>
                    <h2>{userInfo.username}</h2>
                    <h2>{userFollowers.length} Followers</h2>
                    <h2>{userFollowings.length} Following</h2>
                </div>
                <div>
                    {userInfo.id === this.context.dbUid ? null : <h2>Follow Placeholder</h2>}
                </div>
                <Link style={{border:'2px solid rebeccapurple', padding:'20px'}} to='/logout'>Logout</Link> 
            </div>
        </div>

        return (
            <AuthContext.Consumer>
                {
                    ({user}) => user ? <>
                        <div style={{marginTop:'100px'}}>
                            {displayUserProfile}
                        </div>
                    </>
                    : 
                    <Redirect to='/'/>
                }
            </AuthContext.Consumer>
        )
    }
}