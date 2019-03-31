import React from 'react';
import firebase from '../../firebase';
import AuthContext from '../../contexts/auth';
import { Redirect, Link } from 'react-router-dom';
import './signup.css'

export default class Signup extends React.Component {

  state = {
    firstname: '',
    username: '',
    birthday: '',
    email: '',
    password: '',
    joiningReason: '',
    firebaseError: '',
    error: ''
  }

  validateForms = () => {
    const { firstname, username, birthday } = this.state;

    return firstname.length > 0 && username.length > 0 && birthday.length > 0;
  }

  handleChange = (e) => {this.setState({ [e.target.name]: e.target.value.trim() })}

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.validateForms()){
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
          this.setState({ firebaseError: err });
        })

    } else {
      this.setState({ error: 'Please fill out all required field.' })
    }

  }

  componentDidUpdate(p, prevState) {
    // console.log('Previous State: ', prevState);
    // console.log('Current State', this.state);
  }

  render() {

    const { email, password, error, firstname, username, birthday, joiningReason, firebaseError } = this.state;
    const displayFirebaseError = firebaseError === '' ? '' : <p className='loginError signupError' role="alert">{error}</p>
    const displayForm = <div className='loginBackground'>
      {displayFirebaseError}
      {error ? <h1>{error}</h1> : null}
      <div className='loginBox'>
        <div className='loginLeft'>
          <h1 className='loginTitle'>Signup</h1>
        </div>

        <div className='loginRight signupRight'>
          <div className='loginFlex'> 
            {
             firstname.isError ?  
             <label style={{ color: 'red' }} className='signupInputTitle'>*First Name</label> 
             : <label className='signupInputTitle'>*First Name</label>
            }
            <input className='signupInput' placeholder="Enter name" name='firstname' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>*Username</label>
            <input className='signupInput' placeholder="Enter username" name='username' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>*Email</label>
            <input className='signupInput' placeholder="Enter email" name='email' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>*Password</label>
            <input className='signupInput' type='password' placeholder="Enter password" name='password' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            {
              birthday.isError ? <label style={{ color: 'red' }} className='signupInputTitle'>*Birthday</label>
                :
                <label className='signupInputTitle'>*Birthday</label>
            }

            <input className='signupInput' type='date' placeholder="Enter birthday" name='birthday' onChange={this.handleChange} />
          </div>

          <div className='loginFlex'>
            <label className='signupInputTitle'>Why are you joining?</label>
            <input className='signupInput' placeholder="Reason" name='joiningReason' onChange={this.handleChange} />
          </div>

          <button type="submit" className='signupButton' onClick={this.handleSubmit}>Sign Up</button>
        </div>

        
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

