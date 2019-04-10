import React from 'react';
import AuthContext from '../../contexts/auth';
import { Link } from 'react-router-dom';
import './newsfeed.css';
import './home.css';
import NewsfeedService from '../../services/newsfeed';

import Welcome from '../../components/welcome';

export default class Home extends React.Component {

  static contextType = AuthContext;

  state = {
    followingUsersPosts: [],
    error: null
  }

  componentDidMount () {

    if(this.context.dbUid){
      NewsfeedService.getAllFollowingsPosts(this.context.dbUid)
      .then(followingUsersPosts => this.setState({ followingUsersPosts }))
      .catch(err => this.setState({ error: "Trouble getting newsfeed." }) )
    } else this.setState({ error: "Trouble getting newsfeed." })
    
  }
  
  render() {
    const newsfeedPosts = this.state.followingUsersPosts.map((e, i) => {
      const { followingUser, followingUserPosts } = e;
      return (
        followingUserPosts.map((e, i) => {
          const {caption, content_url, id, summary, title} = e;

          return (
            <div className="newsfeedPost">
              <p className="feedTitle">{title}</p>
              <Link to={"/video/"+ id}>
                <img className='feedImg' src={content_url} />
              </Link>
                      
              <div className='newsfeedInfo'>
                <Link className='newsfeedUsername' to={"/user/" + followingUser.username}>@{followingUser.username}</Link>
                {/* <p className="newsfeedLikes">1000 YAS!</p> */}
              </div>
          
              <p className="feedCaption">{caption}</p>
            </div>
          );
        })
      );
    })

    return (
      <AuthContext.Consumer>
        {
          ({user}) => {
            if (user) {
              return <>
              <div className='experiment'>
                <div className='blank'>
                  <div className='arrowDown'></div>
                </div>

                {newsfeedPosts}
              </div>
            </>
            } else {
              return <Welcome />
            }
          }
        }
      </AuthContext.Consumer>
      
    )
  }
}