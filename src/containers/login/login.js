import React from 'react';
import firebase from '../../firebase';
import axios from 'axios';
import AuthContext from '../../contexts/auth';
import { Redirect, Link } from 'react-router-dom';
import './login.css';

export default class Login extends React.Component {
  static contextType = AuthContext;

  state = {
    email: '',
    password: '',
    error: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => response.user.uid)
      .then(uid => axios.get(`http://localhost:3000/login/${uid}`))
      .then(res => this.context.updateDbUid(res.data.id))
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
  }


  render() {
    const { email, password, error } = this.state;

    const displayError = error === '' ? '' : <p className='loginError' role="alert"><span role='img' aria-label="Sad Face">😞</span> {error}</p>
    const displayForm = <div className='loginBackground'>
     <div className='loginBox'>
        <div className='loginLeft'>
          <h1 className='loginTitle'>Login</h1>
        </div>
        <div className='loginRight'>
            <div className='loginFlex'>
                <label className='loginInputTitle'><span role='img' aria-label="email">✉️</span></label>
                <input className='loginInput' type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
            </div>
            <div className='loginFlex'>
                <label className='loginInputTitle'><span role='img' aria-label="password">🔑</span></label>
                <input className='loginInput' type="password" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
            </div>
            {displayError}
            <p className='loginButton loginButtonText' type="submit" onClick={this.handleSubmit}>Login</p>
        </div>
      </div>
      <Link className='loginHomeButton' to='/'>Home</Link>      
    </div>

    return (
      <AuthContext.Consumer>
        {
          ({user}) => {
            if (user) {
              return <Redirect to='/' />
            } else {
                return displayForm;
            }
          }
        }
      </AuthContext.Consumer>

    )
  }
}

