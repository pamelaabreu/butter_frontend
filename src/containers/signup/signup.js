import React from 'react';
import firebase from '../../firebase';
import AuthContext from '../../contexts/auth';
import { Redirect, Link } from 'react-router-dom';
import './signup.css';

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

  handleChange = e => this.setState({ [e.target.name]: e.target.value.trim() })

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
          const { message } = err;
          this.setState({ firebaseError: message });
        })

    } else {
      this.setState({ error: 'Please fill out all required fields.' })
    }

  }

  render() {

    const { error, firebaseError } = this.state;

    // JSX DISPLAY FORM 
    const displayFirebaseError = firebaseError === '' ? null : <p className='loginError signupError' role="alert">{firebaseError}</p>
    const displayRequiredError = error === '' ? null : <p className='loginError signupError' role="alert">{error}</p>
    const displayRequiredInputs = ["First Name", "Birthday", "Email", "Username", "Password", ].map((e, i) => {
      if(e === 'First Name'){
        return <div key={i} className='signupFlex'>
          <label className='signupInputTitle'>
          <span className='signupRequired'>* </span> 
          {e}
        </label>
        <input className='signupInput' type='text' name='firstname' onChange={this.handleChange} />
      </div>
      } 
      else if(e === 'Birthday'){
        return <div key={i} className='signupFlex'>
          <label className='signupInputTitle'>
          <span className='signupRequired'>* </span> 
          {e}
        </label>
        <input className='signupInput' type='date' name='birthday' onChange={this.handleChange} />
      </div>
      } 
      else if (e === 'Password'){
        return <div key={i} className='signupFlex'>
          <label className='signupInputTitle'>
          <span className='signupRequired'>* </span> 
          {e}
        </label>
        <input className='signupInput' type='password' name='password' onChange={this.handleChange} />
      </div>
      } 
      else return (
        <div key={i} className='signupFlex'> 
            <label className='signupInputTitle'>
              <span className='signupRequired'>* </span> 
              {e}
            </label>
            <input className='signupInput' name={e.toLowerCase()} onChange={this.handleChange} />
        </div>
      );
    });
    const displayJoiningInput = <div className='signupFlex'>
      <label className='signupInputTitle'>Why are you joining?</label>
      <input className='signupInput' name='joiningReason' onChange={this.handleChange} />
    </div>

    const displayForm = <div className='loginBackground'>
      <Link className='loginHomeButton' to='/'>Home</Link>

      <div className='loginBox signupBox'>
        <div className='signupLeft'>
          <h1 className='loginTitle'>Signup</h1>
        </div>

        <div className='loginRight signupRight'>
          {displayRequiredInputs}
          {displayJoiningInput}
          {displayFirebaseError}
          {displayRequiredError}

          <button type="submit" className='loginButton loginButtonText signupButton' onClick={this.handleSubmit}>Sign Up</button>
        </div>
        
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

