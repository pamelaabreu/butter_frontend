import React from 'react';
import AuthContext from '../../contexts/auth';
import { Link } from 'react-router-dom';
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

    return (
      <AuthContext.Consumer>
        {
          ({user}) => {
            if (user) {
              return <>
              <h2>Welcome back, {user.email}</h2>
              <h4>Your ID is:{user.uid} </h4>
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