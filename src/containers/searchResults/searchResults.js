import React from 'react';
import './searchResults.css';

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

        const user = {
            username: 'brbpam',
            id: 1,
            firebase_uid: 'something',
            followers: 2,
            followings: 2,
            sign: 'scorpio',
            following: 'following',
            profile_img: 'https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2017/10/terrier-puppy.jpg?itok=rIgh3ArV&fc=50,50'
        };

        const user2 = {
            username: 'designdyke',
            id: 2,
            firebase_uid: 'something',
            followers: 1,
            followings: 1,
            sign: 'leo',
            following: 'following',
            profile_img: 'https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2017/10/terrier-puppy.jpg?itok=rIgh3ArV&fc=50,50'
        };

        const user3 = {
            username: 'thinx',
            id: 2,
            firebase_uid: 'something',
            followers: 0,
            followings: 0,
            sign: '',
            following: 'follow',
            profile_img: 'https://mindbodygreen-res.cloudinary.com/images/w_767,q_auto:eco,f_auto,fl_lossy/ptr/QpbufLD/thinx.png'
        };
        
        const allUsers = [user, user2, user3];
        const resultUsers = allUsers.filter((e) => {
            const isTrue = e.username.toLowerCase().includes(input.toLowerCase());
            if(isTrue){
                return e;
            };
            
        })

        this.setState({ input, results: resultUsers })
    }

    searchResultList = () => {
        return this.state.results.map((e, i) => {
                return (
                    <div className='searchUserBox' key={i}>
                        <div className='searchUserImgBox'>
                            <img className='searchUserImg' src={`${e.profile_img}`}/>
                        </div>

                        <div className='searchUserInfo'>
                            <h1 className='searchUsername'>{e.username}</h1>
                            <h1>{e.followers} followers / {e.followings} following</h1>
                            <h1 className='searchSign'>{e.sign}</h1>
                        </div>

                        <div className='searchFollow'>
                            <h1>{e.following}</h1>
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