import React from 'react';
import firebase from '../../firebase';
import AuthContext from '../../contexts/auth';
import ImageService from '../../services/imgUpload';
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
    error: '',
    profileImage: {},
    imgError: ''
  }

  validateForms = () => {
    const { firstname, username, birthday } = this.state;

    return firstname.length > 0 && username.length > 0 && birthday.length > 0;
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value.trim() })

  handleFileInput = e => this.setState({ [e.target.name]: e.target.files[0] })

  handleSubmit = e => {
    e.preventDefault();

    if(this.validateForms()){
      const { email, password, profileImage } = this.state;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => response.user.uid)
        .then(uid => ImageService.imageUpload(profileImage, uid))
        .then(url => console.log(url))
        .catch(err => {
          const { message } = err;
          this.setState({ firebaseError: message });
        })

    } else {
      this.setState({ error: 'Please fill out all required fields.' })
    }

  }

  

  render() {

    const { error, firebaseError, imgError } = this.state;

    // JSX DISPLAY ERRORS
    const displayFirebaseError = firebaseError === '' ? null : <p className='loginError signupError' role="alert">{firebaseError}</p>
    const displayRequiredError = error === '' ? null : <p className='loginError signupError' role="alert">{error}</p>
    const displayImgError = imgError === '' ? null : <p className='loginError signupError' role="alert">{imgError}</p>
    
    // JSX DISPLAY INPUT FIELDS
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
    const displayProfileImgInput = <div className='signupFlex'>
        <label className='signupInputTitle'>Profile Image</label>
        <input className='signupInput signupInputFile' type='file' name='profileImage' onChange={this.handleFileInput} />
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
          {displayProfileImgInput}
          {displayFirebaseError}
          {displayRequiredError}
          {displayImgError}

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

