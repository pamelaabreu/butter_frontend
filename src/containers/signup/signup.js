import React from 'react';
import firebase from '../../firebase';
import AuthContext from '../../contexts/auth';
import { Redirect, Link } from 'react-router-dom';
import './signup.css'

export default class Signup extends React.Component {

  state = {
    firstname: '',
    username: '',
    birthday:'',
    email: '',
    password: '',
    joiningReason: '',
    error: ''
  }

  validateForms = () => {
    const {firstname, username, birthday, email, password} = this.state;
    return (firstname.length > 0 && username.length > 0 )
  }

  handleChange = (e) => {
    if (e.target.name === 'joiningReason'){
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.value.trim() });
    }
    
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('Returns: ', response);
        //Promise function to upload file
        //Return the promise
        //Then url promise axios request
        // pass token through header
      })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
  }

  render() {
    console.log(this.state)
    const { email, password, error, firstname, username, birthday, joiningReason } = this.state;
    const displayError = error === '' ? '' : <p className='loginError signupError' role="alert">{error}</p>
    const displayForm = <div className='loginBackground'>
      <div className='loginBox'>
        <div className='loginLeft'>
          <h1 className='loginTitle'>Signup</h1>
        </div>

        <div className='loginRight signupRight'>
          <div className='loginFlex'>
            <label className='signupInputTitle'>*First Name</label>
            <input className='signupInput' placeholder="Enter name" value={firstname} name='firstname' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>*Username</label>
            <input className='signupInput' placeholder="Enter username" value={username} name='username' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>*Email</label>
            <input className='signupInput' placeholder="Enter email" value={email} name='email' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>*Password</label>
            <input className='signupInput' placeholder="Enter password" value={password} name='password' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>*Birthday</label>
            <input className='signupInput' type='date' placeholder="Enter birthday" value={birthday} name='birthday' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>Why are you joining?</label>
            <input className='signupInput' placeholder="Reason" value={joiningReason} name='joiningReason' onChange={this.handleChange} />
          </div>

          <button type="submit" className='signupButton homeSignUpButtonText homeSignUpButton' onClick={this.handleSubmit}>Sign Up</button>
        </div>

        {displayError}
        <Link className='loginHomeButton' to='/'>Home</Link>  
      </div>
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
      
    );
  }
}

