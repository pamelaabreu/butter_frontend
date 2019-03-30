import React from 'react';
import firebase from '../../firebase';
import AuthContext from '../../contexts/auth';
import { Redirect, Link } from 'react-router-dom';
import './login.css';

export default class Login extends React.Component {

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
      .then((response) => {
        console.log('Returns: ', response);
      })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
  }


  render() {
    const { email, password, error } = this.state;
    const displayError = error === '' ? '' : <p className='loginError' role="alert">😞 {error}</p>
    const displayForm = <div className='loginBackground'>
     <div className='loginBox'>
        <div className='loginLeft'>
          <h1 className='loginTitle'>Login</h1>
        </div>
        <div className='loginRight'>
          {displayError}
            <div className='loginFlex'>
                <label className='loginInputTitle'>✉️</label>
                <input className='loginInput' type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
            </div>
            <div className='loginFlex'>
                <label className='loginInputTitle'>🔑</label>
                <input className='loginInput' type="password" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
            </div>
            <p className='loginButton loginButtonText' type="submit" onClick={this.handleSubmit}>Login</p>
        </div>
      </div>
      <Link className='loginHomeButton' to='/'>Home</Link>      
    </div>
     
  
  
    return (
      <AuthContext.Consumer>
        {
          (user) => {
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

