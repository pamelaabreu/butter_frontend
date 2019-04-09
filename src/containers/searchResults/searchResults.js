import React from 'react';
import { Link } from 'react-router-dom';
import SearchService from '../../services/search';
import UserService from '../../services/user';
import './searchResults.css';

import FollowButton from '../followButton/followButton';

export default class SearchResults extends React.Component {

    state = {
        input: '',
        results: []
    }

    componentDidMount () {
        const input = this.props.input;
        if(input === '' || input === ' '){
            return;
        }

        SearchService.getSearchResults(input)
        .then(results => this.setState({ input, results }))

    }

    searchResultList = () => {
        return this.state.results.map((e, i) => {
            const { user, usersFollowers, usersFollowing } = e;
            const sign = UserService.getHoroscopeSign(user.birthday);
                return (
                    <div className='searchUserBox' key={i}>
                        <div className='searchUserImgBox'>
                            <img className='searchUserImg' src={`${user.profile_img}`}/>
                        </div>

                        <div className='searchUserInfo'>
                            <Link className='searchUsername' to={"user/" + user.username}>{user.username}</Link>
                            <h1>{usersFollowers.length} followers / {usersFollowing.length} following</h1>
                            <h1 className='searchSign'>{sign}</h1>
                        </div>

                        <div className='searchFollow'>
                            <FollowButton username={user.username}/>
                        </div>
        
                    </div>
                );
        });
    }

    render () {
        
        return (
            <>
                <div className='searchResultsBox'>
                    {this.state.results.length === 0 ?
                        <h1 className='searchNoResults'>No search results for {this.state.input}</h1>
                        :
                        <>
                            <div className='searchResultHeaderBox'>
                                <h1 className='searchResultHeader' >{this.state.input}</h1>
                            </div>
                            {this.searchResultList()}
                        </>
                    }   
                </div>
            </>
        );
    }
}