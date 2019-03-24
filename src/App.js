import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Firebase from 'firebase';

// ---- Context
import AuthContext from './contexts/auth';

class App extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    this.unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({user});
      }
      else {
        this.setState({user: null});
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
      </AuthContext.Provider>
        
    );
  }
}

export default App;
