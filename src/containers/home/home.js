import React from 'react';
import AuthContext from '../../contexts/auth';
import './home.css';
import HomeService from '../../services/home';

import Welcome from '../../components/welcome';
import Newsfeed from '../../components/newsfeed/newsfeed';

export default class Home extends React.Component {

  static contextType = AuthContext;

  state = {
    allPosts: [],
    error: null
  }

  componentDidMount () {
    HomeService.getAllPosts()
    .then(allPosts => this.setState({ allPosts }))
    .catch(err => this.setState({ error: "Trouble getting posts.", allPosts:[] }))
    
  }
  
  render() {
    
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
                <Newsfeed allPosts={this.state.allPosts}/>
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