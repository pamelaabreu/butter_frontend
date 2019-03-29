import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase from './firebase';
import './app.css';

// ---- Pages
import Header from './components/header';
import UserProfile from './containers/userProfile/userProfile';
import Navbar from './components/navbar/navbar';
import Searchbar from './containers/searchbar/searchbar';
import Home from './containers/home/home';
import Logout from './containers/logout';
import Login from './containers/login';
import Signup from './containers/signup';
import Error404 from './components/error404';

// ---- Context
import AuthContext from './contexts/auth';

class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user});
      }
      else {
        this.setState({ user: null })
      }

    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      
      <AuthContext.Provider value={this.state.user}>
        <Route path='/' component={Navbar} />
        {/* <Route path='/' component={Header} /> */}
          <div >
            <Switch>
                <Route path='/search' exact component={Searchbar} />
                <Route path='/user/:id' exact component={UserProfile} />
                <Route path='/' exact component={Home} />
                <Route path='/logout' exact component={Logout} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
                <Route component={Error404} />
            </Switch>
          </div>
      </AuthContext.Provider>
        
    );
  }
}

export default App;
