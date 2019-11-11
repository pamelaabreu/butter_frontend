import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

/*   SERVICES   */
import LoginService from './services/login';
import UserService from './services/user';
import firebase from './firebase';

/*   PAGES   */
import UserProfile from './containers/userProfile/userProfile';
import Navbar from './components/navbar/navbar';
import Searchbar from './containers/searchbar/searchbar';
import Home from './containers/home/home';
import Logout from './containers/logout/logout';
import Login from './containers/login/login';
import Signup from './containers/signup/signup';
import Error404 from './components/error404';
import CreatePost from './containers/createPost/createPost';
import ViewPost from './containers/viewPost/viewPost';
import Notifications from './containers/notifications/notifications';

/*   CONTEXT   */
import AuthContext from './contexts/auth';

/*   CSS   */
import './app.css';

class App extends Component {

  state = {
    user: null,
    token: null,
    dbUid: null,
    dbUser: {},
    firebaseUid: null,
    userEmail: null
  }

  componentDidMount () {
    this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if(user){
        await firebase.auth().currentUser.getIdToken(false)
        .then(token => {
          this.setState({ user, token, firebaseUid: user.uid, userEmail: user.email, }, () => {
            if(this.state.dbUid === null){
              LoginService.login(user.uid)
              .then(dbUid => {
                  return UserService.getUserById(dbUid)
                },err => null)
              .then(userInfo => {
                this.setState({
                  dbUid: userInfo.id,
                  dbUser: userInfo,
                });
              })
            }
          })
        })
      }
      else {
        this.setState({ user: null })
      }

    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
 
  updateDbUid = dbUid => {
    UserService.getUserById(dbUid)
      .then(userInfo => this.setState({ dbUid, dbUser: userInfo }))
  }

  render() {
    return (
      
      <AuthContext.Provider value={
        { 
          user:this.state.user, 
          token:this.state.token, 
          dbUid:this.state.dbUid, 
          dbUser:this.state.dbUser, 
          firebaseUid:this.state.firebaseUid, 
          userEmail: this.state.userEmail, 
          updateDbUid:this.updateDbUid 
        }}>
        <Route path='/' component={Navbar} />
          <div >
            <Switch>
                <Route path='/search' exact component={Searchbar} />
                <Route path='/user/:id' exact component={UserProfile} />
                <Route path='/' exact component={Home} />
                <Route path='/logout' exact component={Logout} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/createPost/:id' exact component={CreatePost} />
                <Route path='/viewPost/:id' exact component={ViewPost} />
                <Route path='/notifications' exact component={Notifications} />
                <Route component={Error404} />
            </Switch>
          </div>
      </AuthContext.Provider>
        
    );
  }
}

export default App;
