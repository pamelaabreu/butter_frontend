import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase from './firebase';

// ---- Pages
import Header from './components/header';
import Home from './containers/home';
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
        <h1>HELLO BITCH WASSUs</h1>
        <Route path='/' component={Header} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route component={Error404} />
        </Switch>
      </AuthContext.Provider>
        
    );
  }
}

export default App;
