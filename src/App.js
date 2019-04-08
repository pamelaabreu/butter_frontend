import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase from './firebase';
import axios from 'axios';
import './app.css';

// ---- Pages
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

// ---- Context
import AuthContext from './contexts/auth';

class App extends Component {

  state = {
    user: null,
    token: null,
    dbUid: null,
    dbUser: null,
    firebaseUid: null,
    userEmail: null
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user, firebaseUid: user.uid, userEmail: user.email}, () => {
          this.getFirebaseIdToken();
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
  
  getDbUser = dbUid => {
    axios.get(`http://localhost:3000/user/${dbUid}`)
    .then(res => this.setState({ dbUser: res.data }))
    .catch(err => this.setState({ dbUser:null }))
  }

  updateDbUid = dbUid => this.setState({ dbUid }, () => this.getDbUser(dbUid))

  getDbUid = () => {
    axios.get(`http://localhost:3000/login/${this.state.firebaseUid}`)
      .then(res => this.updateDbUid(res.data.id))
      .catch(err => this.setState({ dbUid:null }))
  }
xs
  getFirebaseIdToken () {
    firebase.auth().currentUser.getIdToken(false)
    .then(token => this.setState({ token }, () => {
      this.getDbUid()
    }))
    .catch(err => this.setState({ token: null }))
  }

  render() {
    return (
      
      <AuthContext.Provider value={{ user:this.state.user, token:this.state.token, dbUid:this.state.dbUid, dbUser:this.state.dbUser, firebaseUid:this.state.firebaseUid, userEmail: this.state.userEmail, updateDbUid:this.updateDbUid }}>
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
                <Route component={Error404} />
            </Switch>
          </div>
      </AuthContext.Provider>
        
    );
  }
}

export default App;
