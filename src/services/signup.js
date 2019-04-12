import axios from 'axios';
import firebase from '../firebase'

const SignupService = {};

SignupService.createFirebaseUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

export default SignupService;