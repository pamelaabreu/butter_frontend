/*   REACT   */
import React from 'react';

/*   CONTEXT   */
import AuthContext from '../../contexts/auth';

/*   SERVICE   */
import HomeService from '../../services/home';

/*   CSS   */
import './home.css';

/*   COMPONENTS   */
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
    .catch(err => this.setState({ error: true, allPosts:[] }))
    
  }
  
  render() {
    
    return (
      <AuthContext.Consumer>
        {
          ({user}) => {
            if (user) {
              return <>
              <Newsfeed allPosts={this.state.allPosts}/>
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